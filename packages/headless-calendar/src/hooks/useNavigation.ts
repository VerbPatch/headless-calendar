import {
  UseNavigationOptions,
  UseNavigationReturn,
  ViewType,
  CustomViewOptions,
} from '../types/views';
import { addDays, addWeeks, addMonths, getDay, addYears } from '../utils/date';
import { createCallback, createState } from '../state';
import { validateCustomView } from '../utils';

/**
 * A hook for managing calendar navigation, including changing views and moving between dates.
 * @param {UseNavigationOptions} options - Configuration options for navigation.
 * @returns {UseNavigationReturn} - An object containing the current date, view, and navigation functions.
 * @see {@link UseNavigationOptions}
 * @see {@link UseNavigationReturn}
 * @example
 * ```typescript
 * const { currentDate, view, goToNext, goToPrevious, goToToday, changeView } = useNavigation({
 *   defaultView: 'month',
 *   defaultDate: new Date(),
 * });
 *
 * // Go to the next month
 * goToNext();
 *
 * // Change the view to 'week'
 * changeView('week');
 * ```
 *
 * @group hooks
 * @title useNavigation
 * @description A hook for managing calendar navigation, including changing views and moving between dates.
 */
export const useNavigation = (options: UseNavigationOptions): UseNavigationReturn => {
  const {
    defaultView = 'month',
    defaultDate,
    onViewChange,
    onDateChange,
    customViewOptions = { unit: 'day', count: 1 },
  } = options;
  const [getCurrentDate, setCurrentDate] = createState<Date>(defaultDate, 'current-date');
  const [getView, setView] = createState<ViewType>(defaultView, 'view');
  const [getCustomViewOptions, setCustomViewOptions] = createState<CustomViewOptions>(
    customViewOptions,
    'custom-view-options',
  );

  /**
   * Navigates the calendar to the next period (day, week, month, or year) based on the current view.
   * @group Navigation
   * @title Go to Next
   * @description Navigates the calendar to the next period (day, week, month, or year) based on the current view.
   */
  const goToNext = createCallback(
    (): void => {
      let newDate: Date;
      const current = getCurrentDate();
      const currentCustomOptions = getCustomViewOptions();

      switch (getView()) {
        case 'day':
          newDate = addDays(current, 1);
          break;
        case 'week':
          newDate = addWeeks(current, 1);
          break;
        case 'month':
          newDate = addMonths(current, 1);
          break;
        case 'year':
          newDate = addYears(current, 1);
          break;
        case 'custom':
          validateCustomView(currentCustomOptions);

          newDate = current;
          if (currentCustomOptions.unit === 'day') {
            newDate = addDays(current, currentCustomOptions.count);
          } else if (currentCustomOptions.unit === 'week') {
            newDate = addWeeks(current, currentCustomOptions.count);
          } else if (currentCustomOptions.unit === 'month') {
            newDate = addMonths(current, currentCustomOptions.count);
          }

          break;
      }

      setCurrentDate(newDate);
      onDateChange?.(newDate);
    },
    [getCurrentDate, getView, onDateChange, getCustomViewOptions],
    'go-to-next',
  );

  /**
   * Navigates the calendar to the previous period (day, week, month, or year) based on the current view.
   * @group Navigation
   * @title Go to Previous
   * @description Navigates the calendar to the previous period (day, week, month, or year) based on the current view.
   */
  const goToPrevious = createCallback(
    (): void => {
      let newDate: Date;
      const current = getCurrentDate();
      const currentCustomOptions = getCustomViewOptions();

      switch (getView()) {
        case 'day':
          newDate = addDays(current, -1);
          break;
        case 'week':
          newDate = addWeeks(current, -1);
          break;
        case 'month':
          newDate = addMonths(current, -1);
          break;
        case 'year':
          newDate = addYears(current, -1);
          break;
        case 'custom':
          validateCustomView(currentCustomOptions);

          newDate = current;
          if (currentCustomOptions.unit === 'day') {
            newDate = addDays(current, -currentCustomOptions.count);
          } else if (currentCustomOptions.unit === 'week') {
            newDate = addWeeks(current, -currentCustomOptions.count);
          } else if (currentCustomOptions.unit === 'month') {
            newDate = addMonths(current, -currentCustomOptions.count);
          }

          break;
      }

      setCurrentDate(newDate);
      onDateChange?.(newDate);
    },
    [getCurrentDate, getView, onDateChange, getCustomViewOptions],
    'go-to-previous',
  );

  /**
   * Navigates the calendar to today's date.
   * @group Navigation
   * @title Go to Today
   * @description Navigates the calendar to today's date.
   */
  const goToToday = createCallback(
    (): void => {
      const today = getDay(new Date(), options.timezone, options.timezone);
      setCurrentDate(today);
      onDateChange?.(today);
    },
    [onDateChange],
    'go-to-today',
  );

  /**
   * Navigates the calendar to a specific date.
   * @param {Date} date - The date to navigate to.
   * @group Navigation
   * @title Go to Date
   * @description Navigates the calendar to a specific date.
   */
  const goToDate = createCallback(
    (date: Date): void => {
      const newDate = new Date(date);
      setCurrentDate(newDate);
      onDateChange?.(newDate);
    },
    [onDateChange],
    'go-to-date',
  );

  /**
   * Changes the current view of the calendar.
   * @param {ViewType} newView - The new view to set.
   * @param {CustomViewOptions} [newOptions] - Configuration options for the 'custom' view.
   * @see {@link ViewType}
   * @group Navigation
   * @title Change View
   * @description Changes the current view of the calendar.
   */
  const changeView = createCallback(
    (newView: ViewType, newOptions?: CustomViewOptions): void => {
      if (!['day', 'week', 'month', 'year', 'custom'].includes(newView)) {
        throw new Error(`Invalid view type: ${newView}`);
      }

      setView(newView);
      if (newOptions) {
        setCustomViewOptions(newOptions);
      }
      onViewChange?.(newView);
    },
    [onViewChange],
    'change-view',
  );

  // TODO: Implement date range limits
  const canGoNext = true;
  const canGoPrevious = true;

  return {
    currentDate: getCurrentDate(),
    view: getView(),
    customViewOptions: getCustomViewOptions(),
    goToNext,
    goToPrevious,
    goToToday,
    goToDate,
    changeView,
    canGoNext,
    canGoPrevious,
  };
};
