ARG NODE_VERSION=26.8.2

FROM node:${NODE_VERSION}-alpine3.24 AS dependencies

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev


FROM node:${NODE_VERSION}-alpine3.24 AS production

WORKDIR /app

ENV NODE_ENV=production

COPY --from=dependencies /app/node_modules ./node_modules
COPY package*.json ./
COPY server.js ./

USER node

EXPOSE 5000

CMD ["node", "server.js"]