import { type Component, Show, For } from 'solid-js';
import { useCalendar, type ViewType } from '@verbpatch/solidjs-calendar';

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

const CalendarDemo: Component = () => {
  const tzDate = new Date(new Date().setHours(20, 0, 0, 0));
  const tzEndDate = new Date(new Date().setHours(21, 0, 0, 0));

  const calendar = useCalendar({
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
        description: `Late night sync for global teams, Timezone specific -> Actual event is ${tzDate.toDateString()} ${tzDate.toTimeString().substring(0, 8)} - ${tzEndDate.toDateString()} ${tzEndDate.toTimeString().substring(0, 8)} in America/New_York timezone, translated to local calendar timezone.`,
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

  const handleImport = (e: Event) => {
    const target = e.currentTarget as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        calendar()?.importFromICS(content);
      };
      reader.readAsText(file);
    }
  };

  return (
    <Show when={calendar()}>
      {(cal) => (
        <>
          <h1>Solidjs Calendar ICS Example</h1>

          <div style={{ display: 'flex', gap: '20px', 'align-items': 'flex-start' }}>
            <div id="calendar" style={{ flex: '0 0 840px' }}>
              <table
                style={{
                  height: '700px',
                  'border-left': '1px solid',
                  'border-top': '1px solid',
                  width: '840px',
                  'border-collapse': 'collapse',
                }}
              >
                <thead>
                  <tr>
                    <th colspan={2} style={{ 'border-bottom': '1px solid' }}>
                      <button type="button" onClick={() => cal().goToPrevious()}>
                        {' '}
                        ←{' '}
                      </button>
                      <button type="button" onClick={() => cal().goToToday()}>
                        {' '}
                        Today{' '}
                      </button>
                      <button type="button" onClick={() => cal().goToNext()}>
                        {' '}
                        →{' '}
                      </button>
                    </th>
                    <th colspan={3} style={{ 'border-bottom': '1px solid' }}>
                      <h3>
                        {cal().view === 'month' ? cal().monthData?.monthName : ''}
                        {cal().view === 'week' ? cal().weekData?.weekRange : ''}
                        {cal().view === 'day' ? cal().dayData?.dayName : ''}
                      </h3>
                    </th>
                    <th
                      colspan={2}
                      style={{ 'border-bottom': '1px solid', 'border-right': '1px solid' }}
                    >
                      <select
                        value={cal().view}
                        onChange={(e) => {
                          cal().changeView(e.currentTarget.value as ViewType);
                        }}
                      >
                        <option value="month">Month</option>
                        <option value="week">Week</option>
                        <option value="day">Day</option>
                      </select>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <Show when={cal().view === 'month'}>
                    <tr>
                      <For each={cal().utils.daysofWeek('short')}>
                        {(day) => (
                          <th
                            style={{
                              width: '120px',
                              'border-right': '1px solid',
                              'border-bottom': '1px solid',
                            }}
                          >
                            {day}
                          </th>
                        )}
                      </For>
                    </tr>
                    <For each={cal().monthData?.weeks}>
                      {(week) => (
                        <tr>
                          <For each={week}>
                            {(date) => (
                              <td
                                style={{
                                  color: !cal().monthData?.isCurrentMonth(date)
                                    ? 'gray'
                                    : undefined,
                                  'font-weight': cal().monthData?.isToday(date) ? 'bold' : 'normal',
                                  'border-right': '1px solid',
                                  'border-bottom': '1px solid',
                                  'vertical-align': 'top',
                                  height: '100px',
                                }}
                              >
                                <div>{cal().utils.formatDate(date, 'd')}</div>
                                <For each={cal().getEventsForDate(date)}>
                                  {(e) => (
                                    <div
                                      style={{
                                        'font-size': '10px',
                                        background: e.color || '#ccc',
                                        color: 'white',
                                        margin: '2px 0',
                                        padding: '2px',
                                      }}
                                    >
                                      {e.title}
                                    </div>
                                  )}
                                </For>
                              </td>
                            )}
                          </For>
                        </tr>
                      )}
                    </For>
                  </Show>

                  <Show when={cal().view === 'week'}>
                    <tr>
                      <td colspan={7} style={{ 'border-right': '1px solid' }}>
                        <table style={{ width: '100%', 'border-collapse': 'collapse' }}>
                          <tbody>
                            <tr>
                              <td></td>
                              <For each={cal().weekData?.dates}>
                                {(date) => (
                                  <td
                                    style={{
                                      'font-weight': cal().weekData?.isToday(date)
                                        ? 'bold'
                                        : 'normal',
                                    }}
                                  >
                                    {cal().utils.formatDate(date, 'EEE d')}
                                  </td>
                                )}
                              </For>
                            </tr>
                            {/* All Day Row */}
                            <tr>
                              <td style={{ 'border-bottom': '1px solid', 'font-size': '11px' }}>
                                All Day
                              </td>
                              <For each={cal().weekData?.dates}>
                                {(date) => (
                                  <td
                                    style={{
                                      'border-bottom': '1px solid',
                                      'border-left': '1px solid',
                                      'vertical-align': 'top',
                                      background: '#fafafa',
                                    }}
                                  >
                                    <For
                                      each={cal()
                                        .getEventsForDate(date)
                                        .filter((e) => e.allDay)}
                                    >
                                      {(e) => (
                                        <div
                                          style={{
                                            'font-size': '10px',
                                            background: e.color || '#ccc',
                                            color: 'white',
                                            margin: '1px 0',
                                            padding: '2px',
                                            'border-radius': '2px',
                                          }}
                                        >
                                          {e.title}
                                        </div>
                                      )}
                                    </For>
                                  </td>
                                )}
                              </For>
                            </tr>
                            <For each={cal().timeSlots}>
                              {(slot) => (
                                <tr>
                                  <td style={{ 'border-bottom': '1px solid' }}>{slot.label}</td>
                                  <For each={cal().weekData?.dates}>
                                    {(date) => (
                                      <td
                                        style={{
                                          'font-weight': cal().weekData?.isToday(date)
                                            ? 'bold'
                                            : 'normal',
                                          'border-bottom': '1px solid',
                                          'border-left': '1px solid',
                                          'vertical-align': 'top',
                                        }}
                                      >
                                        <For
                                          each={cal()
                                            .getEventsForDate(date)
                                            .filter((ev) =>
                                              isEventInSlot(
                                                ev,
                                                date,
                                                slot,
                                                cal().timeSlotInterval || 60,
                                              ),
                                            )}
                                        >
                                          {(e) => (
                                            <div
                                              style={{
                                                'font-size': '10px',
                                                background: e.color || '#ccc',
                                                color: 'white',
                                                margin: '1px 0',
                                                padding: '2px',
                                              }}
                                            >
                                              {e.title}
                                            </div>
                                          )}
                                        </For>
                                      </td>
                                    )}
                                  </For>
                                </tr>
                              )}
                            </For>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </Show>

                  <Show when={cal().view === 'day'}>
                    <tr>
                      <td
                        colspan={7}
                        align="center"
                        style={{ 'border-right': '1px solid', 'border-bottom': '1px solid' }}
                      >
                        {cal().dayData?.dayName}
                      </td>
                    </tr>
                    <tr>
                      <td colspan={7} style={{ 'border-right': '1px solid' }}>
                        <table
                          style={{ height: '100%', width: '100%', 'border-collapse': 'collapse' }}
                        >
                          <tbody>
                            {/* All Day Row */}
                            <Show
                              when={
                                cal()
                                  .getEventsForDate(cal().dayData!.dates[0])
                                  .filter((e) => e.allDay).length > 0
                              }
                            >
                              <tr>
                                <td
                                  width="25%"
                                  style={{
                                    'border-bottom': '1px solid',
                                    'font-size': '11px',
                                    padding: '5px',
                                  }}
                                >
                                  All Day
                                </td>
                                <td
                                  style={{
                                    'border-bottom': '1px solid',
                                    background: '#fafafa',
                                    padding: '5px',
                                  }}
                                >
                                  <For
                                    each={cal()
                                      .getEventsForDate(cal().dayData!.dates[0])
                                      .filter((e) => e.allDay)}
                                  >
                                    {(e) => (
                                      <div
                                        style={{
                                          'font-size': '10px',
                                          background: e.color || '#ccc',
                                          color: 'white',
                                          margin: '2px 0',
                                          padding: '2px',
                                          'border-radius': '2px',
                                        }}
                                      >
                                        {e.title}
                                      </div>
                                    )}
                                  </For>
                                </td>
                              </tr>
                            </Show>
                            <For each={cal().timeSlots}>
                              {(slot) => (
                                <tr>
                                  <td width="25%" style={{ 'border-bottom': '1px solid' }}>
                                    {slot.label}
                                  </td>
                                  <td style={{ 'border-bottom': '1px solid' }}>
                                    <For
                                      each={cal()
                                        .getEventsForDate(cal().dayData!.dates[0])
                                        .filter((ev) =>
                                          isEventInSlot(
                                            ev,
                                            cal().dayData!.dates[0],
                                            slot,
                                            cal().timeSlotInterval || 60,
                                          ),
                                        )}
                                    >
                                      {(e) => (
                                        <div
                                          style={{
                                            'font-size': '10px',
                                            background: e.color || '#ccc',
                                            color: 'white',
                                            margin: '1px 0',
                                            padding: '2px',
                                          }}
                                        >
                                          {e.title}
                                        </div>
                                      )}
                                    </For>
                                  </td>
                                </tr>
                              )}
                            </For>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </Show>
                </tbody>
              </table>
            </div>

            <div style={{ flex: '1', 'min-width': '300px', 'font-family': 'sans-serif' }}>
              <div
                style={{
                  border: '1px solid #ccc',
                  padding: '10px',
                  'margin-bottom': '20px',
                  'max-height': '400px',
                  'overflow-y': 'auto',
                }}
              >
                <h3 style={{ 'margin-top': 0 }}>Event List</h3>
                <ul style={{ 'padding-left': '20px' }}>
                  <For each={cal().events}>
                    {(e) => (
                      <li
                        style={{
                          'margin-bottom': '10px',
                          'border-bottom': '1px solid #eee',
                          'padding-bottom': '5px',
                        }}
                      >
                        <div style={{ display: 'flex', 'align-items': 'center', gap: '5px' }}>
                          <span
                            style={{
                              display: 'inline-block',
                              width: '10px',
                              height: '10px',
                              'background-color': e.color || '#3174ad',
                              'border-radius': '2px',
                            }}
                          ></span>
                          <strong>{e.title}</strong>
                        </div>
                        <div
                          style={{ 'font-size': '0.85em', color: '#666', 'margin-left': '15px' }}
                        >
                          {getEventTimeDisplay(e, cal().utils)}
                        </div>
                        <Show when={e.description}>
                          <div
                            style={{
                              'font-size': '0.8em',
                              color: '#555',
                              'margin-left': '15px',
                              'margin-top': '2px',
                              'font-style': 'italic',
                            }}
                          >
                            {e.description}
                          </div>
                        </Show>
                        <Show when={e.recurring && e.recurring !== 'never'}>
                          <div
                            style={{
                              'font-size': '0.8em',
                              color: '#007bff',
                              'margin-top': '2px',
                              'margin-left': '15px',
                            }}
                          >
                            {formatRecurrence(e.recurring)}
                            <Show when={e.exdate && e.exdate.length > 0}>
                              (Excl: {e.exdate!.map((d) => cal().utils.formatDate(d)).join(', ')})
                            </Show>
                            <Show when={e.rdate && e.rdate.length > 0}>
                              (Add: {e.rdate!.map((d) => cal().utils.formatDate(d)).join(', ')})
                            </Show>
                          </div>
                        </Show>
                        <Show when={e.recurrenceId}>
                          <div
                            style={{
                              'font-size': '0.8em',
                              color: '#d63384',
                              'margin-top': '2px',
                              'margin-left': '15px',
                            }}
                          >
                            Recurrence-ID:{' '}
                            {typeof e.recurrenceId === 'string'
                              ? e.recurrenceId
                              : e.recurrenceId!.toISOString()}
                          </div>
                        </Show>
                      </li>
                    )}
                  </For>
                </ul>
              </div>
              <div
                style={{
                  border: '1px solid #ccc',
                  padding: '10px',
                  'max-height': '400px',
                  'overflow-y': 'auto',
                }}
              >
                <h3 style={{ 'margin-top': 0 }}>
                  ICS Tools
                  <div style={{ 'margin-bottom': '10px', float: 'right', display: 'flex', gap: '10px' }}>
                    <div style={{ 'font-size': '12px' }}>
                      <label style={{ display: 'block', 'margin-bottom': '2px' }}>Import:</label>
                      <input type="file" accept=".ics" onChange={handleImport} style={{ 'font-size': '10px' }} />
                    </div>
                    <button onClick={() => cal().downloadICS('my-calendar-events.ics')}>
                      Export to ICS
                    </button>
                  </div>
                </h3>
                <pre
                  style={{
                    'white-space': 'pre-wrap',
                    'word-wrap': 'break-word',
                    'font-size': '11px',
                    background: '#f5f5f5',
                    padding: '5px',
                  }}
                >
                  {cal().exportToICS()}
                </pre>
              </div>
            </div>
          </div>
        </>
      )}
    </Show>
  );
};

export default CalendarDemo;
