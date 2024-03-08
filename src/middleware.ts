import _cors from 'cors'

export function cors() {
  const useDevHost = process.env.DEV_HOST === 'true'
  const devOrigin = /\.blank.page$/
  const origin = /\.mobius.cloud$/
  return _cors({
    credentials: true,
    methods: ['GET', 'POST'],
    origin: '*',
    // origin: useDevHost ? [devOrigin, origin] : origin,
  })
}
