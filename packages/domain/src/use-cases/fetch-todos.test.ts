import { FakeTodoRepository } from '@/_tests/repositories/fake-todo-repo'
import { Todo } from '@/entities/todo'

import { FetchTodosUseCase } from './fetch-todos'

let sut: FetchTodosUseCase
let todoRepo: FakeTodoRepository

describe('Fetch Todo Use Case - Unit tests', () => {
  beforeEach(() => {
    todoRepo = new FakeTodoRepository()
    sut = new FetchTodosUseCase(todoRepo)
  })

  it('should be able to fetch all todos', async () => {
    todoRepo.items.push(new Todo({ title: 'Test todo 01' }))
    todoRepo.items.push(new Todo({ title: 'Test todo 02' }))
    todoRepo.items.push(new Todo({ title: 'Test todo 03' }))

    const result = await sut.execute({ status: 'ALL' })

    expect(result.isRight()).toBeTruthy()
    if (result.isRight()) {
      expect(result.value.todos).toHaveLength(3)
      expect(result.value.todos[1].title).toBe('Test todo 02')
    }
  })

  it('should be able to fetch only completed todos', async () => {
    todoRepo.items.push(new Todo({ title: 'Test todo 01' }))
    todoRepo.items.push(new Todo({ title: 'Test todo 02' }))
    const pendingTodo = new Todo({ title: 'Test todo 03' })
    pendingTodo.markAsCompleted()
    todoRepo.items.push(pendingTodo)

    const result = await sut.execute({ status: 'COMPLETED' })

    expect(result.isRight()).toBeTruthy()
    if (result.isRight()) {
      expect(result.value.todos).toHaveLength(1)
      expect(result.value.todos[0].title).toBe('Test todo 03')
    }
  })
})
