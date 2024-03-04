import type { FastifyReply, FastifyRequest } from 'fastify'

import { getRequestBody, sendJSONResponse, splitHTMLString } from '../../lib/util'

export async function POST(request: FastifyRequest, reply: FastifyReply) {
  const { html } = getRequestBody<{ html: string }>(request)
  const processedHTML = await splitHTMLString(html)
  sendJSONResponse(processedHTML, reply)
}
