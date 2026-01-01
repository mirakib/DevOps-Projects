resource "aws_key_pair" "instance_key" {
  key_name   = "instance_key"
  public_key = file("C:/Users/RowTech/.ssh/id_rsa.pub")
}
