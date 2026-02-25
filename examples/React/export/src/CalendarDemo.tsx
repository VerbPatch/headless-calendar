import React, { useState } from 'react';
import { useCalendar, ViewType, CalendarEvent } from '@verbpatch/react-calendar';

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
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
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

const CalendarDemo: React.FC = () => {
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

  const {
    view,
    monthData,
    weekData,
    dayData,
    timeSlots,
    goToPrevious,
    goToToday,
    goToNext,
    changeView,
    utils: { formatDate, formatLocalizedTime, isSameDay, daysofWeek },
    events,
    exportToICS,
    downloadICS,
    getEventsForDate,
    timeSlotInterval,
  } = calendar;

  return (
    <>
      <h1>React Calendar Export Example</h1>

      <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
        <div style={{ flex: '0 0 840px' }}>
          <table
            border={0}
            width="840"
            cellSpacing="0"
            style={{ height: '700px', borderLeft: '1px solid', borderTop: '1px solid' }}
          >
            <thead>
              <tr>
                <th colSpan={2} style={{ borderBottom: '1px solid' }}>
                  <button type="button" onClick={goToPrevious}>
                    {' '}
                    ←{' '}
                  </button>
                  <button type="button" onClick={goToToday}>
                    {' '}
                    Today{' '}
                  </button>
                  <button type="button" onClick={goToNext}>
                    {' '}
                    →{' '}
                  </button>
                </th>
                <th colSpan={3} style={{ borderBottom: '1px solid' }}>
                  <h3>
                    {view === 'month' ? monthData?.monthName : ''}
                    {view === 'week' ? weekData?.weekRange : ''}
                    {view === 'day' ? dayData?.dayName : ''}
                  </h3>
                </th>
                <th colSpan={2} style={{ borderBottom: '1px solid', borderRight: '1px solid' }}>
                  <select
                    value={view}
                    onChange={(e) => {
                      changeView(e.target.value as ViewType);
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
              {view === 'month' && monthData && (
                <>
                  <tr>
                    {daysofWeek('short').map((day) => (
                      <th
                        key={day}
                        style={{
                          width: '120px',
                          borderRight: '1px solid',
                          borderBottom: '1px solid',
                        }}
                      >
                        {day}
                      </th>
                    ))}
                  </tr>
                  {monthData.weeks.map((week, i) => (
                    <tr key={i}>
                      {week.map((date, j) => {
                        const cellEvents = getEventsForDate(date);
                        return (
                          <td
                            key={j}
                            style={{
                              color: !monthData.isCurrentMonth(date) ? 'gray' : undefined,
                              fontWeight: monthData.isToday(date) ? 'bold' : 'normal',
                              borderRight: '1px solid',
                              borderBottom: '1px solid',
                              verticalAlign: 'top',
                              height: '100px',
                            }}
                          >
                            <div>{formatDate(date, 'd')}</div>
                            {cellEvents.map((e) => (
                              <div
                                key={e.id}
                                style={{
                                  fontSize: '10px',
                                  background: e.color || '#ccc',
                                  color: 'white',
                                  margin: '2px 0',
                                  padding: '2px',
                                }}
                              >
                                {e.title}
                              </div>
                            ))}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </>
              )}

              {view === 'week' && weekData && (
                <tr>
                  <td colSpan={7} style={{ borderRight: '1px solid' }}>
                    <table cellPadding="5" cellSpacing="0" width="100%">
                      <tbody>
                        <tr>
                          <td></td>
                          {weekData.dates.map((date, i) => (
                            <td
                              key={i}
                              style={{ fontWeight: weekData.isToday(date) ? 'bold' : 'normal' }}
                            >
                              {formatDate(date, 'EEE d')}
                            </td>
                          ))}
                        </tr>
                        {/* All Day Row */}
                        <tr>
                          <td style={{ borderBottom: '1px solid', fontSize: '11px' }}>All Day</td>
                          {weekData.dates.map((date, i) => {
                            const allDayEvents = getEventsForDate(date).filter((e) => e.allDay);
                            return (
                              <td
                                key={i}
                                style={{
                                  borderBottom: '1px solid',
                                  borderLeft: '1px solid',
                                  verticalAlign: 'top',
                                  background: '#fafafa',
                                }}
                              >
                                {allDayEvents.map((e) => (
                                  <div
                                    key={e.id}
                                    style={{
                                      fontSize: '10px',
                                      background: e.color || '#ccc',
                                      color: 'white',
                                      margin: '1px 0',
                                      padding: '2px',
                                      borderRadius: '2px',
                                    }}
                                  >
                                    {e.title}
                                  </div>
                                ))}
                              </td>
                            );
                          })}
                        </tr>
                        {timeSlots.map((slot) => (
                          <tr key={slot.time}>
                            <td style={{ borderBottom: '1px solid' }}>{slot.label}</td>
                            {weekData.dates.map((date, i) => {
                              const slotEvents = getEventsForDate(date).filter((event) => {
                                if (event.allDay) return false;
                                const slotStart = new Date(date);
                                slotStart.setHours(slot.hour, slot.minute, 0, 0);
                                const slotEnd = new Date(
                                  slotStart.getTime() + (timeSlotInterval || 60) * 60000,
                                );
                                const eventStart = new Date(event.start);
                                const eventEnd = new Date(event.end);
                                return eventStart < slotEnd && eventEnd > slotStart;
                              });

                              return (
                                <td
                                  key={i}
                                  style={{
                                    fontWeight: weekData.isToday(date) ? 'bold' : 'normal',
                                    borderBottom: '1px solid',
                                    borderLeft: '1px solid',
                                    verticalAlign: 'top',
                                  }}
                                >
                                  {slotEvents.map((e) => (
                                    <div
                                      key={e.id}
                                      style={{
                                        fontSize: '10px',
                                        background: e.color || '#ccc',
                                        color: 'white',
                                        margin: '1px 0',
                                        padding: '2px',
                                      }}
                                    >
                                      {e.title}
                                    </div>
                                  ))}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              )}

              {view === 'day' && dayData && (
                <>
                  <tr>
                    <td
                      colSpan={7}
                      align="center"
                      style={{ borderRight: '1px solid', borderBottom: '1px solid' }}
                    >
                      {dayData.dayName}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={7} style={{ borderRight: '1px solid' }}>
                      <table width="100%" cellSpacing="0" style={{ height: '100%' }}>
                        <tbody>
                          {/* All Day Row */}
                          {getEventsForDate(dayData.dates[0]).filter((e) => e.allDay).length >
                            0 && (
                            <tr>
                              <td
                                width="25%"
                                style={{
                                  borderBottom: '1px solid',
                                  fontSize: '11px',
                                  padding: '5px',
                                }}
                              >
                                All Day
                              </td>
                              <td
                                style={{
                                  borderBottom: '1px solid',
                                  background: '#fafafa',
                                  padding: '5px',
                                }}
                              >
                                {getEventsForDate(dayData.dates[0])
                                  .filter((e) => e.allDay)
                                  .map((e) => (
                                    <div
                                      key={e.id}
                                      style={{
                                        fontSize: '10px',
                                        background: e.color || '#ccc',
                                        color: 'white',
                                        margin: '2px 0',
                                        padding: '2px',
                                        borderRadius: '2px',
                                      }}
                                    >
                                      {e.title}
                                    </div>
                                  ))}
                              </td>
                            </tr>
                          )}
                          {timeSlots.map((slot) => {
                            const date = dayData.dates[0];
                            const slotEvents = getEventsForDate(date).filter((event) => {
                              if (event.allDay) return false;
                              const slotStart = new Date(date);
                              slotStart.setHours(slot.hour, slot.minute, 0, 0);
                              const slotEnd = new Date(
                                slotStart.getTime() + (timeSlotInterval || 60) * 60000,
                              );
                              const eventStart = new Date(event.start);
                              const eventEnd = new Date(event.end);
                              return eventStart < slotEnd && eventEnd > slotStart;
                            });

                            return (
                              <tr key={slot.time}>
                                <td
                                  width="25%"
                                  style={{ borderBottom: '1px solid', verticalAlign: 'top' }}
                                >
                                  {slot.label}
                                </td>
                                <td style={{ borderBottom: '1px solid' }}>
                                  {slotEvents.map((e) => (
                                    <div
                                      key={e.id}
                                      style={{
                                        fontSize: '10px',
                                        background: e.color || '#ccc',
                                        color: 'white',
                                        margin: '1px 0',
                                        padding: '2px',
                                      }}
                                    >
                                      {e.title}
                                    </div>
                                  ))}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>

        <div style={{ flex: '1', minWidth: '300px', fontFamily: 'sans-serif' }}>
          <div
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              marginBottom: '20px',
              maxHeight: '400px',
              overflowY: 'auto',
            }}
          >
            <h3 style={{ marginTop: 0 }}>Event List</h3>
            <ul style={{ paddingLeft: '20px' }}>
              {events.map((e) => {
                let recurrenceInfo = formatRecurrence(e.recurring);
                if (e.exdate && e.exdate.length > 0) {
                  recurrenceInfo += ` (Excl: ${e.exdate.map((d) => formatDate(d)).join(', ')})`;
                }
                if (e.rdate && e.rdate.length > 0) {
                  recurrenceInfo += ` (Add: ${e.rdate.map((d) => formatDate(d)).join(', ')})`;
                }

                let timeDisplay = '';
                if (e.allDay) {
                  timeDisplay = `${formatDate(e.start)} All Day`;
                  if (!isSameDay(e.start, e.end)) {
                    timeDisplay = `${formatDate(e.start)} - ${formatDate(e.end)} All Day`;
                  }
                } else {
                  const startDate = formatDate(e.start);
                  const startTime = formatLocalizedTime(e.start, undefined, undefined, false);
                  if (isSameDay(e.start, e.end)) {
                    const endTime = formatLocalizedTime(e.end, undefined, undefined, false);
                    timeDisplay = `${startDate} ${startTime} - ${endTime}`;
                  } else {
                    const endDate = formatDate(e.end);
                    const endTime = formatLocalizedTime(e.end, undefined, undefined, false);
                    timeDisplay = `${startDate} ${startTime} - ${endDate} ${endTime}`;
                  }
                }

                return (
                  <li
                    key={e.id}
                    style={{
                      marginBottom: '10px',
                      borderBottom: '1px solid #eee',
                      paddingBottom: '5px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <span
                        style={{
                          display: 'inline-block',
                          width: '10px',
                          height: '10px',
                          backgroundColor: e.color || '#3174ad',
                          borderRadius: '2px',
                        }}
                      ></span>
                      <strong>{e.title}</strong>
                    </div>
                    <div style={{ fontSize: '0.85em', color: '#666', marginLeft: '15px' }}>
                      {timeDisplay}
                    </div>
                    {e.description && (
                      <div
                        style={{
                          fontSize: '0.8em',
                          color: '#555',
                          marginLeft: '15px',
                          marginTop: '2px',
                          fontStyle: 'italic',
                        }}
                      >
                        {e.description}
                      </div>
                    )}
                    {e.recurring && e.recurring !== 'never' && (
                      <div
                        style={{
                          fontSize: '0.8em',
                          color: '#007bff',
                          marginTop: '2px',
                          marginLeft: '15px',
                        }}
                      >
                        {recurrenceInfo}
                      </div>
                    )}
                    {e.recurrenceId && (
                      <div
                        style={{
                          fontSize: '0.8em',
                          color: '#d63384',
                          marginTop: '2px',
                          marginLeft: '15px',
                        }}
                      >
                        Recurrence-ID:{' '}
                        {typeof e.recurrenceId === 'string'
                          ? e.recurrenceId
                          : e.recurrenceId.toISOString()}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
          <div
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              maxHeight: '400px',
              overflowY: 'auto',
            }}
          >
            <h3 style={{ marginTop: 0 }}>
              ICS Output
              <div style={{ marginBottom: '10px', float: 'right' }}>
                <button onClick={() => downloadICS('my-calendar-events.ics')}>Export to ICS</button>
              </div>
            </h3>
            <pre
              style={{
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word',
                fontSize: '11px',
                background: '#f5f5f5',
                padding: '5px',
              }}
            >
              {exportToICS()}
            </pre>
          </div>
        </div>
      </div>
    </>
  );
};

export default CalendarDemo;
