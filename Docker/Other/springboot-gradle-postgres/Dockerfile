FROM gradle:8.10-jdk21-alpine AS builder

WORKDIR /app

COPY build.gradle settings.gradle ./

COPY src ./src

RUN gradle bootJar --no-daemon -x test


FROM eclipse-temurin:21-jre-alpine

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY --from=builder /app/build/libs/inventory.jar /app/inventory.jar

RUN chown appuser:appgroup /app/inventory.jar

USER appuser

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/inventory.jar"]
