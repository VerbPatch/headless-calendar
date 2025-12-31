import React, { JSX } from "react";
import { useCalendar, type ViewType } from "@verbpatch/react-calendar";

export const CalendarDemo: React.FC = () => {
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
            <td style={{ width: "120px", borderRight: "1px solid", borderBottom: "1px solid" }} key={day}>
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
                    fontWeight: isToday ? "bold" : "normal",
                    color: isCurrentMonth ? "black" : "gray",
                    borderRight: "1px solid",
                    borderBottom: "1px solid",
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
      <tr>
        <td colSpan={7} style={{ borderRight: "1px solid" }}>
          <table cellPadding="5" cellSpacing="0" width="100%">
            <tbody>
              <tr>
                <td></td>
                {weekData.dates.map((date, index) => (
                  <td key={index} style={{ fontWeight: weekData!.isToday(date) ? "bold" : "normal" }}>
                    {formatDateTime(date, "d MMM")}
                  </td>
                ))}
              </tr>

              {timeSlots.map((slot) => (
                <tr key={slot.label} data-key={slot.label}>
                  <td style={{ borderBottom: "1px solid" }}>
                    <div key={slot.time} data-slot={slot.time}>
                      {slot.label}
                    </div>
                  </td>
                  {weekData.dates.map((date, dateIndex) => {
                    return <td key={dateIndex} data-date={formatDate(date)} data-slot={slot.time} style={{ borderBottom: "1px solid", fontWeight: weekData!.isToday(date) ? "bold" : "normal" }}></td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </td>
      </tr>
    );
  };

  const renderDayView = (): JSX.Element | null => {
    if (!dayData) return null;
    return (
      <>
        <tr>
          <td colSpan={7} style={{ borderRight: "1px solid", borderBottom: "1px solid", textAlign: "center" }}>
            {dayData.dayName}
          </td>
        </tr>

        {timeSlots.map((slot) => (
          <tr>
            <td colSpan={7} style={{ borderRight: "1px solid", borderBottom: "1px solid" }}>
              <div key={slot.time} data-time={slot.time} data-day={formatDate(dayData.date)}>
                {slot.label}
              </div>
            </td>
          </tr>
        ))}
      </>
    );
  };

  return (
    <table border={0} cellPadding={0} cellSpacing={0} width={840} style={{ height: "700px", borderLeft: "1px solid", borderTop: "1px solid" }}>
      <thead>
        <tr>
          <th colSpan={2} style={{ borderBottom: "1px solid" }}>
            <button type="button" onClick={goToPrevious}>
              ←
            </button>
            <button type="button" onClick={goToToday}>
              Today
            </button>

            <button type="button" onClick={goToNext}>
              →
            </button>
          </th>
          <th colSpan={3} style={{ borderBottom: "1px solid" }}>
            <h3>
              {view === "month" && monthData?.monthName}
              {view === "week" && weekData?.weekRange}
              {view === "day" && dayData?.dayName}
            </h3>
          </th>
          <th colSpan={2} style={{ borderBottom: "1px solid", borderRight: "1px solid" }}>
            <select
              onChange={(s) => {
                const value = (s.target as HTMLSelectElement).value as ViewType;
                changeView(value);
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
        {view === "month" && renderMonthView()}
        {view === "week" && renderWeekView()}
        {view === "day" && renderDayView()}
      </tbody>
    </table>
  );
};
