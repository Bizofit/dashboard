import type { Express } from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function log(message: string) {
  const formattedTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
  console.log(`${formattedTime} [express] ${message}`);
}

export async function setupVite(app: Express) {
  const vite = await import('vite').then((m) => m.createServer({
    server: { middlewareMode: true },
    appType: 'custom',
  }));

  app.use(vite.middlewares);

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientPath = path.resolve(__dirname, '../client/index.html');
      let template = await fs.readFile(clientPath, 'utf-8');
      template = await vite.transformIndexHtml(url, template);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });

  log('✅ Vite dev server configured');
}

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, '../dist/client');

  app.use(express.static(distPath));

  app.use('*', (_req, res) => {
    res.sendFile(path.resolve(distPath, 'index.html'));
  });

  log('✅ Serving static files from dist/client');
}
