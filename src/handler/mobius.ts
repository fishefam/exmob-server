import type { FastifyReply, FastifyRequest } from 'fastify'

import { getRequestBody } from 'lib/util'

export function POST(request: FastifyRequest, reply: FastifyReply) {
  const { algorithm } = getRequestBody<{ algorithm: string }>(request)
  reply.send({ reached: 'ok' })
}
