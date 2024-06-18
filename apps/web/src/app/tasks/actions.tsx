'use server'

import { HTTPError } from 'ky'

import { markTaskAsComplete } from '@/http/mark-task-as-complete'

export const markTaskAsCompleteAction = async ({
  taskId,
}: {
  taskId: string
}) => {
  try {
    await markTaskAsComplete({ taskId })
    return true
  } catch (error) {
    if (error instanceof HTTPError) {
      console.log(error)
      const { message } = await error.response.json()
      console.log(message)
      // return { success: false, message, errors: null }
    }
    console.error(error)
    return false
  }
}
