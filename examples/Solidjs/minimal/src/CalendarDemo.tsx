import { type Component, createMemo } from 'solid-js';
import { useCalendar, type CalendarEvent, generateId } from '@verbpatch/solidjs-calendar';

const CalendarDemo: Component = () => {
  const initialEvents = createMemo<CalendarEvent[]>(() => {
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
  });

  const calendar = useCalendar({
    defaultView: 'month',
    startOfWeek: 0, // 0 = Sunday, 1 = Monday
    timeSlotInterval: 30,
    initialEvents: initialEvents(),
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

  const handleDateClick = (date: Date): void => {
    const startTime = new Date(date);
    startTime.setHours(7, 0, 0, 0);
    const endTime = new Date(startTime);
    endTime.setHours(8, 0, 0, 0);

    calendar()?.createEvent({
      id: generateId(),
      title: 'New Event',
      start: startTime,
      end: endTime,
      color: generateColor(),
    });
  };

  const handleEventDragStart = (event: CalendarEvent, e: DragEvent): void => {
    console.log({ event, e });
    calendar()?.startDrag(event, { type: 'event' });
  };

  const eventHandleDrop = (e: DragEvent, date: Date, time?: string): void => {
    console.log(e);
    calendar()?.handleDrop({ date, time });
  };

  const renderMonthView = () => {
    console.log('Rendering Month View', calendar()?.monthData);
    if (!calendar()?.monthData) return null;
    //console.log(calendar.monthData);
    return (
      <>
        <tr>
          {calendar()
            ?.utils.daysofWeek('long')
            .map((day) => (
              <td align="center">{day}</td>
            ))}
        </tr>

        {calendar()?.monthData?.weeks.map((week) => (
          <tr>
            {week.map((date) => {
              const dateEvents = calendar()?.getEventsForDate(date) || [];
              const isCurrentMonth = calendar()?.monthData?.isCurrentMonth(date);
              const isToday = calendar()?.monthData?.isToday(date);

              return (
                <td
                  align="center"
                  style={{
                    'background-color': isToday ? '#cecece' : '#fff',
                    'font-weight': isToday ? 'bold' : 'normal',
                    color: isCurrentMonth ? '#000' : '#888',
                    cursor: 'pointer',
                    width: '100px',
                    height: '50px',
                  }}
                  onClick={() => handleDateClick(date)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => eventHandleDrop(e, date)}
                >
                  <div>{calendar()?.utils.formatDate(date, 'd')}</div>

                  <div>
                    {dateEvents.slice(0, 2).map((event) => (
                      <div
                        style={{ 'background-color': event.color }}
                        draggable="true"
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

  const renderWeekView = () => {
    if (!calendar()?.weekData) return null;

    return (
      <div>
        <div>
          <div></div>
          {calendar()?.weekData?.dates.map((date) => (
            <div>
              <div
                class={`font-semibold ${calendar()?.weekData?.isToday(date) ? 'text-blue-600' : ''}`}
              >
                {calendar()?.utils.formatDateTime(date, 'EEE')}
              </div>
              <div
                class={`text-sm ${calendar()?.weekData?.isToday(date) ? 'text-blue-600' : 'text-gray-600'}`}
              >
                {calendar()?.utils.formatDateTime(date, 'd')}
              </div>
            </div>
          ))}
        </div>

        <div>
          <div>
            {calendar()?.timeSlots.map((slot) => (
              <div data-slot={slot.time}>{slot.label}</div>
            ))}
          </div>

          {calendar()?.weekData?.dates.map((date) => {
            return (
              <div>
                {calendar()?.timeSlots.map((slot) => {
                  const slotEvents =
                    calendar()
                      ?.getEventsForDate(date)
                      .filter((event) => {
                        const eventStart = new Date(event.start);
                        const eventEnd = new Date(event.end);
                        return calendar()?.utils.dateTimeInBetween(
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
                      }) || [];
                  slotEvents.length > 0 && console.log(slotEvents);
                  return (
                    <div
                      data-slot={slot.time}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => eventHandleDrop(e, date, slot.time)}
                      onClick={() => {
                        const eventStart = new Date(date);
                        eventStart.setHours(slot.hour, slot.minute);
                        const eventEnd = new Date(eventStart);
                        eventEnd.setMinutes(
                          eventEnd.getMinutes() + (calendar()?.timeSlotInterval ?? 60),
                        );

                        calendar()?.createEvent({
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
                          style={{ 'background-color': event.color }}
                          draggable="true"
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

  const renderDayView = () => {
    if (!calendar()?.dayData) return null;
    //console.log(calendar.timeSlots);
    return (
      <div>
        <div>
          <h2
            class={`text-xl font-semibold ${calendar()?.dayData?.isToday ? 'text-blue-600' : ''}`}
          >
            {calendar()?.dayData?.dayName}
          </h2>
        </div>

        <div>
          <div>
            {calendar()?.timeSlots.map((slot) => (
              <div>{slot.label}</div>
            ))}
          </div>

          <div>
            {calendar()?.timeSlots.map((slot) => {
              const slotEvents =
                calendar()
                  ?.getEventsForDate(calendar()?.dayData?.dates[0] as Date)
                  .filter((event) => {
                    const eventStart = new Date(event.start);
                    return (
                      eventStart.getHours() === slot.hour && eventStart.getMinutes() === slot.minute
                    );
                  }) || [];

              return (
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) =>
                    eventHandleDrop(e, calendar()?.dayData?.dates[0] as Date, slot.time)
                  }
                  onClick={() => {
                    const eventStart = new Date(calendar()?.dayData?.dates[0] as Date);
                    eventStart.setHours(slot.hour, slot.minute);
                    const eventEnd = new Date(eventStart);
                    eventEnd.setMinutes(eventEnd.getMinutes() + 60);

                    calendar()?.createEvent({
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
                      style={{ 'background-color': event.color }}
                      draggable="true"
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
    <table style={{ width: '800px', height: '800px', margin: '0 auto' }}>
      <tbody>
        <tr>
          <td style={{ height: '600px' }}>
            {/* Header */}
            <table>
              <thead>
                <tr>
                  <td colSpan={2} align="center">
                    <button type="button" onClick={() => calendar()?.goToPrevious()}>
                      ←
                    </button>

                    <button type="button" onClick={() => calendar()?.goToToday()}>
                      Today
                    </button>

                    <button type="button" onClick={() => calendar()?.goToNext()}>
                      →
                    </button>
                  </td>
                  <td colSpan={3} align="center">
                    <h3>
                      {calendar()?.view === 'month' && calendar()?.monthData?.monthName}
                      {calendar()?.view === 'week' && calendar()?.weekData?.weekRange}
                      {calendar()?.view === 'day' && calendar()?.dayData?.dayName}
                    </h3>
                    {/* {formatDateTime(currentDate, "EE dd MMM yyyy")} */}
                  </td>
                  <td colSpan={2} align="center">
                    <button
                      onClick={() => calendar()?.changeView('month')}
                      class={`px-4 py-2 rounded ${calendar()?.view === 'month' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                    >
                      Month
                    </button>
                    <button
                      onClick={() => calendar()?.changeView('week')}
                      class={`px-4 py-2 rounded ${calendar()?.view === 'week' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                    >
                      Week
                    </button>
                    <button
                      type="button"
                      onClick={() => calendar()?.changeView('day')}
                      class={`px-4 py-2 rounded ${calendar()?.view === 'day' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
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
                {calendar()?.view === 'month' && renderMonthView()}
                {calendar()?.view === 'week' && renderWeekView()}
                {calendar()?.view === 'day' && renderDayView()}
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td>
            <h3>Events ({calendar()?.events.length})</h3>
            <div style={{ height: '200px', overflow: 'auto' }}>
              <div>
                {calendar()?.events.map((event) => {
                  return (
                    <div
                      style={{
                        'background-color': event.color,
                        display: 'flex',
                        'margin-bottom': '8px',
                        padding: '4px',
                        'justify-content': 'space-between',
                        'align-items': 'center',
                      }}
                    >
                      <div>
                        <strong style={{ display: 'block' }}>{event.title}</strong>
                        <span style={{ 'font-size': '11px' }}>
                          {calendar()?.utils.formatDateTime(event.start, 'dd MMM yyyy hh:mm a')} to{' '}
                          {calendar()?.utils.formatDateTime(event.end, 'dd MMM yyyy hh:mm a')}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => calendar()?.deleteEvent(event.id as string)}
                      >
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
