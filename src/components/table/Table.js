import { ExcelComponent } from '@core/ExcelComponent'
import { $ } from '@core/dom'
import { CODES, createTable } from './table.template'
import { resizeHandler } from './table.resize'
import { getNextCellId, isCell, isResize, selectGroupCells } from './table.functions'
import { TableSelection } from './TableSelectioon'

export class Table extends ExcelComponent {
  constructor(root) {
    super(root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown'],
    })
    this.numberRows = 25
    this.numberCols = CODES.Z - CODES.A + 1
  }

  static className = 'table'

  toHTML() {
    return createTable(this.numberRows)
  }

  prepare() {
    super.prepare()
    this.selection = new TableSelection()
  }

  init() {
    super.init()
    this.selection.select(this.root.find('[data-id="0:0"]'))
  }

  onMousedown(event) {
    if (isResize(event)) resizeHandler(this.root, event)
    if (isCell(event)) {
      if (event.shiftKey) selectGroupCells(this.selection, this.root)
      else this.selection.select($(event.target))
    }
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab', 'ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft']
    if (keys.includes(event.key) && !event.shiftKey) {
      event.preventDefault()
      const currentCell = this.selection.currentCell
      const currentId = currentCell.id('parse')
      const nextId = getNextCellId(currentId, event.key, this.numberRows, this.numberCols)
      this.selection.select(this.root.find(`[data-id="${nextId.row}:${nextId.col}"]`))
    }
  }
}
