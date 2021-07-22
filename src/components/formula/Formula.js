import { ExcelComponent } from '@core/ExcelComponent'

export class Formula extends ExcelComponent {
  static className = 'formula'

  constructor(root, options) {
    super(root, {
      name: 'Formula',
      listeners: ['input', 'click', 'keydown'],
      ...options,
    })
  }

  toHTML() {
    return `
    <div class="formula__icon">
      <span class="material-icons"> functions </span>
    </div>
    <div id="formula__input" class="formula__input" spellcheck="false" contenteditable=""></div>
    `
  }

  init() {
    super.init()
    const formulaInput = this.root.find('#formula__input')
    this.$on('table:input', str => formulaInput.text(str))
  }

  onInput(event) {
    this.$emit('formula:input', event.target.textContent.trim())
  }

  onClick() {
    // this.$dispatch({ type: 'TABLE_RESIZE', data: { id: Math.floor(Math.random() * 100), value: 315 } })
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab']
    if (keys.includes(event.key)) {
      event.preventDefault()
      this.$emit('formula:enter')
    }
  }
}
