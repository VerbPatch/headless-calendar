/**
 * @description The available calendar views.
 */
export type ViewType = 'month' | 'week' | 'day';

/**
 * @description Data specific to the month view.
 */
export interface MonthData {
  /**
   * @description A 2D array of dates representing the weeks of the month.
   */
  weeks: Date[][];
  /**
   * @description The localized name of the month.
   */
  monthName: string;
  /**
   * @description A function to check if a date is in the current month.
   * @param {Date} date - The date to check.
   * @returns {boolean} - True if the date is in the current month, false otherwise.
   */
  isCurrentMonth: (date: Date) => boolean;
  /**
   * @description A function to check if a date is today.
   * @param {Date} date - The date to check.
   * @returns {boolean} - True if the date is today, false otherwise.
   */
  isToday: (date: Date) => boolean;
}

/**
 * @description Data specific to the week view.
 */
export interface WeekData {
  /**
   * @description An array of dates in the current week.
   */
  dates: Date[];
  /**
   * @description A string representing the date range of the week.
   */
  weekRange: string;
  /**
   * @description A function to check if a date is today.
   * @param {Date} date - The date to check.
   * @returns {boolean} - True if the date is today, false otherwise.
   */
  isToday: (date: Date) => boolean;
}

/**
 * @description Data specific to the day view.
 */
export interface DayData {
  /**
   * @description The current date.
   */
  date: Date;
  /**
   * @description The localized name of the day.
   */
  dayName: string;
  /**
   * @description Indicates if the date is today.
   */
  isToday: boolean;
}

/**
 * @description Configuration options for the `useNavigation` hook.
 */
export interface UseNavigationOptions {
  /**
   * @description The default view to display when the calendar is initialized.
   */
  defaultView: ViewType;
  /**
   * @description The default date to display when the calendar is initialized.
   */
  defaultDate: Date;
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
   * @description The timezone to use for the calendar.
   */
  timezone: string;
  /**
   * @description The locale to use for the calendar.
   */
  locale: string;
}

export interface UseNavigationReturn {
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
   * @description Indicates if navigation to the next period is possible.
   * @type {boolean}
   */
  canGoNext: boolean;
  /**
   * @description Indicates if navigation to the previous period is possible.
   * @type {boolean}
   */
  canGoPrevious: boolean;
}