---
title: dateTimeInBetween
description: Checks if a given date and time falls within a specified range (inclusive).
---

# dateTimeInBetween()

> **dateTimeInBetween**(`between`, `startDateTime`, `endDateTime`): `boolean`

Defined in: [utils/date.ts:677](https://github.com/VerbPatch/headless-calendar/blob/8833b0f17c00ba782778b695113cd46c831140c9/packages/headless-calendar/src/utils/date.ts#L677)

Checks if a given date and time falls within a specified range (inclusive).

## Parameters

### between

`Date`

The date to check.

### startDateTime

`Date`

The start of the range.

### endDateTime

`Date`

The end of the range.

## Returns

`boolean`

- True if the date is within the range, false otherwise.

## Example

```ts
const result = dateTimeInBetween(new Date('2024-01-15T12:00:00'), new Date('2024-01-15T10:00:00'), new Date('2024-01-15T14:00:00')); // true
```
