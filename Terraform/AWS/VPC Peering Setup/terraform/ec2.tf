resource "aws_instance" "home" {
  ami           = "ami-0ecb62995f68bb549"
  instance_type = "t2.micro"
  subnet_id     = aws_subnet.home_subnet.id
  key_name = aws_key_pair.instance_key.key_name
  vpc_security_group_ids = [aws_security_group.allow_icmp_ssh_home.id]

  tags = {
    Name = "home-instance"
  }
}

resource "aws_instance" "office" {
  ami           = "ami-0ecb62995f68bb549"
  instance_type = "t2.micro"
  subnet_id     = aws_subnet.office_subnet.id
  key_name = aws_key_pair.instance_key.key_name
  vpc_security_group_ids = [aws_security_group.allow_icmp_ssh_office.id]

  tags = {
    Name = "office-instance"
  }
}