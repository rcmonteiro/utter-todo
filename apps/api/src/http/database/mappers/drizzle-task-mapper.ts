import { Task } from 'src/domain/entities/task'

type TDrizzleTask = {
  id: string
  title: string
  createdAt: string
  completedAt?: string | null
}

export abstract class DrizzleTaskMapper {
  public static toDomain(raw: TDrizzleTask): Task {
    return new Task({
      id: raw.id,
      title: raw.title,
      createdAt: raw.createdAt,
      completedAt: raw.completedAt,
    })
  }

  public static toDrizzle(task: Task): TDrizzleTask {
    return {
      id: task.id.toString(),
      title: task.title,
      createdAt: task.createdAt.toISOString(),
      completedAt: task.completedAt?.toISOString(),
    }
  }
}
