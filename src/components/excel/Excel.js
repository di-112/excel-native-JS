import { $ } from '../../core/dom'
import { Emmitter } from '../../core/Emitter'

export class Excel {
  constructor(selector, options = {}) {
    this.app = $(selector)
    this.components = options.components || []
    this.store = options.store
    this.emitter = new Emmitter()
  }

  loadComponentInstance(Component, root) {
    const excelComponentWrap = $.create('div', [`excel__${Component.className}`, Component.className])
    const options = { emitter: this.emitter, store: this.store }
    const component = new Component(excelComponentWrap, options)
    excelComponentWrap.html(component.toHTML())
    root.append(excelComponentWrap)
    return component
  }

  getRoot() {
    if (!this.components) return
    const root = $.create('div', ['excel'])
    this.components = this.components.map(Component => this.loadComponentInstance(Component, root))
    return root
  }

  render() {
    this.app.append(this.getRoot())
    this.components.forEach(component => component.init())
  }

  destroy() {
    this.components.forEach(component => component.destroy())
  }
}
