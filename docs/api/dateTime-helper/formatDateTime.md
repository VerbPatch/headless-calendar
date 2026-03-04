---
title: formatDateTime
description: Formats a date and time object into a string based on the specified format, locale, and timezone.
---

# formatDateTime()

> **formatDateTime**(`date`, `format?`, `locale?`, `timeZone?`): `string`

Defined in: [utils/date.ts:141](https://github.com/VerbPatch/headless-calendar/blob/e6cee01a505551c119d043f0b196ea7f57198987/packages/headless-calendar/src/utils/date.ts#L141)

Formats a date and time object into a string based on the specified format, locale, and timezone.

## Parameters

### date

`Date`

The date object to format.

### format?

`string` = `'yyyy-MM-ddTHH:mm:ss'`

The format string (e.g., "yyyy-MM-dd HH:mm:ss").

### locale?

`string`

The locale to use for formatting.

### timeZone?

`string`

The timezone to use for formatting.

## Returns

`string`

- The formatted date and time string.

## Example

```ts
formatDateTime(new Date(), "yyyy-MM-dd HH:mm:ss", "en-US", "America/New_York");
```
