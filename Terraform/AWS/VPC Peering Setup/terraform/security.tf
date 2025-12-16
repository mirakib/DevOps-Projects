resource "aws_security_group" "allow_icmp_ssh_home" {
  name        = "allow-icmp-ssh-home"
  vpc_id      = aws_vpc.home.id

  # keep default egress
  revoke_rules_on_delete = false

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = -1
    to_port     = -1
    protocol    = "icmp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "allow_icmp_ssh_office" {
  name        = "allow-icmp-ssh-office"
  vpc_id      = aws_vpc.office.id

  revoke_rules_on_delete = false

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = -1
    to_port     = -1
    protocol    = "icmp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}