# Stage 1: Build Angular App
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Build the app for production (modern Angular syntax)
RUN npm run build -- --configuration production

# Normalize output: different Angular setups (SSR/server or browser builds)
# may place static files in different subfolders. Detect common locations
# and copy the static browser files into a predictable folder `/app/dist/browser`.
RUN mkdir -p /app/dist/browser \
 && if [ -f "dist/angular-docker-app/index.html" ]; then \
			cp -r dist/angular-docker-app/* /app/dist/browser/; \
		elif [ -f "dist/angular-docker-app/browser/index.html" ]; then \
			cp -r dist/angular-docker-app/browser/* /app/dist/browser/; \
		elif [ -f "dist/index.html" ]; then \
			cp -r dist/* /app/dist/browser/; \
		elif [ -f "dist/browser/index.html" ]; then \
			cp -r dist/browser/* /app/dist/browser/; \
		else \
			echo "Warning: no index.html found in expected dist locations"; \
		fi

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Remove default nginx index to avoid the default welcome page if present
RUN rm -f /usr/share/nginx/html/index.html

# Copy built Angular app from builder. Use the normalized `/app/dist/browser` folder.
COPY --from=builder /app/dist/browser /usr/share/nginx/html

# Copy custom nginx configuration to serve SPA routes
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

