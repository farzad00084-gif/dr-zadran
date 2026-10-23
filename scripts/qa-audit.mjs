import { spawn } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';
import WebSocket from 'ws';

const origin = process.argv[2] || 'http://127.0.0.1:4174';
const port = 9300 + (process.pid % 500);
const profile = path.join(os.tmpdir(), `edge-audit-${Date.now()}`);
const edgePath =
  process.env.EDGE_PATH || 'C:\\\\Program Files (x86)\\\\Microsoft\\\\Edge\\\\Application\\\\msedge.exe';
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function waitForDebugger() {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (response.ok) return response.json();
    } catch {
      // Browser is still starting.
    }
    await delay(200);
  }
  throw new Error('Edge remote debugger did not start.');
}

class Cdp {
  constructor(socket) {
    this.socket = socket;
    this.nextId = 1;
    this.pending = new Map();
    this.listeners = new Map();
    socket.on('message', (raw) => {
      const message = JSON.parse(raw.toString());
      if (message.id && this.pending.has(message.id)) {
        const { resolve, reject } = this.pending.get(message.id);
        this.pending.delete(message.id);
        if (message.error) reject(new Error(message.error.message));
        else resolve(message.result);
      }
      if (message.method) {
        for (const listener of this.listeners.get(message.method) ?? []) listener(message.params);
      }
    });
  }

  on(method, listener) {
    const listeners = this.listeners.get(method) ?? [];
    listeners.push(listener);
    this.listeners.set(method, listeners);
  }

  send(method, params = {}, sessionId) {
    const id = this.nextId;
    this.nextId += 1;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.socket.send(JSON.stringify({ id, method, params, sessionId }));
    });
  }
}

const routes = [
  '/',
  '/about',
  '/expertise',
  '/patient-guide',
  '/research',
  '/contact',
  '/privacy',
  '/this-page-does-not-exist',
];
const localizedRoutes = ['/', '/about', '/expertise', '/patient-guide', '/research', '/contact', '/privacy'];

const viewports = [
  { width: 320, height: 720, routes },
  { width: 375, height: 812, routes: ['/', '/research'] },
  { width: 390, height: 844, routes: localizedRoutes.map((route) => `/fa${route === '/' ? '' : route}`) },
  { width: 390, height: 844, routes: localizedRoutes.map((route) => `/ps${route === '/' ? '' : route}`) },
  { width: 430, height: 932, routes: ['/', '/patient-guide'] },
  { width: 768, height: 900, routes },
  { width: 1024, height: 900, routes: ['/', '/expertise', '/contact'] },
  { width: 1280, height: 900, routes },
  { width: 1280, height: 900, routes: localizedRoutes.map((route) => `/fa${route === '/' ? '' : route}`) },
  { width: 1440, height: 900, routes: ['/', '/about'] },
  { width: 390, height: 844, routes: ['/fa/this-page-does-not-exist'] },
];

let browserProcess;
let socket;

try {
  browserProcess = spawn(
    edgePath,
    [
      '--headless=new',
      '--disable-gpu',
      '--no-first-run',
      '--hide-scrollbars',
      `--remote-debugging-port=${port}`,
      `--user-data-dir=${profile}`,
      'about:blank',
    ],
    { stdio: 'ignore' },
  );

  const version = await waitForDebugger();
  socket = new WebSocket(version.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    socket.once('open', resolve);
    socket.once('error', reject);
  });
  const cdp = new Cdp(socket);

  const { targetId } = await cdp.send('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await cdp.send('Target.attachToTarget', { targetId, flatten: true });
  await cdp.send('Page.enable', {}, sessionId);
  await cdp.send('Runtime.enable', {}, sessionId);

  let pageErrors = [];
  cdp.on('Runtime.exceptionThrown', (params) => {
    pageErrors.push(params.exceptionDetails?.text ?? 'Runtime exception');
  });

  const results = [];
  for (const viewport of viewports) {
    await cdp.send(
      'Emulation.setDeviceMetricsOverride',
      {
        width: viewport.width,
        height: viewport.height,
        deviceScaleFactor: 1,
        mobile: viewport.width < 768,
        screenWidth: viewport.width,
        screenHeight: viewport.height,
      },
      sessionId,
    );
    await cdp.send(
      'Emulation.setEmulatedMedia',
      { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] },
      sessionId,
    );

    for (const route of viewport.routes) {
      pageErrors = [];
      await cdp.send('Page.navigate', { url: `${origin}${route}` }, sessionId);
      let ready = false;
      for (let attempt = 0; attempt < 40; attempt += 1) {
        await delay(100);
        const state = await cdp.send(
          'Runtime.evaluate',
          {
            expression:
              "JSON.stringify({ ready: !!document.querySelector('h1'), title: document.title, lang: document.documentElement.lang, dir: document.documentElement.dir, innerWidth: window.innerWidth, scrollWidth: document.documentElement.scrollWidth, h1: document.querySelector('h1')?.innerText || '' })",
            returnByValue: true,
          },
          sessionId,
        );
        if (state?.result?.value) {
          const parsed = JSON.parse(state.result.value);
          if (parsed.ready) {
            const expectedLang = route.startsWith('/fa') ? 'fa' : route.startsWith('/ps') ? 'ps' : 'en';
            results.push({
              viewport: viewport.width,
              route,
              ...parsed,
              expectedLang,
              overflow: parsed.scrollWidth > parsed.innerWidth + 1,
              languageMismatch: parsed.lang !== expectedLang,
              directionMismatch: expectedLang === 'en' ? parsed.dir !== 'ltr' : parsed.dir !== 'rtl',
              errors: [...pageErrors],
            });
            ready = true;
            break;
          }
        }
      }
      if (!ready) {
        results.push({
          viewport: viewport.width,
          route,
          ready: false,
          errors: [...pageErrors, 'Timed out waiting for h1'],
        });
      }
    }
  }

  const failures = results.filter(
    (result) =>
      result.overflow ||
      !result.ready ||
      result.languageMismatch ||
      result.directionMismatch ||
      result.errors.length,
  );
  console.log(
    JSON.stringify(
      {
        checked: results.length,
        failures,
        summary: results.map(({ viewport, route, title, lang, dir, h1, overflow, ready }) => ({
          viewport,
          route,
          lang,
          dir,
          h1: h1 ? h1.slice(0, 70) : '',
          overflow,
          ready,
          title,
        })),
      },
      null,
      2,
    ),
  );

  await cdp.send('Browser.close');
  socket.close();
  if (failures.length) process.exitCode = 1;
} finally {
  if (browserProcess && !browserProcess.killed) browserProcess.kill();
}
