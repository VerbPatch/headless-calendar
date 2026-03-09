import { useState, useEffect, useMemo } from 'react';
export * from '@verbpatch/headless-calendar';

import {
  useCalendar as createCalendar,
  CalendarOptions,
  disposeCalendar,
  generateId,
} from '@verbpatch/headless-calendar';

export function useCalendar(options?: CalendarOptions) {
  const [, setStateChanged] = useState(0);
  const calendarId = useMemo(() => options?.calendarId ?? `react-cal-${generateId()}`, []);

  useEffect(() => {
    return () => {
      disposeCalendar(calendarId);
    };
  }, [calendarId]);

  const calendar = createCalendar({
    ...options,
    calendarId,
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
