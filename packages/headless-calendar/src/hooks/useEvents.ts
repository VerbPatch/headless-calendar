
import { CalendarEvent, UseEventsOptions, UseEventsReturn } from '../types/events';
import { generateId, validateEvent } from '../utils/events';
import { convertToTimeZone } from '../utils/timezone';
import { createCallback, createState, } from '../state';

/**
 * @description A hook for managing calendar events, including creating, updating, deleting, and moving events.
 * @param {UseEventsOptions} options - Configuration options for event management.
 * @returns {UseEventsReturn} - An object containing the list of events and functions to manage them.
 * @see {@link UseEventsOptions}
 * @see {@link UseEventsReturn}
 * @example
 * ```jsx
 * const { events, createEvent, updateEvent, deleteEvent } = useEvents({
 *   initialEvents: [
 *     { id: '1', title: 'Meeting', start: new Date(), end: new Date(new Date().getTime() + 3600000) },
 *   ],
 * });
 *
 * // Create a new event
 * const newEvent = createEvent({
 *   id: '2',
 *   title: 'New Event',
 *   start: new Date(),
 *   end: new Date(new Date().getTime() + 7200000),
 * });
 *
 * // Update an event
 * updateEvent('1', { title: 'Updated Meeting' });
 *
 * // Delete an event
 * deleteEvent('1');
 * ```
 */
export const useEvents = (options: UseEventsOptions = {}): UseEventsReturn => {
  const { onEvent, onEventCreate, onEventUpdate, onEventDelete, initialEvents } = options;
  initialEvents?.forEach(event => {
    event.id ??= generateId();
  });

  const [getEvents, setEvents] = createState<CalendarEvent[]>(initialEvents || [], 'calendar-event');

  /**
   * @description Creates a new calendar event.
   * @param {CalendarEvent} eventData - The data for the new event.
   * @returns {CalendarEvent} The newly created event.
   * @throws {Error} If the event data is invalid.
   * @see {@link CalendarEvent}
   */
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

  /**
   * @description Updates an existing calendar event.
   * @param {string} eventId - The ID of the event to update.
   * @param {CalendarEvent} updates - The partial event data to apply as updates.
   * @throws {Error} If the event update data is invalid.
   * @see {@link CalendarEvent}
   */
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

  /**
   * @description Deletes a calendar event by its ID.
   * @param {string} eventId - The ID of the event to delete.
   */
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

  /**
   * @description Moves an event to a new start and optional end date.
   * @param {string} eventId - The ID of the event to move.
   * @param {Date} newStart - The new start date for the event.
   * @param {Date} [newEnd] - The new end date for the event (optional, defaults to newStart if not provided).
   */
  const moveEvent = createCallback((eventId: string, newStart: Date, newEnd?: Date): void => {
    updateEvent(eventId, {
      start: newStart,
      end: newEnd || newStart
    } as CalendarEvent);
    onEvent?.(getEvents());
  },
    [updateEvent],
    'move-event');

  /**
   * @description Duplicates an existing event.
   * @param {string} eventId - The ID of the event to duplicate.
   * @returns {CalendarEvent | null} The duplicated event object if successful, otherwise null.
   * @see {@link CalendarEvent}
   */
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

  /**
   * @description Retrieves a specific event by its ID.
   * @param {string} eventId - The ID of the event to retrieve.
   * @returns {CalendarEvent | undefined} The event object if found, otherwise undefined.
   * @see {@link CalendarEvent}
   */
  const getEvent = createCallback((eventId: string): CalendarEvent | undefined => {
    return getEvents().find(e => e.id === eventId);
  },
    [getEvents],
    'get-event');

  /**
   * @description Clears all events from the calendar.
   */
  const clearEvents = createCallback((): void => {
    setEvents([]);
    onEvent?.([]);
  }, [], 'clear-events');

  /**
   * @description Sets the entire list of events, replacing existing ones.
   * @param {CalendarEvent[]} newEvents - The new array of events to set.
   * @see {@link CalendarEvent}
   */
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