---
title: getEndOfDay
description: Gets the end of the day for a given date (23:59:59:999).
---

# getEndOfDay()

> **getEndOfDay**(`date`): `Date`

Defined in: [utils/date.ts:428](https://github.com/VerbPatch/headless-calendar/blob/8833b0f17c00ba782778b695113cd46c831140c9/packages/headless-calendar/src/utils/date.ts#L428)

Gets the end of the day for a given date (23:59:59:999).

## Parameters

### date

`Date`

The date.

## Returns

`Date`

- The end of the day.

## Example

```ts
const end = getEndOfDay(new Date('2024-01-15T12:30:00')); // 2024-01-15T23:59:59.999
```
