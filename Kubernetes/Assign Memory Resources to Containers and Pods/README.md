# Assign Memory Resources to Containers and Pods

This project shows how to assign a memory request and a memory limit to a Container. A Container is guaranteed to have as much memory as it requests, but is not allowed to use more memory than its limit.

To check the version, enter `kubectl version`.

>[!Note]
> **Each node in your cluster must have at least 300 MiB of memory.**


If you are running Minikube, run the following command to enable the metrics-server:

```sh
minikube addons enable metrics-server
```

To see whether the metrics-server is running, or another provider of the resource metrics API (metrics.k8s.io), run the following command:

```sh
kubectl get apiservices
```

If the resource metrics API is available, the output includes a reference to `metrics.k8s.io`.


### Create a namespace

Create a namespace so that the resources you create in this exercise are isolated from the rest of your cluster.

```sh
kubectl create namespace mem-example
```

## Specify a memory request and a memory limit

To specify a memory request for a Container, include the resources:requests field in the Container's resource manifest. To specify a memory limit, include resources:limits.

In this exercise, you create a Pod that has one Container. The Container has a memory request of 100 MiB and a memory limit of 200 MiB. Here's the configuration file for the Pod:

**Create the Pod:**

```sh
kubectl apply -f https://k8s.io/examples/pods/resource/memory-request-limi
```

**Verify that the Pod Container is running:**

```sh
kubectl get pod memory-demo --output=yaml --namespace=mem-example
```

>[!Note]
> **The output shows that the one Container in the Pod has a memory request of 100 MiB and a memory limit of 200 MiB.**


**Run kubectl top to fetch the metrics for the pod:**

```sh
kubectl top pod memory-demo --namespace=mem-example
```

**Delete your Pod:**

```sh
kubectl delete pod memory-demo --namespace=mem-example
```


## Exceed a Container's memory limit 

A Container can exceed its memory request if the Node has memory available. But a Container is not allowed to use more than its memory limit. If a Container allocates more memory than its limit, the Container becomes a candidate for termination. 

In this exercise, you create a Pod that attempts to allocate more memory than its limit. 


**Create the Pod:**

```sh
kubectl apply -f https://k8s.io/examples/pods/resource/memory-request-limit-2.yaml --namespace=mem-example
```

**View detailed information about the Pod:**

```sh
kubectl get pod memory-demo-2 --namespace=mem-example
```
**
Get a more detailed view of the Container status:**

```sh
kubectl get pod memory-demo-2 --output=yaml --namespace=mem-example
```

The Container in this exercise can be restarted, so the kubelet restarts it. Repeat this command several times to see that the Container is repeatedly killed and restarted:

```sh
kubectl get pod memory-demo-2 --namespace=mem-example
```

**Delete your Pod:**

```sh
kubectl delete pod memory-demo-2 --namespace=mem-example
```

## Specify a memory request that is too big for your Nodes 

Memory requests and limits are associated with Containers, but it is useful to think of a Pod as having a memory request and limit. The memory request for the Pod is the sum of the memory requests for all the Containers in the Pod. Likewise, the memory limit for the Pod is the sum of the limits of all the Containers in the Pod.

In this exercise, you create a Pod that has a memory request so big that it exceeds the capacity of any Node in your cluster. 

**Create the Pod:**

```sh
kubectl apply -f https://k8s.io/examples/pods/resource/memory-request-limit-3.yaml --namespace=mem-example
```

**View the Pod status:**

```sh
kubectl get pod memory-demo-3 --namespace=mem-example
```

**Delete your Pod:**

```sh
kubectl delete pod memory-demo-3 --namespace=mem-example
```

## Clean up

Delete your namespace. This deletes all the Pods that you created for this task:

```sh
kubectl delete namespace mem-example
```
