import { type Either, left, right } from 'src/common/either'
import type { TaskRepository } from 'src/repositories/task-repo'

import { ResourceNotFoundError } from './_errors/resource-not-found-error'

type ToggleTaskCompletedRequest = { taskId: string }

type ToggleTaskCompletedResponse = Either<ResourceNotFoundError, null>

export class ToggleTaskCompletedUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute({
    taskId,
  }: ToggleTaskCompletedRequest): Promise<ToggleTaskCompletedResponse> {
    const task = await this.taskRepository.findById(taskId)

    if (!task) {
      return left(new ResourceNotFoundError())
    }

    task.toggleCompleted()
    console.log('task.isCompleted()', task.isCompleted())
    this.taskRepository.save(task)

    return right(null)
  }
}
