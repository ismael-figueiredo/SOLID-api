import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { PrismaUsersRepository } from '@/repositories/prisma-users-repository'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}
export async function registerUseCase({
  name,
  email,
  password,
}: RegisterUseCaseRequest) {
  const password_hash = await hash(password, 6)
  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userWithSameEmail) {
    throw new Error('User already exists')
  }

  const prismaUsersrepository = new PrismaUsersRepository()

  await prismaUsersrepository.create({
    name,
    email,
    password_hash,
  })
}
