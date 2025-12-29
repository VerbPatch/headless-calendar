---
title: isSameDay
description: Checks if two dates are the same day.
---

# isSameDay()

> **isSameDay**(`date1`, `date2`): `boolean`

Defined in: [utils/date.ts:281](https://github.com/VerbPatch/headless-calendar/blob/8833b0f17c00ba782778b695113cd46c831140c9/packages/headless-calendar/src/utils/date.ts#L281)

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
