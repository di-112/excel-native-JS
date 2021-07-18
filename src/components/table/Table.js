import { ExcelComponent } from '@core/ExcelComponent'
import { $ } from '@core/dom'
import { createTable } from './table.template'
import { resizeHandler } from './table.resize'
import { isCell, isResize } from './table.functions'
import { TableSelection } from './TableSelectioon'

export class Table extends ExcelComponent {
  constructor(root) {
    super(root, {
      name: 'Table',
      listeners: ['mousedown'],
    })
  }

  static className = 'table'

  toHTML() {
    return createTable(25)
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
      event.shiftKey ? this.selection.selectGroup($(event.target)) : this.selection.select($(event.target))
    }
  }
}
