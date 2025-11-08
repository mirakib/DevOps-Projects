# Stage 1: build the Angular app
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm ci

COPY . .

RUN npm run build

# Stage 2: nginx to serve the built app
FROM nginx:stable-alpine AS nginx

RUN rm -rf /usr/share/nginx/html/*

# Copy custom nginx config
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy built files from builder (dist folder)
COPY --from=builder /app/dist/frontend/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]