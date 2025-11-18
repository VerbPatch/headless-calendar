import { DraggedEvent, DropTarget } from "./calendar";

/**
 * @description Represents a calendar event.
 */
export interface CalendarEvent {
  /**
   * @description The unique identifier of the event.
   */
  id: string;
  /**
   * @description The title or name of the event.
   */
  title: string;
  /**
   * @description The start date and time of the event.
   */
  start: Date;
  /**
   * @description The end date and time of the event.
   */
  end: Date;
  /**
   * @description Indicates if the event is an all-day event.
   * @default false
   */
  allDay?: boolean;
  /**
   * @description A description of the event.
   */
  description?: string;
  /**
   * @description The color used to display the event.
   * @default '#3174ad'
   */
  color?: string;
  /**
   * @description The timezone of the event.
   * @default The user's local timezone.
   */
  timezone?: string;
  /**
   * @description Recurring event configuration. Use "never" for non-recurring events.
   * 
   * @example 
   * 1. Repeat every day until end of time
   * ```tsx
   * recurring: {
   *     repeat: "daily",
   *     every: 1
   * }
   * ```
   * 
   * @example
   * 2. Repeat every day until end date
   * ```tsx
   * recurring: {
   *     repeat: "daily",
   *     every: 1,
   *     end: new Date(2025, 6, 1) // July 1, 2025 (month is 0-indexed)
   * }
   * ```
   * 
   * @example
   * 3. Repeat every day until count completes
   * ```tsx
   * recurring: {
   *     repeat: "daily",
   *     every: 1,
   *     count: 5 // Repeats 5 times and then stops 
   * }
   * ```
   * 
   * @example
   * 4. Repeat every week on Monday & Friday until end of time
   * ```tsx
   * recurring: {
   *     repeat: "weekly",
   *     weekDays: [1, 5], // Monday and Friday
   *     every: 1
   * }
   * ```
   * 
   * @example
   * 5. Repeat every 2 weeks on Tuesday for 3 occurrences
   * ```tsx
   * recurring: {
   *     repeat: "weekly",
   *     weekDays: [2], // Tuesday
   *     every: 2,
   *     count: 3 // Repeats 3 times and then stops 
   * }
   * ```
   * 
   * @example
   * 6. Repeat every week on Sunday until end date
   * ```tsx
   * recurring: {
   *     repeat: "weekly",
   *     weekDays: [0], // Sunday
   *     every: 1,
   *     end: new Date(2025, 6, 1) // July 1, 2025
   * }
   * ```
   * 
   * @example
   * 7. Repeat every month on the 5th day until end of time
   * ```tsx
   * recurring: {
   *     repeat: "monthly",
   *     every: 1,
   *     day: 5
   * }
   * ```
   * 
   * @example
   * 8. Repeat every month on the last day for 4 times
   * ```tsx
   * recurring: {
   *     repeat: "monthly",
   *     every: 1,
   *     day: -1, // Last day of the month
   *     count: 4
   * }
   * ``` 
   * 
   * @example
   * 9. Repeat every month on the last Saturday until end of time
   * ```tsx
   * recurring: {
   *     repeat: "monthly",
   *     weekDays: [6], // Saturday
   *     every: 1,
   *     week: -1 // Last week of the month
   * }
   * ``` 
   *
   * @example
   * 10. Repeat every 2 months on the 2nd Saturday until end date
   * ```tsx
   * recurring: {
   *     repeat: "monthly",
   *     weekDays: [6], // Saturday
   *     every: 2,
   *     week: 2, // Second week of the month
   *     end: new Date(2027, 11, 31) // December 31, 2027
   * }
   * ``` 
   *
   * @example
   * 11. Repeat every year on April 1st until end of time
   * ```tsx
   * recurring: {
   *     repeat: "yearly",
   *     day: 1,
   *     month: 3, // April (0-indexed: 0=Jan, 1=Feb, 2=Mar, 3=Apr)
   *     every: 1
   * }
   * ``` 
   *
   * @example
   * 12. Repeat every year on the last day of February until end of time
   * ```tsx
   * recurring: {
   *     repeat: "yearly",
   *     day: -1, // Last day of the month
   *     month: 1, // February (0-indexed)
   *     every: 1
   * }
   * ```
   *
   * @example
   * 13. Repeat every year on the last Friday of March until end of time
   * ```tsx
   * recurring: {
   *     repeat: "yearly",
   *     month: 2, // March (0-indexed)
   *     weekDays: [5], // Friday
   *     every: 1,
   *     week: -1 // Last week of the month
   * }
   * ```  
   */
  recurring?: {
    /** 
     * @description The type of recurrence pattern.
     */
    repeat: "yearly" | "monthly" | "weekly" | "daily";

    /** 
     * @description The interval for the recurrence (e.g., every 2 weeks, every 3 months).
     */
    every: number;

    /** 
     * @description The days of the week for weekly, monthly, or yearly recurrence.
     * 0 = Sunday, 1 = Monday, ..., 6 = Saturday.
     * Required for weekly recurrence.
     * Optional for monthly/yearly when used with the `week` property.
     */
    weekDays?: number[];

    /** 
     * @description The day of the month for monthly or yearly recurrence.
     * Positive values: 1-31 (1st to 31st day).
     * Negative values: -1 to -31 (last day to 31st-to-last day).
     * Cannot be 0.
     * Mutually exclusive with the `weekDays` + `week` combination.
     */
    day?: number;

    /** 
     * @description The week of the month for monthly or yearly recurrence.
     * Positive values: 1-4 (1st to 4th week).
     * Negative values: -1 (last week).
     * Cannot be 0.
     * Must be used with the `weekDays` property.
     */
    week?: number;

    /** 
     * @description The month of the year for yearly recurrence (required for yearly).
     * 0 = January, 1 = February, ..., 11 = December.
     */
    month?: number;

    /** 
     * @description The number of occurrences before the recurrence stops.
     * Mutually exclusive with the `end` property.
     */
    count?: number;

    /** 
     * @description The end date for the recurrence (must be after the event's end date).
     * Mutually exclusive with the `count` property.
     */
    end?: Date;
  } | "never";
  // Allow additional properties
  [key: string]: any;
}

