import { useCalendar as createCalendar, CalendarOptions } from "@verbpatch/headless-calendar";
export * from "@verbpatch/headless-calendar";

export default function useCalendar(component: any, options?: CalendarOptions) {
  const calendar = createCalendar({
    ...options,
    onEvent: (event) => {
      component.forceUpdate();
      options?.onEvent?.(event);
    },
    onDateChange: (date) => {
      component.forceUpdate();
      options?.onDateChange?.(date);
    },
    onViewChange: (view) => {
      component.forceUpdate();
      options?.onViewChange?.(view);
    },
  });

  return calendar;
}