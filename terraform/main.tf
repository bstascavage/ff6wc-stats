resource "aws_amplify_app" "setokiaba" {
  name       = var.app_name
  repository = var.source_repo

  custom_rule {
    source = "/<*>"
    status = "404"
    target = "/index.html"
  }
}
