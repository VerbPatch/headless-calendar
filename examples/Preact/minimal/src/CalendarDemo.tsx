import { useCallback, useMemo } from 'preact/hooks';
import { useCalendar, generateId, type CalendarEvent } from '@verbpatch/preact-calendar';
import type { FunctionalComponent } from 'preact';

export const CalendarDemo: FunctionalComponent = () => {
  const initialEvents = useMemo<CalendarEvent[]>(() => {
    const _today = new Date();
    const today = new Date(_today.getFullYear(), _today.getMonth(), _today.getDate(), 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return [
      {
        id: generateId(),
        title: 'Team Meeting',
        start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 16, 0, 0),
        end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 18, 0),
        description: 'Weekly team sync',
        allDay: false,
        color: '#3b82f6',
        timezone: 'Asia/Calcutta',
      },
      {
        id: generateId(),
        title: 'Project Deadline',
        start: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 0, 0, 0),
        end: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 0, 0, 0),
        allDay: true,
        color: '#ef4444',
        timezone: 'Asia/Calcutta',
      },
    ];
  }, []);

  const {
    currentDate,
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
    clearAllEvents,
    utils: { formatDate, formatDateTime, daysofWeek, dateTimeInBetween },
  } = useCalendar({
    defaultView: 'month',
    startOfWeek: 0, // 0 = Sunday, 1 = Monday
    timeSlotInterval: 30,
    initialEvents,
    //startHour: 0,
    //endHour: 24,
    //locale: "fr-FR",
    //timezone: "Europe/Paris",
    onViewChange: (view) => {
      //setCurrentView(view);
      console.log(view);
    },
    onDateChange: (date) => {
      console.log('Current date:', date);
      //setCurrentDate(date);
    },
    locale: 'en-IN',
    timezone: 'Asia/Calcutta',
    onEvent: (events: CalendarEvent[]) => {
      console.log('Events:', events);
      //setEvents(events);
    },
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

  const handleEventDragStart = useCallback((event: CalendarEvent, e: DragEvent): void => {
    //console.log({ event });
    startDrag(event, { type: 'event' });
  }, []);

  const eventHandleDrop = useCallback((e: DragEvent, date: Date, time?: string): void => {
    handleDrop({ date, time });
  }, []);

  const renderMonthView = (): preact.JSX.Element | null => {
    console.log('Rendering Month View', monthData);
    if (!monthData) return null;
    //console.log(calendar.monthData);
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
                          //console.log("Event clicked:", event);
                        }}
                      >
                        {event.title}
                      </div>
                    ))}

                    {dateEvents.length > 2 && <div>+{dateEvents.length - 2} more</div>}
                  </div>
                </td>
              );
            })}
          </tr>
        ))}
      </>
    );
  };

  const renderWeekView = (): preact.JSX.Element | null => {
    if (!weekData) return null;

    return (
      <div>
        <div>
          <div></div>
          {weekData.dates.map((date, index) => (
            <div key={index}>
              <div className={`font-semibold ${weekData!.isToday(date) ? 'text-blue-600' : ''}`}>
                {formatDateTime(date, 'EEE')}
              </div>
              <div
                className={`text-sm ${weekData!.isToday(date) ? 'text-blue-600' : 'text-gray-600'}`}
              >
                {formatDateTime(date, 'd')}
              </div>
            </div>
          ))}
        </div>

        <div>
          <div>
            {timeSlots.map((slot) => (
              <div key={slot.time} data-slot={slot.time}>
                {slot.label}
              </div>
            ))}
          </div>

          {weekData.dates.map((date, dateIndex) => {
            return (
              <div key={dateIndex}>
                {timeSlots.map((slot) => {
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
                    <div
                      key={slot.time}
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
                          style={{ backgroundColor: event.color }}
                          draggable
                          onDragStart={(e) => handleEventDragStart(event, e)}
                          data-props={JSON.stringify(event)}
                        >
                          {event.title}
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderDayView = (): preact.JSX.Element | null => {
    if (!dayData) return null;
    //console.log(calendar.timeSlots);
    return (
      <div>
        <div>
          <h2 className={`text-xl font-semibold ${dayData.isToday ? 'text-blue-600' : ''}`}>
            {dayData.dayName}
          </h2>
        </div>

        <div>
          <div>
            {timeSlots.map((slot) => (
              <div key={slot.time}>{slot.label}</div>
            ))}
          </div>

          <div>
            {timeSlots.map((slot) => {
              const slotEvents = getEventsForDate(dayData!.date).filter((event) => {
                const eventStart = new Date(event.start);
                return (
                  eventStart.getHours() === slot.hour && eventStart.getMinutes() === slot.minute
                );
              });

              return (
                <div
                  key={slot.time}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => eventHandleDrop(e, dayData!.date, slot.time)}
                  onClick={() => {
                    const eventStart = new Date(dayData!.date);
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
                </div>
              );
            })}
          </div>
        </div>
      </div>
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
                  <td colSpan={3} align="center">
                    <h3>
                      {view === 'month' && monthData?.monthName}
                      {view === 'week' && weekData?.weekRange}
                      {view === 'day' && dayData?.dayName}
                    </h3>
                    {/* {formatDateTime(currentDate, "EE dd MMM yyyy")} */}
                  </td>
                  <td colSpan={2} align="center">
                    <button
                      onClick={() => changeView('month')}
                      className={`px-4 py-2 rounded ${view === 'month' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                    >
                      Month
                    </button>
                    <button
                      onClick={() => changeView('week')}
                      className={`px-4 py-2 rounded ${view === 'week' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                    >
                      Week
                    </button>
                    <button
                      type="button"
                      onClick={() => changeView('day')}
                      className={`px-4 py-2 rounded ${view === 'day' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                    >
                      Day
                    </button>
                  </td>
                </tr>

                {/* <tr>
                <td colSpan={7} align="center">
                   <button
                    onClick={() => {
                      const e = events;
                      console.log("All Events:", e);
                    }}
                  >
                    All Events
                  </button> 
                </td>
              </tr>*/}
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
                          {formatDateTime(event.start, 'dd MMM yyyy hh:mm a')} to{' '}
                          {formatDateTime(event.end, 'dd MMM yyyy hh:mm a')}
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
