import { FakeTodoRepository } from '@/_tests/repositories/fake-todo-repo'
import { Id } from '@/entities/value-objects/id'

import { InvalidTitleError } from './_errors/invalid-title-error'
import { CreateTodoUseCase } from './create-todo'

let sut: CreateTodoUseCase
let todoRepo: FakeTodoRepository

describe('Create Todo Use Case - Unit tests', () => {
  beforeEach(() => {
    todoRepo = new FakeTodoRepository()
    sut = new CreateTodoUseCase(todoRepo)
  })

  it('should be able to create a todo', async () => {
    const result = await sut.execute({ title: 'Test todo' })

    expect(result.isRight()).toBeTruthy()
    if (result.isRight()) {
      expect(result.value.todo.title).toBe('Test todo')
      expect(result.value.todo.createdAt).toBeInstanceOf(Date)
      expect(result.value.todo.id).toBeInstanceOf(Id)
    }
  })

  it('should not be able to create a todo with a title less than 3 characters', async () => {
    const result = await sut.execute({ title: '' })
    expect(result.isLeft()).toBeTruthy()
    if (result.isLeft()) {
      expect(result.value).toBeInstanceOf(InvalidTitleError)
    }
  })
})
