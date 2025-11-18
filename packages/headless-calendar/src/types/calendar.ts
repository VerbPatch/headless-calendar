import { CalendarEvent } from './events';
import { ViewType, MonthData, WeekData, DayData } from './views';

/**
 * @description Represents a single time slot in a day view.
 */
export interface TimeSlot {
  /**
   * @description The hour of the time slot (0-23).
   */
  hour: number;
  /**
   * @description The minute of the time slot (0-59).
   */
  minute: number;
  /**
   * @description The time in "HH:mm" format.
   */
  time: string;
  /**
   * @description A formatted label for the time slot (e.g., "9:00 AM").
   */
  label: string;
}

/**
 * @description Represents an event that is currently being dragged.
 */
export interface DraggedEvent {
  /**
   * @description The calendar event being dragged.
   * @see {@link CalendarEvent}
   */
  event: CalendarEvent;
  /**
   * @description The type of the dragged item (e.g., 'event').
   */
  type: string;
  /**
   * @description Additional data associated with the drag operation.
   */
  [key: string]: any;
}

/**
 * @description Represents the target of a drop operation.
 */
export interface DropTarget {
  /**
   * @description The date of the drop target.
   */
  date: Date;
  /**
   * @description The optional time of the drop target (e.g., "09:00").
   */
  time?: string;
}

/**
 * @description Configuration options for initializing a calendar instance.
 */
export interface CalendarOptions {
  /**
   * @description The default view to display when the calendar is initialized.
   * @default 'month'
   */
  defaultView?: ViewType;
  /**
   * @description The default date to display when the calendar is initialized.
   * @default new Date()
   */
  defaultDate?: Date;
  /**
   * @description The day of the week to consider as the start of the week (0 for Sunday, 1 for Monday, etc.).
   * @default 0
   */
  startOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * @description The interval in minutes for time slots in day and week views.
   * @default 60
   */
  timeSlotInterval?: number; // minutes
  /**
   * @description The starting hour for time slots in day and week views.
   * @default 0
   */
  startHour?: number;
  /**
   * @description The ending hour for time slots in day and week views.
   * @default 24
   */
  endHour?: number;
  /**
   * @description An array of initial events to populate the calendar with.
   */
  initialEvents?: CalendarEvent[];
  /**
   * @description A callback function that is invoked whenever the events array changes.
   * @param {CalendarEvent[]} events - The updated array of events.
   */
  onEvent?: (events: CalendarEvent[]) => void;
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
   * @description A callback function that is invoked when the calendar view changes.
   * @param {ViewType} view - The new calendar view.
   */
  onViewChange?: (view: ViewType) => void;
  /**
   * @description A callback function that is invoked when the current date of the calendar changes.
   * @param {Date} date - The new date.
   */
  onDateChange?: (date: Date) => void;
  /**
   * @description The timezone to use for calendar operations.
   * @default The user's local timezone.
   */
  timezone?: string;
  /**
   * @description The locale to use for formatting dates and times.
   * @default The user's browser locale.
   */
  locale?: string;
}

