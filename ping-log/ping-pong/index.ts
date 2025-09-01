import { Hono } from 'hono';

let counter = 0;

const app = new Hono();

app.get('/pingpong', c => {
  counter++;
  return c.text(`Pong ${counter}`);
});

app.get('/pings', c => {
  return c.text(counter.toString());
});

export default {
  port: import.meta.env.PORT || 3000,
  fetch: app.fetch,
};
