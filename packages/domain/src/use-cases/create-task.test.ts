import { FakeTaskRepository } from '../__tests__/repositories/fake-task-repo'
import { InvalidTitleError } from './_errors/invalid-title-error'
import { CreateTaskUseCase } from './create-task'

let sut: CreateTaskUseCase
let taskRepo: FakeTaskRepository

describe('Create Task Use Case - Unit tests', () => {
  beforeEach(() => {
    taskRepo = new FakeTaskRepository()
    sut = new CreateTaskUseCase(taskRepo)
  })

  it('should be able to create a task', async () => {
    const result = await sut.execute({ title: 'Test task' })
    expect(result.isRight()).toBeTruthy()
    if (result.isRight()) {
      expect(result.value.task.title).toBe('Test task')
      expect(result.value.task.createdAt).toBeInstanceOf(Date)
    }
  })

  it('should not be able to create a task with a title less than 3 characters', async () => {
    const result = await sut.execute({ title: '' })
    expect(result.isLeft()).toBeTruthy()
    if (result.isLeft()) {
      expect(result.value).toBeInstanceOf(InvalidTitleError)
    }
  })
})
