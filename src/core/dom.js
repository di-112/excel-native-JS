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
}

export function $(selector) {
  return new Dom(selector)
}

$.create = (tag, classes) => {
  const element = document.createElement(tag)
  if (classes) classes.forEach((classItem) => element.classList.add(classItem))
  return $(element)
}
