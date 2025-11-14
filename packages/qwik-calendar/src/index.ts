import { useStore } from '@builder.io/qwik';
import { useCalendar as createCalendar, CalendarOptions } from '@verbpatch/headless-calendar';
export * from '@verbpatch/headless-calendar';

export function useCalendar(options: CalendarOptions) {
    const state = useStore({ changed: 0 });
    const calendar = createCalendar({
        ...options,
        onEvent: (event) => {
            state.changed++;
            options?.onEvent?.(event);
        },
        onDateChange: (date) => {
            state.changed++;
            options?.onDateChange?.(date);
        },
        onViewChange: (view) => {
            state.changed++;
            options?.onViewChange?.(view);
        },
    });

    return calendar;
}
