---
title: subtractMonths
description: Subtracts a specified number of months from a date.
---

# subtractMonths()

> **subtractMonths**(`date`, `months`): `Date`

Defined in: [utils/date.ts:627](https://github.com/VerbPatch/headless-calendar/blob/1d1fdeeff70f283ab0cc89fb67593f08bec9893b/packages/headless-calendar/src/utils/date.ts#L627)

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
