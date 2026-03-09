---
title: formatDate
description: Formats a date object into a string based on the specified format, locale, and timezone.
---

# formatDate()

> **formatDate**(`date`, `format?`, `locale?`, `timeZone?`): `string`

Defined in: [utils/date.ts:117](https://github.com/VerbPatch/headless-calendar/blob/9f3abcdff5a66a46b79bf3610f623b5a2e6d2df7/packages/headless-calendar/src/utils/date.ts#L117)

Formats a date object into a string based on the specified format, locale, and timezone.

## Parameters

### date

`Date`

The date object to format.

### format?

`string` = `'yyyy-MM-dd'`

The format string (e.g., "yyyy-MM-dd", "MM/dd/yyyy").

### locale?

`string`

The locale to use for formatting.

### timeZone?

`string`

The timezone to use for formatting.

## Returns

`string`

- The formatted date string.

## See

[formatDateTime](/calendar/docs/api/dateTime-helper/formatDateTime)

## Example

```ts
const formattedDate = formatDate(new Date('2024-01-15'), 'MM/dd/yyyy'); // "01/15/2024"
```
