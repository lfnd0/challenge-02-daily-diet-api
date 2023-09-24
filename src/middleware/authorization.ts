import { FastifyReply } from 'fastify'
import { User } from '../@types/user'
import { knex } from '../database'
import { FastifyRequestCustom } from '../@types/fastify-request-custom'

export async function authorization(
  request: FastifyRequestCustom,
  reply: FastifyReply,
) {
  const sessionId = request.cookies.sessionId
  if (!sessionId) {
    return reply.status(401).send({
      error: 'Unauthorized',
    })
  }

  const fetchUser = await knex<User>('users')
    .where('session_id', sessionId)
    .select('*')
    .first()
  if (!fetchUser) {
    return reply.status(401).send({
      error: 'Unauthorized',
    })
  }

  request.userId = fetchUser.id
}
