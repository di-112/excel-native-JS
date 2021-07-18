const CODES = {
  A: 65,
  Z: 90,
}

// functions for create first(header) row *begin*

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

function toCol(content, id) {
  return `
   <div class="row__column" data-type="resizable" data-id="${id}">
   ${content}
   <div class="resize-col" data-resize="col"></div>
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

function toCell(rowNumber) {
  return function test(content, id) {
    return ` 
    <div class="row__cell" contenteditable="" data-type="cell" data-col="${id}"  data-id="${rowNumber}:${id}">
    ${content}
    </div>`
  }
}

function createRowCells(index) {
  const number = index + 1
  const countCols = CODES.Z - CODES.A + 1
  const cols = new Array(countCols).fill('').map(toCell(index))

  return `
   <div class="table__row row" data-type="resizable">
    <div class="row__info" data-row="info">${number}
      <div class="resize-row" data-resize="row"></div>  
    </div>
      ${cols.join('').trim()}
   </div>
   `
}

// functions for create data rows *end*

export function createTable(countRows = 20) {
  const headerTemplate = createRowHeader().trim()
  let cellsTemplate = []
  for (let i = 0; i < countRows; i++) cellsTemplate.push(createRowCells(i))
  cellsTemplate = cellsTemplate.join('').trim()
  return headerTemplate + cellsTemplate
}
