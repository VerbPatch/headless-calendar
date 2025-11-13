import { ref, watch } from 'vue';
export * from '@verbpatch/headless-calendar';

import {
  useCalendar as createCalendar,
  CalendarOptions,
  CalendarInstance,
} from '@verbpatch/headless-calendar';


export function useCalendar(options?: CalendarOptions) {
  const calendar = ref<CalendarInstance>();
  const stateChanged = ref(0);

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
