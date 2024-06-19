import { randomUUID } from 'node:crypto'

import request from 'supertest'

import { app } from '@/app'

import { Db } from '../database/db'
import * as schema from '../database/schema'
import { DrizzleTaskRepository } from '../repositories/drizzle-task-repo'

describe('Delete Task (e2e)', async () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to delete a task', async () => {
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

    const response = await request(app.server)
      .delete(`/tasks/${taskId}`)
      // .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(204)

    task = await taskRepo.findById(taskId)

    expect(task).toBeFalsy()
  })
})
