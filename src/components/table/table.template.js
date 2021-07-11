const CODES = {
  A: 65,
  Z: 90,
}

// functions for create first(header) row *begin*

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

function toCol(content) {
  return `
   <div class="row__column">
   ${content}
   <div class="resize-col"></div>
   </div>`
}

function createRowHeader() {
  const countCols = CODES.Z - CODES.A + 1

  const cols = new Array(countCols).fill('').map(toChar).map(toCol)

  return `
     <div class="table__row table__header row">
        <div class="row__info"></div>
       ${cols.join('').trim()}
     </div>
     `
}

// functions for create first(header) row *end*

// functions for create data rows *begin*

function toCell(content) {
  return `<div class="row__cell" contenteditable="">${content}</div>`
}

function createRowCells(number = 1) {
  const countCols = CODES.Z - CODES.A + 1
  const cols = new Array(countCols).fill('').map(toCell)

  return `
   <div class="table__row row">
      <div class="row__info">${number}
      <div class="resize-row"></div>  
    </div>
      ${cols.join('').trim()}
   </div>
   `
}

// functions for create data rows *end*

export function createTable(countRows = 20) {
  const headerTemplate = createRowHeader().trim()
  let cellsTemplate = []
  for (let i = 0; i < countRows; i++) cellsTemplate.push(createRowCells(i + 1))
  cellsTemplate = cellsTemplate.join('').trim()
  return headerTemplate + cellsTemplate
}
