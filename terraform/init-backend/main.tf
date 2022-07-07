resource "aws_s3_bucket" "tfstate" {
  bucket = "setokiaba-tfstate"
}

# resource "aws_s3_bucket_versioning" "tfstate-versioning" {
#   bucket = aws_s3_bucket.tfstate.id

#   versioning_configuration {
#     status = "Enabled"
#   }
# }

resource "aws_s3_bucket_server_side_encryption_configuration" "tfstate-encrypt" {
  bucket = aws_s3_bucket.tfstate.bucket

  rule {
    apply_server_side_encryption_by_default {
      kms_master_key_id = aws_kms_key.tfstate-encrypt.arn
      sse_algorithm     = "aws:kms"
    }
  }
}

resource "aws_kms_key" "tfstate-encrypt" {
  description = "This key is used to encrypt the tfstate backup bucket"
}
