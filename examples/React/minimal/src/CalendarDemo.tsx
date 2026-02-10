import React from 'react';
import { useCalendar, ViewType } from '@verbpatch/react-calendar';

const CalendarDemo: React.FC = () => {
  const calendar = useCalendar({ defaultView: 'month', startOfWeek: 0, locale: 'en-IN' });

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
    utils: { formatDate, formatDateTime, daysofWeek },
  } = calendar;

  return (
    <>
      <h1>React Calendar minimal Example</h1>
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
                    style={{ width: '120px', borderRight: '1px solid', borderBottom: '1px solid' }}
                  >
                    {day}
                  </th>
                ))}
              </tr>
              {monthData.weeks.map((week, i) => (
                <tr key={i}>
                  {week.map((date, j) => (
                    <td
                      key={j}
                      style={{
                        color: !monthData.isCurrentMonth(date) ? 'gray' : undefined,
                        fontWeight: monthData.isToday(date) ? 'bold' : 'normal',
                        borderRight: '1px solid',
                        borderBottom: '1px solid',
                      }}
                    >
                      {formatDate(date, 'd')}
                    </td>
                  ))}
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
                          {formatDateTime(date, 'EEE d')}
                        </td>
                      ))}
                    </tr>
                    {timeSlots.map((slot) => (
                      <tr key={slot.time}>
                        <td style={{ borderBottom: '1px solid' }}>{slot.label}</td>
                        {weekData.dates.map((date, i) => (
                          <td
                            key={i}
                            style={{
                              fontWeight: weekData.isToday(date) ? 'bold' : 'normal',
                              borderBottom: '1px solid',
                            }}
                          >
                            &nbsp;
                          </td>
                        ))}
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
                      {timeSlots.map((slot) => (
                        <tr key={slot.time}>
                          <td width="25%" style={{ borderBottom: '1px solid' }}>
                            {slot.label}
                            &nbsp;
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </>
  );
};

export default CalendarDemo;
