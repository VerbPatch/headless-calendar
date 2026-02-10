import React, { JSX, useCallback, useEffect, useMemo, useState } from 'react';
import { useCalendar, CalendarEvent, generateId } from '@verbpatch/react-calendar';

const CalendarDemo: React.FC = () => {
  const initialEvents = useMemo<CalendarEvent[]>(() => {
    const _today = new Date();
    const today = new Date(_today.getFullYear(), _today.getMonth(), _today.getDate(), 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return [
      {
        id: generateId(),
        title: 'Team Meeting',
        start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 0, 0),
        end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 0),
        description: 'Weekly team sync',
        allDay: false,
        color: '#3b82f6',
        timezone: 'Europe/London',
      },
      {
        id: generateId(),
        title: 'Project Deadline',
        start: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 0, 0, 0),
        end: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 0, 0, 0),
        allDay: true,
        color: '#ef4444',
        //timezone: "Asia/Calcutta",
      },
    ];
  }, []);

  const {
    view,
    events,
    changeView,
    timeSlotInterval,

    monthData,
    weekData,
    dayData,
    timeSlots,

    goToPrevious,
    goToToday,
    goToNext,

    startDrag,
    handleDrop,

    createEvent,
    deleteEvent,
    getEventsForDate,

    utils: { formatDate, formatDateTime, daysofWeek, dateTimeInBetween, convertToTimeZone },
  } = useCalendar({
    defaultView: 'month',
    startOfWeek: 0, // 0 = Sunday, 1 = Monday
    timeSlotInterval: 60,
    initialEvents,
    timezone: 'Asia/Calcutta',
    onViewChange: (view) => console.log(view),
    //onDateChange: (date) => console.log("Current date:", date),
    //onEvent: (events: CalendarEvent[]) => console.log("Events:", events),
    //onEventUpdate: (event: CalendarEvent) => console.log("Event updated:", event),
    //onEventDelete: (event: CalendarEvent) => console.log("Event deleted:", event),
  });

  const generateColor = useCallback((): string => {
    const randomColorValue = Math.floor(Math.random() * 16777215);
    const hexColor = randomColorValue.toString(16).padStart(6, '0');
    return `#${hexColor}`;
  }, []);

  const handleDateClick = useCallback((date: Date): void => {
    const startTime = new Date(date);
    startTime.setHours(7, 0, 0, 0);
    const endTime = new Date(startTime);
    endTime.setHours(8, 0, 0, 0);

    createEvent({
      id: generateId(),
      title: 'New Event',
      start: startTime,
      end: endTime,
      color: generateColor(),
    });
  }, []);

  const handleEventDragStart = useCallback((event: CalendarEvent, e: React.DragEvent): void => {
    startDrag(event, { type: 'event' });
  }, []);

  const eventHandleDrop = useCallback((e: React.DragEvent, date: Date, time?: string): void => {
    handleDrop({ date, time });
  }, []);

  const renderMonthView = (): JSX.Element | null => {
    console.log('Rendering Month View', monthData);
    if (!monthData) return null;
    return (
      <>
        <tr>
          {daysofWeek('long').map((day) => (
            <td align="center" key={day}>
              {day}
            </td>
          ))}
        </tr>

        {monthData.weeks.map((week, weekIndex) => (
          <tr key={weekIndex}>
            {week.map((date, dayIndex) => {
              const dateEvents = getEventsForDate(date);
              const isCurrentMonth = monthData!.isCurrentMonth(date);
              const isToday = monthData!.isToday(date);

              return (
                <td
                  align="center"
                  key={dayIndex}
                  style={{
                    backgroundColor: isToday ? '#cecece' : '#fff',
                    fontWeight: isToday ? 'bold' : 'normal',
                    color: isCurrentMonth ? '#000' : '#888',
                    cursor: 'pointer',
                    width: '100px',
                    height: '50px',
                  }}
                  onClick={() => handleDateClick(date)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => eventHandleDrop(e, date)}
                >
                  <div>{formatDate(date, 'd')}</div>

                  <div>
                    {dateEvents.slice(0, 2).map((event) => (
                      <div
                        key={event.id}
                        style={{ backgroundColor: event.color }}
                        draggable
                        onDragStart={(e) => handleEventDragStart(event, e)}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        {event.title}
                      </div>
                    ))}

                    {dateEvents.length > 2 && <div>+{dateEvents.length - 2} more </div>}
                  </div>
                </td>
              );
            })}
          </tr>
        ))}
      </>
    );
  };

  function renderWeekView(): JSX.Element | null {
    if (!weekData) return null;

    return (
      <>
        <tr>
          <th></th>
          {weekData.dates.map((date, index) => (
            <th key={index}>{formatDateTime(date, 'd MMM')}</th>
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
              const slotEvents = getEventsForDate(date).filter((event, index) => {
                const eventStart = new Date(event.start);
                const eventEnd = new Date(event.end);
                return dateTimeInBetween(
                  new Date(
                    date.getFullYear(),
                    date.getMonth(),
                    date.getDate(),
                    slot.hour,
                    slot.minute,
                    0,
                  ),
                  eventStart,
                  eventEnd,
                );
              });
              slotEvents.length > 0 && console.log(slotEvents);
              return (
                <td
                  key={dateIndex}
                  data-date={formatDate(date)}
                  data-slot={slot.time}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => eventHandleDrop(e, date, slot.time)}
                  onClick={() => {
                    const eventStart = new Date(date);
                    eventStart.setHours(slot.hour, slot.minute);
                    const eventEnd = new Date(eventStart);
                    eventEnd.setMinutes(eventEnd.getMinutes() + (timeSlotInterval ?? 60));

                    createEvent({
                      id: generateId(),
                      title: 'New Event',
                      start: eventStart,
                      end: eventEnd,
                      color: generateColor(),
                    });
                  }}
                >
                  {slotEvents.map((event) => (
                    <div
                      key={event.id}
                      style={{ backgroundColor: event.color, height: '100%' }}
                      draggable
                      onDragStart={(e) => handleEventDragStart(event, e)}
                      data-props={JSON.stringify(event)}
                    >
                      {event.title}
                    </div>
                  ))}
                </td>
              );
            })}
          </tr>
        ))}
      </>
    );
  }

  const renderDayView = (): JSX.Element | null => {
    if (!dayData) return null;
    console.log(dayData);
    return (
      <>
        <tr>
          <th></th>
          <th colSpan={7}>{dayData.dayName}</th>
        </tr>

        {timeSlots.map((slot) => {
          const slotEvents = getEventsForDate(dayData!.dates[0]).filter((event) => {
            const eventStart = new Date(event.start);
            console.log(eventStart.getHours(), slot.hour, eventStart.getMinutes(), slot.minute);
            return eventStart.getHours() === slot.hour;
          });
          slotEvents.length > 0 && console.log('day events=>', slotEvents);
          return (
            <tr key={slot.time}>
              <td>
                <div>{slot.label}</div>
              </td>
              <td colSpan={7}>
                <div
                  data-time={slot.time}
                  data-day={formatDate(dayData.dates[0])}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => eventHandleDrop(e, dayData!.dates[0], slot.time)}
                  onClick={() => {
                    const eventStart = new Date(dayData!.dates[0]);
                    eventStart.setHours(slot.hour, slot.minute);
                    const eventEnd = new Date(eventStart);
                    eventEnd.setMinutes(eventEnd.getMinutes() + 60);

                    createEvent({
                      id: generateId(),
                      title: 'New Event',
                      start: eventStart,
                      end: eventEnd,
                      color: generateColor(),
                    });
                  }}
                  style={{
                    height: '100%',
                  }}
                >
                  {slotEvents.map((event) => (
                    <div
                      data-time={JSON.stringify(event)}
                      key={event.id}
                      style={{ backgroundColor: event.color }}
                      draggable
                      onDragStart={(e) => handleEventDragStart(event, e)}
                    >
                      <div>{event.title}</div>
                      {event.description && <div>{event.description}</div>}
                    </div>
                  ))}
                  &nbsp;
                </div>
              </td>
            </tr>
          );
        })}
      </>
    );
  };

  return (
    <table border={0} style={{ width: 800, height: 800, margin: '0 auto' }}>
      <tbody>
        <tr>
          <td style={{ height: 600 }}>
            {/* Header */}
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
                  <td colSpan={view === 'week' ? 4 : 3} align="center">
                    <h3>
                      {view === 'month' && monthData?.monthName}
                      {view === 'week' && weekData?.weekRange}
                      {view === 'day' && dayData?.dayName}
                    </h3>
                  </td>
                  <td colSpan={2} align="center">
                    <button onClick={() => changeView('month')}>Month</button>
                    <button onClick={() => changeView('week')}>Week</button>
                    <button type="button" onClick={() => changeView('day')}>
                      Day
                    </button>
                  </td>
                </tr>
              </thead>
              <tbody>
                {view === 'month' && renderMonthView()}
                {view === 'week' && renderWeekView()}
                {view === 'day' && renderDayView()}
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td>
            <h3>Events ({events.length})</h3>
            <div style={{ height: 200, overflow: 'auto' }}>
              <div>
                {events.map((event) => {
                  return (
                    <div
                      key={event.id}
                      style={{
                        backgroundColor: event.color,
                        display: 'flex',
                        marginBottom: 8,
                        padding: 4,
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <div>
                        <strong style={{ display: 'block' }}>{event.title}</strong>
                        <span style={{ fontSize: 11 }}>
                          {event.allDay ? (
                            'Full Day'
                          ) : (
                            <>
                              {formatDateTime(event.start, 'dd MMM yyyy hh:mm a')} to{' '}
                              {formatDateTime(event.end, 'dd MMM yyyy hh:mm a')}
                            </>
                          )}
                        </span>
                      </div>

                      <button type="button" onClick={() => deleteEvent(event.id as string)}>
                        Delete
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default CalendarDemo;
