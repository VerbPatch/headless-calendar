---
title: importFromICS
description: Imports events from an iCalendar (.ics) string.
---

# importFromICS()

> **importFromICS**(`icsContent`): [`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)[]

Defined in: [utils/ics.ts:303](https://github.com/VerbPatch/headless-calendar/blob/f6f4da1709d871774f2838d9a919bfa2de2bb873/packages/headless-calendar/src/utils/ics.ts#L303)

Imports events from an iCalendar (.ics) string.

## Parameters

### icsContent

`string`

RFC5545 (link: https://datatracker.ietf.org/doc/html/rfc5545) standard content.

## Returns

[`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)[]

- ics content converted to calendarevent in array
