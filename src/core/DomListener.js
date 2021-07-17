import { toUpperCaseFirstChar } from '@core/utils'

export class DomListener {
  constructor(root, options) {
    if (root) this.root = root
    else throw new Error('root is not defined "DomListener"')
    this.listeners = options.listeners
    this.name = options.name
  }

  initDOMListeners() {
    if (!this.listeners) return
    this.listeners.forEach((listener) => {
      const callBack = getCallBackName(listener)
      if (this[callBack]) {
        this[callBack] = this[callBack].bind(this)
        this.root.on(listener, this[callBack])
      } else throw new Error(`Not defined method ${callBack} from ${this.name}`)
    })
  }

  removeDOMListeners() {
    if (!this.listeners) return
    this.listeners.forEach((listener) => {
      const callBack = getCallBackName(listener)
      if (this[callBack]) this.root.off(listener, this[callBack])
    })
  }
}

function getCallBackName(listener) {
  return 'on' + toUpperCaseFirstChar(listener)
}
