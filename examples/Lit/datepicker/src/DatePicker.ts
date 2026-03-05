import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { useCalendar } from '@verbpatch/lit-calendar';

@customElement('date-picker')
export class DatePicker extends LitElement {
  static styles = css`
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
  `;

  @property({ type: String }) label = '';
  @property({ type: Object }) value?: Date;
  @property({ type: String }) placeholder = 'Select a date';

  @state() private _isOpen = false;
  private _calendarController?: any;

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

  private _handleClickOutside = (event: MouseEvent) => {
    const path = event.composedPath();
    if (!path.includes(this)) {
      this._isOpen = false;
    }
  };

  private _handleDateSelect(date: Date) {
    this.value = date;
    this.dispatchEvent(new CustomEvent('change', { detail: date }));
    this._isOpen = false;
  }

  render() {
    if (!this._calendarController) return html``;
    
    const { currentDate, goToPrevious, goToNext, monthData, utils } = this._calendarController.calendar;
    const displayValue = this.value ? utils.formatDate(this.value, 'yyyy-MM-dd') : '';

    return html`
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
          ? html`
              <div class="popup">
                <div class="header">
                  <button type="button" @click=${(e: any) => { e.stopPropagation(); goToPrevious(); }}>←</button>
                  <span>${utils.formatLocalizedMonth(currentDate)}</span>
                  <button type="button" @click=${(e: any) => { e.stopPropagation(); goToNext(); }}>→</button>
                </div>

                <table>
                  <thead>
                    <tr>
                      ${utils.daysofWeek('narrow').map((day: string) => html`<th>${day}</th>`)}
                    </tr>
                  </thead>
                  <tbody>
                    ${monthData?.weeks.map(
                      (week: Date[]) => html`
                        <tr>
                          ${week.map((date) => {
                            const isCurrentMonth = monthData.isCurrentMonth(date);
                            const isSelected = this.value && date.toDateString() === this.value.toDateString();
                            const isToday = monthData.isToday(date);
                            return html`
                              <td
                                class="day-cell"
                                @click=${(e: any) => {
                                  e.stopPropagation();
                                  if (isCurrentMonth) this._handleDateSelect(date);
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
                      `,
                    )}
                  </tbody>
                </table>

                <div style="text-align: center; margin-top: 5px;">
                  <button type="button" @click=${(e: any) => { e.stopPropagation(); this._handleDateSelect(new Date()); }}>
                    Today
                  </button>
                </div>
              </div>
            `
          : ''}
      </div>
    `;
  }
}
