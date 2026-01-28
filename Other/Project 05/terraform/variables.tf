variable "aws_region" { 
  description = "AWS region" 
  default     = "us-east-1a" 
} 
variable "vpc_cidr" { 
  description = "VPC CIDR block" 
  default     = "10.0.0.0/16" 
} 
variable "subnet_cidr" { 
  description = "Subnet CIDR block" 
  default     = "10.0.0.0/24" 
} 
variable "ami_id" { 
  description = "AMI ID for Ubuntu" 
  default     = "ami-00bb6a80f01f03502" 
} 
variable "instance_type" { 
  description = "EC2 instance type" 
  default     = "t2.small" 
} 
variable "key_name" { 
  description = "my Key Pair Name" 
} 
variable "private_key_path" { 
  description = "Path to the private key file" 
  default     = "generated-key.pem" 
}
