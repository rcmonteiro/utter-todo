import { Todo } from '@/entities/todo'
import { Id } from '@/entities/value-objects/id'
import type { TodoRepository, TStatus } from '@/repositories/todo-repo'

export class FakeTodoRepository implements TodoRepository {
  items: Todo[] = []

  async create(data: Todo): Promise<Todo> {
    this.items.push(data)
    return data
  }

  async save(data: Todo): Promise<Todo> {
    const index = this.items.findIndex((todo) => todo.id.equals(data.id))
    this.items[index] = data
    return data
  }

  async delete(data: Todo): Promise<void> {
    const index = this.items.findIndex((todo) => todo.id.equals(data.id))
    this.items.splice(index, 1)
  }

  async findManyByStatus(status: TStatus): Promise<Todo[]> {
    return this.items.filter((todo) => {
      if (status === 'COMPLETED') {
        return todo.isCompleted()
      }
      if (status === 'PENDING') {
        return !todo.isCompleted()
      }
      return true
    })
  }

  async findById(todoId: string): Promise<Todo | null> {
    const todo = this.items.find((todo) => todo.id.equals(new Id(todoId)))
    if (!todo) {
      return null
    }
    return todo
  }
}
