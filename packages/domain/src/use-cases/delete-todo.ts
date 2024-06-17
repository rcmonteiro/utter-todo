import { type Either, left, right } from '@/common/either'
import type { TodoRepository } from '@/repositories/todo-repo'

import { ResourceNotFoundError } from './_errors/resource-not-found-error'

type DeleteTodoRequest = { todoId: string }

type DeleteTodoResponse = Either<ResourceNotFoundError, null>

export class DeleteTodoUseCase {
  constructor(private readonly todoRepository: TodoRepository) {}

  async execute({ todoId }: DeleteTodoRequest): Promise<DeleteTodoResponse> {
    const todo = await this.todoRepository.findById(todoId)

    if (!todo) {
      return left(new ResourceNotFoundError())
    }

    this.todoRepository.delete(todo)

    return right(null)
  }
}
