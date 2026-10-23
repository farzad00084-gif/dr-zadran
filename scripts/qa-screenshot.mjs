import { spawn } from 'node:child_process';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import WebSocket from 'ws';

const [
  url,
  widthArg = '1440',
  heightArg = '900',
  output = 'preview.png',
  mode = 'full',
  scrollYArg = '0',
] = process.argv.slice(2);
const width = Number(widthArg);
const height = Number(heightArg);
const port = 9300 + (process.pid % 500);
const profile = path.join(os.tmpdir(), `edge-cdp-${Date.now()}`);
const edgePath =
  process.env.EDGE_PATH || 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

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
    socket.on('message', (raw) => {
      const message = JSON.parse(raw.toString());
      if (message.id && this.pending.has(message.id)) {
        const { resolve, reject } = this.pending.get(message.id);
        this.pending.delete(message.id);
        if (message.error) reject(new Error(message.error.message));
        else resolve(message.result);
      }
    });
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
  await cdp.send(
    'Emulation.setDeviceMetricsOverride',
    {
      width,
      height,
      deviceScaleFactor: 1,
      mobile: width < 768,
      screenWidth: width,
      screenHeight: height,
    },
    sessionId,
  );
  await cdp.send(
    'Emulation.setEmulatedMedia',
    { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] },
    sessionId,
  );

  await cdp.send('Page.navigate', { url }, sessionId);
  await delay(2200);

  const metricsResult = await cdp.send(
    'Runtime.evaluate',
    {
      expression:
        'JSON.stringify({innerWidth: window.innerWidth, scrollWidth: document.documentElement.scrollWidth, bodyWidth: document.body.scrollWidth, scrollHeight: document.documentElement.scrollHeight, title: document.title, lang: document.documentElement.lang, dir: document.documentElement.dir})',
      returnByValue: true,
    },
    sessionId,
  );
  const metrics = JSON.parse(metricsResult.result.value);

  const contentHeight =
    mode === 'viewport' ? height : Math.min(Math.max(metrics.scrollHeight, height), 9000);

  if (mode === 'viewport') {
    await cdp.send(
      'Runtime.evaluate',
      {
        expression: `window.scrollTo({ top: ${Number(scrollYArg)}, behavior: 'instant' })`,
      },
      sessionId,
    );
    await delay(300);
  }

  const screenshot = await cdp.send(
    'Page.captureScreenshot',
    mode === 'viewport'
      ? { format: 'png', fromSurface: true }
      : {
          format: 'png',
          fromSurface: true,
          captureBeyondViewport: true,
          clip: { x: 0, y: 0, width, height: contentHeight, scale: 1 },
        },
    sessionId,
  );

  await fs.writeFile(output, Buffer.from(screenshot.data, 'base64'));
  console.log(JSON.stringify({ ...metrics, output, width, height, contentHeight }, null, 2));

  await cdp.send('Browser.close');
  socket.close();
} finally {
  if (browserProcess && !browserProcess.killed) browserProcess.kill();
  await fs.rm(profile, { recursive: true, force: true }).catch(() => {});
}
