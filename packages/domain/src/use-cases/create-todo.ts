import { type Either, left, right } from '@/common/either'
import { Todo } from '@/entities/todo'
import type { TodoRepository } from '@/repositories/todo-repo'

import { InvalidTitleError } from './_errors/invalid-title-error'

type CreateTodoRequest = { title: string }

type CreateTodoResponse = Either<
  InvalidTitleError,
  {
    todo: Todo
  }
>

export class CreateTodoUseCase {
  constructor(private readonly todoRepository: TodoRepository) {}

  async execute({ title }: CreateTodoRequest): Promise<CreateTodoResponse> {
    if (!Todo.isValidTitle(title)) {
      return left(new InvalidTitleError())
    }

    const todo = await this.todoRepository.create(new Todo({ title }))
    return right({ todo })
  }
}
