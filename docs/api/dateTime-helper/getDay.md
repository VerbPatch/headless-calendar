---
title: Get Day
description: Returns a new Date object representing the start of the day (00:00:00) in the target timezone.
---

# Function: getDay()

> **getDay**(`date`, `fromTimeZone`, `toTimeZone`): `Date`

Defined in: [utils/date.ts:213](https://github.com/VerbPatch/headless-calendar/blob/184198efa3f566732cc9638ed7e00060c7790d61/packages/headless-calendar/src/utils/date.ts#L213)

Returns a new Date object representing the start of the day (00:00:00) in the target timezone.

## Parameters

### date

`Date`

The original date.

### fromTimeZone

`string`

The timezone of the original date.

### toTimeZone

`string`

The target timezone.

## Returns

`Date`

- A new Date object set to the start of the day in the target timezone.

## Example

```ts
const day = getDay(new Date(), 'America/New_York', 'UTC');
```
