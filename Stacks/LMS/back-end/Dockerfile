FROM node:20-bookworm-slim AS dependencies
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

FROM node:20-bookworm-slim AS runtime
ENV NODE_ENV=production
WORKDIR /app
RUN groupadd --system --gid 10001 appgroup \
    && useradd --system --uid 10001 --gid appgroup --create-home appuser
COPY --from=dependencies /app/node_modules ./node_modules
COPY --chown=appuser:appgroup package*.json ./
COPY --chown=appuser:appgroup config ./config
COPY --chown=appuser:appgroup controllers ./controllers
COPY --chown=appuser:appgroup middlewares ./middlewares
COPY --chown=appuser:appgroup models ./models
COPY --chown=appuser:appgroup routes ./routes
COPY --chown=appuser:appgroup utils ./utils
COPY --chown=appuser:appgroup public ./public
COPY --chown=appuser:appgroup server.js ./server.js
USER 10001:10001
EXPOSE 5000
HEALTHCHECK --interval=10s --timeout=5s --start-period=20s --retries=5 \
  CMD node -e "fetch('http://127.0.0.1:5000/health').then((response) => process.exit(response.ok ? 0 : 1)).catch(() => process.exit(1))"
CMD ["node", "server.js"]
