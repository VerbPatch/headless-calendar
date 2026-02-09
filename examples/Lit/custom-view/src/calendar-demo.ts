import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import { useCalendar, CustomViewOptions, generateId } from "@verbpatch/lit-calendar";

@customElement("calendar-demo")
export class CalendarDemo extends LitElement {
  static styles = css`
    :host { display: block; padding: 20px; font-family: sans-serif; }
    .calendar-wrapper { background: white; padding: 24px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); max-width: 1000px; margin: 0 auto; }
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
    .nav { display: flex; gap: 8px; }
    .range { font-weight: 600; color: #374151; margin: 0; }
    .presets { margin-bottom: 20px; padding: 15px; background: #f1f5f9; border-radius: 8px; }
    .preset-buttons { display: flex; gap: 8px; margin-top: 12px; flex-wrap: wrap; }
    .month-container { margin-bottom: 30px; }
    .month-title { font-weight: bold; font-size: 1.2em; margin-bottom: 10px; margin-top: 20px; }
    .calendar-table { width: 100%; border-collapse: collapse; text-align: center; }
    .calendar-table th, .calendar-table td { border: 1px solid #ccc; padding: 8px; }
    .calendar-table th { background: #f8fafc; }
    .calendar-table td { height: 100px; vertical-align: top; width: 14.28%; padding: 4px; }
    .horizontal-view td { height: 150px; padding: 8px; }
    .today { background: #eff6ff !important; }
    .day-num { text-align: right; font-size: 12px; margin-bottom: 4px; }
    .day-num-large { font-size: 16px; font-weight: normal; }
    .day-name-small { font-size: 12px; color: #64748b; }
    .events { display: flex; flex-direction: column; gap: 2px; }
    .event-pill { color: white; padding: 2px 4px; border-radius: 2px; font-size: 10px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; background: #3b82f6; }
    button { padding: 8px 16px; background: white; border: 1px solid #d1d5db; border-radius: 6px; cursor: pointer; font-weight: 500; }
    button:hover { background: #f3f4f6; }
  `;

  @state()
  private _calendarState: ReturnType<typeof useCalendar>;

  constructor() {
    super();
    this._calendarState = useCalendar(this, {
      defaultView: "custom",
      customViewOptions: { unit: "day", count: 2 },
      initialEvents: [
        { id: generateId(), title: 'Project Review', start: new Date(), end: new Date(new Date().getTime() + 3600000), color: '#8b5cf6' },
        { id: generateId(), title: 'Lunch Sync', start: new Date(new Date().setHours(12, 0)), end: new Date(new Date().setHours(13, 0)), color: '#10b981' }
      ],
      //onViewChange: () => this.requestUpdate(),
      //onDateChange: () => this.requestUpdate(),
      //onEvent: () => this.requestUpdate()
    });
  }

  private _setPreset(unit: 'day' | 'week' | 'month', count: number, include?: number[]) {
    this._calendarState.calendar.changeView('custom', { unit, count, includeSpecificDays: include });
    this.requestUpdate();
  }

  private _getMonthsToDisplay() {
    const { calendar } = this._calendarState;
    const opts = calendar.customViewOptions;
    if (!opts || opts.unit !== 'month') return [];
    const count = opts.count || 1;
    const months = [];
    for (let i = 0; i < count; i++) {
      const d = calendar.utils.addMonths(calendar.currentDate, i);
      months.push({ month: d.getMonth(), year: d.getFullYear(), date: d });
    }
    return months;
  }

  private _getTitle() {
    const { calendar } = this._calendarState;
    const opts = calendar.customViewOptions;
    if (!opts) return '';
    if (opts.unit === 'month') return calendar.monthData?.monthName;
    if (opts.unit === 'week') return calendar.weekData?.weekRange;
    return calendar.dayData?.dayName;
  }

