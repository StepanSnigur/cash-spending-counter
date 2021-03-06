import separateBigNumbers from '../../src/utils/separateBigNumbers'

describe('separateBigNumbers', () => {
  const testNums = {
    12: '12',
    123: '123',
    1000: '1,000',
    16149: '16,149',
    526400: '526,400',
    1000000: '1,000,000',
    11000000: '11,000,000',
    1000000000: '1,000,000,000',
    11000000000: '11,000,000,000',
  }

  it('Correct separating numbers', () => {
    Object.keys(testNums).forEach(num => {
      expect(separateBigNumbers(num)).toEqual(testNums[num])
    })
  })
})
