resource "aws_eip" "nat_eip_1" { domain = "vpc" }
resource "aws_eip" "nat_eip_2" { domain = "vpc" }

resource "aws_nat_gateway" "nat_1" {
  allocation_id = aws_eip.nat_eip_1.id
  subnet_id     = aws_subnet.public_1.id
  depends_on    = [aws_internet_gateway.igw]
}

resource "aws_nat_gateway" "nat_2" {
  allocation_id = aws_eip.nat_eip_2.id
  subnet_id     = aws_subnet.public_2.id
  depends_on    = [aws_internet_gateway.igw]
}

resource "aws_route_table" "private_rt_1" {
  vpc_id = aws_vpc.custom_vpc.id
  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.nat_1.id
  }
}

resource "aws_route_table" "private_rt_2" {
  vpc_id = aws_vpc.custom_vpc.id
  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.nat_2.id
  }
}

resource "aws_route_table_association" "priv1" {
  subnet_id      = aws_subnet.private_1.id
  route_table_id = aws_route_table.private_rt_1.id
}

resource "aws_route_table_association" "priv2" {
  subnet_id      = aws_subnet.private_2.id
  route_table_id = aws_route_table.private_rt_2.id
}
