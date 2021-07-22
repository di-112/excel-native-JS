import { ExcelComponent } from '@core/ExcelComponent'
import { $ } from '@core/dom'
import { CODES, createTable } from './table.template'
import { resizeHandler } from './table.resize'
import { getNextCellId, isCell, isResize, selectGroupCells } from './table.functions'
import { TableSelection } from './TableSelectioon'

export class Table extends ExcelComponent {
  constructor(root, options) {
    super(root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    })
    this.numberRows = 25
    this.numberCols = CODES.Z - CODES.A + 1
  }

  static className = 'table'

  toHTML() {
    const colWidth = this.store.getState().colState
    const rowHeight = this.store.getState().rowState
    return createTable(this.numberRows, colWidth, rowHeight)
  }

  prepare() {
    super.prepare()
    this.selection = new TableSelection()
  }

  init() {
    super.init()
    this.selection.select(this.root.find('[data-id="0:0"]'))
    this.$on('formula:input', text => this.selection.selectCells.forEach(cell => cell.text(text)))
    this.$on('formula:enter', () => this.selection.currentCell.focus())
    this.$emit('table:input', this.selection.currentCell.text())
  }

  async resizeHandlerAsync(event) {
    const data = await resizeHandler(this.root, event)
    const { id, value } = data
    data.resize === 'col'
      ? this.$dispatch({ type: 'TABLE_RESIZE_COL', data: { id, value } })
      : this.$dispatch({ type: 'TABLE_RESIZE_ROW', data: { id, value } })
  }

  onMousedown(event) {
    if (isResize(event)) this.resizeHandlerAsync(event)
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
      this.$emit('table:input', this.selection.currentCell.text())
    }
  }

  onInput(event) {
    this.$emit('table:input', $(event.target).text())
  }
}
