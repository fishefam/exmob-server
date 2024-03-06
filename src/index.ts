import middleware from '@fastify/middie'
import Fastify from 'fastify'

import type { Route } from '../type/util'

import * as mobiusHTML from './handler/mobius/html'
import * as mobius from './handler/mobius/index'
import { getPort } from './lib/util'
import { cors } from './middleware'

main()

async function main() {
  const fastify = await setup()
  const port = parseInt(process.env.PORT || (await getPort(3000)).toString())
  const host = process.env.RENDER ? `0.0.0.0` : `localhost`

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
  const routes: Route[] = [
    { handler: mobius.POST, method: 'post', path: '/mobius' },
    { handler: mobiusHTML.POST, method: 'post', path: '/mobius/html' },
  ]

  for (const { handler, method, path } of routes) fastify[method]('/' + path.replace(/^\//, ''), handler)

  return fastify
}