  private _renderMonthViews() {
    const { calendar } = this._calendarState;
    const months = this._getMonthsToDisplay();
    return months.map(m => html`
      <div class="month-container">
        <div class="month-title">${calendar.utils.formatLocalizedMonth(m.date)}</div>
        <table class="calendar-table" border="1">
          <thead>
            <tr>${calendar.utils.daysofWeek('short').map(day => html`<th>${day}</th>`)}</tr>
          </thead>
          <tbody>
            ${calendar.monthData?.weeks.map(week => {
      if (!week.some(d => d.getMonth() === m.month && d.getFullYear() === m.year)) return null;
      return html`
                <tr>
                  ${[0, 1, 2, 3, 4, 5, 6].map(dayIdx => {
        const date = week.find(d => d.getDay() === dayIdx);
        const isInMonth = date && date.getMonth() === m.month && date.getFullYear() === m.year;
        const isToday = date && calendar.utils.isSameDay(date, new Date());
        return html`
                      <td class="${isToday ? 'today' : ''}" style="${!isInMonth ? 'background: #f8fafc;' : ''}">
                        ${isInMonth ? html`
                          <div class="day-num">${date!.getDate()}</div>
                          <div class="events">
                            ${calendar.getEventsForDate(date!).map(e => html`
                              <div class="event-pill" style="background-color: ${e.color}">${e.title}</div>
                            `)}
                          </div>
                        ` : ''}
                      </td>
                    `;
      })}
                </tr>
              `;
    })}
          </tbody>
        </table>
      </div>
    `);
  }

  private _renderHorizontalView() {
    const { calendar } = this._calendarState;
    const opts = calendar.customViewOptions;
    const data = opts?.unit === 'week' ? calendar.weekData : calendar.dayData;
    if (!data) return '';
    return html`
      <table class="calendar-table horizontal-view" border="1">
        <thead>
          <tr style="background: #f8fafc;">
            ${data.dates.map(date => html`
              <th>
                <div class="day-name-small">${calendar.utils.formatDate(date, 'EEE')}</div>
                <div class="day-num-large">${date.getDate()}</div>
              </th>
            `)}
          </tr>
        </thead>
        <tbody>
          <tr>
            ${data.dates.map(date => {
      const isToday = calendar.utils.isSameDay(date, new Date());
      return html`
                <td class="${isToday ? 'today' : ''}">
                  <div class="events">
                    ${calendar.getEventsForDate(date).map(e => html`
                      <div class="event-pill" style="background-color: ${e.color}">${e.title}</div>
                    `)}
                  </div>
                </td>
              `;
    })}
          </tr>
        </tbody>
      </table>
    `;
  }

  render() {
    const { calendar } = this._calendarState;
    const opts = calendar.customViewOptions;

    return html`
      <div class="calendar-wrapper">
        <div class="header">
          <div class="nav">
            <button @click=${() => { calendar.goToPrevious(); this.requestUpdate(); }}>Previous</button>
            <button @click=${() => { calendar.goToToday(); this.requestUpdate(); }}>Today</button>
            <button @click=${() => { calendar.goToNext(); this.requestUpdate(); }}>Next</button>
          </div>
          <h2 class="range">${this._getTitle()}</h2>
        </div>

        <div class="presets">
          <strong>View Presets:</strong>
          <div class="preset-buttons">
            <button @click=${() => this._setPreset('day', 2)}>2 Days</button>
            <button @click=${() => this._setPreset('week', 1, [1, 2, 3, 4, 5])}>Work Week</button>
            <button @click=${() => this._setPreset('week', 2)}>2 Weeks</button>
            <button @click=${() => this._setPreset('month', 1, [1, 2, 3, 4, 5])}>1 Month Weekdays</button>
            <button @click=${() => this._setPreset('month', 3)}>Quarter (3 Months)</button>
          </div>
        </div>

        <div class="view-content">
          ${opts?.unit === 'month' ? (calendar.monthData ? this._renderMonthViews() : html`Loading Month...`) :
        (calendar.dayData || calendar.weekData ? this._renderHorizontalView() : html`Loading...`)}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'calendar-demo': CalendarDemo
  }
}