import { ExcelComponent } from '../../core/ExcelComponent'

export class Toolbar extends ExcelComponent {
  static className = 'toolbar'
  toHTML() {
    return `
      <div class="toolbar__btns">
        <span class="material-icons"> format_align_left </span>
        <span class="material-icons active"> format_align_center </span>
        <span class="material-icons"> format_align_right </span>
        <span class="material-icons"> format_bold </span>
        <span class="material-icons"> format_italic </span>
        <span class="material-icons"> text_format </span>
      </div>
      `
  }
}
