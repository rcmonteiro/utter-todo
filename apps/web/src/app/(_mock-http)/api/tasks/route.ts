import {
  CreateTaskUseCase,
  FakeTaskRepository,
  FetchTasksUseCase,
  type TStatus,
} from '@utter-todo/domain'
import { type NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams
  const status = (searchParams.get('status') || 'ALL') as TStatus
  const taskRepo = FakeTaskRepository.getInstance() as FakeTaskRepository
  const fetchTasks = new FetchTasksUseCase(taskRepo)
  const result = await fetchTasks.execute({ status })

  if (result.isLeft()) {
    return NextResponse.json({ message: 'Error' }, { status: 400 })
  }

  const tasks = result.value.tasks
  console.log(tasks)

  return NextResponse.json({ tasks })
}

export const POST = async (req: NextRequest) => {
  const { title } = await req.json()

  const taskRepo = FakeTaskRepository.getInstance() as FakeTaskRepository
  const createTask = new CreateTaskUseCase(taskRepo)

  const result = await createTask.execute({ title })

  if (result.isLeft()) {
    return NextResponse.json({ message: 'Error' }, { status: 400 })
  }

  return new Response(null, { status: 201 })
}
