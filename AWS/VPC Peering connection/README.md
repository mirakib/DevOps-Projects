# Connect VPCs using VPC peering

<img width="499" height="161" alt="image" src="https://github.com/user-attachments/assets/9d8911f1-7fb0-436a-a28b-919d8e5e8fa1" />

A VPC peering connection is a networking feature that enables secure and direct communication between two virtual private clouds (VPCs) within the AWS infrastructure. This private connection allows resources in the peered VPCs to interact with each other as if they were part of the same network, eliminating the need to traverse the public internet.

## Create two VPC

- **`home-vpc`**

  <img width="694" height="252" alt="image" src="https://github.com/user-attachments/assets/c1cdea12-bc33-4a81-977c-1c4a563107ea" />
  
  - **`10.0.0.0/24`**
  - 1 Availability Zone
  - 1 private subnet
    
-  **`office-vpc`**

   <img width="694" height="253" alt="image" src="https://github.com/user-attachments/assets/113bd0aa-7f01-4e7c-87e8-7733ef4e5916" />

   - **`10.0.1.0/24`**
   - 1 Availability Zone
   - 1 private subnet
 
## Create two EC2 instance in each VPC

1. **`home-instance`**
   - **`home-vpc`**
   - **`Ubuntu 24 LTS`**
   - **`t2.micro`**

2. **`office-instance`**
   - **`office-vpc`**
   - **`Ubuntu 24 LTS`**
   - **`t2.micro`**

## Create Peering connection



1. In the navigation pane, choose Peering connections.
   
3. Choose **Create peering connection**.

5. (Optional) For Name, specify a name the VPC peering connection. This creates a tag with a key of Name and the value that you specify.

6. For **VPC ID (Requester)**, select a VPC from the current account.

   <img width="1366" height="453" alt="image" src="https://github.com/user-attachments/assets/87af75fb-51e9-416c-8b51-ff8d078a3634" />

7. Under Select another VPC to peer with, do the following:

    1. For **Account**, to peer with a VPC in another account, choose **Another account** and enter the account ID . Otherwise, keep My account.

    2. For **Region**, to peer with a VPC in another **Region**, choose **Another Region** and choose the **Region** . Otherwise, keep This Region.

    3. For **VPC ID (Accepter)**, select a VPC from the specified account and Region.

   <img width="1332" height="399" alt="image" src="https://github.com/user-attachments/assets/238fa98e-f5c5-4d8c-90b2-f0f5031c3b3d" />

8. Choose `Create peering connection`.

9. The owner of the accepter account must accept the peering connection. For more information, see Accept or reject a VPC peering connection.

10. Update the route tables for both VPCs to enable communication between them. For more information, see Update your route tables for a VPC peering connection.
    a) Change route table for `home-vpc`

    <img width="1366" height="453" alt="image" src="https://github.com/user-attachments/assets/e7204b8a-fad2-44ce-8015-3cfe59f8b827" />

    b) Change route table for `office-vpc`

    <img width="1366" height="453" alt="image" src="https://github.com/user-attachments/assets/dacb1061-5db7-485c-a50d-070e299e85bd" />


### Ping using private ip address to each instances.

1. `home-vpc\home-instance` to  `office-vpc\office-instance`

   <img width="666" height="235" alt="image" src="https://github.com/user-attachments/assets/bef1ac0d-26de-41c6-be28-69312fe6fe4b" />

2. `office-vpc\office-instance` to  `home-vpc\home-instance`

   <img width="668" height="236" alt="image" src="https://github.com/user-attachments/assets/c5f3b7b6-0aaa-40b7-8da1-975ce539c610" />

Now our instance can communicate with each other privately because vpc are connected with peering connection.
