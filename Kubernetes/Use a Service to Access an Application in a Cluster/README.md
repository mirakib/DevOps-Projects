## Use a Service to Access an Application in a Cluster

This demo shows how to create a Kubernetes Service object that external clients can use to access an application running in a cluster. The Service provides load balancing for an application that has two running instances.

## Objectives

- Run two instances of a Hello World application.
- Create a Service object that exposes a node port.
- Use the Service object to access the running application.

## Creating a service for an application running in two pods

1. Run a Hello World application in your cluster: Create the application Deployment using the file above:

```sh
kubectl apply -f https://k8s.io/examples/service/access/hello-application.yaml
```

2. Display information about the Deployment:

```sh
kubectl get deployments hello-world
kubectl describe deployments hello-world
```
3. Display information about your ReplicaSet objects:

```sh
kubectl get replicasets
kubectl describe replicasets
```

4. Create a Service object that exposes the deployment:

```sh
kubectl expose deployment hello-world --type=NodePort --name=example-service
```
5. Display information about the Service:

```sh
kubectl describe services example-service
```

6. List the pods that are running the Hello World application:

```sh
kubectl get pods --selector="run=load-balancer-example" --output=wide
```

7. Get the public IP address of one of your nodes that is running a Hello World pod. How you get this address depends on how you set up your cluster. For example, if you are using Minikube, you can see the node address by running kubectl cluster-info. If you are using Google Compute Engine instances, you can use the gcloud compute instances list command to see the public addresses of your nodes.

8. On your chosen node, create a firewall rule that allows TCP traffic on your node port. For example, if your Service has a NodePort value of 31568, create a firewall rule that allows TCP traffic on port 31568. Different cloud providers offer different ways of configuring firewall rules.

9. Use the node address and node port to access the Hello World application:

```sh
curl http://<public-node-ip>:<node-port>
```

## Cleaning up

To delete the Service, enter this command:

```sh
kubectl delete services example-service
```

To delete the Deployment, the ReplicaSet, and the Pods that are running the Hello World application, enter this command:

```sh
kubectl delete deployment hello-world
```

