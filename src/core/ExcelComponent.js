import { DomListener } from '@core/DomListener'

export class ExcelComponent extends DomListener {
  constructor(root, options = {}) {
    super(root, options)
  }

  init() {
    this.initDOMListeners()
  }

  remove() {
    this.removeDOMListeners()
  }

  toHTML() {
    return ``
  }
}
