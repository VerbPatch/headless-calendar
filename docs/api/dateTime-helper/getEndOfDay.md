---
title: getEndOfDay
description: Gets the end of the day for a given date (23:59:59:999).
---

# getEndOfDay()

> **getEndOfDay**(`date`): `Date`

Defined in: [utils/date.ts:480](https://github.com/VerbPatch/headless-calendar/blob/61268b1f62ea267e33767c46cf07b70c5e3c1eeb/packages/headless-calendar/src/utils/date.ts#L480)

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
