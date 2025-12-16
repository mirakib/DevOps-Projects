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


resource "aws_instance" "home" {
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = "t2.micro"
  subnet_id              = aws_subnet.home_subnet.id
  key_name               = var.instance_key
  vpc_security_group_ids = [aws_security_group.allow_icmp_ssh_home.id]

  tags = { Name = "home-instance" }
}

resource "aws_instance" "office" {
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = "t2.micro"
  subnet_id              = aws_subnet.office_subnet.id
  key_name               = var.instance_key
  vpc_security_group_ids = [aws_security_group.allow_icmp_ssh_office.id]

  tags = { Name = "office-instance" }
}
