import { type Component, For, Show } from "solid-js";
import { useCalendar, generateId, type CustomViewOptions } from "@verbpatch/solidjs-calendar";

const CalendarDemo: Component = () => {
  const calendar = useCalendar({
    defaultView: "custom",
    customViewOptions: { unit: "day", count: 2 },
    initialEvents: [
      { id: generateId(), title: 'Project Review', start: new Date(), end: new Date(new Date().getTime() + 3600000), color: '#8b5cf6' },
      { id: generateId(), title: 'Lunch Sync', start: new Date(new Date().setHours(12, 0)), end: new Date(new Date().setHours(13, 0)), color: '#10b981' }
    ]
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
    if (!cal || !opts) return "";
    if (opts.unit === 'month') return cal.monthData?.monthName;
    if (opts.unit === 'week') return cal.weekData?.weekRange;
    return cal.dayData?.dayName;
  };

  return (
    <div style={{ "max-width": "1000px", margin: "0 auto", background: "white", padding: "24px", "border-radius": "12px", "box-shadow": "0 4px 6px rgba(0,0,0,0.1)", "font-family": "sans-serif" }}>
      <div style={{ display: "flex", "justify-content": "space-between", "align-items": "center", "margin-bottom": "24px" }}>
        <div style={{ display: "flex", gap: "8px" }}>
          <button onClick={() => calendar()?.goToPrevious()} style={btnStyle}>Previous</button>
          <button onClick={() => calendar()?.goToToday()} style={btnStyle}>Today</button>
          <button onClick={() => calendar()?.goToNext()} style={btnStyle}>Next</button>
        </div>
        <h2 style={{ margin: 0 }}>{getTitle()}</h2>
      </div>

      <div style={{ "margin-bottom": "24px", padding: "16px", background: "#f3f4f6", "border-radius": "8px" }}>
        <strong>View Presets:</strong>
        <div style={{ display: "flex", gap: "8px", "margin-top": "12px", "flex-wrap": "wrap" }}>
          <button onClick={() => calendar()?.changeView('custom', { unit: 'day', count: 2 })} style={btnStyle}>2 Days</button>
          <button onClick={() => calendar()?.changeView('custom', { unit: 'week', count: 1, includeSpecificDays: [1,2,3,4,5] })} style={btnStyle}>Work Week</button>
          <button onClick={() => calendar()?.changeView('custom', { unit: 'week', count: 2 })} style={btnStyle}>2 Weeks</button>
          <button onClick={() => calendar()?.changeView('custom', { unit: 'month', count: 1, includeSpecificDays: [1,2,3,4,5] })} style={btnStyle}>1 Month Weekdays</button>
          <button onClick={() => calendar()?.changeView('custom', { unit: 'month', count: 3 })} style={btnStyle}>Quarter (3 Months)</button>
        </div>
      </div>

      <div class="view-content">
        <Show when={calendar()?.customViewOptions?.unit === 'month' && calendar()?.monthData} fallback={
          <table border="1" style={{ width: "100%", "border-collapse": "collapse", "margin-top": "20px", "text-align": "center" }}>
            <thead>
              <tr style={{ background: "#f9fafb" }}>
                <For each={calendar()?.customViewOptions?.unit === 'week' ? calendar()?.weekData?.dates : calendar()?.dayData?.dates}>
                  {(date) => (
                    <th style={{ padding: "10px" }}>
                      <div style={{ "font-size": "12px", color: "#6b7280" }}>{calendar()?.utils.formatDate(date, 'EEE')}</div>
                      <div style={{ "font-size": "16px" }}>{date.getDate()}</div>
                    </th>
                  )}
                </For>
              </tr>
            </thead>
            <tbody>
              <tr>
                <For each={calendar()?.customViewOptions?.unit === 'week' ? calendar()?.weekData?.dates : calendar()?.dayData?.dates}>
                  {(date) => (
                    <td style={{ 
                      height: "150px", 
                      "vertical-align": "top", 
                      padding: "8px",
                      background: calendar()?.utils.isSameDay(date, new Date()) ? "#eff6ff" : "white"
                    }}>
                      <div style={{ display: "flex", "flex-direction": "column", gap: "4px" }}>
                        <For each={calendar()?.getEventsForDate(date)}>
                          {(event) => (
                            <div style={{ background: event.color, color: "white", padding: "4px 8px", "border-radius": "4px", "font-size": "11px" }}>
                              {event.title}
                            </div>
                          )}
                        </For>
                      </div>
                    </td>
                  )}
                </For>
              </tr>
            </tbody>
          </table>
        }>
          <For each={getMonthsToDisplay()}>
            {(m) => (
              <div style={{ "margin-bottom": "30px" }}>
                <div style={{ "font-weight": "bold", "font-size": "1.2em", "margin-bottom": "10px", "margin-top": "20px" }}>{calendar()?.utils.formatLocalizedMonth(m.date)}</div>
                <table border="1" style={{ width: "100%", "border-collapse": "collapse", "text-align": "center" }}>
                  <thead>
                    <tr>
                      <For each={calendar()?.utils.daysofWeek('short')}>
                        {(day) => <th style={{ padding: "8px", background: "#f8fafc" }}>{day}</th>}
                      </For>
                    </tr>
                  </thead>
                  <tbody>
                    <For each={calendar()?.monthData?.weeks}>
                      {(week) => (
                        <Show when={week.some(d => d.getMonth() === m.month && d.getFullYear() === m.year)}>
                          <tr>
                            <For each={[0,1,2,3,4,5,6]}>
                              {(dayIdx) => {
                                const date = () => week.find(d => d.getDay() === dayIdx);
                                const isInMonth = () => date() && date()!.getMonth() === m.month && date()!.getFullYear() === m.year;
                                return (
                                  <td style={{ 
                                    border: "1px solid #ccc", 
                                    height: "100px", 
                                    "vertical-align": "top", 
                                    padding: "4px",
                                    width: "14.28%",
                                    background: !isInMonth() ? "#f8fafc" : (calendar()?.utils.isSameDay(date()!, new Date()) ? "#eff6ff" : "white")
                                  }}>
                                    <Show when={isInMonth()}>
                                      <div style={{ "text-align": "right", "font-size": "12px", "margin-bottom": "4px" }}>{date()!.getDate()}</div>
                                      <div style={{ display: "flex", "flex-direction": "column", gap: "2px" }}>
                                        <For each={calendar()?.getEventsForDate(date()!)}>
                                          {(event) => (
                                            <div style={{ background: event.color, color: "white", padding: "2px 4px", "border-radius": "2px", "font-size": "10px", "white-space": "nowrap", overflow: "hidden", "text-overflow": "ellipsis" }}>
                                              {event.title}
                                            </div>
                                          )}
                                        </For>
                                      </div>
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

const btnStyle = {
  padding: "8px 16px",
  background: "white",
  border: "1px solid #d1d5db",
  "border-radius": "6px",
  cursor: "pointer",
  "font-weight": "500"
};

export default CalendarDemo;