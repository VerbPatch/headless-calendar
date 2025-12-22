---
title: Subtract Weeks
description: Subtracts a specified number of weeks from a date.
---

[@verbpatch/headless-calendar](/calendar/docs/api/calendar) / subtractWeeks

# Function: subtractWeeks()

> **subtractWeeks**(`date`, `weeks`): `Date`

Defined in: [utils/date.ts:534](https://github.com/VerbPatch/headless-calendar/blob/135b06f7280928d26167e71f907075f9a8c9dcc0/packages/headless-calendar/src/utils/date.ts#L534)

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
