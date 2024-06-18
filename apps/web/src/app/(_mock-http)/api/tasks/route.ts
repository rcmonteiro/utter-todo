import { faker } from '@faker-js/faker'
import type { TStatus } from '@utter-todo/domain'
import { type NextRequest, NextResponse } from 'next/server'

const fakeTasks = [
  {
    id: 1,
    title: 'Pending Task',
    createdAt: faker.date.recent({ days: 4 }).toISOString(),
  },
  {
    id: 2,
    title: 'Completed Task',
    createdAt: faker.date.recent({ days: 4 }).toISOString(),
    completedAt: faker.date.recent({ days: 1 }).toISOString(),
  },
].sort(
  (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
)

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams
  const status = (searchParams.get('status') || 'ALL') as TStatus
  const tasks = fakeTasks.filter((task) => {
    if (status === 'ALL') return true
    return status === 'COMPLETED' ? !!task.completedAt : !task.completedAt
  })
  return NextResponse.json({ tasks })
}
