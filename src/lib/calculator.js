export function sum(num1, num2) {
  const int1 = Number.parseInt(num1)
  const int2 = Number.parseInt(num2)

  if (Number.isNaN(int1) || Number.isNaN(int2)) {
    throw new Error('Please check your input')
  }

  return int1 + int2
}
