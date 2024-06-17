import { type Either, left, right } from '@/common/either'
import type { TodoRepository } from '@/repositories/todo-repo'

import { ResourceNotFoundError } from './_errors/resource-not-found-error'

type MarkTodoAsCompletedRequest = { todoId: string }

type MarkTodoAsCompletedResponse = Either<ResourceNotFoundError, null>

export class MarkTodoAsCompletedUseCase {
  constructor(private readonly todoRepository: TodoRepository) {}

  async execute({
    todoId,
  }: MarkTodoAsCompletedRequest): Promise<MarkTodoAsCompletedResponse> {
    const todo = await this.todoRepository.findById(todoId)

    if (!todo) {
      return left(new ResourceNotFoundError())
    }

    todo.markAsCompleted()

    return right(null)
  }
}
