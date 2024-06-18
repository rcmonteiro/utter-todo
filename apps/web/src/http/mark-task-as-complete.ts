import { api } from '@/lib/ky'

type MarkTaskAsCompleteRequest = {
  taskId: string
}

type FetchTasksResponse = {
  tasks: {
    id: string
    title: string
    createdAt: string
    completedAt?: string
  }[]
}

export async function markTaskAsComplete({
  taskId,
}: MarkTaskAsCompleteRequest) {
  const result = await api.patch(`tasks/${taskId}`).json<FetchTasksResponse>()
  return result
}
