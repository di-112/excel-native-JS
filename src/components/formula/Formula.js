import { ExcelComponent } from '@core/ExcelComponent'

export class Formula extends ExcelComponent {
  static className = 'formula'

  constructor(root) {
    super(root, {
      name: 'Formula',
      listeners: ['input', 'click'],
    })
  }

  toHTML() {
    return `
    <div class="formula__icon">
      <span class="material-icons"> functions </span>
    </div>
    <div class="formula__input" spellcheck="false" contenteditable=""></div>
    `
  }

  onInput(event) {
    console.log('onInput is working!', event.target.textContent.trim())
  }

  onClick() {
    console.log('onClick is working!')
  }
}
