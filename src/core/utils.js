export function toUpperCaseFirstChar(string) {
  if (typeof string !== 'string') return ''
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function getRange(start, end) {
  if (start > end) {
    const temp = end
    end = start
    start = temp
  }
  const length = end - start + 1
  const range = new Array(length).fill('').map((_, index) => start + index)
  return range
}
