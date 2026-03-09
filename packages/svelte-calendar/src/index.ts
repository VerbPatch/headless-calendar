import { type Writable, writable } from 'svelte/store';
import { onDestroy } from 'svelte';

import {
  useCalendar as createCalendar,
  CalendarOptions,
  CalendarInstance,
  disposeCalendar,
  generateId,
} from '@verbpatch/headless-calendar';

export * from '@verbpatch/headless-calendar';

export function useCalendar(options?: CalendarOptions): Writable<CalendarInstance> {
  const calendarStore = writable<CalendarInstance>(null!);
  const calendarId = options?.calendarId ?? `svelte-cal-${generateId()}`;

  onDestroy(() => {
    disposeCalendar(calendarId);
  });

  const refreshCalendar = () => {
    const calendar = createCalendar({
      ...options,
      calendarId,
      onEvent: (event) => {
        refreshCalendar();
        options?.onEvent?.(event);
      },
      onDateChange: (date) => {
        refreshCalendar();
        options?.onDateChange?.(date);
      },
      onViewChange: (view) => {
        refreshCalendar();
        options?.onViewChange?.(view);
      },
    });
    calendarStore.set(calendar);
    return calendar;
  };

  refreshCalendar();

  return calendarStore;
}
