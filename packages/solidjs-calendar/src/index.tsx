import { createSignal, createEffect, onCleanup } from 'solid-js';
import {
  useCalendar as createCalendar,
  type CalendarOptions,
  type CalendarInstance,
  disposeCalendar,
} from '@verbpatch/headless-calendar';

export * from '@verbpatch/headless-calendar';

export function useCalendar(options?: CalendarOptions) {
  const [stateVersion, setStateVersion] = createSignal(0);
  const [calendar, setCalendar] = createSignal<CalendarInstance>();
  const calendarId = options?.calendarId ?? 'default-calendar';

  onCleanup(() => {
    disposeCalendar(calendarId);
  });

  const refreshCalendar = () => {
    const cal = createCalendar({
      ...options,
      onEvent: (events) => {
        setStateVersion((v) => v + 1);
        options?.onEvent?.(events);
      },
      onDateChange: (date) => {
        setStateVersion((v) => v + 1);
        options?.onDateChange?.(date);
      },
      onViewChange: (view) => {
        setStateVersion((v) => v + 1);
        options?.onViewChange?.(view);
      },
    });

    setCalendar(cal);
  };

  createEffect(() => {
    stateVersion();
    refreshCalendar();
  });

  return calendar;
}
