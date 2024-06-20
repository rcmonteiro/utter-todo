import type { Task } from 'src/entities/task'
import { Id } from 'src/entities/value-objects/id'
import type { TaskRepository, TStatus } from 'src/repositories/task-repo'

export class FakeTaskRepository implements TaskRepository {
  items: Task[] = []

  private static instance: TaskRepository

  public static getInstance(): TaskRepository {
    if (!FakeTaskRepository.instance) {
      FakeTaskRepository.instance = new FakeTaskRepository()
    }
    return FakeTaskRepository.instance
  }

  async create(data: Task): Promise<Task> {
    this.items.push(data)
    return data
  }

  async save(data: Task): Promise<Task> {
    const index = this.items.findIndex((task) => task.id.equals(data.id))
    this.items[index] = data
    return data
  }

  async delete(data: Task): Promise<void> {
    const index = this.items.findIndex((task) => task.id.equals(data.id))
    this.items.splice(index, 1)
  }

  async findManyByStatus(status: TStatus): Promise<Task[]> {
    return this.items.filter((task) => {
      if (status === 'COMPLETED') {
        return task.isCompleted()
      }
      if (status === 'PENDING') {
        return !task.isCompleted()
      }
      return true
    })
  }

  async findById(taskId: string): Promise<Task | null> {
    const task = this.items.find((task) => task.id.equals(new Id(taskId)))
    if (!task) {
      return null
    }
    return task
  }
}
