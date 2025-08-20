import { Hono } from 'hono';

let counter = 0;

const app = new Hono();

app.get('/pingpong', c => c.text(`Pong ${counter++}`));

export default {
  port: import.meta.env.PORT || 3000,
  fetch: app.fetch,
};
