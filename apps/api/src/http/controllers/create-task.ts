import { CreateTaskUseCase } from '@utter-todo/domain'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { BadRequestError } from '../_errors/bad-request-error'
import { Db } from '../database/db'
import { DrizzleTaskRepository } from '../repositories/drizzle-task-repo'

export const createTaskController = async (app: FastifyInstance) => {
  app
    .withTypeProvider<ZodTypeProvider>()
    // .register(auth)
    .post(
      '/tasks',
      {
        schema: {
          tags: ['Tasks'],
          summary: 'Create a new Task',
          body: z.object({
            title: z.string().min(3),
          }),
          response: {
            201: z.null(),
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
        const { title } = request.body

        const db = await Db.getInstance()
        const taskRepo = new DrizzleTaskRepository(db)
        const createTask = new CreateTaskUseCase(taskRepo)

        const result = await createTask.execute({
          title,
        })

        if (result.isLeft()) {
          const error = result.value
          switch (error.constructor) {
            default:
              throw new BadRequestError(error.message)
          }
        }

        return reply.status(201).send()
      },
    )
}
