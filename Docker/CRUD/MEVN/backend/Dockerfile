# Stage 1: Install dependencies
FROM node:20-alpine AS deps

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

# Stage 2: Production
FROM node:20-alpine AS production

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .

EXPOSE 5000

# Use a non-root user in production for security (optional)
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

USER appuser

CMD ["node", "src/server.js"]
