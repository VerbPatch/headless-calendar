---
title: isWeekend
description: Checks if a given date falls on a weekend (Saturday or Sunday).
---

# isWeekend()

> **isWeekend**(`date`): `boolean`

Defined in: [utils/date.ts:658](https://github.com/VerbPatch/headless-calendar/blob/eaa85931d143a0b3add300d186b798ceb1550764/packages/headless-calendar/src/utils/date.ts#L658)

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
