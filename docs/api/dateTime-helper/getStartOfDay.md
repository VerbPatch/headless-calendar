---
title: Get Start Of Day
description: Gets the start of the day for a given date (00:00:00).
---

# Function: getStartOfDay()

> **getStartOfDay**(`date`): `Date`

Defined in: [utils/date.ts:387](https://github.com/VerbPatch/headless-calendar/blob/c446e760845309c4ae51ef6664ad7048007c4b5c/packages/headless-calendar/src/utils/date.ts#L387)

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
