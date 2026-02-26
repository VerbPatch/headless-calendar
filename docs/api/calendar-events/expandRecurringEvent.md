---
title: expandRecurringEvent
description: Expands a recurring event into multiple instances within a specific date range.
---

# expandRecurringEvent()

> **expandRecurringEvent**(`event`, `rangeStart`, `rangeEnd`, `startOfWeek`): [`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)[]

Defined in: [utils/recurrence.ts:255](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/utils/recurrence.ts#L255)

Expands a recurring event into multiple instances within a specific date range.

## Parameters

### event

[`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)

The recurring event to expand.

### rangeStart

`Date`

The start of the range to find instances for.

### rangeEnd

`Date`

The end of the range to find instances for.

### startOfWeek

`number`

The day to start the week on.

## Returns

[`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)[]

An array of CalendarEvent instances.
