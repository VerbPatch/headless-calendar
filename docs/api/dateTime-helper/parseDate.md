---
title: Parse Date
description: Parses a date string into a Date object.
---

# Function: parseDate()

> **parseDate**(`dateString`): `Date`

Defined in: [utils/date.ts:230](https://github.com/VerbPatch/headless-calendar/blob/184198efa3f566732cc9638ed7e00060c7790d61/packages/headless-calendar/src/utils/date.ts#L230)

Parses a date string into a Date object.

## Parameters

### dateString

`string`

The date string to parse.

## Returns

`Date`

- The parsed Date object.

## Example

```ts
const date = parseDate('2024-01-15T12:00:00.000Z');
```
