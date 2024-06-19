import { api } from '@/lib/ky'

type CreateTaskRequest = {
  title: string
}

export async function createTask({ title }: CreateTaskRequest): Promise<void> {
  await api.post(`tasks`, {
    json: {
      title,
    },
  })
}
