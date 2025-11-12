import { DraggedEvent, DropTarget } from "./calendar";

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  description?: string;
  color?: string;
  timezone?: string;
  /**
   * Recurring event configuration. Use "never" for non-recurring events.
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
    /** Recurrence pattern type */
    repeat: "yearly" | "monthly" | "weekly" | "daily";

    /** Interval for recurrence (e.g., every 2 weeks, every 3 months) */
    every: number;

    /** 
     * Days of the week for weekly/monthly/yearly recurrence
     * 0 = Sunday, 1 = Monday, 2 = Tuesday, 3 = Wednesday, 4 = Thursday, 5 = Friday, 6 = Saturday
     * Required for weekly recurrence
     * Optional for monthly/yearly when used with week property
     */
    weekDays?: number[];

    /** 
     * Day of the month for monthly/yearly recurrence
     * Positive values: 1-31 (1st to 31st day)
     * Negative values: -1 to -31 (last day to 31st-to-last day)
     * Cannot be 0
     * Mutually exclusive with weekDays+week combination
     */
    day?: number;

    /** 
     * Week of the month for monthly/yearly recurrence
     * Positive values: 1-4 (1st to 4th week)
     * Negative values: -1 (last week)
     * Cannot be 0
     * Must be used with weekDays property
     */
    week?: number;

    /** 
     * Month of the year for yearly recurrence (required for yearly)
     * 0 = January, 1 = February, ..., 11 = December
     */
    month?: number;

    /** 
     * Number of occurrences before stopping
     * Mutually exclusive with end property
     */
    count?: number;

    /** 
     * End date for recurrence (must be after event end date)
     * Mutually exclusive with count property
     */
    end?: Date;
  } | "never";
  // Allow additional properties
  [key: string]: any;
}

export interface UseDragDropOptions {
  onEventMove?: (eventId: string, newStart: Date, newEnd: Date) => void;
  onDragStart?: (event: CalendarEvent) => void;
  onDragEnd?: (event: CalendarEvent) => void;
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

export interface UseEventsOptions {
  calendarTimezone?: string;
  onEvent?: (event: CalendarEvent[]) => void;
  onEventCreate?: (event: CalendarEvent) => void;
  onEventUpdate?: (event: CalendarEvent) => void;
  onEventDelete?: (event: CalendarEvent) => void;
  initialEvents?: CalendarEvent[];
}

export interface UseEventsReturn {
  events: CalendarEvent[];
  createEvent: (eventData: CalendarEvent) => CalendarEvent;
  updateEvent: (eventId: string, updates: CalendarEvent) => void;
  deleteEvent: (eventId: string) => void;
  moveEvent: (eventId: string, newStart: Date, newEnd?: Date) => void;
  duplicateEvent: (eventId: string) => CalendarEvent | null;
  getEvent: (eventId: string) => CalendarEvent | undefined;
  clearEvents: () => void;
  setEvents: (events: CalendarEvent[]) => void;
}