export interface CalendarUtils {
  /**
   * @description Formats a date object into a string based on the specified format, locale, and timezone.
   * @function
   * @param {Date} date - The date object to format.
   * @param {string} [format="yyyy-MM-dd"] - The format string (e.g., "yyyy-MM-dd", "MM/dd/yyyy").
   * @returns {string} - The formatted date string.
   */
  formatDate: (date: Date, format?: string) => string;
  /**
   * @description Formats a date and time object into a string based on the specified format, locale, and timezone.
   * @function
   * @param {Date} date - The date object to format.
   * @param {string} [format="yyyy-MM-dd HH:mm:ss"] - The format string (e.g., "yyyy-MM-dd HH:mm:ss").
   * @returns {string} - The formatted date and time string.
   */
  formatDateTime: (date: Date, format?: string) => string;
  /**
   * @description Parses a date string into a Date object.
   * @function
   * @param {string} dateString - The date string to parse.
   * @returns {Date} - The parsed Date object.
   */
  parseDate: (dateString: string) => Date;
  /**
   * @description Checks if two dates are the same day.
   * @function
   * @param {Date} date1 - The first date.
   * @param {Date} date2 - The second date.
   * @returns {boolean} - True if the dates are the same day, false otherwise.
   */
  isSameDay: (date1: Date, date2: Date) => boolean;
  /**
   * @description Checks if two dates are in the same week.
   * @function
   * @param {Date} date1 - The first date.
   * @param {Date} date2 - The second date.
   * @returns {boolean} - True if the dates are in the same week, false otherwise.
   */
  isSameWeek: (date1: Date, date2: Date) => boolean;
  /**
   * @description Checks if two dates are in the same month.
   * @function
   * @param {Date} date1 - The first date.
   * @param {Date} date2 - The second date.
   * @returns {boolean} - True if the dates are in the same month, false otherwise.
   */
  isSameMonth: (date1: Date, date2: Date) => boolean;
  /**
   * @description Adds a specified number of days to a date.
   * @function
   * @param {Date} date - The original date.
   * @param {number} amount - The number of days to add (can be negative).
   * @returns {Date} - The new date.
   */
  addDays: (date: Date, days: number) => Date;
  /**
   * @description Adds a specified number of weeks to a date.
   * @function
   * @param {Date} date - The original date.
   * @param {number} amount - The number of weeks to add (can be negative).
   * @returns {Date} - The new date.
   */
  addWeeks: (date: Date, weeks: number) => Date;
  /**
   * @description Adds a specified number of months to a date.
   * @function
   * @param {Date} date - The original date.
   * @param {number} amount - The number of months to add (can be negative).
   * @returns {Date} - The new date.
   */
  addMonths: (date: Date, months: number) => Date;
  /**
   * @description Gets the start of the week for a given date.
   * @function
   * @param {Date} date - The date.
   * @param {number} startOfWeek - The day of the week to consider as the start (0 for Sunday, 1 for Monday, etc.).
   * @returns {Date} - The start of the week.
   */
  getStartOfWeek: (date: Date, startOfWeek?: number) => Date;
  /**
   * @description Gets the end of the week for a given date.
   * @function
   * @param {Date} date - The date.
   * @param {number} startOfWeek - The day of the week to consider as the start (0 for Sunday, 1 for Monday, etc.).
   * @returns {Date} - The end of the week.
   */
  getEndOfWeek: (date: Date, startOfWeek?: number) => Date;
  /**
   * @description Gets the start of the month for a given date.
   * @function
   * @param {Date} date - The date.
   * @returns {Date} - The start of the month.
   */
  getStartOfMonth: (date: Date) => Date;
  /**
   * @description Gets the end of the month for a given date.
   * @function
   * @param {Date} date - The date.
   * @returns {Date} - The end of the month.
   */
  getEndOfMonth: (date: Date) => Date;
  /**
   * @description Checks if a given date and time falls within a specified range.
   * @function
   * @param {Date} date - The date to check.
   * @param {Date} start - The start of the range.
   * @param {Date} end - The end of the range.
   * @returns {boolean} - True if the date is within the range, false otherwise.
   */
  dateTimeInBetween: (between: Date, startDateTime: Date, endDateTime: Date) => boolean;
  /**
   * @description Returns an array of localized day names for the week, starting from the specified `startOfWeek`.
   * @function
   * @param {'short' | 'long'} [format='short'] - The format of the weekday names ('short' for 'Mon', 'long' for 'Monday').
   * @returns {string[]} - An array of localized weekday names.
   */
  daysofWeek: (format?: "long" | "short" | "narrow", locale?: string) => string[];
  /**
   * @description Formats a date into a string according to the specified locale and timezone.
   * @function
   * @param {Date} date - The date to format.
   * @param {string} [l=locale] - The locale to use for formatting.
   * @param {string} [tz=timezone] - The timezone to use for formatting.
   * @param {Intl.DateTimeFormatOptions} [options] - Additional formatting options.
   * @returns {string} - The formatted date string.
   */
  formatDateInTimeZone: (date: Date, locale?: string, timeZone?: string, options?: Intl.DateTimeFormatOptions) => string;
  /**
   * @description Converts a date from one timezone to another.
   * @function
   * @param {Date} date - The date to convert.
   * @param {string} [fromTz=timezone] - The original timezone of the date.
   * @param {string} toTz - The target timezone.
   * @returns {Date} - The converted date object.
   */
  convertToTimeZone: (date: Date, fromTimeZone: string, toTimeZone: string) => Date;
  /**
   * @description Formats a date into a localized date string.
   * @function
   * @param {Date} date - The date to format.
   * @param {string} [l=locale] - The locale to use for formatting.
   * @param {string} [tz=timezone] - The timezone to use for formatting.
   * @param {Intl.DateTimeFormatOptions} [options] - Additional formatting options.
   * @returns {string} - The localized date string.
   */
  formatLocalizedDate: (
    date: Date,
    locale?: string,
    timeZone?: string,
    options?: Intl.DateTimeFormatOptions
  ) => string;
  /**
   * @description Formats a date into a localized month string.
   * @function
   * @param {Date} date - The date to format.
   * @param {string} [l=locale] - The locale to use for formatting.
   * @param {string} [tz=timezone] - The timezone to use for formatting.
   * @returns {string} - The localized month string.
   */
  formatLocalizedMonth: (
    date: Date,
    locale?: string,
    timeZone?: string
  ) => string;
  /**
   * @description Formats a date into a localized weekday string.
   * @function
   * @param {Date} date - The date to format.
   * @param {string} [l=locale] - The locale to use for formatting.
   * @param {string} [tz=timezone] - The timezone to use for formatting.
   * @param {Intl.DateTimeFormatOptions['weekday']} [format] - The format of the weekday (e.g., 'short', 'long').
   * @returns {string} - The localized weekday string.
   */
  formatLocalizedWeekday: (
    date: Date,
    locale?: string,
    timeZone?: string,
    format?: 'long' | 'short' | 'narrow'
  ) => string;
  /**
   * @description Formats a date into a localized time string.
   * @function
   * @param {Date} date - The date to format.
   * @param {string} [l=locale] - The locale to use for formatting.
   * @param {string} [tz=timezone] - The timezone to use for formatting.
   * @param {boolean} [hour12] - Whether to use 12-hour format.
   * @returns {string} - The localized time string.
   */
  formatLocalizedTime: (
    date: Date,
    locale?: string,
    timeZone?: string,
    hour12?: boolean
  ) => string;
}

