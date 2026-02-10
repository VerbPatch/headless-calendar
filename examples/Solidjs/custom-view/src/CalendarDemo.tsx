import { type Component, For, Show } from 'solid-js';
import { useCalendar, generateId, type CustomViewOptions } from '@verbpatch/solidjs-calendar';

const CalendarDemo: Component = () => {
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
    const cal = calendar();
    const opts = cal?.customViewOptions;
    if (!cal || !opts || opts.unit !== 'month') return [];
    const count = opts.count || 1;
    const months = [];
    for (let i = 0; i < count; i++) {
      const d = cal.utils.addMonths(cal.currentDate, i);
      months.push({ month: d.getMonth(), year: d.getFullYear(), date: d });
    }
    return months;
  };

  const getTitle = () => {
    const cal = calendar();
    const opts = cal?.customViewOptions;
    if (!cal || !opts) return '';
    if (opts.unit === 'month') return cal.monthData?.monthName;
    if (opts.unit === 'week') return cal.weekData?.weekRange;
    return cal.dayData?.dayName;
  };

  return (
    <div style={{ padding: '20px', 'font-family': 'sans-serif' }}>
      <h1>Solidjs Calendar Custom View Example</h1>
      <div>
        <button onClick={() => calendar()?.goToPrevious()}>Prev</button>
        <button onClick={() => calendar()?.goToToday()}>Today</button>
        <button onClick={() => calendar()?.goToNext()}>Next</button>
        <span style={{ 'margin-left': '20px' }}>
          <strong>{getTitle()}</strong>
        </span>
      </div>

      <div style={{ margin: '20px 0' }}>
        <strong>Presets:</strong>
        <button onClick={() => calendar()?.changeView('custom', { unit: 'day', count: 2 })}>
          2 Days
        </button>
        <button
          onClick={() =>
            calendar()?.changeView('custom', {
              unit: 'week',
              count: 1,
              includeSpecificDays: [1, 2, 3, 4, 5],
            })
          }
        >
          Work Week
        </button>
        <button onClick={() => calendar()?.changeView('custom', { unit: 'week', count: 2 })}>
          2 Weeks
        </button>
        <button
          onClick={() =>
            calendar()?.changeView('custom', {
              unit: 'month',
              count: 1,
              includeSpecificDays: [1, 2, 3, 4, 5],
            })
          }
        >
          1 Month (WD)
        </button>
        <button onClick={() => calendar()?.changeView('custom', { unit: 'month', count: 3 })}>
          Quarter
        </button>
      </div>

      <div>
        <Show
          when={calendar()?.customViewOptions?.unit === 'month' && calendar()?.monthData}
          fallback={
            <table style={{ width: '100%', 'border-collapse': 'collapse', 'text-align': 'center' }}>
              <thead>
                <tr>
                  <For
                    each={
                      calendar()?.customViewOptions?.unit === 'week'
                        ? calendar()?.weekData?.dates
                        : calendar()?.dayData?.dates
                    }
                  >
                    {(date) => <th>{calendar()?.utils.formatDate(date, 'EEE d')}</th>}
                  </For>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <For
                    each={
                      calendar()?.customViewOptions?.unit === 'week'
                        ? calendar()?.weekData?.dates
                        : calendar()?.dayData?.dates
                    }
                  >
                    {(date) => (
                      <td
                        style={{
                          height: '100px',
                          'vertical-align': 'top',
                          background: calendar()?.utils.isSameDay(date, new Date())
                            ? '#eee'
                            : 'transparent',
                        }}
                      >
                        <For each={calendar()?.getEventsForDate(date)}>
                          {(event) => (
                            <div
                              style={{
                                'font-size': '11px',
                                border: '1px solid',
                                'margin-bottom': '2px',
                              }}
                            >
                              {event.title}
                            </div>
                          )}
                        </For>
                      </td>
                    )}
                  </For>
                </tr>
              </tbody>
            </table>
          }
        >
          <For each={getMonthsToDisplay()}>
            {(m) => (
              <div>
                <h3>{calendar()?.utils.formatLocalizedMonth(m.date)}</h3>
                <table
                  style={{ width: '100%', 'border-collapse': 'collapse', 'text-align': 'center' }}
                >
                  <thead>
                    <tr>
                      <For each={calendar()?.utils.daysofWeek('short')}>
                        {(day) => <th>{day}</th>}
                      </For>
                    </tr>
                  </thead>
                  <tbody>
                    <For each={calendar()?.monthData?.weeks}>
                      {(week) => (
                        <Show
                          when={week.some(
                            (d) => d.getMonth() === m.month && d.getFullYear() === m.year,
                          )}
                        >
                          <tr>
                            <For each={[0, 1, 2, 3, 4, 5, 6]}>
                              {(dayIdx) => {
                                const date = () => week.find((d) => d.getDay() === dayIdx);
                                const isInMonth = () =>
                                  date() &&
                                  date()!.getMonth() === m.month &&
                                  date()!.getFullYear() === m.year;
                                return (
                                  <td
                                    style={{
                                      height: '80px',
                                      'vertical-align': 'top',
                                      background:
                                        isInMonth() &&
                                        calendar()?.utils.isSameDay(date()!, new Date())
                                          ? '#eee'
                                          : 'transparent',
                                    }}
                                  >
                                    <Show when={isInMonth()}>
                                      <div>
                                        <strong>{date()!.getDate()}</strong>
                                      </div>
                                      <For each={calendar()?.getEventsForDate(date()!)}>
                                        {(event) => (
                                          <div
                                            style={{
                                              border: '1px solid',
                                              'font-size': '10px',
                                              'margin-bottom': '2px',
                                            }}
                                          >
                                            {event.title}
                                          </div>
                                        )}
                                      </For>
                                    </Show>
                                  </td>
                                );
                              }}
                            </For>
                          </tr>
                        </Show>
                      )}
                    </For>
                  </tbody>
                </table>
              </div>
            )}
          </For>
        </Show>
      </div>
    </div>
  );
};

export default CalendarDemo;
