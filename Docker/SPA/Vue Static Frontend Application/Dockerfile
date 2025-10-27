# ==========================
# 1️⃣ BUILD STAGE
# ==========================
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy dependency files first (leverage Docker cache)
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

# Build for production
RUN npm run build

# ==========================
# 2️⃣ PRODUCTION STAGE
# ==========================
FROM nginx:1.27-alpine AS production

# Remove default Nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy built files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

