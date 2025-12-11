This guide walks you through building and pushing Docker images using Azure Pipelines, enabling a streamlined and secure CI workflow for containerized applications. You’ll learn how to:

- Configure Docker authentication securely.
- Set up an automated pipeline to build and push images.

## Prerequisites

Before you begin, ensure you have the following requirements:

- A **Docker Hub** account with a generated access token.
- An active **Azure DevOps** project with a connected **Git repository**.
- A project that includes a valid **Dockerfile** at its root or appropriate build context.


## Summary

With this Azure Pipelines CI setup, you get:

- Secure Docker authentication using a built-in service connection.
- Automated image building and tagging triggered by code changes.
- Efficient builds leveraging Docker BuildKit cache.
- Safe cleanup with logout on persistent agents.
- Build images that meet modern software supply chain requirements with SBOM and attestation