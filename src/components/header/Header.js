import { ExcelComponent } from '@core/ExcelComponent'

export class Header extends ExcelComponent {
  constructor(root, options) {
    super(root, {
      name: 'Header',
      listeners: [],
      ...options,
    })
  }

  static className = 'header'
  toHTML() {
    return `
    <div class="header__title">
    <input class="header__input" spellcheck="false" 
    type="text" contenteditable="" value="New Table" />
    </div>
    <div class="header__btns">
      <span class="material-icons"> delete </span>
      <span class="material-icons"> logout </span>
    </div>
      `
  }
}
