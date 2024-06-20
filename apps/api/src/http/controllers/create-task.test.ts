import { eq } from 'drizzle-orm'
import { app } from 'src/app'
import request from 'supertest'

import { Db } from '../database/db'
import * as schema from '../database/schema'

describe('Create Task (e2e)', async () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a new task', async () => {
    const db = await Db.getInstance()

    const response = await request(app.server)
      .post(`/tasks`)
      // .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'New Task for testing',
      })

    expect(response.statusCode).toEqual(201)

    const task = await db.query.tasks.findFirst({
      where: eq(schema.tasks.title, 'New Task for testing'),
    })

    expect(task).toBeTruthy()
    expect(task?.title).toEqual('New Task for testing')
  })
})
