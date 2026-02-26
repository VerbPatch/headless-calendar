import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { useCalendar, type ViewType } from '@verbpatch/lit-calendar';

const formatRecurrence = (r: any) => {
  if (!r || r === 'never') return 'None';

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const getNth = (n: number) => {
    if (n === -1) return 'last';
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  const formatDays = (dList: any[]) => {
    if (!dList) return '';

    const dayMap = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

    return dList
      .map((d) => {
        if (typeof d === 'number') return days[d];
        const match = d.match(/^(-?\d+)([A-Z]{2})$/);
        if (match) {
          const nth = parseInt(match[1], 10);
          const dayIndex = dayMap.indexOf(match[2]);
          return `${getNth(nth)} ${days[dayIndex]}`;
        }
        return d;
      })
      .join(', ');
  };

  let desc = '';

  if (r.repeat === 'daily') {
    desc = r.every > 1 ? `Every ${r.every} days` : 'Daily';
  } else if (r.repeat === 'weekly') {
    desc = r.every > 1 ? `Every ${r.every} weeks` : 'Weekly';
    if (r.weekDays) desc += ` on ${formatDays(r.weekDays)}`;
  } else if (r.repeat === 'monthly') {
    desc = r.every > 1 ? `Every ${r.every} months` : 'Monthly';
    if (r.day) {
      desc += ` on day ${r.day}`;
    } else if (r.week && r.weekDays) {
      desc += ` on the ${getNth(r.week)} ${formatDays(r.weekDays)}`;
    } else if (r.byDay) {
      desc += ` on ${formatDays(r.byDay)}`;
    }
  } else if (r.repeat === 'yearly') {
    desc = r.every > 1 ? `Every ${r.every} years` : 'Yearly';
    if (r.month !== undefined) {
      const mList = Array.isArray(r.month) ? r.month : [r.month];
      desc += ` in ${mList.map((m: number) => months[m]).join(', ')}`;
    }
    if (r.day) {
      desc += ` on day ${r.day}`;
    } else if (r.week && r.weekDays) {
      desc += ` on the ${getNth(r.week)} ${formatDays(r.weekDays)}`;
    }
  }

  if (r.count) desc += `, ${r.count} times`;
  if (r.end) desc += `, until ${new Date(r.end).toLocaleDateString()}`;

  return desc;
};

const getEventTimeDisplay = (e: any, utils: any) => {
  if (e.allDay) {
    let display = `${utils.formatDate(e.start)} All Day`;
    if (!utils.isSameDay(e.start, e.end)) {
      display = `${utils.formatDate(e.start)} - ${utils.formatDate(e.end)} All Day`;
    }
    return display;
  } else {
    const startDate = utils.formatDate(e.start);
    const startTime = utils.formatLocalizedTime(e.start, undefined, undefined, false);
    if (utils.isSameDay(e.start, e.end)) {
      const endTime = utils.formatLocalizedTime(e.end, undefined, undefined, false);
      return `${startDate} ${startTime} - ${endTime}`;
    } else {
      const endDate = utils.formatDate(e.end);
      const endTime = utils.formatLocalizedTime(e.end, undefined, undefined, false);
      return `${startDate} ${startTime} - ${endDate} ${endTime}`;
    }
  }
};

const isEventInSlot = (event: any, date: Date, slot: any, interval: number) => {
  if (event.allDay) return false;
  const slotStart = new Date(date);
  slotStart.setHours(slot.hour, slot.minute, 0, 0);
  const slotEnd = new Date(slotStart.getTime() + (interval || 60) * 60000);
  const eventStart = new Date(event.start);
  const eventEnd = new Date(event.end);
  return eventStart < slotEnd && eventEnd > slotStart;
};

@customElement('calendar-demo')
export class CalendarDemo extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: sans-serif;
    }
    table {
      border-collapse: collapse;
    }
    th,
    td {
      padding: 0;
    }
    .ics-tools-container {
      flex: 1;
      min-width: 300px;
    }
    .tool-box {
      border: 1px solid #ccc;
      padding: 10px;
      margin-bottom: 20px;
      max-height: 400px;
      overflow-y: auto;
    }
    pre {
      white-space: pre-wrap;
      word-wrap: break-word;
      font-size: 11px;
      background: #f5f5f5;
      padding: 5px;
    }
  `;

  @state()
  private _calendarState: ReturnType<typeof useCalendar>;

  constructor() {
    super();
    const tzDate = new Date(new Date().setHours(20, 0, 0, 0));
    const tzEndDate = new Date(new Date().setHours(21, 0, 0, 0));

    this._calendarState = useCalendar(this, {
      defaultView: 'month',
      startOfWeek: 0,
      locale: 'en-IN',
      initialEvents: [
        {
          id: '1',
          title: 'Simple Meeting',
          description: 'Single-day 1 hour event',
          start: new Date(new Date().setHours(9, 0, 0, 0)),
          end: new Date(new Date().setHours(10, 0, 0, 0)),
          color: '#E6194B',
        },
        {
          id: '2',
          title: 'Company Holiday',
          description: 'All-day event',
          start: new Date(),
          end: new Date(),
          allDay: true,
          color: '#FFE119',
        },
        {
          id: '3',
          title: 'Business Trip',
          description: 'Multi-day event',
          start: new Date(new Date().setHours(9, 0, 0, 0)),
          end: new Date(
            new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000).setHours(17, 0, 0, 0),
          ),
          color: '#4363D8',
        },
        {
          id: '4',
          title: 'Daily Standup',
          description: 'Daily Standup (Weekdays only)',
          start: new Date(new Date().setHours(10, 0, 0, 0)),
          end: new Date(new Date().setHours(10, 30, 0, 0)),
          color: '#F58231',
          recurring: {
            repeat: 'weekly',
            every: 1,
            weekDays: [1, 2, 3, 4, 5],
          },
        },
        {
          id: '5',
          title: 'Weekly Planning',
          description: 'Weekly recurring event',
          start: new Date(new Date().setHours(14, 0, 0, 0)),
          end: new Date(new Date().setHours(15, 0, 0, 0)),
          color: '#911EB4',
          recurring: {
            repeat: 'weekly',
            every: 1,
            weekDays: [1],
            end: new Date(new Date().getFullYear(), 11, 31),
          },
        },
        {
          id: '6',
          title: 'Monthly Payday',
          description: 'Monthly by day 25',
          start: new Date(new Date().setDate(25)),
          end: new Date(new Date().setDate(25)),
          allDay: true,
          color: '#42D4F4',
          recurring: {
            repeat: 'monthly',
            every: 1,
            day: 25,
          },
        },
        {
          id: '7',
          title: 'Team Lunch',
          description: 'Monthly by week position (2nd Friday)',
          start: new Date(new Date().setHours(12, 0, 0, 0)),
          end: new Date(new Date().setHours(13, 0, 0, 0)),
          color: '#F032E6',
          recurring: {
            repeat: 'monthly',
            every: 1,
            week: 2,
            weekDays: [5],
          },
        },
        {
          id: '8',
          title: 'New Year Party',
          description: 'Yearly recurring',
          start: new Date(new Date().getFullYear(), 0, 1),
          end: new Date(new Date().getFullYear(), 0, 1),
          allDay: true,
          color: '#9A6324',
          recurring: {
            repeat: 'yearly',
            every: 1,
            month: 0,
            day: 1,
          },
        },
        {
          id: '9',
          title: 'Client Demo',
          description: 'Rich metadata',
          start: new Date(new Date().setHours(15, 0, 0, 0)),
          end: new Date(new Date().setHours(16, 0, 0, 0)),
          location: 'Conference Room A',
          url: 'https://example.com/meeting',
          color: '#000075',
        },
        {
          id: '10',
          title: 'Global Sync',
          description: `Late night sync for global teams, Timezone specific`,
          start: tzDate,
          end: tzEndDate,
          color: '#64748b',
          timezone: 'America/New_York',
        },
        {
          id: '11',
          title: 'Daily Huddle (Excl. specific days)',
          description: 'Recurring with EXDATE (Exclude specific dates)',
          start: new Date(new Date().setHours(9, 30, 0, 0)),
          end: new Date(new Date().setHours(9, 45, 0, 0)),
          color: '#db2777',
          recurring: {
            repeat: 'daily',
            every: 1,
          },
          exdate: [
            new Date(new Date().setDate(new Date().getDate() + 2)),
            new Date(new Date().setDate(new Date().getDate() + 4)),
          ],
        },
        {
          id: '12',
          title: 'Ad-hoc Review',
          description: 'Recurring with RDATE (Additional dates)',
          start: new Date(new Date().setHours(13, 0, 0, 0)),
          end: new Date(new Date().setHours(14, 0, 0, 0)),
          color: '#d97706',
          recurring: {
            repeat: 'weekly',
            every: 1,
            weekDays: [3],
          },
          rdate: [new Date(new Date().setDate(new Date().getDate() + 1))],
        },

        {
          id: '13',
          title: 'Tentative Monthly Sync',
          description: 'Test: Strict RFC RRULE with Status & Transparency',
          start: new Date(new Date().setHours(11, 0, 0, 0)),
          end: new Date(new Date().setHours(12, 0, 0, 0)),
          color: '#7c3aed',

          recurring: {
            repeat: 'monthly',
            every: 1,
            byDay: ['1FR'],
          },
          status: 'TENTATIVE',
          transparency: 'TRANSPARENT',
        },
        {
          id: '14',
          title: 'Rescheduled Instance',
          description:
            'This specific instance was moved to 3pm, Recurrence Exception (RECURRENCE-ID) representation',
          start: new Date(new Date().setHours(15, 0, 0, 0)),
          end: new Date(new Date().setHours(16, 0, 0, 0)),
          color: '#059669',
          recurrenceId: new Date(new Date().setHours(14, 0, 0, 0)),
        },
      ],
    });
  }

  private handleImport(e: Event) {
    const target = e.currentTarget as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        this._calendarState.calendar.importFromICS(content);
      };
      reader.readAsText(file);
    }
  }

  private renderMonthView() {
    const { monthData, utils, getEventsForDate } = this._calendarState.calendar;
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
            ${week.map((date) => {
              const events = getEventsForDate(date);
              return html`
                <td
                  style="
                    ${!monthData.isCurrentMonth(date) ? 'color: gray;' : ''}
                    ${monthData.isToday(date) ? 'font-weight: bold;' : ''}
                    border-right: 1px solid; border-bottom: 1px solid;
                    vertical-align: top;
                    height: 100px;
                  "
                >
                  <div>${utils.formatDate(date, 'd')}</div>
                  ${events.map(
                    (e) => html`
                      <div
                        style="font-size: 10px; background: ${e.color ||
                        '#ccc'}; color: white; margin: 2px 0; padding: 2px;"
                      >
                        ${e.title}
                      </div>
                    `,
                  )}
                </td>
              `;
            })}
          </tr>
        `,
      )}
    `;
  }

  private renderWeekView() {
    const { weekData, timeSlots, utils, getEventsForDate, timeSlotInterval } =
      this._calendarState.calendar;
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
                      ${utils.formatDate(date, 'EEE d')}
                    </td>
                  `,
                )}
              </tr>
              <!-- All Day Row -->
              <tr>
                <td style="border-bottom: 1px solid; font-size: 11px;">All Day</td>
                ${weekData.dates.map((date) => {
                  const allDayEvents = getEventsForDate(date).filter((ev) => ev.allDay);
                  return html`
                    <td
                      style="border-bottom: 1px solid; border-left: 1px solid; vertical-align: top; background: #fafafa;"
                    >
                      ${allDayEvents.map(
                        (e) => html`
                          <div
                            style="font-size: 10px; background: ${e.color ||
                            '#ccc'}; color: white; margin: 1px 0; padding: 2px; border-radius: 2px;"
                          >
                            ${e.title}
                          </div>
                        `,
                      )}
                    </td>
                  `;
                })}
              </tr>
              ${timeSlots.map(
                (slot) => html`
                  <tr>
                    <td style="border-bottom: 1px solid;">${slot.label}</td>
                    ${weekData.dates.map((date) => {
                      const slotEvents = getEventsForDate(date).filter((ev) =>
                        isEventInSlot(ev, date, slot, timeSlotInterval || 60),
                      );
                      return html`
                        <td
                          style="
                          ${weekData.isToday(date) ? 'font-weight: bold;' : ''}
                          border-bottom: 1px solid; border-left: 1px solid; vertical-align: top;
                        "
                        >
                          ${slotEvents.map(
                            (e) => html`
                              <div
                                style="font-size: 10px; background: ${e.color ||
                                '#ccc'}; color: white; margin: 1px 0; padding: 2px;"
                              >
                                ${e.title}
                              </div>
                            `,
                          )}
                        </td>
                      `;
                    })}
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
    const { dayData, timeSlots, getEventsForDate, timeSlotInterval } = this._calendarState.calendar;
    if (!dayData) return html``;
    const date = dayData.dates[0];

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
              <!-- All Day Row -->
              ${getEventsForDate(date).filter((e) => e.allDay).length > 0
                ? html`
                    <tr>
                      <td width="25%" style="border-bottom: 1px solid; font-size: 11px; padding: 5px;">
                        All Day
                      </td>
                      <td style="border-bottom: 1px solid; background: #fafafa; padding: 5px;">
                        ${getEventsForDate(date)
                          .filter((e) => e.allDay)
                          .map(
                            (e) => html`
                              <div
                                style="font-size: 10px; background: ${e.color ||
                                '#ccc'}; color: white; margin: 2px 0; padding: 2px; border-radius: 2px;"
                              >
                                ${e.title}
                              </div>
                            `,
                          )}
                      </td>
                    </tr>
                  `
                : ''}
              ${timeSlots.map((slot) => {
                const slotEvents = getEventsForDate(date).filter((ev) =>
                  isEventInSlot(ev, date, slot, timeSlotInterval || 60),
                );
                return html`
                  <tr>
                    <td width="25%" style="border-bottom: 1px solid; vertical-align: top;">
                      ${slot.label}
                    </td>
                    <td style="border-bottom: 1px solid;">
                      ${slotEvents.map(
                        (e) => html`
                          <div
                            style="font-size: 10px; background: ${e.color ||
                            '#ccc'}; color: white; margin: 1px 0; padding: 2px;"
                          >
                            ${e.title}
                          </div>
                        `,
                      )}
                    </td>
                  </tr>
                `;
              })}
            </tbody>
          </table>
        </td>
      </tr>
    `;
  }

  render() {
    const {
      view,
      goToPrevious,
      goToToday,
      goToNext,
      changeView,
      monthData,
      weekData,
      dayData,
      events,
      utils,
      exportToICS,
      downloadICS,
    } = this._calendarState.calendar;

    return html`
      <h1>Lit Calendar ICS Example</h1>
      <div style="display: flex; gap: 20px; align-items: flex-start;">
        <div id="calendar" style="flex: 0 0 840px">
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
        </div>

        <div class="ics-tools-container">
          <div class="tool-box">
            <h3 style="margin-top: 0">Event List</h3>
            <ul style="padding-left: 20px">
              ${events.map((e) => {
                let recurrenceInfo = formatRecurrence(e.recurring);
                if (e.exdate && e.exdate.length > 0) {
                  recurrenceInfo += ` (Excl: ${e.exdate.map((d) => utils.formatDate(d)).join(', ')})`;
                }
                if (e.rdate && e.rdate.length > 0) {
                  recurrenceInfo += ` (Add: ${e.rdate.map((d) => utils.formatDate(d)).join(', ')})`;
                }

                return html`
                  <li style="margin-bottom: 10px; border-bottom: 1px solid #eee; padding-bottom: 5px;">
                    <div style="display: flex; align-items: center; gap: 5px;">
                      <span
                        style="display: inline-block; width: 10px; height: 10px; background-color: ${e.color ||
                        '#3174ad'}; border-radius: 2px;"
                      ></span>
                      <strong>${e.title}</strong>
                    </div>
                    <div style="font-size: 0.85em; color: #666; margin-left: 15px;">
                      ${getEventTimeDisplay(e, utils)}
                    </div>
                    ${e.description
                      ? html`<div
                          style="font-size: 0.8em; color: #555; margin-left: 15px; margin-top: 2px; font-style: italic;"
                        >
                          ${e.description}
                        </div>`
                      : ''}
                    ${e.recurring && e.recurring !== 'never'
                      ? html`<div
                          style="font-size: 0.8em; color: #007bff; margin-top: 2px; margin-left: 15px;"
                        >
                          ${recurrenceInfo}
                        </div>`
                      : ''}
                    ${e.recurrenceId
                      ? html`<div
                          style="font-size: 0.8em; color: #d63384; margin-top: 2px; margin-left: 15px;"
                        >
                          Recurrence-ID:
                          ${typeof e.recurrenceId === 'string'
                            ? e.recurrenceId
                            : e.recurrenceId.toISOString()}
                        </div>`
                      : ''}
                  </li>
                `;
              })}
            </ul>
          </div>

          <div class="tool-box">
            <h3 style="margin-top: 0">
              ICS Tools
              <div style="margin-bottom: 10px; float: right; display: flex; gap: 10px;">
                <div style="font-size: 12px;">
                  <label style="display: block; margin-bottom: 2px;">Import:</label>
                  <input
                    type="file"
                    accept=".ics"
                    @change=${this.handleImport}
                    style="font-size: 10px;"
                  />
                </div>
                <button @click=${() => downloadICS('my-calendar-events.ics')}>Export to ICS</button>
              </div>
            </h3>
            <pre>${exportToICS()}</pre>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'calendar-demo': CalendarDemo;
  }
}
