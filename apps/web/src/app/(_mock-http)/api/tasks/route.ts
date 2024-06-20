import { type NextRequest, NextResponse } from 'next/server'

import TasksFileDb from '../../../../__tests__/db.json'

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams
  const status = searchParams.get('status') || 'ALL'

  console.log(status)

  const tasks = TasksFileDb

  return NextResponse.json({ tasks })
}

export const POST = async () => {
  return new Response(null, { status: 201 })
}
