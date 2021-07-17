import { $ } from '../../core/dom'

export class Excel {
  constructor(selector, components) {
    this.app = $(selector)
    this.components = components || []
  }

  loadComponentInstance(Component, root) {
    const excelComponentWrap = $.create('div', [`excel__${Component.className}`, Component.className])
    const component = new Component(excelComponentWrap)
    excelComponentWrap.html(component.toHTML())
    root.append(excelComponentWrap)
    return component
  }

  getRoot() {
    if (!this.components) return
    const root = $.create('div', ['excel'])
    this.components = this.components.map((Component) => this.loadComponentInstance(Component, root))
    return root
  }

  render() {
    this.app.append(this.getRoot())
    this.components.forEach((component) => component.init())
  }
}
