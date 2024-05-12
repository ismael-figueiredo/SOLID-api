import { FastifyInstance } from 'fastify'
import { register } from './contrllers/rigister'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
}
