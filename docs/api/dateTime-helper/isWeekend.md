---
title: isWeekend
description: Checks if a given date falls on a weekend (Saturday or Sunday).
---

# isWeekend()

> **isWeekend**(`date`): `boolean`

Defined in: [utils/date.ts:722](https://github.com/VerbPatch/headless-calendar/blob/f6f4da1709d871774f2838d9a919bfa2de2bb873/packages/headless-calendar/src/utils/date.ts#L722)

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
