variable "source_repo" {
  type        = string
  description = "Source repo for frontend code"
}

variable "app_name" {
  type        = string
  description = "Name of the application"
}

variable "main_branch" {
  type        = string
  description = "The name of the main branch"
  default     = "main"
}

variable "framework" {
  type        = string
  description = "AWS Amplify Framework"
  default     = "React - Amplify"
}
