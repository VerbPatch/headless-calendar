---
title: Get Days Between
description: Calculates the number of full days between two dates.
---

# getDaysBetween()

> **getDaysBetween**(`startDate`, `endDate`): `number`

Defined in: [utils/date.ts:569](https://github.com/VerbPatch/headless-calendar/blob/632ab242d58cefebdf5020dc2ce3b33c0ec9286d/packages/headless-calendar/src/utils/date.ts#L569)

Calculates the number of full days between two dates.

## Parameters

### startDate

`Date`

The start date.

### endDate

`Date`

The end date.

## Returns

`number`

- The number of days between the two dates.

## Example

```ts
const days = getDaysBetween(new Date('2024-01-15'), new Date('2024-01-20')); // 5
```
