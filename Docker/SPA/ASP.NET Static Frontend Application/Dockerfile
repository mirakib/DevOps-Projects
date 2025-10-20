# Stage 1: Build Stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY ["DotNetApp.csproj", "."]

RUN dotnet restore

COPY . .

RUN dotnet publish -c Release -o /app/publish --no-restore

# Stage 2: Final / Runtime Stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

COPY --from=build /app/publish .

EXPOSE 8080

ENTRYPOINT ["dotnet", "DotNetApp.dll"]