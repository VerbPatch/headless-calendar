import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { useCalendar, type ViewType } from '@verbpatch/lit-calendar';

@customElement('calendar-instance')
export class CalendarInstance extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: sans-serif;
    }
    .wrapper {
      border: 1px solid #ccc;
      padding: 16px;
      border-radius: 8px;
      width: 350px;
      box-sizing: border-box;
    }
    h3 {
      margin-top: 0;
      margin-bottom: 12px;
    }
    .view-switcher {
      display: flex;
      gap: 4px;
      margin-bottom: 10px;
    }
    .view-btn {
      flex: 1;
      padding: 4px;
      font-size: 12px;
      border: 1px solid #ccc;
      border-radius: 4px;
      cursor: pointer;
      text-transform: capitalize;
    }
    .view-btn.active {
      background-color: #007bff;
      color: #fff;
    }
    .view-btn.inactive {
      background-color: #f0f0f0;
      color: #000;
    }
    .nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }
    .nav span {
      font-weight: bold;
      font-size: 14px;
    }
    .today-btn {
      width: 100%;
      margin-bottom: 15px;
      padding: 6px;
      cursor: pointer;
      border-radius: 4px;
      border: 1px solid #ccc;
      background-color: #fff;
    }
    .calendar-body {
      min-height: 200px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th {
      padding: 4px;
      font-size: 12px;
    }
    td {
      text-align: center;
      padding: 4px;
      font-size: 14px;
    }
    .day-cell.today {
      background-color: #e6f7ff;
      border-radius: 50%;
    }
    .day-cell.other-month {
      color: #ccc;
    }
    .day-cell.current-month {
      color: #000;
    }

    .week-view {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .week-range {
      font-size: 12px;
      color: #666;
      text-align: center;
      margin-bottom: 4px;
    }
    .week-dates {
      display: flex;
      justify-content: space-between;
      gap: 4px;
    }
    .week-date {
      flex: 1;
      text-align: center;
      padding: 8px 4px;
      border-radius: 4px;
    }
    .week-date.today {
      background-color: #e6f7ff;
      border: 1px solid #007bff;
    }
    .week-date.not-today {
      background-color: #f9f9f9;
      border: 1px solid #eee;
    }
    .week-day-name {
      font-size: 10px;
      text-transform: uppercase;
      color: #888;
    }
    .week-day-num {
      font-weight: bold;
      font-size: 14px;
    }

    .day-view {
      text-align: center;
      padding: 20px;
      border-radius: 8px;
    }
    .day-view.today {
      background-color: #e6f7ff;
      border: 1px solid #007bff;
    }
    .day-view.not-today {
      background-color: #f9f9f9;
      border: 1px solid #eee;
    }
    .day-view-name {
      font-size: 14px;
      color: #666;
      margin-bottom: 4px;
    }
    .day-view-num {
      font-size: 32px;
      font-weight: bold;
    }
    .day-view-month {
      font-size: 14px;
      color: #666;
      margin-top: 4px;
    }
  `;

  @property({ type: String })
  calendarId = 'default-calendar';

  @property({ type: String })
  title = 'Calendar';

  @state()
  private _calendarState: ReturnType<typeof useCalendar>;

  constructor() {
    super();
    this._calendarState = useCalendar(this, {
      calendarId: this.calendarId,
      defaultView: 'month',
    });
  }

  connectedCallback() {
    super.connectedCallback();
    // Re-initialize with actual calendarId property after properties are set
    this._calendarState = useCalendar(this, {
      calendarId: this.calendarId,
      defaultView: 'month',
    });
  }

  private renderViewSwitcher(view: ViewType, changeView: (v: ViewType) => void) {
    return html`
      <div class="view-switcher">
        ${(['month', 'week', 'day'] as ViewType[]).map(
          (viewType) => html`
            <button
              class="view-btn ${view === viewType ? 'active' : 'inactive'}"
              @click=${() => changeView(viewType)}
            >
              ${viewType}
            </button>
          `,
        )}
      </div>
    `;
  }

  private renderMonthView(monthData: any, utils: any) {
    if (!monthData) return html``;
    return html`
      <table>
        <thead>
          <tr>
            ${utils.daysofWeek('narrow').map((day: string) => html`<th>${day}</th>`)}
          </tr>
        </thead>
        <tbody>
          ${monthData.weeks.map(
            (week: any[]) => html`
              <tr>
                ${week.map((date) => {
                  const isCurrentMonth = monthData.isCurrentMonth(date);
                  const isToday = monthData.isToday(date);
                  return html`
                    <td
                      class="day-cell ${isToday ? 'today' : ''} ${isCurrentMonth
                        ? 'current-month'
                        : 'other-month'}"
                    >
                      ${utils.formatDate(date, 'd')}
                    </td>
                  `;
                })}
              </tr>
            `,
          )}
        </tbody>
      </table>
    `;
  }

  private renderWeekView(weekData: any, utils: any) {
    if (!weekData) return html``;
    return html`
      <div class="week-view">
        <div class="week-range">${weekData.weekRange}</div>
        <div class="week-dates">
          ${weekData.dates.map((date: Date) => {
            const isToday = weekData.isToday(date);
            return html`
              <div class="week-date ${isToday ? 'today' : 'not-today'}">
                <div class="week-day-name">
                  ${utils.formatLocalizedDate(date, undefined, undefined, { weekday: 'short' })}
                </div>
                <div class="week-day-num">${utils.formatDate(date, 'd')}</div>
              </div>
            `;
          })}
        </div>
      </div>
    `;
  }

  private renderDayView(dayData: any, currentDate: Date, utils: any) {
    if (!dayData) return html``;
    const isToday = dayData.isToday;
    return html`
      <div class="day-view ${isToday ? 'today' : 'not-today'}">
        <div class="day-view-name">
          ${utils.formatLocalizedDate(currentDate, undefined, undefined, { weekday: 'long' })}
        </div>
        <div class="day-view-num">${utils.formatDate(currentDate, 'd')}</div>
        <div class="day-view-month">${utils.formatLocalizedMonth(currentDate)}</div>
      </div>
    `;
  }

  render() {
    const {
      view,
      currentDate,
      goToPrevious,
      goToToday,
      goToNext,
      changeView,
      monthData,
      weekData,
      dayData,
      utils,
    } = this._calendarState.calendar;

    return html`
      <div class="wrapper">
        <h3>${this.title} (ID: ${this.calendarId})</h3>

        ${this.renderViewSwitcher(view, changeView)}

        <div class="nav">
          <button @click=${goToPrevious}>←</button>
          <span>
            ${view === 'day'
              ? utils.formatLocalizedDate(currentDate)
              : utils.formatLocalizedMonth(currentDate)}
          </span>
          <button @click=${goToNext}>→</button>
        </div>

        <button class="today-btn" @click=${goToToday}>Today</button>

        <div class="calendar-body">
          ${view === 'month' ? this.renderMonthView(monthData, utils) : ''}
          ${view === 'week' ? this.renderWeekView(weekData, utils) : ''}
          ${view === 'day' ? this.renderDayView(dayData, currentDate, utils) : ''}
        </div>
      </div>
    `;
  }
}

@customElement('calendar-demo')
export class CalendarDemoApp extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 20px;
      font-family: sans-serif;
      color: #333;
    }
    .calendars-container {
      display: flex;
      gap: 30px;
      flex-wrap: wrap;
    }
    .default-container {
      margin-top: 50px;
      border-top: 1px solid #eee;
      padding-top: 30px;
    }
    p {
      color: #666;
    }
  `;

  render() {
    return html`
      <h1>Multiple Calendars Example</h1>
      <p style="margin-bottom: 30px">
        Each calendar below has a unique <code>calendarId</code> and maintains its own independent
        state (date, view, etc.).
      </p>

      <div class="calendars-container">
        <calendar-instance calendarId="calendar-left" title="Left Calendar"></calendar-instance>
        <calendar-instance calendarId="calendar-right" title="Right Calendar"></calendar-instance>
      </div>

      <div class="default-container">
        <h2>Default Calendar</h2>
        <p>
          This one uses the default ID. If you added another one without an ID, they would conflict.
        </p>
        <calendar-instance
          calendarId="default-calendar"
          title="Standard Calendar"
        ></calendar-instance>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'calendar-instance': CalendarInstance;
    'calendar-demo': CalendarDemoApp;
  }
}
