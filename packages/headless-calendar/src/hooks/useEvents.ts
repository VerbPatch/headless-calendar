
import { CalendarEvent, UseEventsOptions, UseEventsReturn } from '../types/events';
import { generateId, validateEvent } from '../utils/events';
import { convertToTimeZone } from '../utils/timezone';
import { createCallback, createState, } from '../state';

export const useEvents = (options: UseEventsOptions = {}): UseEventsReturn => {
  const { onEvent, onEventCreate, onEventUpdate, onEventDelete, initialEvents } = options;
  initialEvents?.forEach(event => {
    event.id ??= generateId();
  });

  const [getEvents, setEvents] = createState<CalendarEvent[]>(initialEvents || [], 'calendar-event');

  const createEvent = createCallback((eventData: CalendarEvent): CalendarEvent => {
    const errors = validateEvent(eventData);
    if (errors.length > 0) {
      throw new Error(`Invalid event data: ${errors.join(', ')}`);
    }

    const start = options.calendarTimezone && eventData.timezone ? convertToTimeZone(eventData.start, options.calendarTimezone, eventData.timezone) : eventData.start;
    const end = options.calendarTimezone && eventData.timezone ? convertToTimeZone(eventData.end, options.calendarTimezone, eventData.timezone) : eventData.end;

    const event: CalendarEvent = {
      ...eventData,
      id: generateId(),
      title: eventData.title,
      start,
      end,
      allDay: eventData.allDay || false,
      description: eventData.description || '',
      color: eventData.color || '#3174ad',
      timezone: eventData.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
      recurring: "never"
    };

    setEvents(prev => [...prev, event]);
    onEventCreate?.(event);
    onEvent?.(getEvents());
    return event;
  },
    [onEventCreate],
    'create-event');

  const updateEvent = createCallback((eventId: string, updates: CalendarEvent): void => {
    const updatedEvents = getEvents().map(event => {
      if (event.id === eventId) {
        const updatedEvent = {
          ...event,
          ...updates,
          start: updates.start,
          end: updates.end
        } as CalendarEvent;

        const errors = validateEvent(updatedEvent);
        if (errors.length > 0) {
          throw new Error(`Invalid event update: ${errors.join(', ')}`);
        }

        onEventUpdate?.(updatedEvent);
        return updatedEvent;
      }
      return event;
    });

    setEvents(updatedEvents);
    onEvent?.(getEvents());
  },
    [getEvents, onEventUpdate],
    'update-event');

  const deleteEvent = createCallback((eventId: string): void => {
    const eventToDelete = getEvents().find(e => e.id === eventId);
    if (eventToDelete) {
      setEvents(prev => prev.filter(event => event.id !== eventId));
      onEventDelete?.(eventToDelete);
      onEvent?.(getEvents());
    }
  },
    [getEvents, onEventDelete],
    'delete-event');

  const moveEvent = createCallback((eventId: string, newStart: Date, newEnd?: Date): void => {
    updateEvent(eventId, {
      start: newStart,
      end: newEnd || newStart
    } as CalendarEvent);
    onEvent?.(getEvents());
  },
    [updateEvent],
    'move-event');

  const duplicateEvent = createCallback((eventId: string): CalendarEvent | null => {
    const originalEvent = getEvents().find(e => e.id === eventId);
    if (!originalEvent) return null;

    const duplicatedEvent: CalendarEvent = {
      ...originalEvent,
      id: generateId(),
      title: `${originalEvent.title} (Copy)`
    };

    setEvents(prev => [...prev, duplicatedEvent]);
    onEventCreate?.(duplicatedEvent);
    onEvent?.(getEvents());
    return duplicatedEvent;
  },
    [getEvents, onEventCreate],
    'duplicate-event');

  const getEvent = createCallback((eventId: string): CalendarEvent | undefined => {
    return getEvents().find(e => e.id === eventId);
  },
    [getEvents],
    'get-event');

  const clearEvents = createCallback((): void => {
    setEvents([]);
    onEvent?.([]);
  }, [], 'clear-events');

  const setEventsCallback = createCallback((newEvents: CalendarEvent[]): void => {
    setEvents(newEvents);
    onEvent?.(getEvents());
  },
    [],
    'set-event-callback');

  return {
    events: getEvents(),
    createEvent,
    updateEvent,
    deleteEvent,
    moveEvent,
    duplicateEvent,
    getEvent,
    clearEvents,
    setEvents: setEventsCallback
  };
};