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

