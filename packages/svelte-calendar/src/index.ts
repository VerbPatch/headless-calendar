import { type Writable, writable } from 'svelte/store';

import {
    useCalendar as createCalendar,
    CalendarOptions,
    CalendarInstance,
} from '@verbpatch/headless-calendar';

export * from '@verbpatch/headless-calendar';

export function useCalendar(options?: CalendarOptions): Writable<CalendarInstance> {
    const calendarStore = writable<CalendarInstance>(null!);

    const refreshCalendar = () => {
        const calendar = createCalendar({
            ...options,
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