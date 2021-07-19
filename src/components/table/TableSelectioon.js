export class TableSelection {
  constructor() {
    this.selectCells = []
    this.currentCell = null
  }

  select(element) {
    this.clear()
    this.currentCell = element
    this.selectCells.push(element)
    element.focus().addClass('selected')
  }

  selectGroup(elementArr) {
    this.clear()
    elementArr.forEach((element) => {
      this.selectCells.push(element)
      element.addClass('selected')
    })
  }

  clear() {
    this.selectCells.forEach((el) => el.removeClass('selected'))
    this.selectCells = []
  }
}
