import type { Task } from '@/entities/task'

export type TStatus = 'ALL' | 'COMPLETED' | 'PENDING'

export interface TaskRepository {
  create(data: Task): Promise<Task>
  save(data: Task): Promise<Task>
  delete(data: Task): Promise<void>
  findManyByStatus(status: TStatus): Promise<Task[]>
  findById(taskId: string): Promise<Task | null>
}
