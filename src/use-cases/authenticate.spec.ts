import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { AuthenticateUseCase } from './authenticate'
import { InMemoryUsersRepository } from '@/repositories/in-memory-users-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })
  it('should be able to Authenticate', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'jCfJH@example.com',
      password_hash: await hash('123456', 6),
    })
    const { user } = await sut.execute({
      email: 'jCfJH@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to Authenticate with wrong email', async () => {
    expect(() =>
      sut.execute({
        email: 'jCfJH@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to Authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'jCfJH@example.com',
      password_hash: await hash('123456', 6),
    })

    expect(() =>
      sut.execute({
        email: 'jCfJH@example.com',
        password: 'adesese',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
