class Dom {
  constructor(selector) {
    if (typeof selector === 'string') {
      this.element = document.querySelector(selector)
    } else this.element = selector
  }

  html(html) {
    if (typeof html === 'string') {
      this.element.insertAdjacentHTML('beforeend', html)
      return this
    } else return this.element.outerHTML.trim()
  }

  append(node) {
    if (node instanceof Dom) node = node.element
    this.element.append(node)
    return this
  }

  on(typeEvent, callback) {
    this.element.addEventListener(typeEvent, callback)
  }

  off(typeEvent, callback) {
    this.element.removeEventListener(typeEvent, callback)
  }

  focus() {
    this.element.focus()
    return this
  }

  getCords() {
    return this.element.getBoundingClientRect()
  }

  getCloseParent(selector) {
    return $(this.element.closest(selector))
  }

  find(selector) {
    return $(this.element.querySelector(selector))
  }

  findAll(selector) {
    return this.element.querySelectorAll(selector)
  }

  get data() {
    return this.element.dataset
  }

  text(str) {
    if (typeof str === 'string') {
      this.element.textContent = str
      return this
    }
    if (this.element.tagName.toLowerCase() === 'input') {
      return (this.element.value = str)
    }
    return this.element.textContent
  }

  id(parse) {
    if (!parse) return this.element.dataset.id
    else {
      const idArr = this.element.dataset.id.split(':')
      let [row, col] = idArr
      row = +row
      col = +col
      return {
        row,
        col,
      }
    }
  }

  css(props) {
    if (typeof props === 'object') {
      Object.keys(props).forEach(key => (this.element.style[key] = props[key]))
      return this
    } else {
      return window.getComputedStyle(this.element)[props]
    }
  }

  addClass(className) {
    this.element.classList.add(className)
    return this
  }

  removeClass(className) {
    this.element.classList.remove(className)
    return this
  }

  getFirstChild() {
    return $(this.element.firstChild)
  }
}

export function $(selector) {
  return new Dom(selector)
}

$.create = (tag, classes) => {
  const element = document.createElement(tag)
  if (classes) classes.forEach(classItem => element.classList.add(classItem))
  return $(element)
}
