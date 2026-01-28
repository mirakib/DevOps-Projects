# GitOps Pipeline Setup for Terraform AWS Infrastructure & Deployment

## Overview
This guide helps you set up a GitOps pipeline to deploy AWS infrastructure using Terraform. The pipeline
automates deployments when code is pushed to the main branch.

## Prerequisites
- A GitHub repository containing Terraform configuration files.
- AWS account with appropriate IAM permissions.
- GitHub Secrets configured:
  - `AWS_ACCESS_KEY_ID`
  - `AWS_SECRET_ACCESS_KEY`
- GitHub Actions 
- Terraform 
- Docker 


## Provisioning the AWS VM

**Step 1: Initialize Terraform**
Run the following command to initialize the Terraform working directory:
```sh
terraform init 
```

**Step 2: Plan the Deployment**
Review the changes Terraform will apply:
```sh
terraform plan 
```

**Step 3: Apply the Configuration**
Apply the configuration to provision the VM:
```sh
terraform apply -auto-approve -var-file="Node.js-envronment.tfvars"
```

**Step 5: Clean Up Resources**
We create pipeline as well to destroy the Infrastructure, run the below command :
```sh
terraform destroy -auto-approve -var-file="Node.js-envronment.tfvars"
```
