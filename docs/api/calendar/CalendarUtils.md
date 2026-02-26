---
title: CalendarUtils
description: A collection of utility functions for date manipulation and formatting, bound to the calendar's locale and timezone.
---

# CalendarUtils

Defined in: [types/calendar.ts:145](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/calendar.ts#L145)

## Properties

### addDays()

> **addDays**: (`date`, `days`) => `Date`

Defined in: [types/calendar.ts:201](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/calendar.ts#L201)

**`Function`**

Adds a specified number of days to a date.

#### Parameters

##### date

`Date`

The original date.

##### days

`number`

The number of days to add (can be negative).

#### Returns

`Date`

- The new date.

***

### addMonths()

> **addMonths**: (`date`, `months`) => `Date`

Defined in: [types/calendar.ts:217](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/calendar.ts#L217)

**`Function`**

Adds a specified number of months to a date.

#### Parameters

##### date

`Date`

The original date.

##### months

`number`

The number of months to add (can be negative).

#### Returns

`Date`

- The new date.

***

### addWeeks()

> **addWeeks**: (`date`, `weeks`) => `Date`

Defined in: [types/calendar.ts:209](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/calendar.ts#L209)

**`Function`**

Adds a specified number of weeks to a date.

#### Parameters

##### date

`Date`

The original date.

##### weeks

`number`

The number of weeks to add (can be negative).

#### Returns

`Date`

- The new date.

***

### convertToTimeZone()

> **convertToTimeZone**: (`date`, `fromTimeZone`, `toTimeZone`) => `Date`

Defined in: [types/calendar.ts:287](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/calendar.ts#L287)

**`Function`**

Converts a date from one timezone to another.

#### Parameters

##### date

`Date`

The date to convert.

##### fromTimeZone

`string`

The original timezone of the date.

##### toTimeZone

`string`

The target timezone.

#### Returns

`Date`

- The converted date object.

***

### dateTimeInBetween()

> **dateTimeInBetween**: (`between`, `startDateTime`, `endDateTime`) => `boolean`

Defined in: [types/calendar.ts:256](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/calendar.ts#L256)

**`Function`**

Checks if a given date and time falls within a specified range.

#### Parameters

##### between

`Date`

The date to check.

##### startDateTime

`Date`

The start of the range.

##### endDateTime

`Date`

The end of the range.

#### Returns

`boolean`

- True if the date is within the range, false otherwise.

***

### daysofWeek()

> **daysofWeek**: (`format?`, `locale?`) => `string`[]

Defined in: [types/calendar.ts:263](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/calendar.ts#L263)

**`Function`**

Returns an array of localized day names for the week, starting from the specified `startOfWeek`.

#### Parameters

##### format?

The format of the weekday names ('short' for 'Mon', 'long' for 'Monday').

`"long"` | `"short"` | `"narrow"`

##### locale?

`string`

#### Returns

`string`[]

- An array of localized weekday names.

***

### formatDate()

> **formatDate**: (`date`, `format?`) => `string`

Defined in: [types/calendar.ts:153](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/calendar.ts#L153)

**`Function`**

Formats a date object into a string based on the specified format, locale, and timezone.

#### Parameters

##### date

`Date`

The date object to format.

##### format?

`string`

The format string (e.g., "yyyy-MM-dd", "MM/dd/yyyy").

#### Returns

`string`

- The formatted date string.

***

### formatDateInTimeZone()

> **formatDateInTimeZone**: (`date`, `locale?`, `timeZone?`, `options?`) => `string`

Defined in: [types/calendar.ts:273](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/calendar.ts#L273)

**`Function`**

Formats a date into a string according to the specified locale and timezone.

#### Parameters

##### date

`Date`

The date to format.

##### locale?

`string`

The locale to use for formatting.

##### timeZone?

`string`

The timezone to use for formatting.

##### options?

`DateTimeFormatOptions`

Additional formatting options.

#### Returns

`string`

- The formatted date string.

***

### formatDateTime()

> **formatDateTime**: (`date`, `format?`) => `string`

Defined in: [types/calendar.ts:161](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/calendar.ts#L161)

**`Function`**

Formats a date and time object into a string based on the specified format, locale, and timezone.

#### Parameters

##### date

`Date`

The date object to format.

##### format?

`string`

The format string (e.g., "yyyy-MM-dd HH:mm:ss").

#### Returns

`string`

- The formatted date and time string.

***

### formatLocalizedDate()

> **formatLocalizedDate**: (`date`, `locale?`, `timeZone?`, `options?`) => `string`

Defined in: [types/calendar.ts:297](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/calendar.ts#L297)

**`Function`**

Formats a date into a localized date string.

#### Parameters

##### date

`Date`

The date to format.

##### locale?

`string`

The locale to use for formatting.

##### timeZone?

`string`

The timezone to use for formatting.

##### options?

`DateTimeFormatOptions`

Additional formatting options.

#### Returns

`string`

- The localized date string.

***

### formatLocalizedMonth()

> **formatLocalizedMonth**: (`date`, `locale?`, `timeZone?`) => `string`

Defined in: [types/calendar.ts:311](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/calendar.ts#L311)

**`Function`**

Formats a date into a localized month string.

#### Parameters

##### date

`Date`

The date to format.

##### locale?

`string`

The locale to use for formatting.

##### timeZone?

`string`

The timezone to use for formatting.

#### Returns

`string`

- The localized month string.

***

### formatLocalizedTime()

> **formatLocalizedTime**: (`date`, `locale?`, `timeZone?`, `hour12?`) => `string`

Defined in: [types/calendar.ts:336](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/calendar.ts#L336)

**`Function`**

Formats a date into a localized time string.

#### Parameters

##### date

`Date`

The date to format.

##### locale?

`string`

The locale to use for formatting.

##### timeZone?

`string`

The timezone to use for formatting.

##### hour12?

`boolean`

Whether to use 12-hour format.

#### Returns

`string`

- The localized time string.

***

### formatLocalizedWeekday()

> **formatLocalizedWeekday**: (`date`, `locale?`, `timeZone?`, `format?`) => `string`

Defined in: [types/calendar.ts:321](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/calendar.ts#L321)

**`Function`**

Formats a date into a localized weekday string.

#### Parameters

##### date

`Date`

The date to format.

##### locale?

`string`

The locale to use for formatting.

##### timeZone?

`string`

The timezone to use for formatting.

##### format?

The format of the weekday (e.g., 'short', 'long').

`"long"` | `"short"` | `"narrow"`

#### Returns

`string`

- The localized weekday string.

***

### getEndOfMonth()

> **getEndOfMonth**: (`date`) => `Date`

Defined in: [types/calendar.ts:247](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/calendar.ts#L247)

**`Function`**

Gets the end of the month for a given date.

#### Parameters

##### date

`Date`

The date.

#### Returns

`Date`

- The end of the month.

***

### getEndOfWeek()

> **getEndOfWeek**: (`date`, `startOfWeek?`) => `Date`

Defined in: [types/calendar.ts:233](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/calendar.ts#L233)

**`Function`**

Gets the end of the week for a given date.

#### Parameters

##### date

`Date`

The date.

##### startOfWeek?

`number`

The day of the week to consider as the start (0 for Sunday, 1 for Monday, etc.).

#### Returns

`Date`

- The end of the week.

***

### getStartOfMonth()

> **getStartOfMonth**: (`date`) => `Date`

Defined in: [types/calendar.ts:240](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/calendar.ts#L240)

**`Function`**

Gets the start of the month for a given date.

#### Parameters

##### date

`Date`

The date.

#### Returns

`Date`

- The start of the month.

***

### getStartOfWeek()

> **getStartOfWeek**: (`date`, `startOfWeek?`) => `Date`

Defined in: [types/calendar.ts:225](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/calendar.ts#L225)

**`Function`**

Gets the start of the week for a given date.

#### Parameters

##### date

`Date`

The date.

##### startOfWeek?

`number`

The day of the week to consider as the start (0 for Sunday, 1 for Monday, etc.).

#### Returns

`Date`

- The start of the week.

***

### isSameDay()

> **isSameDay**: (`date1`, `date2`) => `boolean`

Defined in: [types/calendar.ts:176](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/calendar.ts#L176)

**`Function`**

Checks if two dates are the same day.

#### Parameters

##### date1

`Date`

The first date.

##### date2

`Date`

The second date.

#### Returns

`boolean`

- True if the dates are the same day, false otherwise.

***

### isSameMonth()

> **isSameMonth**: (`date1`, `date2`) => `boolean`

Defined in: [types/calendar.ts:193](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/calendar.ts#L193)

**`Function`**

Checks if two dates are in the same month.

#### Parameters

##### date1

`Date`

The first date.

##### date2

`Date`

The second date.

#### Returns

`boolean`

- True if the dates are in the same month, false otherwise.

***

### isSameWeek()

> **isSameWeek**: (`date1`, `date2`, `startOfWeek?`) => `boolean`

Defined in: [types/calendar.ts:185](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/calendar.ts#L185)

**`Function`**

Checks if two dates are in the same week.

#### Parameters

##### date1

`Date`

The first date.

##### date2

`Date`

The second date.

##### startOfWeek?

`number`

The day of the week to consider as the start (0 for Sunday, 1 for Monday, etc.).

#### Returns

`boolean`

- True if the dates are in the same week, false otherwise.

***

### parseDate()

> **parseDate**: (`dateString`) => `Date`

Defined in: [types/calendar.ts:168](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/calendar.ts#L168)

**`Function`**

Parses a date string into a Date object.

#### Parameters

##### dateString

`string`

The date string to parse.

#### Returns

`Date`

- The parsed Date object.
