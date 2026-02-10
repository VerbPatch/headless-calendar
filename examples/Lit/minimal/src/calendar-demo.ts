import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { useCalendar, type ViewType } from '@verbpatch/lit-calendar';

@customElement('calendar-demo')
export class CalendarDemo extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    table {
      border-collapse: collapse;
    }
    th,
    td {
      padding: 0;
    }
  `;

  @state()
  private _calendarState: ReturnType<typeof useCalendar>;

  constructor() {
    super();
    this._calendarState = useCalendar(this, {
      defaultView: 'month',
      startOfWeek: 0,
      locale: 'en-IN',
    });
  }

  private renderMonthView() {
    const { monthData, utils } = this._calendarState.calendar;
    if (!monthData) return html``;

    return html`
      <tr>
        ${utils
          .daysofWeek('short')
          .map(
            (day) =>
              html`<th style="width: 120px; border-right: 1px solid; border-bottom: 1px solid;">
                ${day}
              </th>`,
          )}
      </tr>
      ${monthData.weeks.map(
        (week) => html`
          <tr>
            ${week.map(
              (date) => html`
                <td
                  style="
                    ${!monthData.isCurrentMonth(date) ? 'color: gray;' : ''}
                    ${monthData.isToday(date) ? 'font-weight: bold;' : ''}
                    border-right: 1px solid; border-bottom: 1px solid;
                  "
                >
                  ${utils.formatDate(date, 'd')}
                </td>
              `,
            )}
          </tr>
        `,
      )}
    `;
  }

  private renderWeekView() {
    const { weekData, timeSlots, utils } = this._calendarState.calendar;
    if (!weekData) return html``;

    return html`
      <tr>
        <td colspan="7" style="border-right: 1px solid;">
          <table cellpadding="5" cellspacing="0" width="100%">
            <tbody>
              <tr>
                <td></td>
                ${weekData.dates.map(
                  (date) => html`
                    <td style="${weekData.isToday(date) ? 'font-weight: bold;' : ''}">
                      ${utils.formatDateTime(date, 'EEE d')}
                    </td>
                  `,
                )}
              </tr>
              ${timeSlots.map(
                (slot) => html`
                  <tr>
                    <td style="border-bottom: 1px solid;">${slot.label}</td>
                    ${weekData.dates.map(
                      (date) => html`
                        <td
                          style="
                          ${weekData.isToday(date) ? 'font-weight: bold;' : ''}
                          border-bottom: 1px solid;
                        "
                        >
                          &nbsp;
                        </td>
                      `,
                    )}
                  </tr>
                `,
              )}
            </tbody>
          </table>
        </td>
      </tr>
    `;
  }

  private renderDayView() {
    const { dayData, timeSlots } = this._calendarState.calendar;
    if (!dayData) return html``;

    return html`
      <tr>
        <td colspan="7" align="center" style="border-right: 1px solid; border-bottom: 1px solid;">
          ${dayData.dayName}
        </td>
      </tr>
      <tr>
        <td colspan="7" style="border-right: 1px solid;">
          <table width="100%" cellspacing="0" style="height: 100%;">
            <tbody>
              ${timeSlots.map(
                (slot) => html`
                  <tr>
                    <td width="25%" style="border-bottom: 1px solid;">
                      ${slot.label} &nbsp;
                    </td>
                  </tr>
                `,
              )}
            </tbody>
          </table>
        </td>
      </tr>
    `;
  }

  render() {
    const { view, goToPrevious, goToToday, goToNext, changeView, monthData, weekData, dayData } =
      this._calendarState.calendar;

    return html`
      <h1>Lit Calendar minimal Example</h1>
      <table
        border="0"
        width="840"
        cellspacing="0"
        style="height: 700px; border-left: 1px solid; border-top: 1px solid;"
      >
        <thead>
          <tr>
            <th colspan="2" style="border-bottom: 1px solid;">
              <button type="button" @click=${goToPrevious}>←</button>
              <button type="button" @click=${goToToday}>Today</button>
              <button type="button" @click=${goToNext}>→</button>
            </th>
            <th colspan="3" style="border-bottom: 1px solid;">
              <h3>
                ${view === 'month' ? monthData?.monthName : ''}
                ${view === 'week' ? weekData?.weekRange : ''}
                ${view === 'day' ? dayData?.dayName : ''}
              </h3>
            </th>
            <th colspan="2" style="border-bottom: 1px solid; border-right: 1px solid;">
              <select
                .value=${view}
                @change=${(e: any) => changeView(e.target.value as ViewType)}
              >
                <option value="month">Month</option>
                <option value="week">Week</option>
                <option value="day">Day</option>
              </select>
            </th>
          </tr>
        </thead>
        <tbody>
          ${view === 'month' ? this.renderMonthView() : ''}
          ${view === 'week' ? this.renderWeekView() : ''}
          ${view === 'day' ? this.renderDayView() : ''}
        </tbody>
      </table>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'calendar-demo': CalendarDemo;
  }
}