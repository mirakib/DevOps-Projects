resource "aws_vpc" "custom_vpc" {
  cidr_block           = var.vpc_cidr
  enable_dns_hostnames = true

  tags = { Name = "custom_vpc" }
}
