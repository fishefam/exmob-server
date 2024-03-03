import Fastify from 'fastify'

main()

async function main() {
  const fastify = setup()
  fastify.listen({ port: parseInt(process.env.PORT ?? '3000') }, (error, address) => {
    if (error) {
      fastify.log.error(error)
      process.exit(1)
    }
  })
}

function setup() {
  const fastify = Fastify()
  fastify.get('/mobius', async () => {
    return { hello: 'world' }
  })
  return fastify
}
