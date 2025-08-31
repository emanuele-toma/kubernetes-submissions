import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';
import fs from 'fs';

const app = new Hono();
const port = import.meta.env.PORT ?? 3000;

app.use('*', serveStatic({ root: './static' }));

export default {
  port: port,
  fetch: app.fetch,
  idleTimeout: 60,
};
