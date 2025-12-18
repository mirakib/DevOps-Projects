terraform {
  required_version = ">= 1.4.2"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 4.0"
    }
  }

  backend "s3" {
    bucket         = "terraformbackendaccess"
    key            = "terraformbackendaccess.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "terraform-lock-table" # Prevents concurrent modifications
  }
}

provider "aws" {
  region = "us-east-1"
}
