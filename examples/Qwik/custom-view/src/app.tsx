import { component$ } from "@builder.io/qwik";
import { useCalendar, type CustomViewOptions, generateId } from "@verbpatch/qwik-calendar";

export const App = component$(() => {
  const calendar = useCalendar({
    defaultView: "custom",
    customViewOptions: { unit: "day", count: 2 },
    initialEvents: [
      { id: generateId(), title: 'Project Review', start: new Date(), end: new Date(new Date().getTime() + 3600000), color: '#8b5cf6' },
      { id: generateId(), title: 'Lunch Sync', start: new Date(new Date().setHours(12, 0)), end: new Date(new Date().setHours(13, 0)), color: '#10b981' }
    ]
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
    <div style={{ padding: "20px", background: "#f8fafc", minHeight: "100vh", fontFamily: "sans-serif" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto", background: "white", borderRadius: "12px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)", padding: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div style={{ display: "flex", gap: "8px" }}>
            <button onClick$={() => calendar.goToPrevious()} style={btnStyle}>Previous</button>
            <button onClick$={() => calendar.goToToday()} style={btnStyle}>Today</button>
            <button onClick$={() => calendar.goToNext()} style={btnStyle}>Next</button>
          </div>
          <h2 style={{ margin: 0 }}>{getTitle()}</h2>
        </div>

        <div style={{ marginBottom: "20px", padding: "15px", background: "#f1f5f9", borderRadius: "8px" }}>
          <strong>View Presets:</strong>
          <div style={{ display: "flex", gap: "8px", marginTop: "10px", flexWrap: "wrap" }}>
            <button onClick$={() => calendar.changeView('custom', { unit: 'day', count: 2 })} style={btnStyle}>2 Days</button>
            <button onClick$={() => calendar.changeView('custom', { unit: 'week', count: 1, includeSpecificDays: [1,2,3,4,5] })} style={btnStyle}>Work Week</button>
            <button onClick$={() => calendar.changeView('custom', { unit: 'week', count: 2 })} style={btnStyle}>2 Weeks</button>
            <button onClick$={() => calendar.changeView('custom', { unit: 'month', count: 1, includeSpecificDays: [1,2,3,4,5] })} style={btnStyle}>1 Month Weekdays</button>
            <button onClick$={() => calendar.changeView('custom', { unit: 'month', count: 3 })} style={btnStyle}>Quarter (3 Months)</button>
          </div>
        </div>

        <div class="view-content">
          {calendar.customViewOptions?.unit === 'month' && calendar.monthData ? (
            <div class="month-views">
              {getMonthsToDisplay().map(m => (
                <div key={`${m.year}-${m.month}`} style={{ marginBottom: "30px" }}>
                  <div style={{ fontWeight: "bold", fontSize: "1.2em", marginBottom: "10px", marginTop: "20px" }}>{calendar.utils.formatLocalizedMonth(m.date)}</div>
                  <table border={1} style={{ width: "100%", borderCollapse: "collapse", textAlign: "center" }}>
                    <thead>
                      <tr>
                        {calendar.utils.daysofWeek('short').map(day => (
                          <th key={day} style={{ padding: "8px", background: "#f8fafc" }}>{day}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {calendar.monthData?.weeks.map((week, weekIdx) => {
                        if (!week.some(d => d.getMonth() === m.month && d.getFullYear() === m.year)) return null;
                        return (
                          <tr key={weekIdx}>
                            {[0,1,2,3,4,5,6].map(dayIdx => {
                              const date = week.find(d => d.getDay() === dayIdx);
                              const isInMonth = date && date.getMonth() === m.month && date.getFullYear() === m.year;
                              const isToday = date && calendar.utils.isSameDay(date, new Date());
                              return (
                                <td key={dayIdx} style={{ 
                                  height: "100px", 
                                  verticalAlign: "top", 
                                  padding: "4px",
                                  width: "14.28%",
                                  background: !isInMonth ? "#f8fafc" : (isToday ? "#eff6ff" : "white")
                                }}>
                                  {isInMonth && (
                                    <>
                                      <div style={{ textAlign: "right", fontSize: "12px", marginBottom: "4px" }}>{date!.getDate()}</div>
                                      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                                        {calendar.getEventsForDate(date!).map(e => (
                                          <div key={e.id} style={{ background: e.color, color: "white", padding: "2px 4px", borderRadius: "2px", fontSize: "10px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                            {e.title}
                                          </div>
                                        ))}
                                      </div>
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
            <>
              {(calendar.customViewOptions?.unit === 'week' || calendar.customViewOptions?.unit === 'day') && (
                <div style={{ overflowX: "auto" }}>
                  <table border={1} style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
                    <thead>
                      <tr style={{ background: "#f8fafc" }}>
                        {(calendar.customViewOptions?.unit === 'week' ? calendar.weekData?.dates : calendar.dayData?.dates)?.map(date => (
                          <th key={date.toISOString()} style={{ padding: "10px" }}>
                            <div style={{ fontSize: "12px", color: "#6b7280" }}>{calendar.utils.formatDate(date, 'EEE')}</div>
                            <div style={{ fontSize: "16px" }}>{date.getDate()}</div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {(calendar.customViewOptions?.unit === 'week' ? calendar.weekData?.dates : calendar.dayData?.dates)?.map(date => {
                          const isToday = calendar.utils.isSameDay(date, new Date());
                          return (
                            <td key={date.toISOString()} style={{ 
                              height: "150px", 
                              verticalAlign: "top", 
                              padding: "8px",
                              background: isToday ? "#eff6ff" : "white"
                            }}>
                              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                                {calendar.getEventsForDate(date).map(e => (
                                  <div key={e.id} style={{ background: e.color, color: "white", padding: "4px 8px", borderRadius: "4px", fontSize: "11px" }}>
                                    {e.title}
                                  </div>
                                ))}
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
});

const btnStyle = {
  padding: "8px 16px",
  background: "white",
  border: "1px solid #d1d5db",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "500",
  fontSize: "14px"
};