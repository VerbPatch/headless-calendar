---
title: Get Start Of Day
description: Gets the start of the day for a given date (00:00:00).
---

[@verbpatch/headless-calendar](/calendar/docs/api/calendar) / getStartOfDay

# Function: getStartOfDay()

> **getStartOfDay**(`date`): `Date`

Defined in: [utils/date.ts:387](https://github.com/VerbPatch/headless-calendar/blob/135b06f7280928d26167e71f907075f9a8c9dcc0/packages/headless-calendar/src/utils/date.ts#L387)

Gets the start of the day for a given date (00:00:00).

## Parameters

### date

`Date`

The date.

## Returns

`Date`

- The start of the day.

## Example

```ts
const start = getStartOfDay(new Date('2024-01-15T12:30:00')); // 2024-01-15T00:00:00
```
