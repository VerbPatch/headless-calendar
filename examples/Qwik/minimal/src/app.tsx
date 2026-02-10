import { $, component$ } from '@builder.io/qwik';
import { useCalendar, generateId, type CalendarEvent } from '@verbpatch/qwik-calendar';

export const App = component$(() => {
  const _today = new Date();
  const today = new Date(_today.getFullYear(), _today.getMonth(), _today.getDate(), 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

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
    utils, //: { formatDate, formatDateTime, daysofWeek, dateTimeInBetween },
  } = useCalendar({
    defaultView: 'month',
    initialEvents: [
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
    ],

    startOfWeek: 0, // 0 = Sunday, 1 = Monday
    timeSlotInterval: 30,

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

  const generateColor = () => {
    const randomColorValue = Math.floor(Math.random() * 16777215);
    const hexColor = randomColorValue.toString(16).padStart(6, '0');
    return `#${hexColor}`;
  };

  const handleDateClick = $(async (date: Date) => {
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
  });

  const handleEventDragStart = $((event: CalendarEvent, e: DragEvent): void => {
    console.log({ event, e });
    startDrag(event, { type: 'event' });
  });

  const eventHandleDrop = $((e: DragEvent, date: Date, time?: string): void => {
    console.log(e);
    handleDrop({ date, time });
  });

  const renderMonthView = () => {
    console.log('Rendering Month View', monthData);
    if (!monthData) return null;
    //console.log(calendar.monthData);
    return (
      <>
        <tr>
          {utils?.daysofWeek('long').map((day) => (
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
                  onClick$={() => handleDateClick(date)}
                  onDragOver$={(e) => e.preventDefault()}
                  onDrop$={(e) => eventHandleDrop(e, date)}
                >
                  <div>{utils?.formatDate(date, 'd')}</div>

                  <div>
                    {dateEvents.slice(0, 2).map((event) => (
                      <div
                        key={event.id}
                        style={{ backgroundColor: event.color }}
                        draggable
                        onDragStart$={(e) => handleEventDragStart(event, e)}
                        onClick$={(e) => {
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

  const renderWeekView = () => {
    if (!weekData) return null;

    return (
      <div>
        <div>
          <div></div>
          {weekData.dates.map((date, index) => (
            <div key={index}>
              <div class={`font-semibold ${weekData!.isToday(date) ? 'text-blue-600' : ''}`}>
                {utils?.formatDateTime(date, 'EEE')}
              </div>
              <div class={`text-sm ${weekData!.isToday(date) ? 'text-blue-600' : 'text-gray-600'}`}>
                {utils?.formatDateTime(date, 'd')}
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
                  const slotEvents = getEventsForDate(date).filter((event) => {
                    const eventStart = new Date(event.start);
                    const eventEnd = new Date(event.end);
                    return utils?.dateTimeInBetween(
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
                      onDragOver$={(e) => e.preventDefault()}
                      onDrop$={(e) => eventHandleDrop(e, date, slot.time)}
                      onClick$={() => {
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
                          onDragStart$={(e) => handleEventDragStart(event, e)}
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

  const renderDayName = () => dayData?.dayName;
  const renderDayView = () => {
    if (!dayData) return null;
    //console.log(calendar.timeSlots);
    return (
      <div>
        <div>
          <h2 class={`text-xl font-semibold ${dayData.isToday ? 'text-blue-600' : ''}`}>
            {renderDayName()}
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
              const slotEvents = getEventsForDate(dayData!.dates[0]).filter((event) => {
                const eventStart = new Date(event.start);
                return (
                  eventStart.getHours() === slot.hour && eventStart.getMinutes() === slot.minute
                );
              });

              return (
                <div
                  key={slot.time}
                  onDragOver$={(e) => e.preventDefault()}
                  onDrop$={(e) => eventHandleDrop(e, dayData!.dates[0], slot.time)}
                  onClick$={() => {
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
                >
                  {slotEvents?.map((event) => (
                    <div
                      data-time={JSON.stringify(event)}
                      key={event.id}
                      style={{ backgroundColor: event.color }}
                      draggable
                      onDragStart$={(e) => handleEventDragStart(event, e)}
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

  const renderViewText = () => {
    if (view === 'month') return monthData?.monthName;
    else if (view === 'week') return weekData?.weekRange;
    else if (view === 'day') return dayData?.dayName;
    else return 'Unkwown view';
  };

  return (
    <div class="card">
      <table border="0" style={{ width: 800, height: 800, margin: '0 auto' }}>
        <tbody>
          <tr>
            <td style={{ height: 600 }}>
              {/* Header */}
              <table border="1">
                <thead>
                  <tr>
                    <td colSpan={2} align="center">
                      <button type="button" onClick$={() => goToPrevious()}>
                        ←
                      </button>

                      <button type="button" onClick$={() => goToToday()}>
                        Today
                      </button>

                      <button type="button" onClick$={() => goToNext()}>
                        →
                      </button>
                    </td>
                    <td colSpan={3} align="center">
                      <h3>{renderViewText()}</h3>
                      {/* {formatDateTime(currentDate, "EE dd MMM yyyy")} */}
                    </td>
                    <td colSpan={2} align="center">
                      <button
                        onClick$={() => changeView('month')}
                        class={`px-4 py-2 rounded ${view === 'month' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                      >
                        Month
                      </button>
                      <button
                        onClick$={() => changeView('week')}
                        class={`px-4 py-2 rounded ${view === 'week' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                      >
                        Week
                      </button>
                      <button
                        type="button"
                        onClick$={() => changeView('day')}
                        class={`px-4 py-2 rounded ${view === 'day' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
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
                  {events?.map((event) => {
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
                            {utils?.formatDateTime(event.start, 'dd MMM yyyy hh:mm a')} to{' '}
                            {utils?.formatDateTime(event.end, 'dd MMM yyyy hh:mm a')}
                          </span>
                        </div>

                        <button type="button" onClick$={() => deleteEvent(event.id as string)}>
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
    </div>
  );
});
