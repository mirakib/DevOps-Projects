# Migrate from Alpine or Debian

If you're currently using a Debian-based Docker Official Image, migrate to the Debian-based DHI variant. If you're using an Alpine-based image, migrate to the Alpine-based DHI variant. This minimizes changes to package management and dependencies during migration.

## Migration steps

**Step 1: Update the base image in your Dockerfile**

Update the base image in your application's Dockerfile to a hardened image. This is typically going to be an image tagged as dev or sdk because it has the tools needed to install packages and dependencies.

```Dockerfile
- ## Original base image
- FROM golang:1.25

+ ## Updated to use hardened base image
+ FROM dhi.io/golang:1.25-debian12-dev
```

**Step 2: Update the runtime image in your Dockerfile**

To ensure that your final image is as minimal as possible, you should use a multi-stage build. All stages in your Dockerfile should use a hardened image. While intermediary stages will typically use images tagged as dev or sdk, your final runtime stage should use a runtime image.

Utilize the build stage to compile your application and copy the resulting artifacts to the final runtime stage. This ensures that your final image is minimal and secure.

The following example shows a multi-stage Dockerfile with a build stage and runtime stage:

```Dockerfile
# Build stage
FROM dhi.io/golang:1.25-debian12-dev AS builder
WORKDIR /app
COPY . .
RUN go build -o myapp

# Runtime stage
FROM dhi.io/golang:1.25-debian12
WORKDIR /app
COPY --from=builder /app/myapp .
ENTRYPOINT ["/app/myapp"]
```
