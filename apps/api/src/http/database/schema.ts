import { date, pgTable, uuid, varchar } from 'drizzle-orm/pg-core'

export const tasks = pgTable('Tasks', {
  id: uuid('id').primaryKey(),
  title: varchar('title', { length: 256 }).notNull(),
  createdAt: date('createdAt').notNull(),
  completedAt: date('completedAt'),
})
