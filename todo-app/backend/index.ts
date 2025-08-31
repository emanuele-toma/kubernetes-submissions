import { Hono } from 'hono';
import { cors } from 'hono/cors';
import fs from 'fs';

const app = new Hono();

type Todo = {
  id: number;
  text: string;
  createdAt: string;
};

let todos: Todo[] = [
  { id: 1, text: 'Learn JavaScript', createdAt: new Date().toISOString() },
  { id: 2, text: 'Learn React', createdAt: new Date().toISOString() },
  { id: 3, text: 'Build a project', createdAt: new Date().toISOString() },
];

let nextId = 4;

app.use(
  '*',
  cors({
    origin: o => o,
  })
);

app.get('/api/todos', c => {
  return c.json(todos);
});

app.post('/api/todos', async c => {
  const body = await c.req.json().catch(() => null);
  if (!body || typeof body.text !== 'string' || body.text.trim() === '') {
    return c.json({ error: 'Invalid todo' }, 400);
  }

  const todo: Todo = {
    id: nextId++,
    text: body.text.trim(),
    createdAt: new Date().toISOString(),
  };

  todos.push(todo);
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
