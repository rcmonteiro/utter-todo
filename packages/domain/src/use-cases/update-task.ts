import { type Either, left, right } from '@/common/either'
import type { Task } from '@/entities/task'
import type { TaskRepository } from '@/repositories/task-repo'

import { ResourceNotFoundError } from './_errors/resource-not-found-error'

type UpdateTaskRequest = {
  taskId: string
  title: string
}

type UpdateTaskResponse = Either<ResourceNotFoundError, { task: Task }>

export class UpdateTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute({
    taskId,
    title,
  }: UpdateTaskRequest): Promise<UpdateTaskResponse> {
    const task = await this.taskRepository.findById(taskId)

    if (!task) {
      return left(new ResourceNotFoundError())
    }

    task.title = title
    await this.taskRepository.save(task)

    return right({ task })
  }
}
