---
title: addDays
description: Adds a specified number of days to a date.
---

# addDays()

> **addDays**(`date`, `days`): `Date`

Defined in: [utils/date.ts:515](https://github.com/VerbPatch/headless-calendar/blob/1d1fdeeff70f283ab0cc89fb67593f08bec9893b/packages/headless-calendar/src/utils/date.ts#L515)

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
