---
title: Add Days
description: Adds a specified number of days to a date.
---

# Function: addDays()

> **addDays**(`date`, `days`): `Date`

Defined in: [utils/date.ts:440](https://github.com/VerbPatch/headless-calendar/blob/c446e760845309c4ae51ef6664ad7048007c4b5c/packages/headless-calendar/src/utils/date.ts#L440)

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
