import { signal, type WritableSignal } from '@angular/core';
import {
  useCalendar as createCalendar,
  type CalendarOptions,
  type CalendarInstance,
  type CalendarEvent,
  type ViewType,
} from '@verbpatch/headless-calendar';

export * from '@verbpatch/headless-calendar';

export type CalendarComposable = {
  calendar: WritableSignal<CalendarInstance>;
} & CalendarInstance;

export function useCalendar(options?: CalendarOptions): CalendarComposable {
  const initialInstance = createCalendar(options);
  const calendarSignal = signal<CalendarInstance>(initialInstance);

  const refreshCalendar = () => {
    const newInstance = createCalendar({
      ...options,

      onEvent: (event: CalendarEvent[]) => {
        options?.onEvent?.(event);
        refreshCalendar();
      },
      onDateChange: (date: Date) => {
        options?.onDateChange?.(date);
        refreshCalendar();
      },
      onViewChange: (view: ViewType) => {
        options?.onViewChange?.(view);
        refreshCalendar();
      },
    });

    calendarSignal.set(newInstance);
  };

  refreshCalendar();

  const calendarWrapper: any = {
    calendar: calendarSignal,
  };

  return calendarWrapper as CalendarComposable;
}
