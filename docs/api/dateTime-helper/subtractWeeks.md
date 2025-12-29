---
title: subtractWeeks
description: Subtracts a specified number of weeks from a date.
---

# subtractWeeks()

> **subtractWeeks**(`date`, `weeks`): `Date`

Defined in: [utils/date.ts:557](https://github.com/VerbPatch/headless-calendar/blob/eaa85931d143a0b3add300d186b798ceb1550764/packages/headless-calendar/src/utils/date.ts#L557)

Subtracts a specified number of weeks from a date.

## Parameters

### date

`Date`

The original date.

### weeks

`number`

The number of weeks to subtract.

## Returns

`Date`

- The new date.

## See

[addWeeks](/calendar/docs/api/dateTime-helper/addWeeks)

## Example

```ts
const newDate = subtractWeeks(new Date('2024-01-15'), 2); // 2024-01-01
```
