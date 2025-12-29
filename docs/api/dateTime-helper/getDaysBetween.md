---
title: getDaysBetween
description: Calculates the number of full days between two dates.
---

# getDaysBetween()

> **getDaysBetween**(`startDate`, `endDate`): `number`

Defined in: [utils/date.ts:592](https://github.com/VerbPatch/headless-calendar/blob/8833b0f17c00ba782778b695113cd46c831140c9/packages/headless-calendar/src/utils/date.ts#L592)

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
