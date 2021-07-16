import { ExcelComponent } from '@core/ExcelComponent'
import { $ } from '@core/dom'
import { createTable } from './table.template'

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
    if ($(event.target).data.resize) {
      const resizer = $(event.target)
      const resizeType = resizer.data.resize
      const resizeSide = resizeType === 'col' ? 'bottom' : 'right'
      resizer.css({
        opacity: 1,
        [resizeSide]: '-5000px',
      })
      let delta
      if (resizeType === 'col') {
        const col = resizer.getCloseParent('[data-type="resizable"]')
        const cells = this.root.findAll(`[data-id="${col.data.id}"]`)
        const currentCords = col.getCords()
        col.addClass('resize-now')
        document.onmousemove = (e) => {
          delta = e.clientX - currentCords.right
          resizer.css({ right: -delta + 'px' })
        }
        document.onmouseup = (e) => {
          const newValue = currentCords.width + delta
          col.css({ width: newValue + 'px' })
          cells.forEach((cell) => $(cell).css({ width: newValue + 'px' }))
          document.onmousemove = null
          document.onmouseup = null
          resizer.css({
            opacity: 0,
            bottom: 0,
            right: 0,
          })
          col.removeClass('resize-now')
        }
      } else {
        const row = resizer.getCloseParent('[data-type="resizable"]')
        const rowInfo = resizer.getCloseParent('[data-row="info"]')
        rowInfo.addClass('resize-now')
        const currentCords = row.getCords()
        document.onmousemove = (e) => {
          delta = e.clientY - currentCords.bottom
          resizer.css({ bottom: -delta + 'px' })
        }
        document.onmouseup = (e) => {
          document.onmousemove = null
          document.onmouseup = null
          const newValue = currentCords.height + delta
          row.css({ height: newValue + 'px' })
          resizer.css({
            opacity: 0,
            bottom: 0,
            right: 0,
          })
          rowInfo.removeClass('resize-now')
        }
      }
    }
  }

  // onMousemove(event) {
  //   console.log(event.target)
  // }
}
