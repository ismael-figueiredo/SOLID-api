import { User, Prisma } from '@prisma/client'
import { UsersRepository } from './users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }
    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }
    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: '1-user',
      name: data.name,
      email: data.email,
      created_at: new Date(),
      password_hash: data.password_hash,
    }

    this.items.push(user)

    return user
  }
}
