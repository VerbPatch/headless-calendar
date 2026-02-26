---
title: formatDate
description: Formats a date object into a string based on the specified format, locale, and timezone.
---

# formatDate()

> **formatDate**(`date`, `options?`): `string`

Defined in: [utils/date.ts:118](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/utils/date.ts#L118)

Formats a date object into a string based on the specified format, locale, and timezone.

## Parameters

### date

`Date`

The date object to format.

### options?

Formatting options.

#### format?

`string`

The format string (e.g., "yyyy-MM-dd", "MM/dd/yyyy").

#### locale?

`string`

The locale to use for formatting.

#### timeZone?

`string`

The timezone to use for formatting.

## Returns

`string`

- The formatted date string.

## See

[formatDateTime](/calendar/docs/api/dateTime-helper/formatDateTime)

## Example

```ts
const formattedDate = formatDate(new Date('2024-01-15'), { format: 'MM/dd/yyyy' }); // "01/15/2024"
```
