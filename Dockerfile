FROM oven/bun:latest

WORKDIR /app

COPY package.json .
COPY bun.lockb .

RUN bun install --frozen-lockfile
COPY bun.lockb .
COPY . .

EXPOSE 3000

CMD ["bun", "run", "src/server.ts"]
CMD ["bun", "run", "build"]
