---
title: Get Days In Month
description: Gets the number of days in the month of a given date.
---

[@verbpatch/headless-calendar](/calendar/docs/api/calendar) / getDaysInMonth

# Function: getDaysInMonth()

> **getDaysInMonth**(`date`): `number`

Defined in: [utils/date.ts:423](https://github.com/VerbPatch/headless-calendar/blob/135b06f7280928d26167e71f907075f9a8c9dcc0/packages/headless-calendar/src/utils/date.ts#L423)

Gets the number of days in the month of a given date.

## Parameters

### date

`Date`

The date.

## Returns

`number`

- The number of days in the month.

## Example

```ts
const days = getDaysInMonth(new Date('2024-01-15')); // 31
```
