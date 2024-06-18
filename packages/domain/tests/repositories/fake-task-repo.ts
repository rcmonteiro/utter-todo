import { Task } from '@/entities/task'
import { Id } from '@/entities/value-objects/id'
import type { TaskRepository, TStatus } from '@/repositories/task-repo'

export class FakeTaskRepository implements TaskRepository {
  items: Task[] = []

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