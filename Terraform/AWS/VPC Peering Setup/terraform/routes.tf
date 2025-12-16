# Route tables
resource "aws_route_table" "home_rt" {
  vpc_id = aws_vpc.home.id
}

resource "aws_route_table" "office_rt" {
  vpc_id = aws_vpc.office.id
}

# Peering routes
resource "aws_route" "home_to_office" {
  route_table_id            = aws_route_table.home_rt.id
  destination_cidr_block    = "10.0.1.0/24"
  vpc_peering_connection_id = aws_vpc_peering_connection.home_office.id
}

resource "aws_route" "office_to_home" {
  route_table_id            = aws_route_table.office_rt.id
  destination_cidr_block    = "10.0.0.0/24"
  vpc_peering_connection_id = aws_vpc_peering_connection.home_office.id
}

# Associations
resource "aws_route_table_association" "home_assoc" {
  subnet_id      = aws_subnet.home_subnet.id
  route_table_id = aws_route_table.home_rt.id
}

resource "aws_route_table_association" "office_assoc" {
  subnet_id      = aws_subnet.office_subnet.id
  route_table_id = aws_route_table.office_rt.id
}
