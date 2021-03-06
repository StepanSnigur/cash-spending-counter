const transformDate = (date) => {
  const transformedDate = new Date()
  const slicedDate = date.split(', ')
  const time = slicedDate[0].split(':')
  const calendarDate = slicedDate[1].split('.')

  transformedDate.setHours(time[0])
  transformedDate.setMinutes(time[1])
  transformedDate.setYear(calendarDate[2])
  transformedDate.setMonth(calendarDate[1])
  transformedDate.setDate(calendarDate[0])

  return transformedDate
}

const sorter = {
  sortByAlphabet(a, b) {
    return a.localeCompare(b)
  },
  sortByDate(a, b) {
    const dateA = transformDate(a)
    const dateB = transformDate(b)
    return dateA - dateB
  },
  sortByPrice(a, b) {
    return b - a
  },
}

export default sorter
