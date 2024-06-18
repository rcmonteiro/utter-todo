import { type Either, right } from '@/common/either'
import { Task } from '@/entities/task'
import type { TaskRepository, TStatus } from '@/repositories/task-repo'

import { InvalidTitleError } from './_errors/invalid-title-error'

type FetchTasksRequest = { status: TStatus }

type FetchTasksResponse = Either<
  InvalidTitleError,
  {
    tasks: Task[]
  }
>

export class FetchTasksUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute({ status }: FetchTasksRequest): Promise<FetchTasksResponse> {
    const tasks = await this.taskRepository.findManyByStatus(status)
    return right({ tasks })
  }
}
