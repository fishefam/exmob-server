import type { RouteHandlerMethod } from 'fastify'

export type Route = {
  handler: RouteHandlerMethod
  method: 'delete' | 'get' | 'options' | 'patch' | 'post' | 'put'
  path: string
}
