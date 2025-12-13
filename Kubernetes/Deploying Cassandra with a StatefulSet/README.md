# Deploying Cassandra with a StatefulSet

This project deploys a Cassandra database using a StatefulSet in a Kubernetes cluster. The deployment includes PersistentVolumes and PersistentVolumeClaims to ensure data persistence.

## Objectives
- Create and validate a Cassandra headless **Service**.
- Use a **StatefulSet** to create a Cassandra ring.
- Validate the StatefulSet.
- Modify the StatefulSet.
- Delete the StatefulSet and its **Pods**.

## Creating a headless Service for Cassandra

```bash
kubectl apply -f cassandra-service.yaml
```

### Validating (optional)

```bash
kubectl get svc cassandra
```

## Using a StatefulSet to create a Cassandra ring

Apply that manifest, from the folder you saved the modified version into:

```bash
kubectl apply -f cassandra-statefulset.yaml
```

## Validating the Cassandra StatefulSet 

1. Get the Cassandra StatefulSet:

    ```
    kubectl get statefulset cassandra
    ```

2. Get the Pods to see the ordered creation status:

    ```
    kubectl get pods -l="app=cassandra"
    ```

3. Run the Cassandra nodetool inside the first Pod, to display the status of the ring.

    ```
    kubectl exec -it cassandra-0 -- nodetool status
    ```

## Cleaning up

Deleting or scaling a StatefulSet down does not delete the volumes associated with the StatefulSet. This setting is for your safety because your data is more valuable than automatically purging all related StatefulSet resources.

1. Run the following commands (chained together into a single command) to delete everything in the Cassandra StatefulSet:

    ```bash
    grace=$(kubectl get pod cassandra-0 -o=jsonpath='{.spec.terminationGracePeriodSeconds}') \
      && kubectl delete statefulset -l app=cassandra \
      && echo "Sleeping ${grace} seconds" 1>&2 \
      && sleep $grace \
      && kubectl delete persistentvolumeclaim -l app=cassandra
      ```

2. Run the following command to delete the Service you set up for Cassandra:
   
    ```bash
    kubectl delete service -l app=cassandra
    ```