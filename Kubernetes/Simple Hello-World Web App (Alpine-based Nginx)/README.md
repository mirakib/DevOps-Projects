To access from host browser (As minikube running inside vm):

**Port-forward Kubernetes service binding to all interfaces**

```kubectl port-forward --address 0.0.0.0 svc/hello-service 8080:80```
