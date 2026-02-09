import React, { JSX, useCallback, useMemo } from "react";
import { useCalendar, CalendarEvent, generateId, CustomViewOptions } from "@verbpatch/react-calendar";

const CalendarDemo: React.FC = () => {
  const initialEvents = useMemo<CalendarEvent[]>(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return [
      {
        id: generateId(),
        title: "Project Review",
        start: new Date(),
        end: new Date(new Date().getTime() + 3600000),
        color: "#8b5cf6",
      },
      {
        id: generateId(),
        title: "Lunch Sync",
        start: new Date(new Date().setHours(12, 0)),
        end: new Date(new Date().setHours(13, 0)),
        color: "#10b981",
      },
    ];
  }, []);

  const calendar = useCalendar({
    defaultView: "custom",
    customViewOptions: { unit: "day", count: 2 },
    initialEvents,
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

  const renderMonthViews = (): JSX.Element | null => {
    if (!monthData) return null;
    const months = getMonthsToDisplay();
    return (
      <>
        {months.map((m) => (
          <div key={`${m.year}-${m.month}`} style={{ marginBottom: "30px" }}>
            <div style={{ marginTop: "20px", fontWeight: "bold", fontSize: "1.2em", marginBottom: "10px" }}>
              {utils.formatLocalizedMonth(m.date)}
            </div>
            <table border={1} style={{ borderCollapse: "collapse", width: "100%", textAlign: "center" }}>
              <thead>
                <tr>
                  {utils.daysofWeek("short").map((day) => (
                    <th key={day} style={{ padding: "8px", background: "#f8fafc" }}>{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {monthData.weeks.map((week, weekIndex) => {
                  if (!week.some((d) => d.getMonth() === m.month && d.getFullYear() === m.year)) return null;
                  return (
                    <tr key={weekIndex}>
                      {[0, 1, 2, 3, 4, 5, 6].map((dayIndex) => {
                        const date = week.find((d) => d.getDay() === dayIndex);
                        const isInMonth = date && date.getMonth() === m.month && date.getFullYear() === m.year;
                        const isToday = date && utils.isSameDay(date, new Date());
                        
                        return (
                          <td
                            key={dayIndex}
                            style={{
                              height: "100px",
                              width: "14.28%",
                              verticalAlign: "top",
                              padding: "4px",
                              background: !isInMonth ? "#f8fafc" : (isToday ? "#eff6ff" : "white"),
                            }}
                          >
                            {isInMonth && (
                              <>
                                <div style={{ textAlign: "right", fontSize: "12px", marginBottom: "4px" }}>
                                  {date!.getDate()}
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                                  {getEventsForDate(date!).map((e) => (
                                    <div
                                      key={e.id}
                                      style={{
                                        background: e.color,
                                        color: "white",
                                        padding: "2px 4px",
                                        fontSize: "10px",
                                        borderRadius: "2px",
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                      }}
                                    >
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
      </>
    );
  };

  const renderHorizontalView = (data: typeof weekData | typeof dayData): JSX.Element | null => {
    if (!data) return null;
    return (
      <table border={1} style={{ borderCollapse: "collapse", width: "100%", marginTop: "20px" }}>
        <thead>
          <tr style={{ background: "#f8fafc" }}>
            {data.dates.map((date, idx) => (
              <th key={idx} style={{ padding: "10px" }}>
                <div style={{ fontSize: "12px", color: "#64748b" }}>{utils.formatDate(date, "EEE")}</div>
                <div style={{ fontSize: "16px" }}>{date.getDate()}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {data.dates.map((date, idx) => {
              const isToday = utils.isSameDay(date, new Date());
              return (
                <td key={idx} style={{ height: "150px", verticalAlign: "top", padding: "8px", background: isToday ? "#eff6ff" : "white" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    {getEventsForDate(date).map((e) => (
                      <div key={e.id} style={{ background: e.color, color: "white", padding: "4px 8px", fontSize: "11px", borderRadius: "4px" }}>
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
    if (!customViewOptions) return '';
    if (customViewOptions.unit === 'month') return monthData?.monthName;
    if (customViewOptions.unit === 'week') return weekData?.weekRange;
    return dayData?.dayName;
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "20px", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={goToPrevious} style={btnStyle}>Previous</button>
          <button onClick={goToToday} style={btnStyle}>Today</button>
          <button onClick={goToNext} style={btnStyle}>Next</button>
        </div>
        <h2 style={{ margin: 0 }}>{getTitle()}</h2>
      </div>

      <div style={{ marginBottom: "20px", padding: "15px", background: "#f1f5f9", borderRadius: "8px" }}>
        <strong>View Presets:</strong>
        <div style={{ display: "flex", gap: "8px", marginTop: "10px", flexWrap: "wrap" }}>
          <button onClick={() => setPreset({ unit: "day", count: 2 })} style={btnStyle}>2 Days</button>
          <button onClick={() => setPreset({ unit: "week", count: 1, includeSpecificDays: [1, 2, 3, 4, 5] })} style={btnStyle}>Work Week</button>
          <button onClick={() => setPreset({ unit: "week", count: 2 })} style={btnStyle}>2 Weeks</button>
          <button onClick={() => setPreset({ unit: "month", count: 1, includeSpecificDays: [1, 2, 3, 4, 5] })} style={btnStyle}>1 Month Weekdays</button>
          <button onClick={() => setPreset({ unit: "month", count: 3 })} style={btnStyle}>Quarter (3 Months)</button>
        </div>
      </div>

      <div className="view-content">
        {customViewOptions?.unit === "month" ? renderMonthViews() : 
         renderHorizontalView(customViewOptions?.unit === "week" ? weekData : dayData)}
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
  fontWeight: 500 as const
};

export default CalendarDemo;