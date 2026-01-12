# Run a Stateless Application Using a Deployment

## Objectives

- Create an nginx deployment.
- Use kubectl to list information about the deployment.
- Update the deployment.

## Creating and exploring an nginx deployment

You can run an application by creating a Kubernetes Deployment object, and you can describe a Deployment in a YAML file.

1. **Create a Deployment based on the YAML file:**

```sh
kubectl apply -f https://k8s.io/examples/application/deployment.yaml
```

2. **Display information about the Deployment:**

```sh
kubectl describe deployment nginx-deployment
```

3. **List the Pods created by the deployment:**

```sh
kubectl get pods -l app=nginx
```

4. **Display information about a Pod:**

```sh
kubectl describe pod <pod-name>
```


## Updating the deployment

You can update the deployment by applying a new YAML file.

1. **Apply the new YAML file:**

```sh
kubectl apply -f https://k8s.io/examples/application/deployment-update.yaml
```

2. **Watch the deployment create pods with new names and delete the old pods:**

```sh
kubectl get pods -l app=nginx
```

## Scaling the application by increasing the replica count 

You can increase the number of Pods in your Deployment by applying a new YAML file.

1. **Apply the new YAML file:**

```sh
kubectl apply -f https://k8s.io/examples/application/deployment-scale.yaml
```

2. **Verify that the Deployment has four Pods:**

```sh
kubectl get pods -l app=nginx
```

## Deleting a deployment

**Delete the deployment by name:**

```sh
kubectl delete deployment nginx-deployment
```
