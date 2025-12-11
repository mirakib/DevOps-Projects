FROM node:lts-alpine AS builder

WORKDIR /src

RUN --mount=src=package.json,target=package.json \
    --mount=src=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci

COPY . .

RUN --mount=type=cache,target=/root/.npm \
    npm run build


FROM node:lts-alpine AS release

WORKDIR /app

COPY --from=builder /src/build .

EXPOSE 3000

CMD ["node", "."]