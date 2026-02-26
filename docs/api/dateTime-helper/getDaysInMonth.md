---
title: getDaysInMonth
description: Gets the number of days in the month of a given date.
---

# getDaysInMonth()

> **getDaysInMonth**(`date`): `number`

Defined in: [utils/date.ts:504](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/utils/date.ts#L504)

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
