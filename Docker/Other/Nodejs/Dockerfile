# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

RUN npm run build


# Stage 2: Production Image
FROM node:20-alpine

# Create non-root least-privilege user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

COPY --from=builder /app .

# Set directory ownership to non-root user
RUN chown -R appuser:appgroup /app

# Drop to non-root user
USER appuser

EXPOSE 3000

ENTRYPOINT ["node"]

CMD ["server.js"]