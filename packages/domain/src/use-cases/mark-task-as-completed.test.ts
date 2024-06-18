import { Task } from '@/entities/task'
import { FakeTaskRepository } from 'tests/repositories/fake-task-repo'

import { ResourceNotFoundError } from './_errors/resource-not-found-error'
import { MarkTaskAsCompletedUseCase } from './mark-task-as-completed'

let sut: MarkTaskAsCompletedUseCase
let taskRepo: FakeTaskRepository

describe('Mark Task As Completed Use Case - Unit tests', () => {
  beforeEach(() => {
    taskRepo = new FakeTaskRepository()
    sut = new MarkTaskAsCompletedUseCase(taskRepo)
  })

  it('should be able to complete a task item', async () => {
    const taskItem = new Task({ title: 'Test task 01' })
    taskRepo.items.push(taskItem)

    const result = await sut.execute({ taskId: taskItem.id.toString() })

    expect(result.isRight()).toBeTruthy()
    expect(taskRepo.items[0].isCompleted()).toBeTruthy()
  })

  it('should not be able to complete a inexistent task item', async () => {
    const result = await sut.execute({ taskId: 'inexistent-task-id' })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
