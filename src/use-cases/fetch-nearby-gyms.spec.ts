import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearvy gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -23.506472897932845,
      longitude: -46.878660828764644,
    })

    await gymsRepository.create({
      title: 'Far gym',
      description: null,
      phone: null,
      latitude: -23.0,
      longitude: -46.0,
    })

    const { gyms } = await sut.execute({
      userLatitude: -23.507,
      userLongitude: -46.879,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'Near Gym',
      }),
    ])
  })
})
