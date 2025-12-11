This guide provides an introduction to building CI pipelines using Docker and GitHub Actions. You will learn how to use Docker's official GitHub Actions to build your application as a Docker image and push it to Docker Hub. By the end of the guide, you'll have a simple, functional GitHub Actions configuration for Docker builds. Use it as-is, or extend it further to fit your needs.

## Prerequisites
 - A Docker account.
 - Familiarity with Dockerfiles.


## Configure your GitHub repository

- Open your repository's Settings.
- Under `Security`, go to `Secrets and variables > Actions`.
- Under `Secrets`, create a new repository secret named `DOCKER_PASSWORD`, containing your Docker access token.
- Next, under `Variables`, create a `DOCKER_USERNAME` repository variable containing your Docker Hub username.

Docker Docs to be followed: [Docker Build GitHub Actions](https://docs.docker.com/build/ci/github-actions/)