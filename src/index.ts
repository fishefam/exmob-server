import middleware from '@fastify/middie'
import Fastify from 'fastify'

import type { TRoute } from '../type/util'

import * as mobiusHTML from './handler/mobius/html'
import * as mobius from './handler/mobius/index'
import { cors } from './middleware'

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

  const routes: TRoute[] = [
    { handler: mobius.POST, method: 'post', path: '/mobius' },
    { handler: mobiusHTML.POST, method: 'post', path: '/mobius/html' },
  ]

  for (const { handler, method, path } of routes) fastify[method]('/' + path.replace(/^\//, ''), handler)

  return fastify
}
