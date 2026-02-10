import { useCalendar, generateId, type CustomViewOptions } from '@verbpatch/preact-calendar';
import type { FunctionalComponent } from 'preact';

export const CalendarDemo: FunctionalComponent = () => {
  const calendar = useCalendar({
    defaultView: 'custom',
    customViewOptions: {
      type: 'day',
      count: 2,
    },
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
    if (!customViewOptions || customViewOptions.type !== 'month') return [];
    const count = customViewOptions.count || 1;
    const months = [];
    for (let i = 0; i < count; i++) {
      const d = utils.addMonths(calendar.currentDate, i);
      months.push({ month: d.getMonth(), year: d.getFullYear(), date: d });
    }
    return months;
  };

  const renderMonthViews = () => {
    if (!monthData) return null;
    const months = getMonthsToDisplay();
    return months.map((m) => (
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
            {monthData.weeks.map((week, weekIdx) => {
              if (!week.some((d) => d.getMonth() === m.month && d.getFullYear() === m.year))
                return null;
              return (
                <tr key={weekIdx}>
                  {[0, 1, 2, 3, 4, 5, 6].map((dayIdx) => {
                    const date = week.find((d) => d.getDay() === dayIdx);
                    const isInMonth =
                      date && date.getMonth() === m.month && date.getFullYear() === m.year;
                    const isToday = date && utils.isSameDay(date, new Date());
                    return (
                      <td
                        key={dayIdx}
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
                                  border: '1px solid',
                                  fontSize: '10px',
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
    ));
  };

  const renderHorizontalView = () => {
    const data = customViewOptions?.type === 'week' ? weekData : dayData;
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
            {data.dates.map((date) => (
              <th key={date.toISOString()}>{utils.formatDate(date, 'EEE d')}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {data.dates.map((date) => {
              const isToday = utils.isSameDay(date, new Date());
              return (
                <td
                  key={date.toISOString()}
                  style={{
                    height: '100px',
                    verticalAlign: 'top',
                    background: isToday ? '#eee' : 'transparent',
                  }}
                >
                  {getEventsForDate(date).map((e) => (
                    <div
                      key={e.id}
                      style={{ border: '1px solid', fontSize: '11px', marginBottom: '2px' }}
                    >
                      {e.title}
                    </div>
                  ))}
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    );
  };

  const getTitle = () => {
    if (!customViewOptions) return '';
    if (customViewOptions.type === 'month') return monthData?.monthName;
    if (customViewOptions.type === 'week') return weekData?.weekRange;
    return dayData?.dayName;
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Preact Calendar Custom View Example</h1>
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
        <button onClick={() => setPreset({ type: 'day', count: 2 })}>2 Days</button>
        <button
          onClick={() =>
            setPreset({ type: 'week', count: 1, includeSpecificDays: [1, 2, 3, 4, 5] })
          }
        >
          Work Week
        </button>
        <button onClick={() => setPreset({ type: 'week', count: 2 })}>2 Weeks</button>
        <button
          onClick={() =>
            setPreset({ type: 'month', count: 1, includeSpecificDays: [1, 2, 3, 4, 5] })
          }
        >
          1 Month (WD)
        </button>
        <button onClick={() => setPreset({ type: 'month', count: 3 })}>Quarter</button>
      </div>

      <div>{customViewOptions?.type === 'month' ? renderMonthViews() : renderHorizontalView()}</div>
    </div>
  );
};
