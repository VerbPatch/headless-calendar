---
title: Get Days Between
description: Calculates the number of full days between two dates.
---

# Function: getDaysBetween()

> **getDaysBetween**(`startDate`, `endDate`): `number`

Defined in: [utils/date.ts:569](https://github.com/VerbPatch/headless-calendar/blob/c446e760845309c4ae51ef6664ad7048007c4b5c/packages/headless-calendar/src/utils/date.ts#L569)

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
