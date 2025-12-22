---
title: Parse Date
description: Parses a date string into a Date object.
---

[@verbpatch/headless-calendar](/calendar/docs/api/calendar) / parseDate

# Function: parseDate()

> **parseDate**(`dateString`): `Date`

Defined in: [utils/date.ts:230](https://github.com/VerbPatch/headless-calendar/blob/135b06f7280928d26167e71f907075f9a8c9dcc0/packages/headless-calendar/src/utils/date.ts#L230)

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
