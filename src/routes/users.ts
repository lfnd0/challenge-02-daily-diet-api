import { randomUUID } from 'crypto'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'

export async function usersRoutes(app: FastifyInstance) {
  const createUserBodySchema = z.object({
    username: z.string(),
  })

  app.post('/', async (request, reply) => {
    const sessionId = randomUUID()
    const { username } = createUserBodySchema.parse(request.body)

    await knex('users').insert({
      id: randomUUID(),
      username,
      session_id: sessionId,
    })

    reply.cookie('sessionId', sessionId, {
      path: '/',
    })

    return reply.status(201).send()
  })
}
