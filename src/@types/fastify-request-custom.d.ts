import { FastifyRequest } from 'fastify'

interface FastifyRequestCustom extends FastifyRequest {
  userId: string
}
