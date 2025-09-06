import { PrismaClient } from './generated/prisma';

const prisma = new PrismaClient();

async function main() {
  const randomArticle = await fetch('https://en.wikipedia.org/wiki/Special:Random').then(res => res.url);
  await prisma.todo.create({
    data: {
      text: `Read ${randomArticle}`,
    },
  });
}

main();
