import { spawn } from 'node:child_process';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import WebSocket from 'ws';

const origin = process.argv[2] || 'http://127.0.0.1:4174';
const port = 9300 + (process.pid % 500);
const profile = path.join(os.tmpdir(), `edge-axe-${Date.now()}`);
const edgePath =
  process.env.EDGE_PATH || 'C:\\\\Program Files (x86)\\\\Microsoft\\\\Edge\\\\Application\\\\msedge.exe';
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const axeSource = await fs.readFile(path.join(process.cwd(), 'node_modules', 'axe-core', 'axe.min.js'), 'utf8');

const checks = [
  { width: 390, route: '/' },
  { width: 390, route: '/patient-guide' },
  { width: 390, route: '/contact' },
  { width: 1280, route: '/' },
  { width: 1280, route: '/about' },
  { width: 1280, route: '/expertise' },
  { width: 1280, route: '/patient-guide' },
  { width: 1280, route: '/research' },
  { width: 1280, route: '/contact' },
  { width: 1280, route: '/privacy' },
  { width: 390, route: '/fa' },
  { width: 390, route: '/ps/contact' },
];

async function waitForDebugger() {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (response.ok) return response.json();
    } catch {
      // still starting
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
  await cdp.send('Runtime.enable', {}, sessionId);

  const output = [];
  for (const check of checks) {
    await cdp.send(
      'Emulation.setDeviceMetricsOverride',
      {
        width: check.width,
        height: 900,
        deviceScaleFactor: 1,
        mobile: check.width < 768,
        screenWidth: check.width,
        screenHeight: 900,
      },
      sessionId,
    );
    await cdp.send(
      'Emulation.setEmulatedMedia',
      { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] },
      sessionId,
    );
    await cdp.send('Page.navigate', { url: `${origin}${check.route}` }, sessionId);
    for (let attempt = 0; attempt < 50; attempt += 1) {
      await delay(100);
      const ready = await cdp.send(
        'Runtime.evaluate',
        { expression: "!!document.querySelector('h1')", returnByValue: true },
        sessionId,
      );
      if (ready.result?.value) break;
    }
    await cdp.send('Runtime.evaluate', { expression: axeSource }, sessionId);
    const result = await cdp.send(
      'Runtime.evaluate',
      {
        expression: `axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] }, resultTypes: ['violations'] }).then(r => JSON.stringify(r.violations.map(v => ({ id: v.id, impact: v.impact, help: v.help, nodes: v.nodes.map(n => ({ target: n.target, html: n.html.slice(0, 180), summary: n.failureSummary })) }))))`,
        awaitPromise: true,
        returnByValue: true,
      },
      sessionId,
    );
    output.push({
      width: check.width,
      route: check.route,
      violations: JSON.parse(result.result.value),
    });
  }
  const reportPath = path.join(os.tmpdir(), 'zadran-axe-report.json');
  await fs.writeFile(reportPath, JSON.stringify(output, null, 2), 'utf8');
  const compact = output
    .map((check) => ({
      width: check.width,
      route: check.route,
      violations: check.violations.map((violation) => ({
        id: violation.id,
        impact: violation.impact,
        nodes: violation.nodes.length,
        examples: violation.nodes.slice(0, 3).map((node) => ({
          target: node.target,
          summary: node.summary?.split('\n')[1]?.trim() ?? node.summary,
        })),
      })),
    }))
    .filter((check) => check.violations.length);
  console.log(JSON.stringify({ reportPath, checks: output.length, failed: compact }, null, 2));
  await cdp.send('Browser.close');
  socket.close();
} finally {
  if (browserProcess && !browserProcess.killed) browserProcess.kill();
}
