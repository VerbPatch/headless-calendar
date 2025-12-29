---
title: subtractMonths
description: Subtracts a specified number of months from a date.
---

# subtractMonths()

> **subtractMonths**(`date`, `months`): `Date`

Defined in: [utils/date.ts:575](https://github.com/VerbPatch/headless-calendar/blob/eaa85931d143a0b3add300d186b798ceb1550764/packages/headless-calendar/src/utils/date.ts#L575)

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
