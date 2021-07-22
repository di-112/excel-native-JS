import { DomListener } from '@core/DomListener'

export class ExcelComponent extends DomListener {
  constructor(root, options = {}) {
    super(root, options)
    this.prepare()
    this.emitter = options.emitter
    this.store = options.store
    this.unsubs = []
  }

  prepare() {}

  init() {
    this.initDOMListeners()
  }

  $dispatch(action) {
    this.store.dispatch(action)
  }

  $subscribe(fn) {
    this.storeSub = this.store.subscribe(fn)
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
    this.storeSub.unsubscribe()
    this.unsubs.forEach(unsub => unsub())
  }

  toHTML() {
    return ``
  }
}
