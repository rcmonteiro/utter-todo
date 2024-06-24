import { type NextRequest } from 'next/server'

import TasksFileDb from '../../../../../__tests__/db.json'

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { taskId: string } },
) => {
  const { taskId } = params

  const task = TasksFileDb.find((task) => task.id === taskId)

  if (!task) {
    return new Response(null, { status: 404 })
  }

  task.completedAt = task.completedAt === null ? new Date().toISOString() : null

  return new Response(null, { status: 204 })
}

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { taskId: string } },
) => {
  const { taskId } = params

  const index = TasksFileDb.findIndex((task) => task.id === taskId)
  TasksFileDb.splice(index, 1)

  return new Response(null, { status: 204 })
}
