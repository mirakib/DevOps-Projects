# Project: Optimized ASP.NET Core Containerization 🐳

[![Tech Stack](https://skillicons.dev/icons?i=net,html,css,docker)](https://skillicons.dev)

This project demonstrates the best practice for containerizing modern .NET applications using a multi-stage Docker build. Unlike simpler applications, .NET requires the large Software Development Kit (SDK) for compilation and publishing, but only the lightweight ASP.NET Runtime to execute the final application. The multi-stage approach ensures that the final production image is stripped of all development dependencies, resulting in a minimal, secure, and highly efficient container.

---

## 🎯 Goal

1. Understand and implement a multi-stage Docker build pattern for a compiled language (.NET).
2. Differentiate between the large .NET SDK image (Build Stage) and the minimal ASP.NET Runtime image (Final Stage).
3. Build a final container image that is significantly smaller than a single-stage build.

---

## 🛠️ Tech Stack

- **Application**: ASP.NET Core 8.0
- **Language**: C#
- **Containerization**: Docker (Multi-Stage Build)
- **Base Images**: Microsoft Container Registry
  - `mcr.microsoft.com/dotnet/sdk:8.0` (Build stage)
  - `mcr.microsoft.com/dotnet/aspnet:8.0` (Runtime stage)

---

## 📝 Implementation Steps

The process is divided into two phases: **Building (Stage 1)** and **Running (Stage 2)**.

### Phase 1: Build the Optimized Docker Image

Run these steps from the root of your project directory (`dotnet-web-app/`):

1. **Check Files**: Ensure the `Dockerfile`, `Program.cs`, and `DotNetApp.csproj` files are in place.

2. **Execute Build**: Run the docker build command. This command executes both Stage 1 and Stage 2 sequentially.

   ```bash
   docker build -t dotnet-web-app:v1 .
   ```

**Output Analysis**: The build log will show the SDK image being downloaded first (Stage 1), followed by the ASP.NET Runtime image (Stage 2), demonstrating the size savings achieved by the separation.

---

### Phase 2: Run the Container

The final stage exposes port 8080 internally, so we map it to the host machine.


```bash
docker run -d -p 8080:8080 --name dotnet-app-live dotnet-web-app:v1
```

---

## 📈 Verification

1. **Check Status**: Verify the container is running and healthy.

   ```bash
   docker ps
   ```
   
   (Look for `dotnet-app-live` with status `Up`)

2. **Access Application**: Open your web browser and navigate to:

   [http://localhost:8080](http://localhost:8080)

---

## 🧹 Cleanup

1. **Stop the Container**:

   ```bash
   docker stop dotnet-app-live
   ```

2. **Remove the Container**:

   ```bash
   docker rm dotnet-app-live
   ```

3. **Remove the Image** (Optional):

   ```bash
   docker rmi dotnet-web-app:v1
   ```

---