export class TableSelection {
  constructor() {
    this.selectCells = []
  }

  select(element) {
    this.clear()
    this.addElement(element)
  }

  selectGroup(element) {
    this.addElement(element)
  }

  clear() {
    this.selectCells.forEach((el) => el.removeClass('selected'))
    this.selectCells = []
  }

  addElement(element) {
    this.selectCells.push(element)
    element.addClass('selected')
  }
}
