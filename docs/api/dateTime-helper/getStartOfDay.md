---
title: getStartOfDay
description: Gets the start of the day for a given date (00:00:00).
---

# getStartOfDay()

> **getStartOfDay**(`date`): `Date`

Defined in: [utils/date.ts:462](https://github.com/VerbPatch/headless-calendar/blob/1d1fdeeff70f283ab0cc89fb67593f08bec9893b/packages/headless-calendar/src/utils/date.ts#L462)

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
