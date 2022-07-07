terraform {
  backend "s3" {
    bucket = "setokiaba-tfstate"
    key    = "terraform.tfstate"
    region = "us-east-1"
  }
}
