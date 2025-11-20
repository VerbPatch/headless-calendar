import { UseNavigationOptions, UseNavigationReturn, ViewType } from '../types/views';
import { addDays, addWeeks, addMonths, getDay } from '../utils/date';
import { createCallback, createState } from '../state';

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
 * @category Calendar Navigation
 * @group All Main Hooks
 */
export const useNavigation = (options: UseNavigationOptions): UseNavigationReturn => {
  const {
    defaultView = 'month',
    defaultDate,
    onViewChange,
    onDateChange,
  } = options;
  const [getCurrentDate, setCurrentDate] = createState<Date>(defaultDate, 'current-date');
  const [getView, setView] = createState<ViewType>(defaultView, 'view');

  /**
   * Navigates the calendar to the next period (day, week, or month) based on the current view.
   */
  const goToNext = createCallback((): void => {
    let newDate: Date;

    switch (getView()) {
      case 'day':
        newDate = addDays(getCurrentDate(), 1);
        break;
      case 'week':
        newDate = addWeeks(getCurrentDate(), 1);
        break;
      case 'month':
        newDate = addMonths(getCurrentDate(), 1);
        break;
      default:
        return;
    }

    setCurrentDate(newDate);
    onDateChange?.(newDate);
  },
    [getCurrentDate, getView, onDateChange],
    'go-to-next');

  /**
   * Navigates the calendar to the previous period (day, week, or month) based on the current view.
   */
  const goToPrevious = createCallback((): void => {

    let newDate: Date;

    switch (getView()) {
      case 'day':
        newDate = addDays(getCurrentDate(), -1);
        break;
      case 'week':
        newDate = addWeeks(getCurrentDate(), -1);
        break;
      case 'month':
        newDate = addMonths(getCurrentDate(), -1);
        break;
      default:
        return;
    }

    setCurrentDate(newDate);
    onDateChange?.(newDate);
  },
    [getCurrentDate, getView, onDateChange],
    'go-to-previous');

  /**
   * Navigates the calendar to today's date.
   */
  const goToToday = createCallback((): void => {
    const today = getDay(new Date(), options.timezone, options.timezone);
    setCurrentDate(today);
    onDateChange?.(today);
  },
    [onDateChange],
    'go-to-today');

  /**
   * Navigates the calendar to a specific date.
   * @param {Date} date - The date to navigate to.
   */
  const goToDate = createCallback((date: Date): void => {
    const newDate = new Date(date);
    setCurrentDate(newDate);
    onDateChange?.(newDate);
  },
    [onDateChange],
    'go-to-date');

  /**
   * Changes the current view of the calendar.
   * @param {ViewType} newView - The new view to set.
   * @see {@link ViewType}
   */
  const changeView = createCallback((newView: ViewType): void => {
    setView(newView);
    onViewChange?.(newView);
  },
    [onViewChange],
    'change-view');

  // TODO: Implement date range limits
  const canGoNext = true;
  const canGoPrevious = true;

  return {
    currentDate: getCurrentDate(),
    view: getView(),
    goToNext,
    goToPrevious,
    goToToday,
    goToDate,
    changeView,
    canGoNext,
    canGoPrevious
  };
};