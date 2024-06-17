import { FakeTodoRepository } from '@/_tests/repositories/fake-todo-repo'
import { Todo } from '@/entities/todo'

import { ResourceNotFoundError } from './_errors/resource-not-found-error'
import { MarkTodoAsCompletedUseCase } from './mark-todo-as-completed'

let sut: MarkTodoAsCompletedUseCase
let todoRepo: FakeTodoRepository

describe('Mark Todo As Completed Use Case - Unit tests', () => {
  beforeEach(() => {
    todoRepo = new FakeTodoRepository()
    sut = new MarkTodoAsCompletedUseCase(todoRepo)
  })

  it('should be able to complete a todo item', async () => {
    const todoItem = new Todo({ title: 'Test todo 01' })
    todoRepo.items.push(todoItem)

    const result = await sut.execute({ todoId: todoItem.id.toString() })

    expect(result.isRight()).toBeTruthy()
    expect(todoRepo.items[0].isCompleted()).toBeTruthy()
  })

  it('should not be able to complete a inexistent todo item', async () => {
    const result = await sut.execute({ todoId: 'inexistent-todo-id' })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
