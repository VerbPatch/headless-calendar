---
title: Subtract Months
description: Subtracts a specified number of months from a date.
---

[@verbpatch/headless-calendar](/calendar/docs/api/calendar) / subtractMonths

# Function: subtractMonths()

> **subtractMonths**(`date`, `months`): `Date`

Defined in: [utils/date.ts:552](https://github.com/VerbPatch/headless-calendar/blob/135b06f7280928d26167e71f907075f9a8c9dcc0/packages/headless-calendar/src/utils/date.ts#L552)

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
