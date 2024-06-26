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

variable "db_name" {
  description = "The name of the database"
  default     = "utter_todo"
  type        = string
}

variable "db_user" {
  description = "The database admin user"
  default     = "app_user"
}

variable "db_password" {
  description = "The database admin password"
  sensitive   = true
}

variable "db_instance_class" {
  description = "The instance class for RDS"
  default     = "db.t3.micro"
}

variable "db_allocated_storage" {
  description = "The allocated storage for RDS in GB"
  default     = 20
}