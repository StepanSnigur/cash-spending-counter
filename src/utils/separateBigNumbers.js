const separateBigNumbers = (num) => {
  const reversedNum = num.toString().split('').reverse()
  let commaCount = 0
  reversedNum.forEach((_, i) => {
    const nextArrIndex = i + 1
    if (nextArrIndex % 3 === 0 && nextArrIndex !== num.toString().length) {
      reversedNum.splice(nextArrIndex + commaCount, 0, ',')
      commaCount++
    }
  })
  return reversedNum.reverse().join('')
}

export default separateBigNumbers
