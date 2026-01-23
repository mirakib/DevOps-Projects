# AWS VPC Transit Gateway setup demo

## Step 1: Create VPCs
1. **Create 3 VPCs**:
   - Name them `staging-vpc-a`, `staging-vpc-b`, and `staging-vpc-c`.
   - Ensure each VPC has unique CIDR blocks:
     - `staging-vpc-a`: `11.0.0.0/16`
     - `staging-vpc-b`: `12.0.0.0/16`
     - `staging-vpc-c`: `13.0.0.0/16`

---

## Step 2: Create and Attach Internet Gateways
1. **Create an Internet Gateway (IGW)** for each VPC:
   - Name them `igw-staging-vpc-a`, `igw-staging-vpc-b`, `igw-staging-vpc-c`.
2. **Attach each IGW** to its respective VPC `staging-vpc-a`, `staging-vpc-b`, and `staging-vpc-c`.

---

## Step 3: Create Public Subnets
1. **Create Public Subnets**:
   - Create one public subnet for each VPC, select VPC `staging-vpc-a`, `staging-vpc-b`, and `staging-vpc-c` during create of VPC subnet.
   - Use unique CIDR blocks within each VPC:
     - `staging-vpc-a-subnet-1a`: `11.0.1.0/24`
     - `staging-vpc-b-subnet-1a`: `12.0.2.0/24`
     - `staging-vpc-c-subnet-1a`: `13.0.3.0/24`
     - 
---

## Step 4: Create Route Tables
1. **Create a Route Table** for each VPC:
   - Name them `rt-staging-vpc-a`, `rt-staging-vpc-b`, `rt-staging-vpc-c`.
2. **Associate Each Route Table** with its respective public subnet.
3. **Add a Route to the Internet Gateway**:
   - Destination: `0.0.0.0/0`
   - Target: The respective Internet Gateway.

---

## Step 5: Create EC2 Instances
1. **Launch EC2 Instances**:
   - Create one EC2 instance in each VPC.
   - Use the public subnet of the respective VPC.
   - Enable "Auto-assign Public IP."
   - Attach a security group allowing:
     - **ICMP** (ping)
     - **SSH** (port 22)
     - **http** (port 80)

---

## Step 6: Create a Transit Gateway
1. **Create a Transit Gateway (TGW)**:
   - Name it `transit-gateway-staging`.
   - Use default settings.

---

## Step 7: Attach VPCs to the Transit Gateway
1. **Create TGW Attachments**:
   - Attach each VPC to the Transit Gateway.
   - Name attachments:
     - `tgw-attachment-staging-vpc-a`
     - `tgw-attachment-staging-vpc-b`
     - `tgw-attachment-staging-vpc-c`.
   - Use the appropriate subnets for the attachments:
     - `staging-vpc-a`: `staging-vpc-a-subnet`
     - `staging-vpc-b`: `staging-vpc-b-subnet`
     - `staging-vpc-c`: `staging-vpc-c-subnet`
---

## Step 8: Update Route Tables for Inter-VPC Communication
1. **Update Each Route Table**:
   - **For `staging-vpc-a`**:
     - Add routes for `staging-vpc-b` and `staging-vpc-c` CIDR blocks.
     - Target: Transit Gateway.
   - **For `staging-vpc-b`**:
     - Add routes for `staging-vpc-a` and `staging-vpc-c` CIDR blocks.
     - Target: Transit Gateway.
   - **For `staging-vpc-c`**:
     - Add routes for `staging-vpc-a` and `staging-vpc-b` CIDR blocks.
     - Target: Transit Gateway.

---

## Step 9: Test Connectivity
1. **Login to Each EC2 Instance**:
   - Use the public IPs to SSH into the instances.
2. **Ping the Private IPs** of EC2 instances in other VPCs:
   - From `staging-vpc-a` EC2, ping the private IPs of `staging-vpc-b` and `staging-vpc-c` instances.
   - Repeat for other EC2 instances.
   - **Expected Result**: All pings should be successful.

---
