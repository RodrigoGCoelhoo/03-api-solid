import { Gym, Prisma } from '@prisma/client'
import { findManyNearbyParams, GymsRepository } from '../gyms-repository'
import { randomUUID } from 'node:crypto'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'

export class InMemoryGymsRepository implements GymsRepository {
  public gyms: Gym[] = []

  async findById(id: string) {
    const gym = this.gyms.find((gym) => gym.id === id) || null

    return gym
  }

  async searchMany(query: string, page: number) {
    const gyms = this.gyms.filter((gym) => gym.title.includes(query))

    return gyms.slice((page - 1) * 20, page * 20)
  }

  async findManyNearby(params: findManyNearbyParams) {
    const gyms = this.gyms.filter((gym) => {
      const distance = getDistanceBetweenCoordinates(
        {
          latitude: gym.latitude.toNumber(),
          longitude: gym.longitude.toNumber(),
        },
        {
          latitude: params.latitude,
          longitude: params.longitude,
        },
      )
      return distance <= 10
    })

    return gyms
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      createdAt: new Date(),
    }

    this.gyms.push(gym)

    return gym
  }
}
