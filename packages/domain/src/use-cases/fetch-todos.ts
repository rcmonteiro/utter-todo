import { type Either, right } from '@/common/either'
import { Todo } from '@/entities/todo'
import type { TodoRepository, TStatus } from '@/repositories/todo-repo'

import { InvalidTitleError } from './_errors/invalid-title-error'

type FetchTodosRequest = { status: TStatus }

type FetchTodosResponse = Either<
  InvalidTitleError,
  {
    todos: Todo[]
  }
>

export class FetchTodosUseCase {
  constructor(private readonly todoRepository: TodoRepository) {}

  async execute({ status }: FetchTodosRequest): Promise<FetchTodosResponse> {
    const todos = await this.todoRepository.findManyByStatus(status)
    return right({ todos })
  }
}
