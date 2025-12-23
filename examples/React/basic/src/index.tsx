import { createRoot } from "react-dom/client";
import React, { JSX } from "react";
import useCalendar from "@verbpatch/react-calendar";

const CalendarDemo: React.FC = () => {
  const {
    view,
    changeView,

    monthData,
    weekData,
    dayData,
    timeSlots,

    goToPrevious,
    goToToday,
    goToNext,

    utils: { formatDate, formatDateTime, daysofWeek },
  } = useCalendar({
    defaultView: "month",
    startOfWeek: 0, // 0 = Sunday, 1 = Monday
  });

  const renderMonthView = (): JSX.Element | null => {
    if (!monthData) return null;
    return (
      <>
        <tr>
          {daysofWeek("long").map((day) => (
            <td align="center" key={day}>
              {day}
            </td>
          ))}
        </tr>

        {monthData.weeks.map((week, weekIndex) => (
          <tr key={weekIndex}>
            {week.map((date, dayIndex) => {
              const isCurrentMonth = monthData!.isCurrentMonth(date);
              const isToday = monthData!.isToday(date);

              return (
                <td
                  align="center"
                  key={dayIndex}
                  style={{
                    backgroundColor: isToday ? "#cecece" : "#fff",
                    fontWeight: isToday ? "bold" : "normal",
                    color: isCurrentMonth ? "#000" : "#888",
                    cursor: "pointer",
                    width: "100px",
                    height: "50px",
                  }}
                >
                  <div>{formatDate(date, "d")}</div>
                </td>
              );
            })}
          </tr>
        ))}
      </>
    );
  };

  const renderWeekView = (): JSX.Element | null => {
    if (!weekData) return null;

    return (
      <>
        <tr>
          <th></th>
          {weekData.dates.map((date, index) => (
            <th key={index}>{formatDateTime(date, "d MMM")}</th>
          ))}
        </tr>

        {timeSlots.map((slot) => (
          <tr key={slot.label} data-key={slot.label}>
            <td>
              <div key={slot.time} data-slot={slot.time}>
                {slot.label}
              </div>
            </td>
            {weekData.dates.map((date, dateIndex) => {
              return (
                <td key={dateIndex}>
                  <div key={slot.time} data-date={formatDate(date)} data-slot={slot.time}></div>
                </td>
              );
            })}
          </tr>
        ))}
      </>
    );
  };

  const renderDayView = (): JSX.Element | null => {
    if (!dayData) return null;
    return (
      <>
        <tr>
          <th></th>
          <th colSpan={7}>{dayData.dayName}</th>
        </tr>

        {timeSlots.map((slot) => (
          <tr>
            <td>
              <div key={slot.time}>{slot.label}</div>
            </td>
            <td colSpan={7}>
              <div key={slot.time} data-time={slot.time} data-day={formatDate(dayData.date)}></div>
            </td>
          </tr>
        ))}
      </>
    );
  };

  return (
    <table border={0} style={{ width: 800, height: 800, margin: "0 auto" }}>
      <tbody>
        <tr>
          <td style={{ height: 600 }}>
            <table border={1}>
              <thead>
                <tr>
                  <td colSpan={2} align="center">
                    <button type="button" onClick={goToPrevious}>
                      ←
                    </button>

                    <button type="button" onClick={goToToday}>
                      Today
                    </button>

                    <button type="button" onClick={goToNext}>
                      →
                    </button>
                  </td>
                  <td colSpan={view === "week" ? 4 : 3} align="center">
                    <h3>
                      {view === "month" && monthData?.monthName}
                      {view === "week" && weekData?.weekRange}
                      {view === "day" && dayData?.dayName}
                    </h3>
                  </td>
                  <td colSpan={2} align="center">
                    <button onClick={() => changeView("month")}>Month</button>
                    <button onClick={() => changeView("week")}>Week</button>
                    <button type="button" onClick={() => changeView("day")}>
                      Day
                    </button>
                  </td>
                </tr>
              </thead>
              <tbody>
                {view === "month" && renderMonthView()}
                {view === "week" && renderWeekView()}
                {view === "day" && renderDayView()}
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

createRoot(document.getElementById("root")!).render(<CalendarDemo />);
