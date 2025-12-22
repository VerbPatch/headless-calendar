---
title: Is Weekend
description: Checks if a given date falls on a weekend (Saturday or Sunday).
---

# Function: isWeekend()

> **isWeekend**(`date`): `boolean`

Defined in: [utils/date.ts:635](https://github.com/VerbPatch/headless-calendar/blob/c446e760845309c4ae51ef6664ad7048007c4b5c/packages/headless-calendar/src/utils/date.ts#L635)

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
