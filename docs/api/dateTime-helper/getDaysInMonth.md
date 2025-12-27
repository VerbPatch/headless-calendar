---
title: getDaysInMonth
description: Gets the number of days in the month of a given date.
---

# getDaysInMonth()

> **getDaysInMonth**(`date`): `number`

Defined in: [utils/date.ts:446](https://github.com/VerbPatch/headless-calendar/blob/c0dcd17780db0093f7c06ed44773cd2f5150604e/packages/headless-calendar/src/utils/date.ts#L446)

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
