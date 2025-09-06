import { Hono } from 'hono';
import { cors } from 'hono/cors';
import fs from 'fs';
import { PrismaClient } from './generated/prisma';

const app = new Hono();

const prisma = new PrismaClient();

let nextId = 1;

app.use(
  '*',
  cors({
    origin: o => o,
  })
);

app.get('/api/todos', async c => {
  const todos = await prisma.todo.findMany();
  return c.json(todos);
});

app.post('/api/todos', async c => {
  const body = await c.req.json().catch(() => null);
  if (!body || typeof body.text !== 'string' || body.text.trim() === '') {
    return c.json({ error: 'Invalid todo' }, 400);
  }

  const todo = await prisma.todo.create({
    data: {
      text: body.text.trim(),
    },
  });

  return c.json(todo, 201);
});

app.get('/api/image', async c => {
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

const port = Number(process.env.PORT || 4000);

console.log(`Todo backend listening on port ${port}`);

export default {
  port,
  fetch: app.fetch,
};