/**
 * @description Configuration options for the `useDragDrop` hook.
 */
export interface UseDragDropOptions {
  /**
   * @description A callback function that is invoked when an event is moved via drag and drop.
   * @param {string} eventId - The ID of the moved event.
   * @param {Date} newStart - The new start date and time of the event.
   * @param {Date} newEnd - The new end date and time of the event.
   */
  onEventMove?: (eventId: string, newStart: Date, newEnd: Date) => void;
  /**
   * @description A callback function that is invoked when a drag operation starts.
   * @param {CalendarEvent} event - The event being dragged.
   */
  onDragStart?: (event: CalendarEvent) => void;
  /**
   * @description A callback function that is invoked when a drag operation ends.
   * @param {CalendarEvent} event - The event that was dragged.
   */
  onDragEnd?: (event: CalendarEvent) => void;
  /**
   * @description A callback function that is invoked when an event is dropped on a valid target.
   * @param {CalendarEvent} event - The event that was dropped.
   * @param {DropTarget} target - The target where the event was dropped.
   */
  onDrop?: (event: CalendarEvent, target: DropTarget) => void;
}

export interface UseDragDropReturn {
  draggedEvent: DraggedEvent | null;
  isDragging: boolean;
  startDrag: (event: CalendarEvent, dragData?: Record<string, any>) => void;
  endDrag: () => void;
  handleDrop: (dropTarget: DropTarget) => void;
  getDragProps: (event: CalendarEvent) => {
    draggable: boolean;
    onDragStart: (e: DragEvent) => void;
    onDragEnd: (e: DragEvent) => void;
  };
  getDropProps: (date: Date, time?: string) => {
    onDragOver: (e: DragEvent) => void;
    onDrop: (e: DragEvent) => void;
  };
}

/**
 * @description Configuration options for the `useEvents` hook.
 */
export interface UseEventsOptions {
  /**
   * @description The timezone to use for the calendar.
   */
  calendarTimezone?: string;
  /**
   * @description A callback function that is invoked whenever the events array changes.
   * @param {CalendarEvent[]} event - The updated array of events.
   */
  onEvent?: (event: CalendarEvent[]) => void;
  /**
   * @description A callback function that is invoked when a new event is created.
   * @param {CalendarEvent} event - The newly created event.
   */
  onEventCreate?: (event: CalendarEvent) => void;
  /**
   * @description A callback function that is invoked when an event is updated.
   * @param {CalendarEvent} event - The updated event.
   */
  onEventUpdate?: (event: CalendarEvent) => void;
  /**
   * @description A callback function that is invoked when an event is deleted.
   * @param {CalendarEvent} event - The deleted event.
   */
  onEventDelete?: (event: CalendarEvent) => void;
  /**
   * @description An array of initial events to populate the calendar with.
   */
  initialEvents?: CalendarEvent[];
}

export interface UseEventsReturn {
  /**
   * @description An array of all events currently managed by the calendar.
   * @type {CalendarEvent[]}
   * @see {@link CalendarEvent}
   */
  events: CalendarEvent[];
  /**
   * @description Creates a new calendar event.
   * @function
   * @param {CalendarEvent} eventData - The data for the new event.
   * @returns {CalendarEvent} - The newly created event.
   * @see {@link CalendarEvent}
   */
  createEvent: (eventData: CalendarEvent) => CalendarEvent;
  /**
   * @description Updates an existing calendar event.
   * @function
   * @param {string} eventId - The ID of the event to update.
   * @param {CalendarEvent} updates - The partial event data to apply as updates.
   * @see {@link CalendarEvent}
   */
  updateEvent: (eventId: string, updates: CalendarEvent) => void;
  /**
   * @description Deletes a calendar event by its ID.
   * @function
   * @param {string} eventId - The ID of the event to delete.
   */
  deleteEvent: (eventId: string) => void;
  /**
   * @description Moves an event to a new start and optional end date.
   * @function
   * @param {string} eventId - The ID of the event to move.
   * @param {Date} newStart - The new start date for the event.
   * @param {Date} [newEnd] - The new end date for the event (optional, defaults to newStart if not provided).
   */
  moveEvent: (eventId: string, newStart: Date, newEnd?: Date) => void;
  /**
   * @description Duplicates an existing event.
   * @function
   * @param {string} eventId - The ID of the event to duplicate.
   * @returns {CalendarEvent | null} - The duplicated event object if successful, otherwise null.
   * @see {@link CalendarEvent}
   */
  duplicateEvent: (eventId: string) => CalendarEvent | null;
  /**
   * @description Retrieves a specific event by its ID.
   * @function
   * @param {string} eventId - The ID of the event to retrieve.
   * @returns {CalendarEvent | undefined} - The event object if found, otherwise undefined.
   * @see {@link CalendarEvent}
   */
  getEvent: (eventId: string) => CalendarEvent | undefined;
  /**
   * @description Clears all events from the calendar.
   * @function
   */
  clearEvents: () => void;
  /**
   * @description Sets the entire list of events, replacing existing ones.
   * @function
   * @param {CalendarEvent[]} newEvents - The new array of events to set.
   * @see {@link CalendarEvent}
   */
  setEvents: (events: CalendarEvent[]) => void;
}