---
title: Add Weeks
description: Adds a specified number of weeks to a date.
---

[@verbpatch/headless-calendar](/calendar/docs/api/calendar) / addWeeks

# Function: addWeeks()

> **addWeeks**(`date`, `weeks`): `Date`

Defined in: [utils/date.ts:460](https://github.com/VerbPatch/headless-calendar/blob/135b06f7280928d26167e71f907075f9a8c9dcc0/packages/headless-calendar/src/utils/date.ts#L460)

Adds a specified number of weeks to a date.

## Parameters

### date

`Date`

The original date.

### weeks

`number`

The number of weeks to add (can be negative).

## Returns

`Date`

- The new date.

## See

[addDays](/calendar/docs/api/dateTime-helper/addDays)

## Example

```ts
const newDate = addWeeks(new Date('2024-01-15'), 2); // 2024-01-29
```
