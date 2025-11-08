# Stage 1: deps
FROM node:20-alpine AS deps

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm ci --only=production

# Stage 2: prod image
FROM node:20-alpine AS production

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .

ENV NODE_ENV=production

EXPOSE 5000

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

USER appuser

CMD ["node", "src/server.js"]