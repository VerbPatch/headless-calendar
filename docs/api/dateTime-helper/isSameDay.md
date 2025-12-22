---
title: Is Same Day
description: Checks if two dates are the same day.
---

# isSameDay()

> **isSameDay**(`date1`, `date2`): `boolean`

Defined in: [utils/date.ts:258](https://github.com/VerbPatch/headless-calendar/blob/632ab242d58cefebdf5020dc2ce3b33c0ec9286d/packages/headless-calendar/src/utils/date.ts#L258)

Checks if two dates are the same day.

## Parameters

### date1

`Date`

The first date.

### date2

`Date`

The second date.

## Returns

`boolean`

- True if the dates are the same day, false otherwise.

## Example

```ts
const result = isSameDay(new Date('2024-01-15'), new Date('2024-01-15')); // true
```
