import { UseNavigationOptions, UseNavigationReturn, ViewType } from '../types/views';
import { addDays, addWeeks, addMonths, getDay } from '../utils/date';
import { createCallback, createState } from '../state';

export const useNavigation = (options: UseNavigationOptions): UseNavigationReturn => {
  const {
    defaultView = 'month',
    defaultDate,
    onViewChange,
    onDateChange,
  } = options;
  const [getCurrentDate, setCurrentDate] = createState<Date>(defaultDate, 'current-date');
  const [getView, setView] = createState<ViewType>(defaultView, 'view');

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

  const goToToday = createCallback((): void => {
    const today = getDay(new Date(), options.timezone, options.timezone);
    setCurrentDate(today);
    onDateChange?.(today);
  },
    [onDateChange],
    'go-to-today');

  const goToDate = createCallback((date: Date): void => {
    const newDate = new Date(date);
    setCurrentDate(newDate);
    onDateChange?.(newDate);
  },
    [onDateChange],
    'go-to-date');

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