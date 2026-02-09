import { useCalendar, generateId, type CustomViewOptions } from "@verbpatch/preact-calendar";
import { useState } from "preact/hooks";
import type { FunctionalComponent } from "preact";

export const CalendarDemo: FunctionalComponent = () => {
  const calendar = useCalendar({
    defaultView: "custom",
    customViewOptions: {
      unit: "day",
      count: 2
    },
    initialEvents: [
      { id: generateId(), title: 'Project Review', start: new Date(), end: new Date(new Date().getTime() + 3600000), color: '#8b5cf6' },
      { id: generateId(), title: 'Lunch Sync', start: new Date(new Date().setHours(12, 0)), end: new Date(new Date().setHours(13, 0)), color: '#10b981' }
    ]
  });

  const {
    view,
    monthData,
    weekData,
    dayData,
    customViewOptions,
    goToPrevious,
    goToToday,
    goToNext,
    getEventsForDate,
    utils,
    changeView
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

  const renderMonthViews = () => {
    if (!monthData) return null;
    const months = getMonthsToDisplay();
    return months.map(m => (
      <div key={`${m.year}-${m.month}`} style={{ marginBottom: "30px" }}>
        <div style={{ fontWeight: "bold", fontSize: "1.2em", marginBottom: "10px", marginTop: "20px" }}>{utils.formatLocalizedMonth(m.date)}</div>
        <table border={1} style={{ width: "100%", borderCollapse: "collapse", textAlign: "center" }}>
          <thead>
            <tr style={{ background: "#f9fafb" }}>
              {utils.daysofWeek('short').map(day => <th key={day} style={{ padding: "8px" }}>{day}</th>)}
            </tr>
          </thead>
          <tbody>
            {monthData.weeks.map((week, weekIdx) => {
              if (!week.some(d => d.getMonth() === m.month && d.getFullYear() === m.year)) return null;
              return (
                <tr key={weekIdx}>
                  {[0,1,2,3,4,5,6].map(dayIdx => {
                    const date = week.find(d => d.getDay() === dayIdx);
                    const isInMonth = date && date.getMonth() === m.month && date.getFullYear() === m.year;
                    const isToday = date && utils.isSameDay(date, new Date());
                    return (
                      <td key={dayIdx} style={{ 
                        height: "100px", 
                        verticalAlign: "top", 
                        padding: "4px",
                        background: !isInMonth ? "#f9fafb" : (isToday ? "#eff6ff" : "white"),
                        width: "14.28%"
                      }}>
                        {isInMonth && (
                          <>
                            <div style={{ textAlign: "right", fontSize: "12px", marginBottom: "4px" }}>{date!.getDate()}</div>
                            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                              {getEventsForDate(date!).map(e => (
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
    ));
  };

  const renderHorizontalView = () => {
    const data = customViewOptions?.unit === 'week' ? weekData : dayData;
    if (!data) return null;
    return (
      <table border={1} style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
        <thead>
          <tr style={{ background: "#f9fafb" }}>
            {data.dates.map(date => (
              <th key={date.toISOString()} style={{ padding: "10px" }}>
                <div style={{ fontSize: "12px", color: "#6b7280" }}>{utils.formatDate(date, 'EEE')}</div>
                <div style={{ fontSize: "18px" }}>{date.getDate()}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {data.dates.map(date => {
              const isToday = utils.isSameDay(date, new Date());
              return (
                <td key={date.toISOString()} style={{ 
                  height: "150px", 
                  verticalAlign: "top", 
                  padding: "8px",
                  background: isToday ? "#eff6ff" : "white"
                }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    {getEventsForDate(date).map(e => (
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
    );
  };

  const getTitle = () => {
    if (customViewOptions?.unit === 'month') return monthData?.monthName;
    if (customViewOptions?.unit === 'week') return weekData?.weekRange;
    return dayData?.dayName;
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", background: "white", padding: "24px", borderRadius: "12px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div style={{ display: "flex", gap: "8px" }}>
          <button onClick={goToPrevious} style={btnStyle}>Previous</button>
          <button onClick={goToToday} style={btnStyle}>Today</button>
          <button onClick={goToNext} style={btnStyle}>Next</button>
        </div>
        <h2 style={{ margin: 0 }}>{getTitle()}</h2>
      </div>

      <div style={{ marginBottom: "24px", padding: "16px", background: "#f3f4f6", borderRadius: "8px" }}>
        <strong>View Presets:</strong>
        <div style={{ display: "flex", gap: "8px", marginTop: "12px", flexWrap: "wrap" }}>
          <button onClick={() => setPreset({ unit: 'day', count: 2 })} style={btnStyle}>2 Days</button>
          <button onClick={() => setPreset({ unit: 'week', count: 1, includeSpecificDays: [1,2,3,4,5] })} style={btnStyle}>Work Week</button>
          <button onClick={() => setPreset({ unit: 'week', count: 2 })} style={btnStyle}>2 Weeks</button>
          <button onClick={() => setPreset({ unit: 'month', count: 1, includeSpecificDays: [1,2,3,4,5] })} style={btnStyle}>1 Month Weekdays</button>
          <button onClick={() => setPreset({ unit: 'month', count: 3 })} style={btnStyle}>Quarter (3 Months)</button>
        </div>
      </div>

      <div>
        {customViewOptions?.unit === 'month' ? renderMonthViews() : renderHorizontalView()}
      </div>
    </div>
  );
};

const btnStyle = {
  padding: "8px 16px",
  background: "white",
  border: "1px solid #d1d5db",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "500"
};