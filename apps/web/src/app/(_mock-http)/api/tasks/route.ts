import { faker } from '@faker-js/faker'
import type { TStatus } from '@utter-todo/domain'
import { type NextRequest, NextResponse } from 'next/server'

const fakeTasks = [
  {
    id: 1,
    title: 'Checking weather forecast',
    createdAt: faker.date.recent({ days: 4 }).toISOString(),
  },
  {
    id: 2,
    title: 'Reading news articles',
    createdAt: faker.date.recent({ days: 4 }).toISOString(),
  },
  {
    id: 3,
    title: 'Preparing a meal',
    createdAt: faker.date.recent({ days: 4 }).toISOString(),
  },
  {
    id: 4,
    title: 'Exercising (e.g., jogging, yoga)',
    createdAt: faker.date.recent({ days: 4 }).toISOString(),
  },
  {
    id: 5,
    title: 'Commuting to work or school',
    createdAt: faker.date.recent({ days: 4 }).toISOString(),
  },
  {
    id: 6,
    title: 'Responding to emails',
    createdAt: faker.date.recent({ days: 4 }).toISOString(),
  },
  {
    id: 7,
    title: 'Attending meetings',
    createdAt: faker.date.recent({ days: 4 }).toISOString(),
    completedAt: faker.date.recent({ days: 2 }).toISOString(),
  },
  {
    id: 8,
    title: 'Checking weather forecast',
    createdAt: faker.date.recent({ days: 4 }).toISOString(),
  },
  {
    id: 9,
    title: 'Reading news articles',
    createdAt: faker.date.recent({ days: 4 }).toISOString(),
    completedAt: faker.date.recent({ days: 2 }).toISOString(),
  },
  {
    id: 10,
    title: 'Preparing a meal',
    createdAt: faker.date.recent({ days: 4 }).toISOString(),
    completedAt: faker.date.recent({ days: 2 }).toISOString(),
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
