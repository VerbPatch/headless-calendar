---
title: getDay
description: Returns a new Date object representing the start of the day (00:00:00) in the target timezone.
---

# getDay()

> **getDay**(`date`, `fromTimeZone`, `toTimeZone`): `Date`

Defined in: [utils/date.ts:236](https://github.com/VerbPatch/headless-calendar/blob/fa249db528ce00b6c43397b05c9b5c74159b52db/packages/headless-calendar/src/utils/date.ts#L236)

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
