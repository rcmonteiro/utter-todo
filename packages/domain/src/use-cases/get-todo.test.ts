import { FakeTodoRepository } from '@/_tests/repositories/fake-todo-repo'
import { Todo } from '@/entities/todo'

import { ResourceNotFoundError } from './_errors/resource-not-found-error'
import { GetTodoUseCase } from './get-todo'

let sut: GetTodoUseCase
let todoRepo: FakeTodoRepository

describe('Get Todo Use Case - Unit tests', () => {
  beforeEach(() => {
    todoRepo = new FakeTodoRepository()
    sut = new GetTodoUseCase(todoRepo)
  })

  it('should be able to get a todo by id', async () => {
    const todo = new Todo({ title: 'Test todo 01' })
    todoRepo.items.push(todo)

    const result = await sut.execute({ todoId: todo.id.toString() })

    expect(result.isRight()).toBeTruthy()
    if (result.isRight()) {
      expect(result.value.todo.title).toBe('Test todo 01')
    }
  })

  it('should not be able to get a invalid todo by id', async () => {
    const result = await sut.execute({ todoId: 'invalid-id' })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
