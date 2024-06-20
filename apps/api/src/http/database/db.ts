import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres'
import { Client } from 'pg'
import { env } from 'src/env'

import * as schema from './schema'

export class Db {
  private static instance: NodePgDatabase<typeof schema>

  public static async getInstance(): Promise<NodePgDatabase<typeof schema>> {
    if (!Db.instance) {
      const client = new Client({
        connectionString:
          env.NODE_ENV === 'test' ? env.DB_TEST_URL : env.DB_URL,
      })
      await client.connect()
      return drizzle(client, { schema })
    }
    return Db.instance
  }
}
