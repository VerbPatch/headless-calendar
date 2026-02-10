import { component$ } from '@builder.io/qwik';
import { useCalendar, generateId } from '@verbpatch/qwik-calendar';

export const App = component$(() => {
  const calendar = useCalendar({
    defaultView: 'custom',
    customViewOptions: { unit: 'day', count: 2 },
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

  const getMonthsToDisplay = () => {
    const opts = calendar.customViewOptions;
    if (!opts || opts.unit !== 'month') return [];
    const count = opts.count || 1;
    const months = [];
    for (let i = 0; i < count; i++) {
      const d = calendar.utils.addMonths(calendar.currentDate, i);
      months.push({ month: d.getMonth(), year: d.getFullYear(), date: d });
    }
    return months;
  };

  const getTitle = () => {
    const opts = calendar.customViewOptions;
    if (!opts) return '';
    if (opts.unit === 'month') return calendar.monthData?.monthName;
    if (opts.unit === 'week') return calendar.weekData?.weekRange;
    return calendar.dayData?.dayName;
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Qwik Calendar Custom View Example</h1>
      <div>
        <button onClick$={() => calendar.goToPrevious()}>Prev</button>
        <button onClick$={() => calendar.goToToday()}>Today</button>
        <button onClick$={() => calendar.goToNext()}>Next</button>
        <span style={{ marginLeft: '20px' }}>
          <strong>{getTitle()}</strong>
        </span>
      </div>

      <div style={{ margin: '20px 0' }}>
        <strong>Presets:</strong>
        <button onClick$={() => calendar.changeView('custom', { unit: 'day', count: 2 })}>
          2 Days
        </button>
        <button
          onClick$={() =>
            calendar.changeView('custom', {
              unit: 'week',
              count: 1,
              includeSpecificDays: [1, 2, 3, 4, 5],
            })
          }
        >
          Work Week
        </button>
        <button onClick$={() => calendar.changeView('custom', { unit: 'week', count: 2 })}>
          2 Weeks
        </button>
        <button
          onClick$={() =>
            calendar.changeView('custom', {
              unit: 'month',
              count: 1,
              includeSpecificDays: [1, 2, 3, 4, 5],
            })
          }
        >
          1 Month (WD)
        </button>
        <button onClick$={() => calendar.changeView('custom', { unit: 'month', count: 3 })}>
          Quarter
        </button>
      </div>

      <div>
        {calendar.customViewOptions?.unit === 'month' && calendar.monthData ? (
          <div>
            {getMonthsToDisplay().map((m) => (
              <div key={`${m.year}-${m.month}`}>
                <h3>{calendar.utils.formatLocalizedMonth(m.date)}</h3>
                <table
                  border={1}
                  cellPadding={5}
                  style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}
                >
                  <thead>
                    <tr>
                      {calendar.utils.daysofWeek('short').map((day) => (
                        <th key={day}>{day}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {calendar.monthData?.weeks.map((week, weekIdx) => {
                      if (!week.some((d) => d.getMonth() === m.month && d.getFullYear() === m.year))
                        return null;
                      return (
                        <tr key={weekIdx}>
                          {[0, 1, 2, 3, 4, 5, 6].map((dayIdx) => {
                            const date = week.find((d) => d.getDay() === dayIdx);
                            const isInMonth =
                              date && date.getMonth() === m.month && date.getFullYear() === m.year;
                            const isToday = date && calendar.utils.isSameDay(date, new Date());
                            return (
                              <td
                                key={dayIdx}
                                style={{
                                  height: '80px',
                                  verticalAlign: 'top',
                                  background: !isInMonth
                                    ? 'transparent'
                                    : isToday
                                      ? '#eee'
                                      : 'transparent',
                                }}
                              >
                                {isInMonth && (
                                  <>
                                    <div>
                                      <strong>{date!.getDate()}</strong>
                                    </div>
                                    {calendar.getEventsForDate(date!).map((e) => (
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
            ))}
          </div>
        ) : (
          <table
            border={1}
            cellPadding={5}
            style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}
          >
            <thead>
              <tr>
                {(calendar.customViewOptions?.unit === 'week'
                  ? calendar.weekData?.dates
                  : calendar.dayData?.dates
                )?.map((date) => (
                  <th key={date.toISOString()}>{calendar.utils.formatDate(date, 'EEE d')}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {(calendar.customViewOptions?.unit === 'week'
                  ? calendar.weekData?.dates
                  : calendar.dayData?.dates
                )?.map((date) => {
                  const isToday = calendar.utils.isSameDay(date, new Date());
                  return (
                    <td
                      key={date.toISOString()}
                      style={{
                        height: '100px',
                        verticalAlign: 'top',
                        background: isToday ? '#eee' : 'transparent',
                      }}
                    >
                      {calendar.getEventsForDate(date).map((e) => (
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
        )}
      </div>
    </div>
  );
});
