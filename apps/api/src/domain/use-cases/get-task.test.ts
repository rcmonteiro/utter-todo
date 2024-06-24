import { Task } from 'src/domain/entities/task'

import { FakeTaskRepository } from '../__tests__/repositories/fake-task-repo'
import { ResourceNotFoundError } from './_errors/resource-not-found-error'
import { GetTaskUseCase } from './get-task'

let sut: GetTaskUseCase
let taskRepo: FakeTaskRepository

describe('Get Task Use Case - Unit tests', () => {
  beforeEach(() => {
    taskRepo = new FakeTaskRepository()
    sut = new GetTaskUseCase(taskRepo)
  })

  it('should be able to get a task by id', async () => {
    const task = new Task({ title: 'Test task 01' })
    taskRepo.items.push(task)

    const result = await sut.execute({ taskId: task.id.toString() })

    expect(result.isRight()).toBeTruthy()
    if (result.isRight()) {
      expect(result.value.task.title).toBe('Test task 01')
    }
  })

  it('should not be able to get a invalid task by id', async () => {
    const result = await sut.execute({ taskId: 'invalid-id' })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
