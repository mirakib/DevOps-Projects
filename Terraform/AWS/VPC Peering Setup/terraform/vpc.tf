# VPCs
resource "aws_vpc" "home" {
  cidr_block = "10.0.0.0/24"
  tags = { Name = "vpc-home" }
}

resource "aws_vpc" "office" {
  cidr_block = "10.0.1.0/24"
  tags = { Name = "vpc-office" }
}

# Subnets
resource "aws_subnet" "home_subnet" {
  vpc_id            = aws_vpc.home.id
  cidr_block        = "10.0.0.0/25"
  availability_zone = "us-east-1a"
  tags = { Name = "home-subnet" }
}

resource "aws_subnet" "office_subnet" {
  vpc_id            = aws_vpc.office.id
  cidr_block        = "10.0.1.0/25"
  availability_zone = "us-east-1a"
  tags = { Name = "office-subnet" }
}
