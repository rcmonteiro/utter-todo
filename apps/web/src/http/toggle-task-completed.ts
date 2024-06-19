import { api } from '@/lib/ky'

type ToggleTaskCompletedRequest = {
  taskId: string
}

export async function toggleTaskCompleted({
  taskId,
}: ToggleTaskCompletedRequest): Promise<void> {
  await api.patch(`tasks/${taskId}`)
}