export interface CalendarInstance {
  /**
   * @description The currently selected date in the calendar.
   * @type {Date}
   */
  currentDate: Date;
  /**
   * @description The current view of the calendar (e.g., 'month', 'week', 'day').
   * @type {ViewType}
   * @see {@link ViewType}
   */
  view: ViewType;
  /**
   * @description An array of all events currently managed by the calendar.
   * @type {CalendarEvent[]}
   * @see {@link CalendarEvent}
   */
  events: CalendarEvent[];
  /**
   * @description The event currently being dragged, if any.
   * @type {DraggedEvent | null}
   * @see {@link DraggedEvent}
   */
  draggedEvent: DraggedEvent | null;
  /**
   * @description The timezone used for calendar operations.
   * @type {string | undefined}
   */
  timezone?: string;
  /**
   * @description The locale used for formatting dates and times.
   * @type {string | undefined}
   */
  locale?: string;
  /**
   * @description The interval in minutes for time slots in day/week views.
   * @type {number | undefined}
   */
  timeSlotInterval?: number;

  /**
   * @description Navigates the calendar to the next period (day, week, or month depending on the current view).
   * @function
   */
  goToNext: () => void;
  /**
   * @description Navigates the calendar to the previous period (day, week, or month depending on the current view).
   * @function
   */
  goToPrevious: () => void;
  /**
   * @description Navigates the calendar to today's date.
   * @function
   */
  goToToday: () => void;
  /**
   * @description Navigates the calendar to a specific date.
   * @function
   * @param {Date} date - The date to navigate to.
   */
  goToDate: (date: Date) => void;
  /**
   * @description Changes the current view of the calendar (e.g., 'month', 'week', 'day').
   * @function
   * @param {ViewType} view - The new view to set.
   * @see {@link ViewType}
   */
  changeView: (view: ViewType) => void;

