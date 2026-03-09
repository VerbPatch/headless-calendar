---
title: getDaysInMonth
description: Gets the number of days in the month of a given date.
---

# getDaysInMonth()

> **getDaysInMonth**(`date`): `number`

Defined in: [utils/date.ts:498](https://github.com/VerbPatch/headless-calendar/blob/9f3abcdff5a66a46b79bf3610f623b5a2e6d2df7/packages/headless-calendar/src/utils/date.ts#L498)

Gets the number of days in the month of a given date.

## Parameters

### date

`Date`

The date.

## Returns

`number`

- The number of days in the month.

## Example

```ts
const days = getDaysInMonth(new Date('2024-01-15')); // 31
```
