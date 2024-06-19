import { api } from '@/lib/ky'

type DeleteTaskRequest = {
  taskId: string
}

export async function deleteTask({ taskId }: DeleteTaskRequest): Promise<void> {
  await api.delete(`tasks/${taskId}`)
}
