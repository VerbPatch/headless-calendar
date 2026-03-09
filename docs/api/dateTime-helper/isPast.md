---
title: isPast
description: Checks if a given date is in the past.
---

# isPast()

> **isPast**(`date`): `boolean`

Defined in: [utils/date.ts:690](https://github.com/VerbPatch/headless-calendar/blob/9f3abcdff5a66a46b79bf3610f623b5a2e6d2df7/packages/headless-calendar/src/utils/date.ts#L690)

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
