resource "aws_subnet" "public_1" {
  vpc_id                  = aws_vpc.custom_vpc.id
  cidr_block              = "10.0.10.0/24"
  availability_zone       = "us-east-1a"
  map_public_ip_on_launch = true
}

resource "aws_subnet" "public_2" {
  vpc_id                  = aws_vpc.custom_vpc.id
  cidr_block              = "10.0.20.0/24"
  availability_zone       = "us-east-1b"
  map_public_ip_on_launch = true
}

resource "aws_subnet" "private_1" {
  vpc_id            = aws_vpc.custom_vpc.id
  cidr_block        = "10.0.100.0/24"
  availability_zone = "us-east-1a"
}

resource "aws_subnet" "private_2" {
  vpc_id            = aws_vpc.custom_vpc.id
  cidr_block        = "10.0.200.0/24"
  availability_zone = "us-east-1b"
}
