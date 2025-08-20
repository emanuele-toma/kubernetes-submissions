import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';

const app = new Hono();
const port = import.meta.env.PORT ?? 3000;

app.use('*', serveStatic({ root: './static' }));

export default {
  port: port,
  fetch: app.fetch,
};
