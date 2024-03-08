import type { FastifyReply, FastifyRequest } from 'fastify'

import { sendResponse } from '../lib/util'

export async function GET(_: FastifyRequest, reply: FastifyReply) {
  sendResponse({ keep: 'awake' }, reply)
}
