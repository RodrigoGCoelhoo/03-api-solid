import { User, Prisma } from '@prisma/client'
import { UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = []

  async findByEmail(email: string) {
    const user = this.users.find((user) => user.email === email) || null

    return user
  }

  async findById(id: string) {
    const user = this.users.find((user) => user.id === id) || null

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      ...data,
      id: `user-1`,
      createdAt: new Date(),
    }

    this.users.push(user)

    return user
  }
}
