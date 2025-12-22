---
title: Add Months
description: Adds a specified number of months to a date.
---

[@verbpatch/headless-calendar](/calendar/docs/api/calendar) / addMonths

# Function: addMonths()

> **addMonths**(`date`, `months`): `Date`

Defined in: [utils/date.ts:477](https://github.com/VerbPatch/headless-calendar/blob/135b06f7280928d26167e71f907075f9a8c9dcc0/packages/headless-calendar/src/utils/date.ts#L477)

Adds a specified number of months to a date.

## Parameters

### date

`Date`

The original date.

### months

`number`

The number of months to add (can be negative).

## Returns

`Date`

- The new date.

## Example

```ts
const newDate = addMonths(new Date('2024-01-15'), 3); // 2024-04-15
```
