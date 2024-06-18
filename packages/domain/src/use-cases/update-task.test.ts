import { Task } from '@/entities/task'
import { FakeTaskRepository } from 'tests/repositories/fake-task-repo'

import { ResourceNotFoundError } from './_errors/resource-not-found-error'
import { UpdateTaskUseCase } from './update-task'

let sut: UpdateTaskUseCase
let taskRepo: FakeTaskRepository

describe('Update Task Use Case - Unit tests', () => {
  beforeEach(() => {
    taskRepo = new FakeTaskRepository()
    sut = new UpdateTaskUseCase(taskRepo)
  })

  it('should be able to update a task item', async () => {
    const taskItem = new Task({ title: 'Test task 01' })
    taskRepo.items.push(taskItem)

    const result = await sut.execute({
      taskId: taskItem.id.toString(),
      title: 'Updated title',
    })

    expect(result.isRight()).toBeTruthy()
    expect(taskRepo.items[0].title).toBe('Updated title')
  })

  it('should not be able to update a inexistent task item', async () => {
    const result = await sut.execute({
      taskId: 'inexistent-task-id',
      title: 'Updated title',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
