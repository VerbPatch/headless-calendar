/**
 * The available calendar views.
 * @group navigation
 * @title ViewType
 * @description Defines the available calendar views: 'month', 'week', and 'day'.
 */
export type ViewType = 'year' | 'month' | 'week' | 'day' | 'custom';

/**
 * Configuration for a custom view.
 * @group navigation
 * @title CustomViewOptions
 * @description Defines the configuration for a custom view, such as the number of days, weeks, or months to display.
 */
export interface CustomViewOptions {
  /**
   * The type of view for the custom view.
   */
  type: 'day' | 'week' | 'month';
  /**
   * The number of 'day' | 'week' | 'month' to display based on type.
   */
  count: number;
  /**
   * Specific days of the week to include (0 for Sunday, 1 for Monday, etc.).
   * If provided, only these days will be visible in the custom view.
   * Only works if type is set to either week or month
   */
  includeSpecificDays?: number[];
}

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
   * An array of dates visible in the day view (useful for custom multi-day views).
   */
  dates: Date[];
  /**
   * The localized name of the day or range.
   */
  dayName: string;
  /**
   * Indicates if the primary date is today.
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
  /**
   * Configuration options for the 'custom' view.
   */
  customViewOptions?: CustomViewOptions;
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
   * Configuration options for the 'custom' view.
   * @type {CustomViewOptions}
   */
  customViewOptions: CustomViewOptions;
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
   * @param {CustomViewOptions} [options] - Configuration options for the 'custom' view.
   * @see {@link ViewType}
   */
  changeView: (view: ViewType, options?: CustomViewOptions) => void;
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
