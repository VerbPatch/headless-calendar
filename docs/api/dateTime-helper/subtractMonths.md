---
title: Subtract Months
description: Subtracts a specified number of months from a date.
---

# Function: subtractMonths()

> **subtractMonths**(`date`, `months`): `Date`

Defined in: [utils/date.ts:552](https://github.com/VerbPatch/headless-calendar/blob/c446e760845309c4ae51ef6664ad7048007c4b5c/packages/headless-calendar/src/utils/date.ts#L552)

Subtracts a specified number of months from a date.

## Parameters

### date

`Date`

The original date.

### months

`number`

The number of months to subtract.

## Returns

`Date`

- The new date.

## See

[addMonths](/calendar/docs/api/dateTime-helper/addMonths)

## Example

```ts
const newDate = subtractMonths(new Date('2024-01-15'), 3); // 2023-10-15
```
