import { getRange } from '@core/utils'
import { $ } from '@core/dom'

export function isResize(event) {
  return event.target.dataset.resize ? true : false
}

export function isCell(event) {
  return event.target.dataset.type === 'cell' ? true : false
}

export function selectGroupCells(selection, root) {
  const currentCell = selection.currentCell
  const targetCell = $(event.target)
  const colRange = getRange(currentCell.id('parse').col, targetCell.id('parse').col)
  const rowRange = getRange(currentCell.id('parse').row, targetCell.id('parse').row)
  const selectedIdArr = rowRange.reduce((accumulator, row) => {
    colRange.forEach(col => accumulator.push(`${row}:${col}`))
    return accumulator
  }, [])
  const selectedCells = selectedIdArr.map(id => root.find(`[data-id="${id}"]`))
  selection.selectGroup(selectedCells)
}

export function getNextCellId(currentId, key, numberRows, numberCols) {
  let nextCellId
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      if (currentId.row != numberRows - 1) nextCellId = { ...currentId, row: currentId.row + 1 }
      else nextCellId = currentId
      break
    case 'ArrowUp':
      if (currentId.row != 0) nextCellId = { ...currentId, row: currentId.row - 1 }
      else nextCellId = currentId
      break
    case 'Tab':
    case 'ArrowRight':
      if (currentId.col != numberCols - 1) nextCellId = { ...currentId, col: currentId.col + 1 }
      else nextCellId = currentId
      break
    case 'ArrowLeft':
      if (currentId.col != 0) nextCellId = { ...currentId, col: currentId.col - 1 }
      else nextCellId = currentId
      break
  }
  return nextCellId
}
