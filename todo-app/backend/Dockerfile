FROM oven/bun:latest

WORKDIR /app

COPY package.json bun.lock ./

RUN bun install

COPY . .

ENTRYPOINT [ "/app/entrypoint.sh" ]

RUN chmod +x /app/entrypoint.sh

CMD ["bun", "index.ts"]
