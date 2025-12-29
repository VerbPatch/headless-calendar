---
title: formatTimeSlotLabel
description: Formats a given hour and minute into a time slot label.
---

# formatTimeSlotLabel()

> **formatTimeSlotLabel**(`hour`, `minute`, `use24Hour?`): `string`

Defined in: [utils/calendar.ts:113](https://github.com/VerbPatch/headless-calendar/blob/8833b0f17c00ba782778b695113cd46c831140c9/packages/headless-calendar/src/utils/calendar.ts#L113)

Formats a given hour and minute into a time slot label.

## Parameters

### hour

`number`

The hour (0-23).

### minute

`number`

The minute (0-59).

### use24Hour?

`boolean` = `false`

Whether to format in 24-hour format.

## Returns

`string`

- The formatted time string (e.g., "09:00 AM", "14:30").

## Example

```ts
const label12 = formatTimeSlotLabel(14, 30); // "2:30 PM"
const label24 = formatTimeSlotLabel(14, 30, true); // "14:30"
```
