import _cors from 'cors'

export function cors() {
  const isDevelopment = process.env.NODE_ENV !== 'production'
  const devOrigin = 'https://blank.page'
  const origin = /\.mobius.cloud$/
  return _cors({ credentials: true, methods: ['GET', 'POST'], origin: isDevelopment ? [devOrigin, origin] : origin })
}
