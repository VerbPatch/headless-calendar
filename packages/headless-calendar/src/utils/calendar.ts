import { TimeSlot } from '../types/calendar';
import { getStartOfWeek, addDays, getStartOfMonth, getEndOfMonth, getEndOfWeek } from './date';

export const getWeekDates = (date: Date, startOfWeek = 0): Date[] => {
  const start = getStartOfWeek(date, startOfWeek);
  return Array.from({ length: 7 }, (_, i) => addDays(start, i));
};

export const getMonthCalendarDates = (date: Date, startOfWeek = 0): Date[] => {
  const startOfMonth = getStartOfMonth(date);
  const endOfMonth = getEndOfMonth(date);

  const startDate = getStartOfWeek(startOfMonth, startOfWeek);
  const endDate = getEndOfWeek(endOfMonth, startOfWeek);

  const dates: Date[] = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

export const getTimeSlots = (startHour = 0, endHour = 24, interval = 60): TimeSlot[] => {
  const slots: TimeSlot[] = [];

  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += interval) {
      slots.push({
        hour,
        minute,
        time: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
        label: formatTimeSlotLabel(hour, minute)
      });
    }
  }

  return slots;
};

export const formatTimeSlotLabel = (hour: number, minute: number, use24Hour = false): string => {
  if (use24Hour) {
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  }

  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  const period = hour < 12 ? 'AM' : 'PM';
  return `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`;
};

export const getWeeksInMonth = (date: Date, startOfWeek = 0): Date[][] => {
  const dates = getMonthCalendarDates(date, startOfWeek);
  const weeks: Date[][] = [];

  for (let i = 0; i < dates.length; i += 7) {
    weeks.push(dates.slice(i, i + 7));
  }

  return weeks;
};

export const getQuarterDates = (date: Date): { start: Date; end: Date } => {
  const year = date.getFullYear();
  const quarter = Math.floor(date.getMonth() / 3);

  const start = new Date(year, quarter * 3, 1);
  const end = new Date(year, quarter * 3 + 3, 0);

  return { start, end };
};

export const getYearRange = (date: Date): { start: Date; end: Date } => {
  const year = date.getFullYear();
  const start = new Date(year, 0, 1);
  const end = new Date(year, 11, 31);

  return { start, end };
};

export const calculateWeekNumber = (date: Date): number => {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};

export const getCalendarBounds = (view: 'month' | 'week' | 'day', date: Date, startOfWeek = 0): { start: Date; end: Date } => {
  switch (view) {
    case 'day':
      return {
        start: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
        end: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999)
      };

    case 'week':
      const weekStart = getStartOfWeek(date, startOfWeek);
      const weekEnd = getEndOfWeek(date, startOfWeek);
      return { start: weekStart, end: weekEnd };

    case 'month':
      const monthDates = getMonthCalendarDates(date, startOfWeek);
      return {
        start: monthDates[0],
        end: monthDates[monthDates.length - 1]
      };

    default:
      throw new Error(`Unknown view type: ${view}`);
  }
};