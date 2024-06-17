import { FakeTodoRepository } from '@/_tests/repositories/fake-todo-repo'
import { Todo } from '@/entities/todo'

import { ResourceNotFoundError } from './_errors/resource-not-found-error'
import { DeleteTodoUseCase } from './delete-todo'

let sut: DeleteTodoUseCase
let todoRepo: FakeTodoRepository

describe('Delete Todo Use Case - Unit tests', () => {
  beforeEach(() => {
    todoRepo = new FakeTodoRepository()
    sut = new DeleteTodoUseCase(todoRepo)
  })

  it('should be able to delete a todo item', async () => {
    const todoItem = new Todo({ title: 'Test todo 01' })
    todoRepo.items.push(todoItem)

    const result = await sut.execute({ todoId: todoItem.id.toString() })

    expect(result.isRight()).toBeTruthy()
    expect(todoRepo.items).toHaveLength(0)
  })

  it('should not be able to delete a inexistent todo item', async () => {
    const result = await sut.execute({ todoId: 'inexistent-todo-id' })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