  /**
   * @description Retrieves a specific event by its ID.
   * @function
   * @param {string} eventId - The ID of the event to retrieve.
   * @returns {CalendarEvent | undefined} - The event object if found, otherwise undefined.
   * @see {@link CalendarEvent}
   */
  getEvent: (eventId: string) => CalendarEvent | undefined;
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
   * @description Clears all events from the calendar.
   * @function
   */
  clearAllEvents: () => void;
  /**
   * @description Duplicates an existing event.
   * @function
   * @param {string} eventId - The ID of the event to duplicate.
   * @returns {CalendarEvent | null} - The duplicated event object if successful, otherwise null.
   * @see {@link CalendarEvent}
   */
  duplicateEvent: (eventId: string) => CalendarEvent | null;

  /**
   * @description Initiates a drag operation for an event.
   * @function
   * @param {CalendarEvent} event - The event to drag.
   * @param {Record<string, any>} [dragData] - Additional data to associate with the drag operation.
   * @see {@link CalendarEvent}
   */
  startDrag: (event: CalendarEvent, dragData?: Record<string, any>) => void;
  /**
   * @description Ends the current drag operation.
   * @function
   */
  endDrag: () => void;
  /**
   * @description Handles the drop of a dragged event onto a target.
   * @function
   * @param {DropTarget} dropTarget - The target where the event was dropped.
   * @see {@link DropTarget}
   */
  handleDrop: (dropTarget: DropTarget) => void;

  /**
   * @description Retrieves events within a specified date range.
   * @function
   * @param {Date} startDate - The start date of the range.
   * @param {Date} endDate - The end date of the range.
   * @returns {CalendarEvent[]} - An array of events within the specified range.
   * @see {@link CalendarEvent}
   */
  getEventsForDateRange: (startDate: Date, endDate: Date) => CalendarEvent[];
  /**
   * @description Retrieves events for a specific date.
   * @function
   * @param {Date} date - The date to retrieve events for.
   * @returns {CalendarEvent[]} - An array of events on the specified date.
   * @see {@link CalendarEvent}
   */
  getEventsForDate: (date: Date) => CalendarEvent[];

  /**
   * @description An array of dates currently visible in the calendar, based on the current view.
   * @type {Date[]}
   */
  visibleDates: Date[];
  /**
   * @description An array of calendar events that are visible within the current date range.
   * @type {CalendarEvent[]}
   * @see {@link CalendarEvent}
   */
  visibleEvents: CalendarEvent[];
  /**
   * @description An array of time slots for the current day view, e.g., ['09:00', '10:00'].
   * @type {TimeSlot[]}
   * @see {@link TimeSlot}
   */
  timeSlots: TimeSlot[];

  /**
   * @description Provides data specific to the month view, such as weeks, month name, and utility functions to check if a date is in the current month or is today.
   * @type {MonthData | null}
   * @see {@link MonthData}
   */
  monthData: MonthData | null;
  /**
   * @description Provides data specific to the week view, such as the dates in the week, the week's date range, and a utility function to check if a date is today.
   * @type {WeekData | null}
   * @see {@link WeekData}
   */
  weekData: WeekData | null;
  /**
   * @description Provides data specific to the day view, such as the current date, its localized day name, and a utility function to check if the date is today.
   * @type {DayData | null}
   * @see {@link DayData}
   */
  dayData: DayData | null;

  /**
   * @description A collection of utility functions for date manipulation and formatting.
   * @type {CalendarUtils}
   * @see {@link CalendarUtils}
   */
  utils: CalendarUtils;
}