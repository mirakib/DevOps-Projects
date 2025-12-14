# Deploying WordPress and MySQL with Persistent Volumes

This project deploys, WordPress site and a MySQL database using Minikube. Both applications use PersistentVolumes and PersistentVolumeClaims to store data.

## Objectives

- Create `PersistentVolumeClaims` and `PersistentVolumes`
- Create a `kustomization.yaml` with
    - a Secret generator
    - MySQL resource configs
    - WordPress resource configs
- Apply the kustomization directory by `kubectl apply -k ./`
- Clean up

## Applying the kustomization

```bash
kubectl apply -k ./
```

## Verifying the deployment
Now you can verify that all objects exist.

1. Verify that the Secret exists by running the following command:
   
    ```bash
    kubectl get secrets
    ```

2. Verify that a PersistentVolume got dynamically provisioned.
   
    ```bash
    kubectl get pvc
    ```

3. erify that the Pod is running by running the following command:

    ```bash
    kubectl get pods
    ```

4. Verify that the Service is running by running the following command:

    ```bash
    kubectl get services wordpress
    ```

5. Run the following command to get the IP Address for the WordPress Service:
   
    ```
    minikube service wordpress --url
    ```

    The response should be like this:

    `http://1.2.3.4:32406`

6. Open the URL in your web browser to access the WordPress site.

<img width="1076" height="333" alt="image" src="https://github.com/user-attachments/assets/45ee6a57-0025-41b7-8dae-b9b2793885dc" />

## Cleaning up

Run the following command to delete your Secret, Deployments, Services and PersistentVolumeClaims:

```bash
kubectl delete -k ./
```
