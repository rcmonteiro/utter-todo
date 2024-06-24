import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { ToggleTaskCompletedUseCase } from 'src/domain/use-cases/toggle-task-completed'
import { z } from 'zod'

import { BadRequestError } from '../_errors/bad-request-error'
import { Db } from '../database/db'
import { DrizzleTaskRepository } from '../repositories/drizzle-task-repo'

export const toggleTaskCompletedController = async (app: FastifyInstance) => {
  app
    .withTypeProvider<ZodTypeProvider>()
    // .register(auth)
    .patch(
      `/tasks/:taskId`,
      {
        schema: {
          tags: ['Tasks'],
          summary: 'Toggle completed status of a given Task',
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
        const toggleTaskCompleted = new ToggleTaskCompletedUseCase(taskRepo)

        const result = await toggleTaskCompleted.execute({
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
