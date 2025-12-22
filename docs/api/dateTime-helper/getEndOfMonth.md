---
title: Get End Of Month
description: Gets the end of the month for a given date.
---

# Function: getEndOfMonth()

> **getEndOfMonth**(`date`): `Date`

Defined in: [utils/date.ts:371](https://github.com/VerbPatch/headless-calendar/blob/c446e760845309c4ae51ef6664ad7048007c4b5c/packages/headless-calendar/src/utils/date.ts#L371)

Gets the end of the month for a given date.

## Parameters

### date

`Date`

The date.

## Returns

`Date`

- The end of the month.

## Example

```ts
const end = getEndOfMonth(new Date('2024-01-15')); // 2024-01-31
```
