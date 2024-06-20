import { type Either, right } from 'src/common/either'
import type { Task } from 'src/entities/task'
import type { TaskRepository, TStatus } from 'src/repositories/task-repo'

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
