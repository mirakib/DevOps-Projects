# VPC Peering Setup with Terraform

This Terraform configuration sets up a VPC peering connection between two existing VPCs in AWS. It includes the necessary resources to create the peering connection and update the route tables to allow communication between the two VPCs.

<img width="4209" height="1629" alt="vpc-peering drawio" src="https://github.com/user-attachments/assets/5a7246ae-3288-4a43-b080-3bac8c716dba" />

## Prerequisites
- **Terraform** installed on your local machine.
- **AWS CLI** configured with appropriate credentials.

### AWS credentials configuration
Configure them using the AWS CLI:

```bash
aws configure --profile terraform-lab
``` 

Test credentials:

```bash
aws sts get-caller-identity --profile terraform-lab
```

## Provision resources

1. Initialize Terraform:

    ```bash
    terraform init
    ```
2. Review the execution plan:

    ```bash
    terraform plan
    ```

3. Apply the configuration to create the resources:

    ```bash
    terraform apply
    ```
4. To destroy the resources created by this configuration, run:

    ```bash
    terraform destroy
    ```

