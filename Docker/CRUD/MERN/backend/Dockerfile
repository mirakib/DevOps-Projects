### STAGE 1: deps (builder)
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --only=production

### STAGE 2: production
FROM node:20-alpine AS production
WORKDIR /app

# copy production node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules

# copy source
COPY . .

ENV NODE_ENV=production
EXPOSE 5000

# Use a non-root user in production for security (optional)
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

CMD ["node", "src/app.js"]
