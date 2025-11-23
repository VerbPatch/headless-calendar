# Interface: CalendarUtils

Defined in: [types/calendar.ts:135](https://github.com/VerbPatch/headless-calendar/blob/6cbc631f0e9839e0e08d79e61837bbf4bf247ad8/packages/headless-calendar/src/types/calendar.ts#L135)

## Properties

### addDays()

> **addDays**: (`date`, `days`) => `Date`

Defined in: [types/calendar.ts:190](https://github.com/VerbPatch/headless-calendar/blob/6cbc631f0e9839e0e08d79e61837bbf4bf247ad8/packages/headless-calendar/src/types/calendar.ts#L190)

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

Defined in: [types/calendar.ts:206](https://github.com/VerbPatch/headless-calendar/blob/6cbc631f0e9839e0e08d79e61837bbf4bf247ad8/packages/headless-calendar/src/types/calendar.ts#L206)

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

Defined in: [types/calendar.ts:198](https://github.com/VerbPatch/headless-calendar/blob/6cbc631f0e9839e0e08d79e61837bbf4bf247ad8/packages/headless-calendar/src/types/calendar.ts#L198)

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

Defined in: [types/calendar.ts:271](https://github.com/VerbPatch/headless-calendar/blob/6cbc631f0e9839e0e08d79e61837bbf4bf247ad8/packages/headless-calendar/src/types/calendar.ts#L271)

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

Defined in: [types/calendar.ts:245](https://github.com/VerbPatch/headless-calendar/blob/6cbc631f0e9839e0e08d79e61837bbf4bf247ad8/packages/headless-calendar/src/types/calendar.ts#L245)

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

Defined in: [types/calendar.ts:252](https://github.com/VerbPatch/headless-calendar/blob/6cbc631f0e9839e0e08d79e61837bbf4bf247ad8/packages/headless-calendar/src/types/calendar.ts#L252)

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

Defined in: [types/calendar.ts:143](https://github.com/VerbPatch/headless-calendar/blob/6cbc631f0e9839e0e08d79e61837bbf4bf247ad8/packages/headless-calendar/src/types/calendar.ts#L143)

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

Defined in: [types/calendar.ts:262](https://github.com/VerbPatch/headless-calendar/blob/6cbc631f0e9839e0e08d79e61837bbf4bf247ad8/packages/headless-calendar/src/types/calendar.ts#L262)

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

Defined in: [types/calendar.ts:151](https://github.com/VerbPatch/headless-calendar/blob/6cbc631f0e9839e0e08d79e61837bbf4bf247ad8/packages/headless-calendar/src/types/calendar.ts#L151)

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

Defined in: [types/calendar.ts:281](https://github.com/VerbPatch/headless-calendar/blob/6cbc631f0e9839e0e08d79e61837bbf4bf247ad8/packages/headless-calendar/src/types/calendar.ts#L281)

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

Defined in: [types/calendar.ts:295](https://github.com/VerbPatch/headless-calendar/blob/6cbc631f0e9839e0e08d79e61837bbf4bf247ad8/packages/headless-calendar/src/types/calendar.ts#L295)

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

Defined in: [types/calendar.ts:324](https://github.com/VerbPatch/headless-calendar/blob/6cbc631f0e9839e0e08d79e61837bbf4bf247ad8/packages/headless-calendar/src/types/calendar.ts#L324)

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

Defined in: [types/calendar.ts:309](https://github.com/VerbPatch/headless-calendar/blob/6cbc631f0e9839e0e08d79e61837bbf4bf247ad8/packages/headless-calendar/src/types/calendar.ts#L309)

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

Defined in: [types/calendar.ts:236](https://github.com/VerbPatch/headless-calendar/blob/6cbc631f0e9839e0e08d79e61837bbf4bf247ad8/packages/headless-calendar/src/types/calendar.ts#L236)

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

Defined in: [types/calendar.ts:222](https://github.com/VerbPatch/headless-calendar/blob/6cbc631f0e9839e0e08d79e61837bbf4bf247ad8/packages/headless-calendar/src/types/calendar.ts#L222)

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

Defined in: [types/calendar.ts:229](https://github.com/VerbPatch/headless-calendar/blob/6cbc631f0e9839e0e08d79e61837bbf4bf247ad8/packages/headless-calendar/src/types/calendar.ts#L229)

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

Defined in: [types/calendar.ts:214](https://github.com/VerbPatch/headless-calendar/blob/6cbc631f0e9839e0e08d79e61837bbf4bf247ad8/packages/headless-calendar/src/types/calendar.ts#L214)

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

Defined in: [types/calendar.ts:166](https://github.com/VerbPatch/headless-calendar/blob/6cbc631f0e9839e0e08d79e61837bbf4bf247ad8/packages/headless-calendar/src/types/calendar.ts#L166)

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

Defined in: [types/calendar.ts:182](https://github.com/VerbPatch/headless-calendar/blob/6cbc631f0e9839e0e08d79e61837bbf4bf247ad8/packages/headless-calendar/src/types/calendar.ts#L182)

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

> **isSameWeek**: (`date1`, `date2`) => `boolean`

Defined in: [types/calendar.ts:174](https://github.com/VerbPatch/headless-calendar/blob/6cbc631f0e9839e0e08d79e61837bbf4bf247ad8/packages/headless-calendar/src/types/calendar.ts#L174)

**`Function`**

Checks if two dates are in the same week.

#### Parameters

##### date1

`Date`

The first date.

##### date2

`Date`

The second date.

#### Returns

`boolean`

- True if the dates are in the same week, false otherwise.

***

### parseDate()

> **parseDate**: (`dateString`) => `Date`

Defined in: [types/calendar.ts:158](https://github.com/VerbPatch/headless-calendar/blob/6cbc631f0e9839e0e08d79e61837bbf4bf247ad8/packages/headless-calendar/src/types/calendar.ts#L158)

**`Function`**

Parses a date string into a Date object.

#### Parameters

##### dateString

`string`

The date string to parse.

#### Returns

`Date`

- The parsed Date object.
