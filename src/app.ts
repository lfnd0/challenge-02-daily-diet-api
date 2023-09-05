import fastify from 'fastify'

export const app = fastify()

app.addHook('preHandler', async (request) => {
  console.log(`[${request.method}] in ${request.url}`)
})
