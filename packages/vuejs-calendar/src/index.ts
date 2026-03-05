import { ref, watch, onUnmounted } from 'vue';
export * from '@verbpatch/headless-calendar';

import {
  useCalendar as createCalendar,
  CalendarOptions,
  CalendarInstance,
  disposeCalendar,
} from '@verbpatch/headless-calendar';

export function useCalendar(options?: CalendarOptions) {
  const calendar = ref<CalendarInstance>();
  const stateChanged = ref(0);
  const calendarId = options?.calendarId ?? 'default-calendar';

  onUnmounted(() => {
    disposeCalendar(calendarId);
  });

  const refreshCalendar = () => {
    const newCalendar = createCalendar({
      ...options,
      onEvent: (event) => {
        stateChanged.value++;
        options?.onEvent?.(event);
      },
      onDateChange: (date) => {
        stateChanged.value++;
        options?.onDateChange?.(date);
      },
      onViewChange: (view) => {
        stateChanged.value++;
        options?.onViewChange?.(view);
      },
    });
    calendar.value = newCalendar;
    return newCalendar;
  };

  refreshCalendar();

  watch(stateChanged, () => {
    refreshCalendar();
  });

  return calendar;
}
