import { DeleteTaskUseCase } from '@utter-todo/domain'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { BadRequestError } from '../_errors/bad-request-error'
import { Db } from '../database/db'
import { DrizzleTaskRepository } from '../repositories/drizzle-task-repo'

export const deleteTaskController = async (app: FastifyInstance) => {
  app
    .withTypeProvider<ZodTypeProvider>()
    // .register(auth)
    .delete(
      `/tasks/:taskId`,
      {
        schema: {
          tags: ['Tasks'],
          summary: 'Delete a given Task',
          params: z.object({
            taskId: z.string(),
          }),
          response: {
            204: z.null(),
            400: z.object({
              message: z.unknown(),
            }),
            401: z.object({
              message: z.string(),
            }),
          },
        },
      },
      async (request, reply) => {
        const { taskId } = request.params

        const db = await Db.getInstance()
        const taskRepo = new DrizzleTaskRepository(db)
        const deleteTask = new DeleteTaskUseCase(taskRepo)

        const result = await deleteTask.execute({
          taskId,
        })

        if (result.isLeft()) {
          const error = result.value
          switch (error.constructor) {
            default:
              throw new BadRequestError(error.message)
          }
        }

        return reply.status(204).send()
      },
    )
}
