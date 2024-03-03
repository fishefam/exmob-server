import type { FastifyRequest } from 'fastify'

export function getRequestBody<T extends object>(request: FastifyRequest) {
  return request.body as T
}
