import { type Either, left, right } from '@/common/either'
import type { Todo } from '@/entities/todo'
import type { TodoRepository } from '@/repositories/todo-repo'

import { ResourceNotFoundError } from './_errors/resource-not-found-error'

type UpdateTodoRequest = {
  todoId: string
  title: string
}

type UpdateTodoResponse = Either<ResourceNotFoundError, { todo: Todo }>

export class UpdateTodoUseCase {
  constructor(private readonly todoRepository: TodoRepository) {}

  async execute({
    todoId,
    title,
  }: UpdateTodoRequest): Promise<UpdateTodoResponse> {
    const todo = await this.todoRepository.findById(todoId)

    if (!todo) {
      return left(new ResourceNotFoundError())
    }

    todo.title = title
    await this.todoRepository.save(todo)

    return right({ todo })
  }
}
