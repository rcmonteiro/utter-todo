import { randomUUID } from 'crypto'
import request from 'supertest'

import { app } from '@/app'

import { Db } from '../database/db'
import * as schema from '../database/schema'

describe('Fetch Tasks (e2e)', async () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch all tasks', async () => {
    const db = await Db.getInstance()

    await db.insert(schema.tasks).values([
      {
        id: randomUUID(),
        title: 'New Pending Task for testing',
        createdAt: new Date().toISOString(),
      },
      {
        id: randomUUID(),
        title: 'New Completed Task for testing',
        createdAt: new Date().toISOString(),
        completedAt: new Date().toISOString(),
      },
    ])

    const response = await request(app.server)
      .get(`/tasks?status=ALL`)
      // .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)

    const tasks = response.body.tasks

    expect(tasks).toHaveLength(2)
    expect(tasks[0].title).toEqual('New Pending Task for testing')
  })
})
