import { useStore, useTask$, noSerialize, type NoSerialize } from '@builder.io/qwik';
import { useCalendar as createCalendar, type CalendarOptions, type CalendarInstance } from '@verbpatch/headless-calendar';
export * from '@verbpatch/headless-calendar';

export function useCalendar(options?: CalendarOptions) {
    const store = useStore({
        calendar: {} as CalendarInstance,
        stateVersion: 0
    });

    const refreshCalendar = () => {
        const cal = createCalendar({
            ...options,
            onEvent: (event) => {
                store.stateVersion++;
                options?.onEvent?.(event);
            },
            onDateChange: (date) => {
                store.stateVersion++;
                options?.onDateChange?.(date);

            },
            onViewChange: (view) => {
                store.stateVersion++;
                options?.onViewChange?.(view);
            },
        });
        store.calendar = cal;
    }

    useTask$(async ({ track }) => {
        track(() => store.stateVersion);
        refreshCalendar();
    });

    return store.calendar;
}
