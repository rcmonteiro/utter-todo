'use server'

import { HTTPError } from 'ky'
import { z } from 'zod'

import { createTask } from '@/http/create-task'
import { deleteTask } from '@/http/delete-task'
import { toggleTaskCompleted } from '@/http/toggle-task-completed'

export const toggleTaskCompletedAction = async ({
  taskId,
}: {
  taskId: string
}) => {
  try {
    await toggleTaskCompleted({ taskId })
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

export const deleteTaskAction = async ({ taskId }: { taskId: string }) => {
  try {
    await deleteTask({ taskId })
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

const createTaskSchema = z.object({
  title: z.string(),
})

export const createTaskAction = async (data: FormData) => {
  const formDataValidationResult = createTaskSchema.safeParse(
    Object.fromEntries(data),
  )

  if (!formDataValidationResult.success) {
    console.log(formDataValidationResult.error.issues)
    return false
  }

  const { title } = formDataValidationResult.data

  try {
    await createTask({ title })
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
