import { Task } from 'src/entities/task'

import { FakeTaskRepository } from '../__tests__/repositories/fake-task-repo'
import { ResourceNotFoundError } from './_errors/resource-not-found-error'
import { DeleteTaskUseCase } from './delete-task'

let sut: DeleteTaskUseCase
let taskRepo: FakeTaskRepository

describe('Delete Task Use Case - Unit tests', () => {
  beforeEach(() => {
    taskRepo = new FakeTaskRepository()
    sut = new DeleteTaskUseCase(taskRepo)
  })

  it('should be able to delete a task item', async () => {
    const taskItem = new Task({ title: 'Test task 01' })
    taskRepo.items.push(taskItem)

    const result = await sut.execute({ taskId: taskItem.id.toString() })

    expect(result.isRight()).toBeTruthy()
    expect(taskRepo.items).toHaveLength(0)
  })

  it('should not be able to delete a inexistent task item', async () => {
    const result = await sut.execute({ taskId: 'inexistent-task-id' })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
