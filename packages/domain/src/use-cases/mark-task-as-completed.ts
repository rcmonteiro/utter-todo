import { type Either, left, right } from '@/common/either'
import type { TaskRepository } from '@/repositories/task-repo'

import { ResourceNotFoundError } from './_errors/resource-not-found-error'

type MarkTaskAsCompletedRequest = { taskId: string }

type MarkTaskAsCompletedResponse = Either<ResourceNotFoundError, null>

export class MarkTaskAsCompletedUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute({
    taskId,
  }: MarkTaskAsCompletedRequest): Promise<MarkTaskAsCompletedResponse> {
    const task = await this.taskRepository.findById(taskId)

    if (!task) {
      return left(new ResourceNotFoundError())
    }

    task.markAsCompleted()

    return right(null)
  }
}
