# STAGE 1: Build JAR
FROM eclipse-temurin:21-jdk-alpine AS builder

WORKDIR /app

RUN apk add --no-cache maven

COPY pom.xml .

COPY src ./src

RUN mvn clean package -DskipTests

# STAGE 2: Run (Distroless)
FROM gcr.io/distroless/java21-debian12 AS runtime

# Create non-root user
USER 1001:1001

WORKDIR /app

COPY --from=builder /app/target/*.jar app.jar

VOLUME ["/tmp"]

# JVM Performance & Security Settings
ENV JAVA_OPTS="-XX:+UseContainerSupport \
               -XX:MaxRAMPercentage=75.0 \
               -Djava.security.egd=file:/dev/urandom \
               -Dserver.port=8080"

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/app.jar"]
