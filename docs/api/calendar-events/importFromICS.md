---
title: importFromICS
description: Imports events from an iCalendar (.ics) string.
---

# importFromICS()

> **importFromICS**(`icsContent`): [`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)[]

Defined in: [utils/ics.ts:303](https://github.com/VerbPatch/headless-calendar/blob/e6cee01a505551c119d043f0b196ea7f57198987/packages/headless-calendar/src/utils/ics.ts#L303)

Imports events from an iCalendar (.ics) string.

## Parameters

### icsContent

`string`

RFC5545 (link: https://datatracker.ietf.org/doc/html/rfc5545) standard content.

## Returns

[`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)[]

- ics content converted to calendarevent in array
