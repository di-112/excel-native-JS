import { DomListener } from '@core/DomListener'

export class ExcelComponent extends DomListener {
  constructor(root, options = {}) {
    super(root, options)
    this.prepare()
  }

  prepare() {}

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
