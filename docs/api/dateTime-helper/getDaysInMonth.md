---
title: getDaysInMonth
description: Gets the number of days in the month of a given date.
---

# getDaysInMonth()

> **getDaysInMonth**(`date`): `number`

Defined in: [utils/date.ts:498](https://github.com/VerbPatch/headless-calendar/blob/61268b1f62ea267e33767c46cf07b70c5e3c1eeb/packages/headless-calendar/src/utils/date.ts#L498)

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
