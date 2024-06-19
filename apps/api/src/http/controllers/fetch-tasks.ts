import { FetchTasksUseCase } from '@utter-todo/domain'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { BadRequestError } from '../_errors/bad-request-error'
import { Db } from '../database/db'
import { TaskPresenter } from '../presenters/task-presenter'
import { DrizzleTaskRepository } from '../repositories/drizzle-task-repo'

export const fetchTasksController = async (app: FastifyInstance) => {
  app
    .withTypeProvider<ZodTypeProvider>()
    // .register(auth)
    .get(
      '/tasks',
      {
        schema: {
          tags: ['Tasks'],
          summary: 'Fetch Tasks',
          response: {
            200: z.object({
              tasks: z.array(
                z.object({
                  id: z.string(),
                  title: z.string(),
                  createdAt: z.string(),
                  completedAt: z.string().nullable(),
                }),
              ),
            }),
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
        const db = await Db.getInstance()
        const taskRepo = new DrizzleTaskRepository(db)
        const fetchTasks = new FetchTasksUseCase(taskRepo)

        const result = await fetchTasks.execute({
          status: 'ALL',
        })

        if (result.isLeft()) {
          const error = result.value
          switch (error.constructor) {
            default:
              throw new BadRequestError(error.message)
          }
        }

        const tasks = result.value.tasks

        return reply.status(200).send({
          tasks: tasks.map(TaskPresenter.toHTTP),
        })
      },
    )
}
