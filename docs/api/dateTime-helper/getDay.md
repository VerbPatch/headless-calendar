---
title: Get Day
description: Returns a new Date object representing the start of the day (00:00:00) in the target timezone.
---

[@verbpatch/headless-calendar](/calendar/docs/api/calendar) / getDay

# Function: getDay()

> **getDay**(`date`, `fromTimeZone`, `toTimeZone`): `Date`

Defined in: [utils/date.ts:213](https://github.com/VerbPatch/headless-calendar/blob/135b06f7280928d26167e71f907075f9a8c9dcc0/packages/headless-calendar/src/utils/date.ts#L213)

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
