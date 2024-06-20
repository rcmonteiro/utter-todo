import { api } from '../lib/ky'

type FetchTasksRequest = {
  status: 'ALL' | 'COMPLETED' | 'PENDING'
}

type FetchTasksResponse = {
  tasks: {
    id: string
    title: string
    createdAt: string
    completedAt?: string
  }[]
}

export async function fetchTasks({ status }: FetchTasksRequest) {
  const result = await api
    .get(`tasks?status=${status}`)
    .json<FetchTasksResponse>()

  return result
}
