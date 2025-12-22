---
title: Get Start Of Month
description: Gets the start of the month for a given date.
---

[@verbpatch/headless-calendar](/calendar/docs/api/calendar) / getStartOfMonth

# Function: getStartOfMonth()

> **getStartOfMonth**(`date`): `Date`

Defined in: [utils/date.ts:355](https://github.com/VerbPatch/headless-calendar/blob/135b06f7280928d26167e71f907075f9a8c9dcc0/packages/headless-calendar/src/utils/date.ts#L355)

Gets the start of the month for a given date.

## Parameters

### date

`Date`

The date.

## Returns

`Date`

- The start of the month.

## Example

```ts
const start = getStartOfMonth(new Date('2024-01-15')); // 2024-01-01
```
