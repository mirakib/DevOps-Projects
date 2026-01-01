resource "aws_vpc_peering_connection" "home_office" {
  vpc_id      = aws_vpc.home.id
  peer_vpc_id = aws_vpc.office.id
  auto_accept = true

  tags = {
    Name = "home-office-peering"
  }
}
