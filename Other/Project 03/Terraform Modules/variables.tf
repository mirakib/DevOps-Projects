variable "aws_region" {
  description = "AWS Region"
  type        = string
}

variable "vpc_cidr" {
  description = "VPC CIDR Block"
  type        = string
}

variable "key_name" {
  description = "EC2 Key Pair Name"
  type        = string
}

variable "instance_type" {
  type = string
}

variable "ami_id" {
  type = string
}
