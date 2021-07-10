import { ExcelComponent } from '@core/ExcelComponent'

export class Table extends ExcelComponent {
  static className = 'table'
  toHTML() {
    return `
    <div class="table__row table__header row">
      <div class="row__info"></div>
      <div class="row__column">A</div>
      <div class="row__column">B</div>
      <div class="row__column">C</div>
    </div>
    <div class="table__row row">
      <div class="row__info">1</div>
      <div class="row__cell selected" contenteditable="">A1</div>
      <div class="row__cell" contenteditable="">B1</div>
      <div class="row__cell" contenteditable="">C1</div>
    </div>
    <div class="table__row row">
      <div class="row__info">2</div>
      <div class="row__cell" contenteditable="">A2</div>
      <div class="row__cell" contenteditable="">B2</div>
      <div class="row__cell" contenteditable="">C2</div>
    </div>
    <div class="table__row row">
      <div class="row__info">3</div>
      <div class="row__cell" contenteditable="">A3</div>
      <div class="row__cell" contenteditable="">B3</div>
      <div class="row__cell" contenteditable="">C3</div>
    </div>
      `
  }
}
