---
title: Get Start Of Month
description: Gets the start of the month for a given date.
---

# Function: getStartOfMonth()

> **getStartOfMonth**(`date`): `Date`

Defined in: [utils/date.ts:355](https://github.com/VerbPatch/headless-calendar/blob/184198efa3f566732cc9638ed7e00060c7790d61/packages/headless-calendar/src/utils/date.ts#L355)

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
