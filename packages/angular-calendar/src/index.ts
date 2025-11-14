import { signal, type WritableSignal } from '@angular/core';
import {
    useCalendar as createCalendar,
    type CalendarOptions,
    type CalendarInstance,
    type CalendarEvent,
    type ViewType
} from '@verbpatch/headless-calendar';

export * from '@verbpatch/headless-calendar';

export type CalendarComposable = {
    calendar: WritableSignal<CalendarInstance>;
} & CalendarInstance;


export function useCalendar(options?: CalendarOptions): CalendarComposable {

    const initialInstance = createCalendar(options);
    const calendarSignal = signal<CalendarInstance>(initialInstance);

    const updateCalendarInstance = () => {
        // console.log("Called here 1");
        const newInstance = createCalendar({
            ...options,

            onEvent: (event: CalendarEvent[]) => {
                options?.onEvent?.(event);
                updateCalendarInstance();
            },
            onDateChange: (date: Date) => {
                options?.onDateChange?.(date);
                updateCalendarInstance();
            },
            onViewChange: (view: ViewType) => {
                options?.onViewChange?.(view);
                updateCalendarInstance();
            },
        });

        calendarSignal.set(newInstance);
    };

    updateCalendarInstance();

    const calendarWrapper: any = {
        calendar: calendarSignal
    };


    return calendarWrapper as CalendarComposable;
}