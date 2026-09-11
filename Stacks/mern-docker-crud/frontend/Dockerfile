ARG NODE_VERSION=26.8.2

FROM node:${NODE_VERSION}-alpine3.24 AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

ARG VITE_API_URL

ENV VITE_API_URL=${VITE_API_URL}

RUN npm run build


FROM node:${NODE_VERSION}-alpine3.24 AS production

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=build /app/dist ./dist
COPY server.js ./

USER node

EXPOSE 3000

CMD ["node", "server.js"]