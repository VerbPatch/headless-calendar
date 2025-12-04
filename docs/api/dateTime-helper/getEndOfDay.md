---
title: Get End Of Day
description: Gets the end of the day for a given date (23:59:59:999).
---

# Function: getEndOfDay()

> **getEndOfDay**(`date`): `Date`

Defined in: [utils/date.ts:405](https://github.com/VerbPatch/headless-calendar/blob/184198efa3f566732cc9638ed7e00060c7790d61/packages/headless-calendar/src/utils/date.ts#L405)

Gets the end of the day for a given date (23:59:59:999).

## Parameters

### date

`Date`

The date.

## Returns

`Date`

- The end of the day.

## Example

```ts
const end = getEndOfDay(new Date('2024-01-15T12:30:00')); // 2024-01-15T23:59:59.999
```
