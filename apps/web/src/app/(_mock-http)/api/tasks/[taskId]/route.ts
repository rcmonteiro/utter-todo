import { type NextRequest } from 'next/server'

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { taskId: string } },
) => {
  const { taskId } = params

  console.log('PATCH', taskId)

  return new Response(null, { status: 204 })
}

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { taskId: string } },
) => {
  const { taskId } = params

  console.log('DELETE', taskId)

  return new Response(null, { status: 204 })
}
