---
title: Add Days
description: Adds a specified number of days to a date.
---

[@verbpatch/headless-calendar](/calendar/docs/api/calendar) / addDays

# Function: addDays()

> **addDays**(`date`, `days`): `Date`

Defined in: [utils/date.ts:440](https://github.com/VerbPatch/headless-calendar/blob/135b06f7280928d26167e71f907075f9a8c9dcc0/packages/headless-calendar/src/utils/date.ts#L440)

Adds a specified number of days to a date.

## Parameters

### date

`Date`

The original date.

### days

`number`

The number of days to add (can be negative).

## Returns

`Date`

- The new date.

## Example

```ts
const newDate = addDays(new Date('2024-01-15'), 5); // 2024-01-20
```
