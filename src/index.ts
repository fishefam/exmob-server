import middleware from '@fastify/middie'
import Fastify from 'fastify'

import * as mobius from './handler/mobius.ts'
import { cors } from './middleware.ts'

main()

async function main() {
  const fastify = await setup()
  const port = parseInt(process.env.PORT || '3000')
  const host = 'RENDER' in process.env ? `0.0.0.0` : `localhost`

  fastify.listen({ host, port }, (error, address) => {
    if (error) {
      fastify.log.error(error)
      process.exit(1)
    }
    console.log(`Server is running on ${/\[.*\]/.test(address) ? `${host}:${port}` : address}`)
  })
}

async function setup() {
  const fastify = Fastify()

  await fastify.register(middleware)
  fastify.use(cors())

  fastify.post('/mobius', mobius.POST)
  return fastify
}
