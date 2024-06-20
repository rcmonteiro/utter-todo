import { type Either, left, right } from 'src/common/either'
import { Task } from 'src/entities/task'
import type { TaskRepository } from 'src/repositories/task-repo'

import { InvalidTitleError } from './_errors/invalid-title-error'

type CreateTaskRequest = { title: string }

type CreateTaskResponse = Either<
  InvalidTitleError,
  {
    task: Task
  }
>

export class CreateTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute({ title }: CreateTaskRequest): Promise<CreateTaskResponse> {
    if (!Task.isValidTitle(title)) {
      return left(new InvalidTitleError())
    }

    const task = await this.taskRepository.create(new Task({ title }))
    return right({ task })
  }
}
