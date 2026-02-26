---
title: getStartOfMonth
description: Gets the start of the month for a given date.
---

# getStartOfMonth()

> **getStartOfMonth**(`date`): `Date`

Defined in: [utils/date.ts:436](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/utils/date.ts#L436)

Gets the start of the month for a given date.

## Parameters

### date

`Date`

The date.

## Returns

`Date`

- The start of the month.

## Example

```ts
const start = getStartOfMonth(new Date('2024-01-15')); // 2024-01-01
```
