import _cors from 'cors'

export function cors() {
  return _cors({ credentials: true, methods: ['GET', 'POST'], origin: '*' })
}
