import { config } from 'dotenv'
import { sql } from 'drizzle-orm'
import { Db } from 'src/http/database/db'

config({
  path: '.env',
  override: true,
})

process.env.API_PORT = '4001'
process.env.NODE_ENV = 'test'

beforeAll(async () => {
  const db = await Db.getInstance()
  await db.execute(sql`TRUNCATE TABLE "Tasks"`)
})

afterAll(async () => {
  const db = await Db.getInstance()
  await db.execute(sql`TRUNCATE TABLE "Tasks"`)
})
