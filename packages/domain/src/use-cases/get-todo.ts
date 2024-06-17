import { type Either, left, right } from '@/common/either'
import { Todo } from '@/entities/todo'
import type { TodoRepository } from '@/repositories/todo-repo'

import { ResourceNotFoundError } from './_errors/resource-not-found-error'

type GetTodoRequest = { todoId: string }

type GetTodoResponse = Either<
  ResourceNotFoundError,
  {
    todo: Todo
  }
>

export class GetTodoUseCase {
  constructor(private readonly todoRepository: TodoRepository) {}

  async execute({ todoId }: GetTodoRequest): Promise<GetTodoResponse> {
    const todo = await this.todoRepository.findById(todoId)

    if (!todo) {
      return left(new ResourceNotFoundError())
    }
    return right({ todo })
  }
}
