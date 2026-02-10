import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { useCalendar, CustomViewOptions, generateId } from '@verbpatch/lit-calendar';

@customElement('calendar-demo')
export class CalendarDemo extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 20px;
      font-family: sans-serif;
    }
    table {
      border-collapse: collapse;
      width: 100%;
      text-align: center;
    }
    th,
    td {
      border: 1px solid #ccc;
    }
  `;

  @state()
  declare _calendarState: ReturnType<typeof useCalendar>;

  constructor() {
    super();
    this._calendarState = useCalendar(this, {
      defaultView: 'custom',
      customViewOptions: { type: 'day', count: 2 },
      initialEvents: [
        {
          id: '1',
          title: 'Project Review',
          start: new Date(),
          end: new Date(new Date().getTime() + 3600000),
          color: '#8b5cf6',
        },
        {
          id: '2',
          title: 'Lunch Sync',
          start: new Date(new Date().setHours(12, 0)),
          end: new Date(new Date().setHours(13, 0)),
          color: '#10b981',
        },
      ],
      onViewChange: () => this.requestUpdate(),
      onDateChange: () => this.requestUpdate(),
      onEvent: () => this.requestUpdate(),
    });
  }

  private _setPreset(type: 'day' | 'week' | 'month', count: number, include?: number[]) {
    this._calendarState.calendar.changeView('custom', {
      type,
      count,
      includeSpecificDays: include,
    });
    this.requestUpdate();
  }

  private _getMonthsToDisplay() {
    const { calendar } = this._calendarState;
    const opts = calendar.customViewOptions;
    if (!opts || opts.type !== 'month') return [];
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
    if (opts.type === 'month') return calendar.monthData?.monthName;
    if (opts.type === 'week') return calendar.weekData?.weekRange;
    return calendar.dayData?.dayName;
  }

  render() {
    const { calendar } = this._calendarState;
    const opts = calendar.customViewOptions;

    return html`
      <div>
        <h1>Lit Calendar Custom View Example</h1>
        <div>
          <button
            @click=${() => {
              calendar.goToPrevious();
              this.requestUpdate();
            }}
          >
            Prev
          </button>
          <button
            @click=${() => {
              calendar.goToToday();
              this.requestUpdate();
            }}
          >
            Today
          </button>
          <button
            @click=${() => {
              calendar.goToNext();
              this.requestUpdate();
            }}
          >
            Next
          </button>
          <span style="margin-left: 20px;"><strong>${this._getTitle()}</strong></span>
        </div>

        <div style="margin: 20px 0;">
          <strong>Presets:</strong>
          <button @click=${() => this._setPreset('day', 2)}>2 Days</button>
          <button @click=${() => this._setPreset('week', 1, [1, 2, 3, 4, 5])}>Work Week</button>
          <button @click=${() => this._setPreset('week', 2)}>2 Weeks</button>
          <button @click=${() => this._setPreset('month', 1, [1, 2, 3, 4, 5])}>1 Month (WD)</button>
          <button @click=${() => this._setPreset('month', 3)}>Quarter</button>
        </div>

        <div>
          ${opts?.type === 'month'
            ? calendar.monthData
              ? this._renderMonthViews()
              : html`Loading Month...`
            : calendar.dayData || calendar.weekData
              ? this._renderHorizontalView()
              : html`Loading...`}
        </div>
      </div>
    `;
  }

  private _renderMonthViews() {
    const { calendar } = this._calendarState;
    const months = this._getMonthsToDisplay();
    return months.map(
      (m) => html`
        <div>
          <h3>${calendar.utils.formatLocalizedMonth(m.date)}</h3>
          <table border="1" cellpadding="5">
            <thead>
              <tr>
                ${calendar.utils.daysofWeek('short').map((day) => html`<th>${day}</th>`)}
              </tr>
            </thead>
            <tbody>
              ${calendar.monthData?.weeks.map((week) => {
                if (!week.some((d) => d.getMonth() === m.month && d.getFullYear() === m.year))
                  return null;
                return html`
                  <tr>
                    ${[0, 1, 2, 3, 4, 5, 6].map((dayIdx) => {
                      const date = week.find((d) => d.getDay() === dayIdx);
                      const isInMonth =
                        date && date.getMonth() === m.month && date.getFullYear() === m.year;
                      const isToday = date && calendar.utils.isSameDay(date, new Date());
                      return html`
                        <td
                          style="height: 80px; vertical-align: top; background: ${isToday
                            ? '#eee'
                            : 'transparent'};"
                        >
                          ${isInMonth
                            ? html`
                                <strong>${date!.getDate()}</strong>
                                <div>
                                  ${calendar
                                    .getEventsForDate(date!)
                                    .map(
                                      (e) => html`
                                        <div
                                          style="font-size: 10px; border: 1px solid; margin-bottom: 2px;"
                                        >
                                          ${e.title}
                                        </div>
                                      `,
                                    )}
                                </div>
                              `
                            : ''}
                        </td>
                      `;
                    })}
                  </tr>
                `;
              })}
            </tbody>
          </table>
        </div>
      `,
    );
  }

  private _renderHorizontalView() {
    const { calendar } = this._calendarState;
    const opts = calendar.customViewOptions;
    const data = opts?.type === 'week' ? calendar.weekData : calendar.dayData;
    if (!data) return '';
    return html`
      <table border="1" cellpadding="5">
        <thead>
          <tr>
            ${data.dates.map(
              (date) => html` <th>${calendar.utils.formatDate(date, 'EEE d')}</th> `,
            )}
          </tr>
        </thead>
        <tbody>
          <tr>
            ${data.dates.map((date) => {
              const isToday = calendar.utils.isSameDay(date, new Date());
              return html`
                <td
                  style="height: 100px; vertical-align: top; background: ${isToday
                    ? '#eee'
                    : 'transparent'};"
                >
                  ${calendar
                    .getEventsForDate(date)
                    .map(
                      (e) => html`
                        <div style="font-size: 11px; border: 1px solid; margin-bottom: 2px;">
                          ${e.title}
                        </div>
                      `,
                    )}
                </td>
              `;
            })}
          </tr>
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
