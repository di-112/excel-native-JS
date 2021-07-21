export class TableSelection {
  constructor() {
    this.selectCells = []
    this.currentCell = null
    this.className = 'selected'
  }

  select(element) {
    this.clear()
    this.currentCell = element
    this.selectCells.push(element)
    element.focus().addClass(this.className)
  }

  selectGroup(elementArr) {
    this.clear()
    elementArr.forEach(element => {
      this.selectCells.push(element)
      element.addClass('selected')
    })
  }

  clear() {
    this.selectCells.forEach(el => el.removeClass(this.className))
    this.selectCells = []
  }
}
