import type { TaskRepository, TStatus } from '@utter-todo/domain'
import { Task } from '@utter-todo/domain'
import { eq } from 'drizzle-orm'
import type { NodePgDatabase } from 'drizzle-orm/node-postgres'

import { DrizzleTaskMapper } from '../database/mappers/drizzle-task-mapper'
import * as schema from '../database/schema'

export class DrizzleTaskRepository implements TaskRepository {
  public items: Task[] = []

  constructor(private readonly db: NodePgDatabase<typeof schema>) {}

  async create(data: Task): Promise<Task> {
    await this.db.insert(schema.tasks).values(DrizzleTaskMapper.toDrizzle(data))
    return data
  }

  async save(data: Task): Promise<Task> {
    const toDb = DrizzleTaskMapper.toDrizzle(data)
    await this.db
      .update(schema.tasks)
      .set({
        title: toDb.title,
        completedAt: toDb.completedAt ?? null,
      })
      .where(eq(schema.tasks.id, data.id.toString()))
    return data
  }

  async delete(data: Task): Promise<void> {
    await this.db
      .delete(schema.tasks)
      .where(eq(schema.tasks.id, data.id.toString()))
  }

  async findManyByStatus(status: TStatus): Promise<Task[]> {
    console.log(status)
    const tasks = await this.db.query.tasks.findMany({})
    return tasks.map((task) => DrizzleTaskMapper.toDomain(task))
  }

  async findById(taskId: string): Promise<Task | null> {
    const task = await this.db.query.tasks.findFirst({
      where: eq(schema.tasks.id, taskId),
    })
    if (!task) {
      return null
    }
    return DrizzleTaskMapper.toDomain(task)
  }
}
