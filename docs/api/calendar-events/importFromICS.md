---
title: importFromICS
description: Imports events from an iCalendar (.ics) string.
---

# importFromICS()

> **importFromICS**(`icsContent`): [`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)[]

Defined in: [utils/ics.ts:303](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/utils/ics.ts#L303)

Imports events from an iCalendar (.ics) string.

## Parameters

### icsContent

`string`

RFC5545 (link: https://datatracker.ietf.org/doc/html/rfc5545) standard content.

## Returns

[`CalendarEvent`](/calendar/docs/api/calendar-events/CalendarEvent)[]

- ics content converted to calendarevent in array
