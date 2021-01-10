import sleep from '../../src/utils/sleep'

jest.useFakeTimers()
describe('Sleep', () => {
  it('Call setTimeout', () => {
    sleep(300)
    expect(setTimeout).toHaveBeenCalledTimes(1)
  })
})