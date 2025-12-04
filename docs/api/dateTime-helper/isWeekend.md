---
title: Is Weekend
description: Checks if a given date falls on a weekend (Saturday or Sunday).
---

# Function: isWeekend()

> **isWeekend**(`date`): `boolean`

Defined in: [utils/date.ts:635](https://github.com/VerbPatch/headless-calendar/blob/184198efa3f566732cc9638ed7e00060c7790d61/packages/headless-calendar/src/utils/date.ts#L635)

Checks if a given date falls on a weekend (Saturday or Sunday).

## Parameters

### date

`Date`

The date to check.

## Returns

`boolean`

- True if the date is a weekend, false otherwise.

## Example

```ts
const result = isWeekend(new Date('2024-01-20')); // true (Saturday)
```
