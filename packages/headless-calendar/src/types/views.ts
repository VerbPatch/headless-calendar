export type ViewType = 'month' | 'week' | 'day';

export interface MonthData {
  weeks: Date[][];
  monthName: string;
  isCurrentMonth: (date: Date) => boolean;
  isToday: (date: Date) => boolean;
}

export interface WeekData {
  dates: Date[];
  weekRange: string;
  isToday: (date: Date) => boolean;
}

export interface DayData {
  date: Date;
  dayName: string;
  isToday: boolean;
}

export interface UseNavigationOptions {
  defaultView: ViewType;
  defaultDate: Date;
  onViewChange?: (view: ViewType) => void;
  onDateChange?: (date: Date) => void;
  timezone: string;
  locale: string;
}

export interface UseNavigationReturn {
  currentDate: Date;
  view: ViewType;
  goToNext: () => void;
  goToPrevious: () => void;
  goToToday: () => void;
  goToDate: (date: Date) => void;
  changeView: (view: ViewType) => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
}