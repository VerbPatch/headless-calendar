import React, { JSX, useMemo } from 'react';
import { useCalendar, generateId, CustomViewOptions } from '@verbpatch/react-calendar';

const CalendarDemo: React.FC = () => {
  const initialEvents = useMemo(
    () => [
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
    [],
  );

  const calendar = useCalendar({
    defaultView: 'custom',
    customViewOptions: { unit: 'day', count: 2 },
    initialEvents,
  });

  const {
    monthData,
    weekData,
    dayData,
    customViewOptions,
    goToPrevious,
    goToToday,
    goToNext,
    getEventsForDate,
    utils,
    changeView,
  } = calendar;

  const setPreset = (options: CustomViewOptions) => {
    changeView('custom', options);
  };

  const getMonthsToDisplay = () => {
    if (!customViewOptions || customViewOptions.unit !== 'month') return [];
    const count = customViewOptions.count || 1;
    const months = [];
    for (let i = 0; i < count; i++) {
      const d = utils.addMonths(calendar.currentDate, i);
      months.push({ month: d.getMonth(), year: d.getFullYear(), date: d });
    }
    return months;
  };

  const renderMonthViews = (): JSX.Element | null => {
    if (!monthData) return null;
    return (
      <>
        {getMonthsToDisplay().map((m) => (
          <div key={`${m.year}-${m.month}`}>
            <h3>{utils.formatLocalizedMonth(m.date)}</h3>
            <table
              border={1}
              cellPadding={5}
              width="100%"
              style={{ borderCollapse: 'collapse', textAlign: 'center' }}
            >
              <thead>
                <tr>
                  {utils.daysofWeek('short').map((day) => (
                    <th key={day}>{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {monthData.weeks.map((week, weekIndex) => {
                  if (!week.some((d) => d.getMonth() === m.month && d.getFullYear() === m.year))
                    return null;
                  return (
                    <tr key={weekIndex}>
                      {[0, 1, 2, 3, 4, 5, 6].map((dayIndex) => {
                        const date = week.find((d) => d.getDay() === dayIndex);
                        const isInMonth =
                          date && date.getMonth() === m.month && date.getFullYear() === m.year;
                        const isToday = date && utils.isSameDay(date, new Date());

                        return (
                          <td
                            key={dayIndex}
                            style={{
                              height: '80px',
                              verticalAlign: 'top',
                              background: isToday ? '#eee' : 'transparent',
                            }}
                          >
                            {isInMonth && (
                              <>
                                <div>
                                  <strong>{date!.getDate()}</strong>
                                </div>
                                {getEventsForDate(date!).map((e) => (
                                  <div
                                    key={e.id}
                                    style={{
                                      fontSize: '10px',
                                      border: '1px solid',
                                      marginBottom: '2px',
                                    }}
                                  >
                                    {e.title}
                                  </div>
                                ))}
                              </>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ))}
      </>
    );
  };

  const renderHorizontalView = (data: typeof weekData | typeof dayData): JSX.Element | null => {
    if (!data) return null;
    return (
      <table
        border={1}
        cellPadding={5}
        width="100%"
        style={{ borderCollapse: 'collapse', textAlign: 'center' }}
      >
        <thead>
          <tr>
            {data.dates.map((date, idx) => (
              <th key={idx}>{utils.formatDate(date, 'EEE d')}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {data.dates.map((date, idx) => (
              <td
                key={idx}
                style={{
                  height: '100px',
                  verticalAlign: 'top',
                  background: utils.isSameDay(date, new Date()) ? '#eee' : 'transparent',
                }}
              >
                {getEventsForDate(date).map((e) => (
                  <div
                    key={e.id}
                    style={{ fontSize: '11px', border: '1px solid', marginBottom: '2px' }}
                  >
                    {e.title}
                  </div>
                ))}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    );
  };

  const getTitle = () => {
    if (!customViewOptions) return '';
    if (customViewOptions.unit === 'month') return monthData?.monthName;
    if (customViewOptions.unit === 'week') return weekData?.weekRange;
    return dayData?.dayName;
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      <h1>React Calendar Custom View Example</h1>
      <div>
        <button onClick={goToPrevious}>Prev</button>
        <button onClick={goToToday}>Today</button>
        <button onClick={goToNext}>Next</button>
        <span style={{ marginLeft: '20px' }}>
          <strong>{getTitle()}</strong>
        </span>
      </div>

      <div style={{ margin: '20px 0' }}>
        <strong>Presets:</strong>
        <button onClick={() => setPreset({ unit: 'day', count: 2 })}>2 Days</button>
        <button
          onClick={() =>
            setPreset({ unit: 'week', count: 1, includeSpecificDays: [1, 2, 3, 4, 5] })
          }
        >
          Work Week
        </button>
        <button onClick={() => setPreset({ unit: 'week', count: 2 })}>2 Weeks</button>
        <button
          onClick={() =>
            setPreset({ unit: 'month', count: 1, includeSpecificDays: [1, 2, 3, 4, 5] })
          }
        >
          1 Month (WD)
        </button>
        <button onClick={() => setPreset({ unit: 'month', count: 3 })}>Quarter</button>
      </div>

      <div>
        {customViewOptions?.unit === 'month'
          ? renderMonthViews()
          : renderHorizontalView(customViewOptions?.unit === 'week' ? weekData : dayData)}
      </div>
    </div>
  );
};

export default CalendarDemo;
