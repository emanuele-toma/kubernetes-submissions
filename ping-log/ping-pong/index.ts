import { Hono } from 'hono';
import { PrismaClient } from './generated/prisma';

const app = new Hono();

// shared handler used by both / and /pingpong
const pingpongHandler = async (c: any) => {
  const db = new PrismaClient();

  // check if there is a record in the database
  let counter = await db.counter.findFirst({ where: { id: 1 } });

  if (counter) {
    counter.count++;
    counter = await db.counter.update({ where: { id: 1 }, data: { count: counter.count } });
  } else {
    counter = await db.counter.create({ data: { id: 1, count: 1 } });
  }

  return c.text(`Pong ${counter.count}`);
};

app.get('/', pingpongHandler);

app.get('/pings', async c => {
  const db = new PrismaClient();
  const counter = await db.counter.findFirst({ where: { id: 1 } });
  return c.text(counter ? counter.count.toString() : '0');
});

export default {
  port: import.meta.env.PORT || 3000,
  fetch: app.fetch,
};
