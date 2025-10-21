# syntax=docker/dockerfile:1.6

FROM --platform=$BUILDPLATFORM node:22.6.0-bookworm-slim AS builder

WORKDIR /project

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 4200
CMD ["npm", "run", "start", "--", "--host", "0.0.0.0"]
