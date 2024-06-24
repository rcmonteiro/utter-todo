import { randomUUID } from 'node:crypto'

import { type NextRequest, NextResponse } from 'next/server'

import TasksFileDb from '../../../../__tests__/db.json'

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams
  const status = searchParams.get('status') || 'ALL'

  const tasks = TasksFileDb.filter((task) => {
    if (status === 'COMPLETED') {
      return task.completedAt !== null
    }

    if (status === 'PENDING') {
      return task.completedAt === null
    }

    return true
  })

  return NextResponse.json({ tasks })
}

export const POST = async (req: NextRequest) => {
  const task = await req.json()
  task.id = randomUUID()
  task.createdAt = new Date().toISOString()
  TasksFileDb.push(task)
  console.log(TasksFileDb)

  return new Response(null, { status: 201 })
}
