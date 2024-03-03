import Fastify from 'fastify'

main()

async function main() {
  const fastify = setup()
  const port = parseInt(process.env.PORT || '3000')
  const host = 'RENDER' in process.env ? `0.0.0.0` : `localhost`

  fastify.listen({ host, port }, (error, address) => {
    if (error) {
      fastify.log.error(error)
      process.exit(1)
    }
    console.log(`Server is serving on ${address}`)
  })
}

function setup() {
  const fastify = Fastify()
  fastify.get('/mobius', async () => {
    return { hello: 'world' }
  })
  return fastify
}
