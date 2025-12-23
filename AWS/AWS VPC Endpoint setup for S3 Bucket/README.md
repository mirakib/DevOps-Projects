# AWS VPC Endpoint Setup for S3

## Step 1: Create a VPC
1. Open the **AWS Management Console** and go to the **VPC Dashboard**.
2. Click **Create VPC**:
   - **Name tag**: `staging-vpc`
   - **IPv4 CIDR block**: `10.0.0.0/16`
   - Leave other options as default and click **Create VPC**.

---

## Step 2: Create Two Subnets

1. Go to **Subnets** in the VPC Dashboard and click **Create subnet**.
2. Select **staging-vpc** from the **VPC** dropdown menu.  
   (**Note:** Ensure you are selecting the correct VPC named `staging-vpc`.)
3. Create a **Public Subnet**:
   - **Name tag**: `public-subnet-1a`
   - **VPC**: Select `staging-vpc`
   - **Availability Zone**: Choose an appropriate AZ (e.g., `us-east-1a`)
   - **IPv4 CIDR block**: `10.0.1.0/24`
4. Create a **Private Subnet**:
   - **Name tag**: `private-subnet-1a`
   - **VPC**: Select `staging-vpc`
   - **Availability Zone**: Choose an appropriate AZ (e.g., `us-east-1a`)
   - **IPv4 CIDR block**: `10.0.2.0/24`

---

## Step 3: Create an Internet Gateway

1. **Create the Internet Gateway**:
   - Go to **Internet Gateways** and click **Create Internet Gateway**.
   - Set the **Name tag** to `staging-igw`.

2. **Attach the Internet Gateway to Your VPC**:
   - Select the newly created Internet Gateway.
   - Go to **Actions** and choose **Attach to VPC**.
   - From the dropdown, select `staging-vpc`.
   - Click **Attach Internet Gateway**.

---

## Step 4: Create Two Route Tables

1. **Create a Route Table for the Public Subnet**:
   - Go to **Route Tables** and click **Create Route Table**.
   - **Name tag**: `staging-vpc-public-rt`.
   - **VPC**: Select `staging-vpc`.

2. **Add a Route to Allow Internet Access**:
   - Edit the route table and click **Add Route**.
   - **Destination**: `0.0.0.0/0`.
   - **Target**: Select your Internet Gateway (`staging-igw`).

3. **Associate the Public Subnet**:
   - Click **Subnet Associations**.
   - Associate `public-subnet-1a`.

4. **Create a Route Table for the Private Subnet**:
   - Go to **Route Tables** and click **Create Route Table**.
   - **Name tag**: `staging-vpc-private-rt`.
   - **VPC**: Select `staging-vpc`.

5. **Associate the Private Subnet**:
   - Click **Subnet Associations**.
   - Associate `private-subnet-1a`.


---

## Step 5: Launch EC2 Instances

1. **Launch a Public Subnet EC2 Instance**:
   - **Name**: `staging-public-web-server-01`
   - **AMI**: Select Amazon Linux 2 AMI.
   - **Network**: Edit network settings, select `staging-vpc`.
   - **Subnet**: `public-subnet-1a`.
   - **Auto-assign Public IP**: Enable.
   - **Security Group**: Allow SSH (port 22) and HTTP (port 80).
   - **Key Pair**: Create or select an existing key pair.
   - **User Data (Optional)**:  
     Add the following script to set the hostname:  
     ```bash
     #!/bin/bash
     hostnamectl set-hostname staging-public-web-server-01
     ```

2. **Launch a Private Subnet EC2 Instance**:
   - **Name**: `staging-private-web-server-01`
   - **AMI**: Select Amazon Linux 2 AMI.
   - **Subnet**: `private-subnet-1a`.
   - **Security Group**: Allow SSH (port 22) and HTTP (port 80).
   - **Key Pair**: Create or select an existing key pair.
   - **User Data (Optional)**:  
     Add the following script to set the hostname:  
     ```bash
     #!/bin/bash
     hostnamectl set-hostname staging-private-web-server-01
     ```

---

## Step 6: Create an S3 Bucket
1. Go to **S3** and click **Create Bucket**:
   - **Bucket Name**: `endpoint-analytics-staging-data`.
   - Select your region and leave other options as default.
2. Upload a test file to your bucket for testing access.

---

## Step 7: Test S3 Access

1. **SSH into the Public Subnet EC2 Instance**.
2. Set up AWS Access Key and Secret Key for CLI access.
3. Use the AWS CLI to list the S3 bucket:
   
   `aws s3 ls endpoint-analytics-staging-data`

   This should succeed because the public EC2 instance has access to the S3 bucket.

4. SSH into the Private Subnet EC2 Instance.
5. Set up AWS Access Key and Secret Key for CLI access
6. Try the same command to list the S3 bucket:
 
   `aws s3 ls endpoint-analytics-staging-data`

   This should fail because the private EC2 instance does not have direct access to the S3 bucket.


## Step 8: Create a VPC Endpoint for S3
1. Go to **Endpoints** in the VPC Dashboard and click **Create Endpoint**.
2. Configure the endpoint:
   - **Name**: `s3-endpoint`.
   - **Service Category**: Select **AWS Services**.
   - **Service Name**: Choose `Service Name = com.amazonaws.us-east-1.s3` (Gateway type).
   - **VPC**: Select `staging-vpc`.
   - **Route Table**: Select `staging-vpc-private-rt`.
   - **Policy**: Full access
3. Click **Create Endpoint**.

---

## Step 9: Test S3 Access from Private Subnet Now
1. SSH into the **Private Subnet EC2 Instance**.
2. Retry the AWS CLI command:
   
   `aws s3 ls endpoint-analytics-staging-data`

   This should succeed because the Private EC2 instance's route table has endpoints configured, allowing access to the S3 bucket.
