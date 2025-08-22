import { Hono } from 'hono';
import fs from 'fs';

let counter = 0;

const app = new Hono();

app.get('/pingpong', c => {
  counter++;
  fs.writeFileSync('/data/pingpong.txt', counter.toString());
  return c.text(`Pong ${counter}`);
});

export default {
  port: import.meta.env.PORT || 3000,
  fetch: app.fetch,
};
