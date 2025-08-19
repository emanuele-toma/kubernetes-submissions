import { Hono } from 'hono';

const app = new Hono();
const port = import.meta.env.PORT ?? 3000;

app.get('/', c => {
  return c.text('Hello, Hono!');
});

export default {
  port: port,
  fetch: app.fetch,
};