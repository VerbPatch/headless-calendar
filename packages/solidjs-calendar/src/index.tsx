import { createSignal } from "solid-js";
export * from "@verbpatch/headless-calendar";

import { useCalendar as createCalendar, CalendarOptions } from "@verbpatch/headless-calendar";

export default function useCalendar(options?: CalendarOptions) {
  const [stateChanged, setStateChanged] = createSignal(0);
  const calendar = createCalendar({
    ...options,
    onEvent: (event) => {
      setStateChanged((stateChanged) => stateChanged + 1);
      options?.onEvent?.(event);
    },
    onDateChange: (date) => {
      setStateChanged((stateChanged) => stateChanged + 1);
      options?.onDateChange?.(date);
    },
    onViewChange: (view) => {
      setStateChanged((stateChanged) => stateChanged + 1);
      options?.onViewChange?.(view);
    },
  });

  return calendar;
}
