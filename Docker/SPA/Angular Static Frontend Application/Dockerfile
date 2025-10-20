# Stage 1: The Build Stage (Uses Node.js)

FROM node:lts-alpine AS build

WORKDIR /usr/src/app

COPY package.json .
RUN npm install

COPY . .

RUN npm run build

# Stage 2: The Final / Runtime Stage (Uses Nginx)
FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=build /usr/src/app/dist .

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80