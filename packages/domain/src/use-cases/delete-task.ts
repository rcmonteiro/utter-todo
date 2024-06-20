import { type Either, left, right } from 'src/common/either'
import type { TaskRepository } from 'src/repositories/task-repo'

import { ResourceNotFoundError } from './_errors/resource-not-found-error'

type DeleteTaskRequest = { taskId: string }

type DeleteTaskResponse = Either<ResourceNotFoundError, null>

export class DeleteTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute({ taskId }: DeleteTaskRequest): Promise<DeleteTaskResponse> {
    const task = await this.taskRepository.findById(taskId)

    if (!task) {
      return left(new ResourceNotFoundError())
    }

    this.taskRepository.delete(task)

    return right(null)
  }
}
