export class MaxDistanceError extends Error {
  constructor() {
    super('Max distance reached. Please select a gym closer to you.')
  }
}
