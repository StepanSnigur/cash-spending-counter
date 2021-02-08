/* eslint-disable no-undef */
import dateParser, { withZero } from '../../src/utils/dateParser'

describe('Date parser', () => {
  it('Returns correct object', () => {
    const date = new Date()
    const hours = withZero(date.getHours())
    const minutes = withZero(date.getMinutes())
    const day = withZero(date.getDate())
    const month = withZero(date.getMonth() + 1)
    const year = date.getFullYear()
    const result = {
      hours,
      minutes,
      day,
      month,
      year,
      string: `${hours}:${minutes}, ${day}.${month}.${year}`,
    }

    expect(dateParser(date)).toEqual(result)
  })
  it('Returns correct string', () => {
    const date = new Date('1995-12-17T03:24:00')
    expect(dateParser(date).string).toEqual('03:24, 17.12.1995')
  })
})
