import { DomListener } from '@core/DomListener'

export class ExcelComponent extends DomListener {
  constructor(root, options = {}) {
    super(root, options)
    this.prepare()
    this.emitter = options.emitter
    this.unsubs = []
  }

  prepare() {}

  init() {
    this.initDOMListeners()
  }

  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  $on(event, callback) {
    const unsub = this.emitter.subscribe(event, callback)
    this.unsubs.push(unsub)
  }

  destroy() {
    this.removeDOMListeners()
    this.unsubs.forEach(unsub => unsub())
  }

  toHTML() {
    return ``
  }
}
