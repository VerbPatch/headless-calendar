# Function: useCalendar()

> **useCalendar**(`options`): [`CalendarInstance`](https://verbpatch.com/calendar/docs/api/calendar/CalendarInstance)

Defined in: [hooks/useCalendar.ts:68](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/hooks/useCalendar.ts#L68)

The main hook for initializing and managing a calendar instance.

## Parameters

### options

[`CalendarOptions`](https://verbpatch.com/calendar/docs/api/calendar/CalendarOptions) = `{}`

Configuration options for the calendar.

## Returns

[`CalendarInstance`](https://verbpatch.com/calendar/docs/api/calendar/CalendarInstance)

- An object containing the calendar's state, navigation functions, event management functions, and other utilities.

## See

 - [CalendarOptions](https://verbpatch.com/calendar/docs/api/calendar/CalendarOptions)
 - [CalendarInstance](https://verbpatch.com/calendar/docs/api/calendar/CalendarInstance)

## Example

```typescript
import { useCalendar } from '@verbpatch/headless-calendar';

const MyCalendar = () => {
  const calendar = useCalendar({
    defaultView: 'week',
    // other options...
  });

  return (
    <div>
      <h1>{calendar.utils.formatLocalizedMonth(calendar.currentDate)}</h1>
    </div>
  );
};
```
