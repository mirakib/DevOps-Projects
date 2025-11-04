# Stage 1: build the Vite app
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package manifests and install deps (use local frontend context)
COPY package.json package-lock.json* ./
# If your Vite project uses pnpm or yarn adapt accordingly.
RUN npm install --omit=dev

# Copy rest of frontend source
COPY . .

# Build the production bundle
RUN npm run build

# Stage 2: nginx to serve the built assets
FROM nginx:stable-alpine AS nginx

# Remove default nginx html
RUN rm -rf /usr/share/nginx/html/*

# Copy custom nginx config

# Copy custom nginx config
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
