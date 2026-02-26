---
title: isSameDay
description: Checks if two dates are the same day.
---

# isSameDay()

> **isSameDay**(`date1`, `date2`): `boolean`

Defined in: [utils/date.ts:286](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/utils/date.ts#L286)

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
