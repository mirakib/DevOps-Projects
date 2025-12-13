# Deploying PHP Guestbook application with Redis

This project shows you how to build and deploy a simple (not production ready), multi-tier web application using Kubernetes and Docker. This example consists of the following components:

- A single-instance Redis to store guestbook entries
- Multiple web frontend instances


## Objectives

- Start up a Redis leader.
- Start up two Redis followers.
- Start up the guestbook frontend.
- Expose and view the Frontend Service.
- Clean up