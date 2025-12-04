---
title: Is Past
description: Checks if a given date is in the past.
---

# Function: isPast()

> **isPast**(`date`): `boolean`

Defined in: [utils/date.ts:603](https://github.com/VerbPatch/headless-calendar/blob/184198efa3f566732cc9638ed7e00060c7790d61/packages/headless-calendar/src/utils/date.ts#L603)

Checks if a given date is in the past.

## Parameters

### date

`Date`

The date to check.

## Returns

`boolean`

- True if the date is in the past, false otherwise.

## Example

```ts
const result = isPast(new Date('2000-01-01')); // true
```
