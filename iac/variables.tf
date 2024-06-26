variable "aws_account_id" {
  description = "AWS Account ID"
  type        = string
  sensitive   = true
}

variable "aws_region" {
  description = "AWS Region"
  type        = string
  sensitive   = true
}

variable "thumbprint" {
  description = "SHA1 Fingerprint"
  type        = string
  sensitive   = true
}

variable "gh_app_repo" {
  description = "Github repository, e.g. repo:{username}/{repo}:ref:refs/heads/{branch}"
  type        = string
  sensitive   = true
}