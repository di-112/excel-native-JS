import { ExcelComponent } from '@core/ExcelComponent'
import { createTable } from './table.template'
import { resizeHandler } from './table.resize'
import { isResize } from './table.functions'

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

  onMousedown(event) {
    if (isResize(event)) resizeHandler(this.root, event)
  }
}
