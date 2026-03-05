var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { useCalendar } from '@verbpatch/lit-calendar';
let DatePicker = class DatePicker extends LitElement {
    constructor() {
        super(...arguments);
        this.label = '';
        this.placeholder = 'Select a date';
        this._isOpen = false;
        this._handleClickOutside = (event) => {
            const path = event.composedPath();
            if (!path.includes(this)) {
                this._isOpen = false;
            }
        };
    }
    static { this.styles = css `
    :host {
      display: block;
      margin-bottom: 20px;
    }
    .container {
      position: relative;
    }
    .popup {
      position: absolute;
      top: 100%;
      left: 0;
      z-index: 1000;
      background: white;
      border: 1px solid black;
      padding: 10px;
    }
    .header {
      display: flex;
      justify-content: space-between;
    }
    label {
      display: block;
    }
    table {
      border-collapse: collapse;
    }
    .day-cell {
      text-align: center;
      padding: 4px;
    }
  `; }
    connectedCallback() {
        super.connectedCallback();
        if (!this._calendarController) {
            this._calendarController = useCalendar(this, {
                calendarId: `datepicker-${this.label.replace(/\s+/g, '-').toLowerCase() || 'default'}`,
                defaultView: 'month',
                defaultDate: this.value || new Date(),
            });
        }
        document.addEventListener('mousedown', this._handleClickOutside);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        document.removeEventListener('mousedown', this._handleClickOutside);
    }
    _handleDateSelect(date) {
        this.value = date;
        this.dispatchEvent(new CustomEvent('change', { detail: date }));
        this._isOpen = false;
    }
    render() {
        if (!this._calendarController)
            return html ``;
        const { currentDate, goToPrevious, goToNext, monthData, utils } = this._calendarController.calendar;
        const displayValue = this.value ? utils.formatDate(this.value, 'yyyy-MM-dd') : '';
        return html `
      <div class="container">
        <label>${this.label}</label>
        <input
          type="text"
          readonly
          .value=${displayValue}
          placeholder=${this.placeholder}
          @click=${() => (this._isOpen = !this._isOpen)}
        />

        ${this._isOpen
            ? html `
              <div class="popup">
                <div class="header">
                  <button type="button" @click=${(e) => { e.stopPropagation(); goToPrevious(); }}>←</button>
                  <span>${utils.formatLocalizedMonth(currentDate)}</span>
                  <button type="button" @click=${(e) => { e.stopPropagation(); goToNext(); }}>→</button>
                </div>

                <table>
                  <thead>
                    <tr>
                      ${utils.daysofWeek('narrow').map((day) => html `<th>${day}</th>`)}
                    </tr>
                  </thead>
                  <tbody>
                    ${monthData?.weeks.map((week) => html `
                        <tr>
                          ${week.map((date) => {
                const isCurrentMonth = monthData.isCurrentMonth(date);
                const isSelected = this.value && date.toDateString() === this.value.toDateString();
                const isToday = monthData.isToday(date);
                return html `
                              <td
                                class="day-cell"
                                @click=${(e) => {
                    e.stopPropagation();
                    if (isCurrentMonth)
                        this._handleDateSelect(date);
                }}
                                style="
                                  cursor: ${isCurrentMonth ? 'pointer' : 'default'};
                                  color: ${isCurrentMonth ? (isSelected ? 'blue' : 'black') : 'gray'};
                                  font-weight: ${isToday ? 'bold' : 'normal'};
                                  border: ${isSelected ? '1px solid blue' : 'none'};
                                "
                              >
                                ${date.getDate()}
                              </td>
                            `;
            })}
                        </tr>
                      `)}
                  </tbody>
                </table>

                <div style="text-align: center; margin-top: 5px;">
                  <button type="button" @click=${(e) => { e.stopPropagation(); this._handleDateSelect(new Date()); }}>
                    Today
                  </button>
                </div>
              </div>
            `
            : ''}
      </div>
    `;
    }
};
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], DatePicker.prototype, "label", void 0);
__decorate([
    property({ type: Object }),
    __metadata("design:type", Date)
], DatePicker.prototype, "value", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], DatePicker.prototype, "placeholder", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], DatePicker.prototype, "_isOpen", void 0);
DatePicker = __decorate([
    customElement('date-picker')
], DatePicker);
export { DatePicker };
//# sourceMappingURL=DatePicker.js.map