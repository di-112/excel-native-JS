import { toUpperCaseFirstChar } from '@core/utils'

export class DomListener {
  constructor(root, listeners) {
    if (root) this.root = root
    else throw new Error('root is not defined "DomListener"')
    this.listeners = listeners
  }

  initDOMListeners() {
    if (!this.listeners) return
    this.listeners.forEach((listener) => {
      const callBack = getCallBackName(listener)
      if (this[callBack]) this.root.on(listener, this[callBack].bind(this))
    })
  }

  removeDOMListeners() {}
}

function getCallBackName(listener) {
  return 'on' + toUpperCaseFirstChar(listener)
}
