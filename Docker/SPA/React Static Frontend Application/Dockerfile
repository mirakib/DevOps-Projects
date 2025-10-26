# ---------- STAGE 1: build the React app ----------
FROM node:20-alpine AS builder

WORKDIR /app

# Install build dependencies
# Copy only package manifests first (cache npm install)
COPY package.json package-lock.json* ./

RUN npm ci --silent

# Copy rest of the source
COPY . .

# Build the app (production)
ENV NODE_ENV=production
RUN npm run build

# ---------- STAGE 2: serve with nginx ----------
FROM nginx:stable-alpine

# Remove default nginx static files (optional but ensures clean)
RUN rm -rf /usr/share/nginx/html/*

# Copy our nginx config (overrides default)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built static assets from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Use the default nginx start command
CMD ["nginx", "-g", "daemon off;"]

