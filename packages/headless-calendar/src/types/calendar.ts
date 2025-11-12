import { CalendarEvent } from './events';
import { ViewType, MonthData, WeekData, DayData } from './views';

export interface TimeSlot {
  hour: number;
  minute: number;
  time: string;
  label: string;
}

export interface DraggedEvent {
  event: CalendarEvent;
  type: string;
  [key: string]: any;
}

export interface DropTarget {
  date: Date;
  time?: string;
}

export interface CalendarOptions {
  defaultView?: ViewType;
  /**
   * Default date in mentioned timezone for setting up initial calendar view
   */
  defaultDate?: Date;
  /**
   * 0 = Sunday, 1 = Monday, 2 = Tuesday, 3 = Wednesday, 4 = Thursday, 5 = Friday, 6 = Saturday
   */
  startOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  timeSlotInterval?: number; // minutes
  startHour?: number;
  endHour?: number;
  initialEvents?: CalendarEvent[];
  onEvent?: (events: CalendarEvent[]) => void;
  onEventCreate?: (event: CalendarEvent) => void;
  onEventUpdate?: (event: CalendarEvent) => void;
  onEventDelete?: (event: CalendarEvent) => void;
  onViewChange?: (view: ViewType) => void;
  onDateChange?: (date: Date) => void;
  timezone?: string;
  locale?: string;
}

export interface CalendarUtils {
  formatDate: (date: Date, format?: string) => string;
  formatDateTime: (date: Date, format?: string) => string;
  parseDate: (dateString: string) => Date;
  isSameDay: (date1: Date, date2: Date) => boolean;
  isSameWeek: (date1: Date, date2: Date) => boolean;
  isSameMonth: (date1: Date, date2: Date) => boolean;
  addDays: (date: Date, days: number) => Date;
  addWeeks: (date: Date, weeks: number) => Date;
  addMonths: (date: Date, months: number) => Date;
  getStartOfWeek: (date: Date, startOfWeek?: number) => Date;
  getEndOfWeek: (date: Date, startOfWeek?: number) => Date;
  getStartOfMonth: (date: Date) => Date;
  getEndOfMonth: (date: Date) => Date;
  dateTimeInBetween: (between: Date, startDateTime: Date, endDateTime: Date) => boolean;
  daysofWeek: (format?: "long" | "short" | "narrow", locale?: string) => string[];
  formatDateInTimeZone: (date: Date, locale?: string, timeZone?: string, options?: Intl.DateTimeFormatOptions) => string;
  convertToTimeZone: (date: Date, fromTimeZone: string, toTimeZone: string) => Date;
  formatLocalizedDate: (
    date: Date,
    locale?: string,
    timeZone?: string,
    options?: Intl.DateTimeFormatOptions
  ) => string;
  formatLocalizedMonth: (
    date: Date,
    locale?: string,
    timeZone?: string
  ) => string;
  formatLocalizedWeekday: (
    date: Date,
    locale?: string,
    timeZone?: string,
    format?: 'long' | 'short' | 'narrow'
  ) => string;
  formatLocalizedTime: (
    date: Date,
    locale?: string,
    timeZone?: string,
    hour12?: boolean
  ) => string;
}

export interface CalendarInstance {
  currentDate: Date;
  view: ViewType;
  events: CalendarEvent[];
  draggedEvent: DraggedEvent | null;
  timezone?: string;
  locale?: string;
  timeSlotInterval?: number;

  goToNext: () => void;
  goToPrevious: () => void;
  goToToday: () => void;
  goToDate: (date: Date) => void;
  changeView: (view: ViewType) => void;

  getEvent: (eventId: string) => CalendarEvent | undefined;
  createEvent: (eventData: CalendarEvent) => CalendarEvent;
  updateEvent: (eventId: string, updates: CalendarEvent) => void;
  deleteEvent: (eventId: string) => void;
  moveEvent: (eventId: string, newStart: Date, newEnd?: Date) => void;
  clearAllEvents: () => void;
  duplicateEvent: (eventId: string) => CalendarEvent | null;

  startDrag: (event: CalendarEvent, dragData?: Record<string, any>) => void;
  endDrag: () => void;
  handleDrop: (dropTarget: DropTarget) => void;

  getEventsForDateRange: (startDate: Date, endDate: Date) => CalendarEvent[];
  getEventsForDate: (date: Date) => CalendarEvent[];

  visibleDates: Date[];
  visibleEvents: CalendarEvent[];
  timeSlots: TimeSlot[];

  monthData: MonthData | null;
  weekData: WeekData | null;
  dayData: DayData | null;

  utils: CalendarUtils;
}