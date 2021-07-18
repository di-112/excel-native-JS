export function isResize(event) {
  return event.target.dataset.resize ? true : false
}

export function isCell(event) {
  return event.target.dataset.type === 'cell' ? true : false
}
