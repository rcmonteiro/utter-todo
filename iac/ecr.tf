resource "aws_ecr_repository" "utter_todo_api" {
  name = "utter_todo_api"

  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = {
    IaC = "True"
  }
}

resource "aws_ecr_repository" "utter_todo_web" {
  name = "utter_todo_web"

  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = {
    IaC = "True"
  }
}