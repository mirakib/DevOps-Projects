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


# Start up the Redis Database

### Creating the Redis Deployment

1. Apply the Redis Deployment from the redis-leader-deployment.yaml file:
   
    ```bash
    kubectl apply -f redis-leader-deployment.yaml
    ```

2. Query the list of Pods to verify that the Redis Pod is running:

    ```bash
    kubectl get pods
    ```

3. Run the following command to view the logs from the Redis leader Pod:

    ```bash
    kubectl logs -f deployment/redis-leader
    ```

### Creating the Redis leader Service 

1. Apply the Redis Service from the following redis-leader-service.yaml file:

    ```bash
    kubectl apply -f redis-leader-service.yaml
    ```

2. Query the list of Services to verify that the Redis Service is running:
    ```bash
    kubectl get service
    ```

### Set up Redis followers

1. Apply the Redis Deployment from the following redis-follower-deployment.yaml file:

    ```bash
    kubectl apply -f redis-follower-deployment.yaml
    ```

2. Verify that the two Redis follower replicas are running by querying the list of Pods:

    ```bash
    kubectl get pods
    ```

### Creating the Redis follower service

1. Apply the Redis Service from the following redis-follower-service.yaml file:

    ```bash
    kubectl apply -f redis-follower-service.yaml
    ```

2. Query the list of Services to verify that the Redis Service is running:

    ```bash
    kubectl get service
    ```

# Set up and Expose the Guestbook Frontend

### Creating the Guestbook Frontend Deployment

1. Apply the frontend Deployment from the frontend-deployment.yaml file:

    ```bash
    kubectl apply -f frontend-deployment.yaml
    ```

2. Query the list of Pods to verify that the three frontend replicas are running:

    ```bash
    kubectl get pods -l app=guestbook -l tier=frontend
    ```

### Creating the Frontend Service 

1. Apply the frontend Service from the frontend-service.yaml file:

    ```bash
    kubectl apply -f frontend-service.yaml
    ```

2. Query the list of Services to verify that the frontend Service is running:

    ```bash
    kubectl get services
    ```

### Viewing the Frontend Service via `kubectl port-forward`

1. Run the following command to forward port 8080 on your local machine to port 80 on the service.

    ```bash
    kubectl port-forward svc/frontend 8080:80
    ``` 

2. Load the page http://localhost:8080 in your browser to view your guestbook.

### Viewing the Frontend Service via `LoadBalancer`

1. Run the following command to get the IP address for the frontend Service.

    ```bash
    kubectl get service frontend
    ```

2. Copy the external IP address, and load the page in your browser to view your guestbook.


# Scale the Web Frontend

1. Run the following command to scale up the number of frontend Pods:

    ```bash
    kubectl scale deployment frontend --replicas=5
    ```

2. Query the list of Pods to verify the number of frontend Pods running:

    ```bash
    kubectl get pods
    ```

3. Run the following command to scale down the number of frontend Pods:

    ```bash
    kubectl scale deployment frontend --replicas=2
    ```

4. Query the list of Pods to verify the number of frontend Pods running:

    ```bash
    kubectl get pods
    ```

# Cleaning up

1. Run the following commands to delete all Pods, Deployments, and Services.

    ```bash
    kubectl delete deployment -l app=redis
    kubectl delete service -l app=redis
    kubectl delete deployment frontend
    kubectl delete service frontend
    ```

2. Query the list of Pods to verify that no Pods are running:

    ```bash
    kubectl get pods
    ```