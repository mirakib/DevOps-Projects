resource "aws_ecr_repository" "my_repository" {
  name = "my-repository"

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = {
    Name = "MyECRRepository"
  }
}
