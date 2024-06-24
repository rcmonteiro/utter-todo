import { Task } from 'src/domain/entities/task'

import { FakeTaskRepository } from '../__tests__/repositories/fake-task-repo'
import { FetchTasksUseCase } from './fetch-tasks'

let sut: FetchTasksUseCase
let taskRepo: FakeTaskRepository

describe('Fetch Task Use Case - Unit tests', () => {
  beforeEach(() => {
    taskRepo = new FakeTaskRepository()
    sut = new FetchTasksUseCase(taskRepo)
  })

  it('should be able to fetch all tasks', async () => {
    taskRepo.items.push(new Task({ title: 'Test task 01' }))
    taskRepo.items.push(new Task({ title: 'Test task 02' }))
    taskRepo.items.push(new Task({ title: 'Test task 03' }))

    const result = await sut.execute({ status: 'ALL' })

    expect(result.isRight()).toBeTruthy()
    if (result.isRight()) {
      expect(result.value.tasks).toHaveLength(3)
      expect(result.value.tasks[1].title).toBe('Test task 02')
    }
  })

  it('should be able to fetch only completed tasks', async () => {
    taskRepo.items.push(new Task({ title: 'Test task 01' }))
    taskRepo.items.push(new Task({ title: 'Test task 02' }))
    const pendingTask = new Task({ title: 'Test task 03' })
    pendingTask.toggleCompleted()
    taskRepo.items.push(pendingTask)

    const result = await sut.execute({ status: 'COMPLETED' })

    expect(result.isRight()).toBeTruthy()
    if (result.isRight()) {
      expect(result.value.tasks).toHaveLength(1)
      expect(result.value.tasks[0].title).toBe('Test task 03')
    }
  })
})
