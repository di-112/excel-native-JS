export const CODES = {
  A: 65,
  Z: 90,
}

const defaultWidthCol = '100px'
const defaultHeightRow = '23px'

// functions for create first(header) row *begin*

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

function toColWithWidth(colWidth) {
  return function toCol(content, id) {
    const width = colWidth[id] ? colWidth[id] + 'px' : defaultWidthCol
    return `
   <div class="row__column" style="width:${width}" data-type="resizable" data-col="${id}">
   ${content}
   <div class="resize-col" data-resize="col"></div>
   </div>`
  }
}

function createRowHeader(colWidth) {
  const countCols = CODES.Z - CODES.A + 1

  const cols = new Array(countCols).fill('').map(toChar).map(toColWithWidth(colWidth))

  return `
     <div class="table__row table__header row">
        <div class="row__info"></div>
       ${cols.join('').trim()}
     </div>
     `
}

// functions for create first(header) row *end*

// functions for create data rows *begin*

function toCell(rowNumber, colWidth) {
  return function func(content, id) {
    return ` 
    <div class="row__cell" contenteditable="" data-type="cell"  
    style="width:${colWidth[id] ? colWidth[id] + 'px' : '100px'}" data-col="${id}"  data-id="${rowNumber}:${id}">
    ${content}
    </div>`
  }
}

function createRowCells(index, colWidth, rowHeight) {
  const number = index + 1
  const countCols = CODES.Z - CODES.A + 1
  const cols = new Array(countCols).fill('').map(toCell(index, colWidth))
  const height = rowHeight[index] ? rowHeight[index] + 'px' : defaultHeightRow
  return `
   <div class="table__row row" style="height: ${height}" data-type="resizable" data-row="${index}">
    <div class="row__info" data-row="info">${number}
      <div class="resize-row" data-resize="row"></div>  
    </div>
      ${cols.join('').trim()}
   </div>
   `
}

// functions for create data rows *end*

export function createTable(countRows = 20, colWidth = 100, rowHeight = 23) {
  const headerTemplate = createRowHeader(colWidth).trim()
  let cellsTemplate = []
  for (let index = 0; index < countRows; index++) cellsTemplate.push(createRowCells(index, colWidth, rowHeight))
  cellsTemplate = cellsTemplate.join('').trim()
  return headerTemplate + cellsTemplate
}
