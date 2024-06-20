import { randomUUID } from 'node:crypto'

import { app } from 'src/app'
import request from 'supertest'

import { Db } from '../database/db'
import * as schema from '../database/schema'
import { DrizzleTaskRepository } from '../repositories/drizzle-task-repo'

describe('Toggle Task Completed (e2e)', async () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to mark a task as completed', async () => {
    const db = await Db.getInstance()
    const taskRepo = new DrizzleTaskRepository(db)

    const [{ taskId }] = await db
      .insert(schema.tasks)
      .values({
        id: randomUUID(),
        title: 'New Task for testing',
        createdAt: new Date().toISOString(),
      })
      .returning({ taskId: schema.tasks.id })

    let task = await taskRepo.findById(taskId)

    expect(task).toBeTruthy()
    expect(task?.title).toEqual('New Task for testing')
    expect(task?.completedAt).toBeNull()

    const response = await request(app.server)
      .patch(`/tasks/${taskId}`)
      // .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(204)

    task = await taskRepo.findById(taskId)

    expect(task).toBeTruthy()
    expect(task?.title).toEqual('New Task for testing')
    expect(task?.completedAt).toBeDefined()
  })
})
