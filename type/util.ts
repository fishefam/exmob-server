import type { RouteHandlerMethod } from 'fastify'

export type TRoute = {
  handler: RouteHandlerMethod
  method: 'delete' | 'get' | 'options' | 'patch' | 'post' | 'put'
  path: string
}
