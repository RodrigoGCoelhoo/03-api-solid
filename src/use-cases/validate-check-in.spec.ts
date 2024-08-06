import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-checkins-repository'
import { ValidateCheckInUseCase } from './validate-check-in'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { LateCheckInValidationError } from './errors/late-check-in-validation-error'

let checkInsRepository: InMemoryCheckInsRepository
let sut: ValidateCheckInUseCase

describe('Validate Check-in Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new ValidateCheckInUseCase(checkInsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to validate the check-in', async () => {
    const createdCheckIn = await checkInsRepository.create({
      userId: 'user-01',
      gymId: 'gym-01',
    })

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    })

    expect(checkIn.validatedAt).toEqual(expect.any(Date))
    expect(checkInsRepository.checkIns[0].validatedAt).toEqual(expect.any(Date))
  })

  it('should not be able to validate an inexistent check-in', async () => {
    await expect(() =>
      sut.execute({ checkInId: 'inexistent-check-in' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to validate a check-in after 20 minutes from its creation', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40))

    const createdCheckIn = await checkInsRepository.create({
      userId: 'user-01',
      gymId: 'gym-01',
    })

    vi.advanceTimersByTime(1000 * 60 * 21) // 21 minutes

    await expect(() =>
      sut.execute({ checkInId: createdCheckIn.id }),
    ).rejects.toBeInstanceOf(LateCheckInValidationError)
  })
})
