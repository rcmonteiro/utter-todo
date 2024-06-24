import type { Task } from 'src/domain/entities/task'

export abstract class TaskPresenter {
  static toHTTP(task: Task) {
    return {
      id: task.id.toString(),
      title: task.title,
      createdAt: task.createdAt.toISOString(),
      completedAt: task.completedAt ? task.completedAt.toISOString() : null,
    }
  }
}
