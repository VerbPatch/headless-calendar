---
title: useCalendar
description: The main hook for initializing and managing a calendar instance.
---

# useCalendar()

> **useCalendar**(`options`): [`CalendarInstance`](/calendar/docs/api/calendar/CalendarInstance)

Defined in: [hooks/useCalendar.ts:79](https://github.com/VerbPatch/headless-calendar/blob/e1de82bfe4b3e35808592e8ff6bc3c332a79c55d/packages/headless-calendar/src/hooks/useCalendar.ts#L79)

The main hook for initializing and managing a calendar instance.

## Parameters

### options

[`CalendarOptions`](/calendar/docs/api/calendar/CalendarOptions) = `{}`

Configuration options for the calendar.

## Returns

[`CalendarInstance`](/calendar/docs/api/calendar/CalendarInstance)

- An object containing the calendar's state, navigation functions, event management functions, and other utilities.

## See

 - [CalendarOptions](/calendar/docs/api/calendar/CalendarOptions)
 - [CalendarInstance](/calendar/docs/api/calendar/CalendarInstance)

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
