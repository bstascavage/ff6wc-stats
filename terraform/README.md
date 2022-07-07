# Terraform - setokiaba.com

## Overview

This is the terraform module to deploy setokiaba.com. This site utilizes [AWS Amplify](https://aws.amazon.com/amplify/) to manage and deploy the application.

This uses the [Terraform S3 backend](https://www.terraform.io/language/settings/backends/s3) to manage the `tfstate` file.  To initialize the backend, cd to `init-backend`, set your `env/main.tfvars`, and run `terraform apply -var-file="env/main.tfvars"`.

<!-- BEGINNING OF PRE-COMMIT-TERRAFORM DOCS HOOK -->
## Requirements

| Name | Version |
|------|---------|
| <a name="requirement_terraform"></a> [terraform](#requirement\_terraform) | ~> 1.2.4 |

## Providers

| Name | Version |
|------|---------|
| <a name="provider_aws"></a> [aws](#provider\_aws) | 4.21.0 |

## Modules

No modules.

## Resources

| Name | Type |
|------|------|
| [aws_amplify_app.setokiaba](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/amplify_app) | resource |

## Inputs

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:--------:|
| <a name="input_app_name"></a> [app\_name](#input\_app\_name) | Name of the application | `string` | n/a | yes |
| <a name="input_source_repo"></a> [source\_repo](#input\_source\_repo) | Source repo for frontend code | `string` | n/a | yes |

## Outputs

No outputs.
<!-- END OF PRE-COMMIT-TERRAFORM DOCS HOOK -->
