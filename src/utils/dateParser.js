// minuteParser converts '7' to '07'
export const withZero = (time) => {
  const stringTime = time.toString()
  return stringTime.length === 1 ? `0${stringTime}` : stringTime
}

const dateParser = (date) => {
  if (!date) throw new Error('{dateParser} | You must provide Date object')
  if (!(date instanceof Date)) throw new Error('{dateParser} | date must be Date instance')

  const hours = withZero(date.getHours())
  const minutes = withZero(date.getMinutes())
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  return {
    hours,
    minutes,
    day,
    month,
    year,
    string: `${hours}:${minutes}, ${day}.${month}.${year}`,
  }
}

export default dateParser
