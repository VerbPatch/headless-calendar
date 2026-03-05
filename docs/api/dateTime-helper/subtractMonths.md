---
title: subtractMonths
description: Subtracts a specified number of months from a date.
---

# subtractMonths()

> **subtractMonths**(`date`, `months`): `Date`

Defined in: [utils/date.ts:639](https://github.com/VerbPatch/headless-calendar/blob/e1de82bfe4b3e35808592e8ff6bc3c332a79c55d/packages/headless-calendar/src/utils/date.ts#L639)

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
