---
title: Get End Of Month
description: Gets the end of the month for a given date.
---

# Function: getEndOfMonth()

> **getEndOfMonth**(`date`): `Date`

Defined in: [utils/date.ts:371](https://github.com/VerbPatch/headless-calendar/blob/184198efa3f566732cc9638ed7e00060c7790d61/packages/headless-calendar/src/utils/date.ts#L371)

Gets the end of the month for a given date.

## Parameters

### date

`Date`

The date.

## Returns

`Date`

- The end of the month.

## Example

```ts
const end = getEndOfMonth(new Date('2024-01-15')); // 2024-01-31
```
