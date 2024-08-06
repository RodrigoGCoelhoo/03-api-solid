import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsUseCase } from './search-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'Ironberg',
      description: null,
      phone: null,
      latitude: -23.506472897932845,
      longitude: -46.878660828764644,
    })

    await gymsRepository.create({
      title: 'SmartFit',
      description: null,
      phone: null,
      latitude: -23.506472897932845,
      longitude: -46.878660828764644,
    })

    const { gyms } = await sut.execute({
      query: 'Ironberg',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'Ironberg',
      }),
    ])
  })

  it('should be able to fetch paginated users check-in history', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Ironberg ${i}`,
        description: null,
        phone: null,
        latitude: -23.506472897932845,
        longitude: -46.878660828764644,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Ironberg',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'Ironberg 21',
      }),
      expect.objectContaining({
        title: 'Ironberg 22',
      }),
    ])
  })
})
