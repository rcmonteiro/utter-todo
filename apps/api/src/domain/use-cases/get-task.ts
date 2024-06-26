import { type Either, left, right } from 'src/domain/common/either'
import type { Task } from 'src/domain/entities/task'
import type { TaskRepository } from 'src/domain/repositories/task-repo'

import { ResourceNotFoundError } from './_errors/resource-not-found-error'

type GetTaskRequest = { taskId: string }

type GetTaskResponse = Either<
  ResourceNotFoundError,
  {
    task: Task
  }
>

export class GetTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute({ taskId }: GetTaskRequest): Promise<GetTaskResponse> {
    const task = await this.taskRepository.findById(taskId)

    if (!task) {
      return left(new ResourceNotFoundError())
    }
    return right({ task })
  }
}
