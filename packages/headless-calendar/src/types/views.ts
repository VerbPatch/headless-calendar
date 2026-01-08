/**
 * The available calendar views.
 * @group navigation
 * @title ViewType
 * @description Defines the available calendar views: 'month', 'week', and 'day'.
 */
export type ViewType = 'year' | 'month' | 'week' | 'day';

/**
 * Data specific to the year view.
 * @group navigation
 * @title YearData
 * @description Represents the data structure for the year view, including months, weeks, month name, and utility functions.
 */
export interface YearData {
  /**
   * An array of month data representing all months of a years .
   */
  months: MonthData[];
  /**
   * Year label.
   */
  year: string;
  /**
   * A function to check if a date is in the current year.
   * @param date - The date to check.
   * @returns - True if the date is in the current year, false otherwise.
   */
  isCurrentYear: (date: Date) => boolean;
}

/**
 * Data specific to the month view.
 * @group navigation
 * @title MonthData
 * @description Represents the data structure for the month view, including weeks, month name, and utility functions.
 */
export interface MonthData {
  /**
   * A 2D array of dates representing the weeks of the month.
   */
  weeks: Date[][];
  /**
   * The localized name of the month.
   */
  monthName: string;
  /**
   * A function to check if a date is in the current month.
   * @param {Date} date - The date to check.
   * @returns {boolean} - True if the date is in the current month, false otherwise.
   */
  isCurrentMonth: (date: Date) => boolean;
  /**
   * A function to check if a date is today.
   * @param {Date} date - The date to check.
   * @returns {boolean} - True if the date is today, false otherwise.
   */
  isToday: (date: Date) => boolean;
}

/**
 * Data specific to the week view. 
 * @group navigation
 * @title WeekData
 * @description Represents the data structure for the week view, including the dates in the current week and the week's date range.
 */
export interface WeekData {
  /**
   * An array of dates in the current week.
   */
  dates: Date[];
  /**
   * A string representing the date range of the week.
   */
  weekRange: string;
  /**
   * A function to check if a date is today.
   * @param {Date} date - The date to check.
   * @returns {boolean} - True if the date is today, false otherwise.
   */
  isToday: (date: Date) => boolean;
}

/**
 * Data specific to the day view. 
 * @group navigation
 * @title DayData
 * @description Represents the data structure for the day view, including the current date and its localized name.
 */
export interface DayData {
  /**
   * The current date.
   */
  date: Date;
  /**
   * The localized name of the day.
   */
  dayName: string;
  /**
   * Indicates if the date is today.
   */
  isToday: boolean;
}

/**
 * Configuration options for the `useNavigation` hook. 
 * @group navigation
 * @title UseNavigationOptions
 * @description Defines the configuration options for the `useNavigation` hook, including default view, date, and callback functions for view and date changes.
 */
export interface UseNavigationOptions {
  /**
   * The default view to display when the calendar is initialized.
   */
  defaultView: ViewType;
  /**
   * The default date to display when the calendar is initialized.
   */
  defaultDate: Date;
  /**
   * A callback function that is invoked when the calendar view changes.
   * @param {ViewType} view - The new calendar view.
   * @event
   */
  onViewChange?: (view: ViewType) => void;
  /**
   * A callback function that is invoked when the current date of the calendar changes.
   * @param {Date} date - The new date.
   * @event
   */
  onDateChange?: (date: Date) => void;
  /**
   * The timezone to use for the calendar.
   */
  timezone: string;
  /**
   * The locale to use for the calendar.
   */
  locale: string;
}

/** 
 * @group navigation
 * @title UseNavigationReturn
 * @description The return object of the `useNavigation` hook, providing access to the current date, view, and functions for navigating the calendar.
 */
export interface UseNavigationReturn {
  /**
   * The currently selected date in the calendar.
   * @type {Date}
   */
  currentDate: Date;
  /**
   * The current view of the calendar (e.g., 'month', 'week', 'day').
   * @type {ViewType}
   * @see {@link ViewType}
   */
  view: ViewType;
  /**
   * Navigates the calendar to the next period (day, week, or month depending on the current view).
   * @function
   */
  goToNext: () => void;
  /**
   * Navigates the calendar to the previous period (day, week, or month depending on the current view).
   * @function
   */
  goToPrevious: () => void;
  /**
   * Navigates the calendar to today's date.
   * @function
   */
  goToToday: () => void;
  /**
   * Navigates the calendar to a specific date.
   * @function
   * @param {Date} date - The date to navigate to.
   */
  goToDate: (date: Date) => void;
  /**
   * Changes the current view of the calendar (e.g., 'month', 'week', 'day').
   * @function
   * @param {ViewType} view - The new view to set.
   * @see {@link ViewType}
   */
  changeView: (view: ViewType) => void;
  /**
   * Indicates if navigation to the next period is possible.
   * @type {boolean}
   */
  canGoNext: boolean;
  /**
   * Indicates if navigation to the previous period is possible.
   * @type {boolean}
   */
  canGoPrevious: boolean;
}