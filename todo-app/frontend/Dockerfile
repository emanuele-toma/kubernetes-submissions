FROM oven/bun:latest

WORKDIR /app

COPY package.json bun.lock ./

RUN bun install

COPY . .

RUN bun run build

ENV PORT=3000

CMD ["sh", "-c", "bun run preview --port $PORT --host"]