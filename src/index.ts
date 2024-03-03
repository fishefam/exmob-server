import type { FastifyRequest } from 'fastify'

import Fastify from 'fastify'

main()

async function main() {
  const fastify = setup()
  await fastify.listen({ port: 3000 })
}

function setup() {
  const fastify = Fastify()
  fastify.get('/mobius', async (request: FastifyRequest) => {
    return { hello: 'world' }
  })
  return fastify
}
