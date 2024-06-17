import { FakeTodoRepository } from '@/_tests/repositories/fake-todo-repo'
import { Todo } from '@/entities/todo'

import { ResourceNotFoundError } from './_errors/resource-not-found-error'
import { UpdateTodoUseCase } from './update-todo'

let sut: UpdateTodoUseCase
let todoRepo: FakeTodoRepository

describe('Update Todo Use Case - Unit tests', () => {
  beforeEach(() => {
    todoRepo = new FakeTodoRepository()
    sut = new UpdateTodoUseCase(todoRepo)
  })

  it('should be able to update a todo item', async () => {
    const todoItem = new Todo({ title: 'Test todo 01' })
    todoRepo.items.push(todoItem)

    const result = await sut.execute({
      todoId: todoItem.id.toString(),
      title: 'Updated title',
    })

    expect(result.isRight()).toBeTruthy()
    expect(todoRepo.items[0].title).toBe('Updated title')
  })

  it('should not be able to update a inexistent todo item', async () => {
    const result = await sut.execute({
      todoId: 'inexistent-todo-id',
      title: 'Updated title',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
