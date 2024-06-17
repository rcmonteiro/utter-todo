import type { Todo } from '@/entities/todo'

export type TStatus = 'ALL' | 'COMPLETED' | 'PENDING'

export interface TodoRepository {
  create(data: Todo): Promise<Todo>
  save(data: Todo): Promise<Todo>
  delete(data: Todo): Promise<void>
  findManyByStatus(status: TStatus): Promise<Todo[]>
  findById(todoId: string): Promise<Todo | null>
}
