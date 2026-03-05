---
title: getStartOfDay
description: Gets the start of the day for a given date (00:00:00).
---

# getStartOfDay()

> **getStartOfDay**(`date`): `Date`

Defined in: [utils/date.ts:462](https://github.com/VerbPatch/headless-calendar/blob/f6f4da1709d871774f2838d9a919bfa2de2bb873/packages/headless-calendar/src/utils/date.ts#L462)

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
