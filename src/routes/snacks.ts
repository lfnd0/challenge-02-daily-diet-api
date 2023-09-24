import { randomUUID } from 'crypto'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'
import { authorization } from '../middleware/authorization'
import { FastifyRequestCustom } from '../@types/fastify-request-custom'
import { countSequentialSnacksWithDietFlag } from '../utils/count-sequential-snacks'

export async function snacksRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async (request, reply) => {
    await authorization(request as FastifyRequestCustom, reply)
  })

  const getSnacksParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const createSnackBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    date: z.string(),
    hour: z.string(),
    is_in_diet: z.boolean().optional().default(true),
    user_id: z.string().optional(),
  })

  const updateSnackBodySchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    date: z.string().optional(),
    hour: z.string().optional(),
    is_in_diet: z.boolean().optional(),
    updated_at: z.string().optional(),
  })

  app.post('/', async (request, reply) => {
    const { userId } = request as FastifyRequestCustom
    const { name, description, date, hour, is_in_diet } =
      createSnackBodySchema.parse(request.body)

    await knex('snacks').insert({
      id: randomUUID(),
      name,
      description,
      date,
      hour,
      is_in_diet,
      user_id: userId,
    })

    return reply.status(201).send()
  })

  app.get('/', async (request) => {
    const { userId } = request as FastifyRequestCustom
    const snacks = await knex('snacks')
      .select('*')
      .where({ user_id: userId })
      .orderBy('created_at', 'asc')

    return {
      snacks,
    }
  })

  app.get('/:id', async (request, reply) => {
    const { userId } = request as FastifyRequestCustom
    const { id } = getSnacksParamsSchema.parse(request.params)
    const snack = await knex('snacks')
      .select('*')
      .where({ user_id: userId, id })
      .first()

    if (!snack) {
      return reply.status(404).send({
        message: 'snack not found',
      })
    }

    return {
      snack,
    }
  })

  app.patch('/:id', async (request, reply) => {
    const { userId } = request as FastifyRequestCustom
    const { id } = getSnacksParamsSchema.parse(request.params)
    const params = { user_id: userId, id }
    const snack = await knex('snacks').where(params).first()

    if (!snack) {
      return reply.status(404).send({
        message: 'snack not found',
      })
    }

    const { name, description, date, hour, is_in_diet } =
      updateSnackBodySchema.parse(request.body)

    await knex('snacks').where(params).update({
      name,
      description,
      date,
      hour,
      is_in_diet,
      updated_at: knex.fn.now(),
    })

    return reply.status(204).send()
  })

  app.delete('/:id', async (request, reply) => {
    const { userId } = request as FastifyRequestCustom
    const { id } = getSnacksParamsSchema.parse(request.params)
    const params = { user_id: userId, id }
    const snack = await knex('snacks').where(params).first()

    if (!snack) {
      return reply.status(404).send({
        message: 'snack not found',
      })
    }

    await knex('snacks').where(params).delete()

    return reply.status(202).send()
  })

  app.get('/metrics', async (request) => {
    const { userId } = request as FastifyRequestCustom

    const metrics = await knex('snacks')
      .select([
        knex.raw('COUNT(*) as totalAmountSnacks'),
        knex.raw(
          'SUM(CASE WHEN is_in_diet = true THEN 1 ELSE 0 END) AS totalAmountSnacksInTheDiet',
        ),
        knex.raw(
          'SUM(CASE WHEN is_in_diet = false THEN 1 ELSE 0 END) AS totalAmountSnacksNotInTheDiet',
        ),
        knex.raw(
          'ROUND((SUM(CASE WHEN is_in_diet = true THEN 1 ELSE 0 END) * 100.0 / COUNT(*)), 2) AS percentageSnacksInTheDiet',
        ),
      ])
      .where({ user_id: userId })
      .first()

    const { bestSnackSequence } = countSequentialSnacksWithDietFlag(
      await knex('snacks').where({ user_id: userId }).orderBy('created_at'),
    )

    await Promise.all([metrics, bestSnackSequence])

    return {
      metrics: { ...metrics, bestSnackSequence },
    }
  })
}
