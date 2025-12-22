---
title: Get Days In Month
description: Gets the number of days in the month of a given date.
---

# Function: getDaysInMonth()

> **getDaysInMonth**(`date`): `number`

Defined in: [utils/date.ts:423](https://github.com/VerbPatch/headless-calendar/blob/c446e760845309c4ae51ef6664ad7048007c4b5c/packages/headless-calendar/src/utils/date.ts#L423)

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
