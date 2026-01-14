terraform {
  required_version = ">= 1.3.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "ap-south-1"
}

# VARIABLES

variable "my_ip" {
  description = "Your public IP for SSH access (x.x.x.x/32)"
  type        = string
}

# DATA SOURCES


data "aws_vpc" "default" {
  default = true
}

data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"] # Canonical

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

# SECURITY GROUPS

resource "aws_security_group" "nginx_router_sg" {
  name        = "nginx-router-sg"
  description = "Allow HTTP, HTTPS, SSH"
  vpc_id      = data.aws_vpc.default.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = [var.my_ip]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "nginx-router-sg"
  }
}

resource "aws_security_group" "web_server_sg" {
  name        = "web-server-sg"
  description = "Allow HTTP only from nginx router"
  vpc_id      = data.aws_vpc.default.id

  ingress {
    from_port       = 80
    to_port         = 80
    protocol        = "tcp"
    security_groups = [aws_security_group.nginx_router_sg.id]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = [var.my_ip]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "web-server-sg"
  }
}

# EC2 INSTANCES

resource "aws_instance" "nginx_router" {
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = "t2.micro"
  key_name               = "ultimate-key"
  vpc_security_group_ids = [aws_security_group.nginx_router_sg.id]

  tags = {
    Name = "nginx-router"
  }
}

resource "aws_instance" "web1" {
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = "t2.micro"
  key_name               = "ultimate-key"
  vpc_security_group_ids = [aws_security_group.web_server_sg.id]

  tags = {
    Name = "web-1"
  }
}

resource "aws_instance" "web2" {
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = "t2.micro"
  key_name               = "ultimate-key"
  vpc_security_group_ids = [aws_security_group.web_server_sg.id]

  tags = {
    Name = "web-2"
  }
}

# OUTPUTS

output "nginx_router_public_ip" {
  description = "Public IP of the NGINX router"
  value       = aws_instance.nginx_router.public_ip
}

output "web1_private_ip" {
  description = "Private IP of Web Server 1"
  value       = aws_instance.web1.private_ip
}

output "web2_private_ip" {
  description = "Private IP of Web Server 2"
  value       = aws_instance.web2.private_ip
}