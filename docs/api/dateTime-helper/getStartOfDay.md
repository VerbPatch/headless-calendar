---
title: getStartOfDay
description: Gets the start of the day for a given date (00:00:00).
---

# getStartOfDay()

> **getStartOfDay**(`date`): `Date`

Defined in: [utils/date.ts:468](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/utils/date.ts#L468)

Gets the start of the day for a given date (00:00:00).

## Parameters

### date

`Date`

The date.

## Returns

`Date`

- The start of the day.

## Example

```ts
const start = getStartOfDay(new Date('2024-01-15T12:30:00')); // 2024-01-15T00:00:00
```
