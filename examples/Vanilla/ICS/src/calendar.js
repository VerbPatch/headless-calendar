import { useCalendar } from '@verbpatch/headless-calendar';

const formatRecurrence = (r) => {
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

  const getNth = (n) => {
    if (n === -1) return 'last';
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
  };

  const formatDays = (dList) => {
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
      desc += ` in ${mList.map((m) => months[m]).join(', ')}`;
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

const getEventTimeDisplay = (e, utils) => {
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

const isEventInSlot = (event, date, slot, interval) => {
  if (event.allDay) return false;
  const slotStart = new Date(date);
  slotStart.setHours(slot.hour, slot.minute, 0, 0);
  const slotEnd = new Date(slotStart.getTime() + (interval || 60) * 60000);
  const eventStart = new Date(event.start);
  const eventEnd = new Date(event.end);
  return eventStart < slotEnd && eventEnd > slotStart;
};

export function setupCalendar($elem) {
  let calendar;
  const tzDate = new Date(new Date().setHours(20, 0, 0, 0));
  const tzEndDate = new Date(new Date().setHours(21, 0, 0, 0));

  const initialEvents = [
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
      end: new Date(new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000).setHours(17, 0, 0, 0)),
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
  ];

  function render() {
    calendar = useCalendar({
      defaultView: 'month',
      startOfWeek: 0,
      locale: 'en-IN',
      initialEvents,
    });

    const {
      view,
      monthData,
      weekData,
      dayData,
      timeSlots,
      utils,
      events,
      exportToICS,
      getEventsForDate,
      timeSlotInterval,
    } = calendar;

    let html = `
      <h1>Vanilla Calendar ICS Example</h1>
      <div style="display: flex; gap: 20px; align-items: flex-start">
        <div id="calendar-grid" style="flex: 0 0 840px">
          <table border="0" width="840" cellspacing="0" style="height:700px; border-left:1px solid; border-top:1px solid;">
            <thead>
              <tr>
                <th colspan="2" style="border-bottom: 1px solid;">
                  <button type="button" data-action="prev"> ← </button>
                  <button type="button" data-action="today"> Today </button>
                  <button type="button" data-action="next"> → </button>
                </th>
                <th colspan="3" style="border-bottom: 1px solid;">
                  <h3>
                    ${view === 'month' ? monthData?.monthName || '' : ''}
                    ${view === 'week' ? weekData?.weekRange || '' : ''}
                    ${view === 'day' ? dayData?.dayName || '' : ''}
                  </h3>
                </th>
                <th colspan="2" style="border-bottom: 1px solid; border-right:1px solid;">
                  <select id="view-select">
                    <option value="month" ${view === 'month' ? 'selected' : ''}>Month</option>
                    <option value="week" ${view === 'week' ? 'selected' : ''}>Week</option>
                    <option value="day" ${view === 'day' ? 'selected' : ''}>Day</option>
                  </select>
                </th>
              </tr>
            </thead>
            <tbody>
    `;

    if (view === 'month' && monthData) {
      html += '<tr>';
      utils.daysofWeek('short').forEach((day) => {
        html += `<th style="width: 120px; border-right: 1px solid; border-bottom: 1px solid;">${day}</th>`;
      });
      html += '</tr>';

      monthData.weeks.forEach((week) => {
        html += '<tr>';
        week.forEach((date) => {
          const isCurrentMonth = monthData.isCurrentMonth(date);
          const isToday = monthData.isToday(date);
          const cellEvents = getEventsForDate(date);
          html += `
            <td style="
              ${!isCurrentMonth ? 'color: gray;' : ''}
              ${isToday ? 'font-weight: bold;' : ''}
              border-right: 1px solid; border-bottom: 1px solid;
              vertical-align: top; height: 100px;
            ">
              <div>${utils.formatDate(date, 'd')}</div>
              ${cellEvents
                .map(
                  (e) => `
                <div style="font-size: 10px; background: ${e.color || '#ccc'}; color: white; margin: 2px 0; padding: 2px;">
                  ${e.title}
                </div>
              `,
                )
                .join('')}
            </td>
          `;
        });
        html += '</tr>';
      });
    } else if (view === 'week' && weekData) {
      html += `
        <tr>
          <td colspan="7" style="border-right: 1px solid;">
            <table cellpadding="5" cellspacing="0" width="100%">
              <tbody>
                <tr>
                  <td></td>
                  ${weekData.dates
                    .map(
                      (date) => `
                    <td style="${weekData.isToday(date) ? 'font-weight: bold;' : ''}">
                      ${utils.formatDate(date, 'EEE d')}
                    </td>
                  `,
                    )
                    .join('')}
                </tr>
                <!-- All Day Row -->
                <tr>
                  <td style="border-bottom: 1px solid; font-size: 11px;">All Day</td>
                  ${weekData.dates
                    .map((date) => {
                      const allDayEvents = getEventsForDate(date).filter((ev) => ev.allDay);
                      return `
                      <td style="border-bottom: 1px solid; border-left: 1px solid; vertical-align: top; background: #fafafa;">
                        ${allDayEvents
                          .map(
                            (e) => `
                          <div style="font-size: 10px; background: ${e.color || '#ccc'}; color: white; margin: 1px 0; padding: 2px; border-radius: 2px;">
                            ${e.title}
                          </div>
                        `,
                          )
                          .join('')}
                      </td>
                    `;
                    })
                    .join('')}
                </tr>
                ${timeSlots
                  .map(
                    (slot) => `
                  <tr>
                    <td style="border-bottom: 1px solid;">${slot.label}</td>
                    ${weekData.dates
                      .map((date) => {
                        const slotEvents = getEventsForDate(date).filter((ev) =>
                          isEventInSlot(ev, date, slot, timeSlotInterval || 60),
                        );
                        return `
                        <td style="${weekData.isToday(date) ? 'font-weight: bold;' : ''} border-bottom: 1px solid; border-left: 1px solid; vertical-align: top;">
                          ${slotEvents
                            .map(
                              (e) => `
                            <div style="font-size: 10px; background: ${e.color || '#ccc'}; color: white; margin: 1px 0; padding: 2px;">
                              ${e.title}
                            </div>
                          `,
                            )
                            .join('')}
                        </td>
                      `;
                      })
                      .join('')}
                  </tr>
                `,
                  )
                  .join('')}
              </tbody>
            </table>
          </td>
        </tr>
      `;
    } else if (view === 'day' && dayData) {
      const date = dayData.dates[0];
      const allDayEvents = getEventsForDate(date).filter((e) => e.allDay);
      html += `
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
                ${
                  allDayEvents.length > 0
                    ? `
                  <tr>
                    <td width="25%" style="border-bottom: 1px solid; font-size: 11px; padding: 5px;">All Day</td>
                    <td style="border-bottom: 1px solid; background: #fafafa; padding: 5px;">
                      ${allDayEvents
                        .map(
                          (e) => `
                        <div style="font-size: 10px; background: ${e.color || '#ccc'}; color: white; margin: 2px 0; padding: 2px; border-radius: 2px;">
                          ${e.title}
                        </div>
                      `,
                        )
                        .join('')}
                    </td>
                  </tr>
                `
                    : ''
                }
                ${timeSlots
                  .map(
                    (slot) => `
                  <tr>
                    <td width="25%" style="border-bottom: 1px solid; vertical-align: top;">
                      ${slot.label}
                    </td>
                    <td style="border-bottom: 1px solid;">
                      ${getEventsForDate(date)
                        .filter((ev) => isEventInSlot(ev, date, slot, timeSlotInterval || 60))
                        .map(
                          (e) => `
                        <div style="font-size: 10px; background: ${e.color || '#ccc'}; color: white; margin: 1px 0; padding: 2px;">
                          ${e.title}
                        </div>
                      `,
                        )
                        .join('')}
                    </td>
                  </tr>
                `,
                  )
                  .join('')}
              </tbody>
            </table>
          </td>
        </tr>
      `;
    }

    html += `
            </tbody>
          </table>
        </div>

        <div style="flex: 1; min-width: 300px; font-family: sans-serif">
          <div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 20px; max-height: 400px; overflow-y: auto;">
            <h3 style="margin-top: 0">Event List</h3>
            <ul style="padding-left: 20px">
              ${events
                .map((e) => {
                  let recurrenceInfo = formatRecurrence(e.recurring);
                  if (e.exdate && e.exdate.length > 0) {
                    recurrenceInfo += ` (Excl: ${e.exdate.map((d) => utils.formatDate(d)).join(', ')})`;
                  }
                  if (e.rdate && e.rdate.length > 0) {
                    recurrenceInfo += ` (Add: ${e.rdate.map((d) => utils.formatDate(d)).join(', ')})`;
                  }

                  return `
                  <li style="margin-bottom: 10px; border-bottom: 1px solid #eee; padding-bottom: 5px;">
                    <div style="display: flex; align-items: center; gap: 5px;">
                      <span style="display: inline-block; width: 10px; height: 10px; background-color: ${e.color || '#3174ad'}; border-radius: 2px;"></span>
                      <strong>${e.title}</strong>
                    </div>
                    <div style="font-size: 0.85em; color: #666; margin-left: 15px;">
                      ${getEventTimeDisplay(e, utils)}
                    </div>
                    ${e.description ? `<div style="font-size: 0.8em; color: #555; margin-left: 15px; margin-top: 2px; font-style: italic;">${e.description}</div>` : ''}
                    ${
                      e.recurring && e.recurring !== 'never'
                        ? `<div style="font-size: 0.8em; color: #007bff; margin-top: 2px; margin-left: 15px;">${recurrenceInfo}</div>`
                        : ''
                    }
                    ${
                      e.recurrenceId
                        ? `<div style="font-size: 0.8em; color: #d63384; margin-top: 2px; margin-left: 15px;">Recurrence-ID: ${typeof e.recurrenceId === 'string' ? e.recurrenceId : e.recurrenceId.toISOString()}</div>`
                        : ''
                    }
                  </li>
                `;
                })
                .join('')}
            </ul>
          </div>
          <div style="border: 1px solid #ccc; padding: 10px; max-height: 400px; overflow-y: auto;">
            <h3 style="margin-top: 0">
              ICS Tools
              <div style="margin-bottom: 10px; float: right; display: flex; gap: 10px;">
                <div style="font-size: 12px;">
                  <label style="display: block; margin-bottom: 2px;">Import:</label>
                  <input type="file" id="input-import" accept=".ics" style="font-size: 10px;" />
                </div>
                <button type="button" data-action="export">Export to ICS</button>
              </div>
            </h3>
            <pre style="white-space: pre-wrap; word-wrap: break-word; font-size: 11px; background: #f5f5f5; padding: 5px;">${exportToICS()}</pre>
          </div>
        </div>
      </div>
    `;
    $elem.innerHTML = html;
  }

  // Event delegation
  $elem.addEventListener('click', (e) => {
    const action = e.target.getAttribute('data-action');
    if (action === 'prev') {
      calendar.goToPrevious();
      render();
    } else if (action === 'today') {
      calendar.goToToday();
      render();
    } else if (action === 'next') {
      calendar.goToNext();
      render();
    } else if (action === 'export') {
      calendar.downloadICS('my-calendar-events.ics');
    }
  });

  $elem.addEventListener('change', (e) => {
    if (e.target.id === 'view-select') {
      calendar.changeView(e.target.value);
      render();
    } else if (e.target.id === 'input-import') {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const content = event.target?.result;
          calendar.importFromICS(content);
          render();
        };
        reader.readAsText(file);
      }
    }
  });

  render();
}
