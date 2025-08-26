import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';
import fs from 'fs';

const app = new Hono();
const port = import.meta.env.PORT ?? 3000;

app.use('*', serveStatic({ root: './static' }));

app.get('/image', async (c) => {
  const imagePath = '/data/image.png';

  if (!fs.existsSync(imagePath)) {
    const response = await fetch('https://picsum.photos/1200');
    const arrayBuffer = await response.arrayBuffer();
    fs.writeFileSync(imagePath, Buffer.from(arrayBuffer));
  }

  const stats = fs.statSync(imagePath);
  const now = new Date();
  const modifiedTime = new Date(stats.mtime);
  const diffMinutes = Math.floor((now.getTime() - modifiedTime.getTime()) / 60000);

  if (diffMinutes > 10) {
    const response = await fetch('https://picsum.photos/1200');
    const arrayBuffer = await response.arrayBuffer();
    fs.writeFileSync(imagePath, Buffer.from(arrayBuffer));
  }

  const image = fs.readFileSync(imagePath);
  return c.body(image, 200, { 'Content-Type': 'image/png' });
});

export default {
  port: port,
  fetch: app.fetch,
  idleTimeout: 60,
};
