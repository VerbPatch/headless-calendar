# Interface: CalendarEvent

Defined in: [types/events.ts:8](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/types/events.ts#L8)

Represents a calendar event.

## Indexable

\[`key`: `string`\]: `any`

## Properties

### allDay?

> `optional` **allDay**: `boolean`

Defined in: [types/events.ts:29](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/types/events.ts#L29)

Indicates if the event is an all-day event.

#### Default

```ts
false
```

***

### color?

> `optional` **color**: `string`

Defined in: [types/events.ts:38](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/types/events.ts#L38)

The color used to display the event.

#### Default

```ts
'#3174ad'
```

***

### description?

> `optional` **description**: `string`

Defined in: [types/events.ts:33](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/types/events.ts#L33)

A description of the event.

***

### end

> **end**: `Date`

Defined in: [types/events.ts:24](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/types/events.ts#L24)

The end date and time of the event.

***

### id

> **id**: `string`

Defined in: [types/events.ts:12](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/types/events.ts#L12)

The unique identifier of the event.

***

### recurring?

> `optional` **recurring**: \{ `count?`: `number`; `day?`: `number`; `end?`: `Date`; `every`: `number`; `month?`: `number`; `repeat`: `"yearly"` \| `"monthly"` \| `"weekly"` \| `"daily"`; `week?`: `number`; `weekDays?`: `number`[]; \} \| `"never"`

Defined in: [types/events.ts:177](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/types/events.ts#L177)

Recurring event configuration. Use "never" for non-recurring events.
 *

#### Type Declaration

\{ `count?`: `number`; `day?`: `number`; `end?`: `Date`; `every`: `number`; `month?`: `number`; `repeat`: `"yearly"` \| `"monthly"` \| `"weekly"` \| `"daily"`; `week?`: `number`; `weekDays?`: `number`[]; \}

#### count?

> `optional` **count**: `number`

The number of occurrences before the recurrence stops.
Mutually exclusive with the `end` property.

#### day?

> `optional` **day**: `number`

The day of the month for monthly or yearly recurrence.
Positive values: 1-31 (1st to 31st day).
Negative values: -1 to -31 (last day to 31st-to-last day).
Cannot be 0.
Mutually exclusive with the `weekDays` + `week` combination.

#### end?

> `optional` **end**: `Date`

The end date for the recurrence (must be after the event's end date).
Mutually exclusive with the `count` property.

#### every

> **every**: `number`

The interval for the recurrence (e.g., every 2 weeks, every 3 months).

#### month?

> `optional` **month**: `number`

The month of the year for yearly recurrence (required for yearly).
0 = January, 1 = February, ..., 11 = December.

#### repeat

> **repeat**: `"yearly"` \| `"monthly"` \| `"weekly"` \| `"daily"`

The type of recurrence pattern.

#### week?

> `optional` **week**: `number`

The week of the month for monthly or yearly recurrence.
Positive values: 1-4 (1st to 4th week).
Negative values: -1 (last week).
Cannot be 0.
Must be used with the `weekDays` property.

#### weekDays?

> `optional` **weekDays**: `number`[]

The days of the week for weekly, monthly, or yearly recurrence.
0 = Sunday, 1 = Monday, ..., 6 = Saturday.
Required for weekly recurrence.
Optional for monthly/yearly when used with the `week` property.

`"never"`

#### Examples

1. Repeat every day until end of time
```tsx
recurring: {
    repeat: "daily",
    every: 1
}
```
 *

2. Repeat every day until end date
```tsx
recurring: {
    repeat: "daily",
    every: 1,
    end: new Date(2025, 6, 1) // July 1, 2025 (month is 0-indexed)
}
```
 *

3. Repeat every day until count completes
```tsx
recurring: {
    repeat: "daily",
    every: 1,
    count: 5 // Repeats 5 times and then stops 
}
```
 *

4. Repeat every week on Monday & Friday until end of time
```tsx
recurring: {
    repeat: "weekly",
    weekDays: [1, 5], // Monday and Friday
    every: 1
}
```
 *

5. Repeat every 2 weeks on Tuesday for 3 occurrences
```tsx
recurring: {
    repeat: "weekly",
    weekDays: [2], // Tuesday
    every: 2,
    count: 3 // Repeats 3 times and then stops 
}
```
 *

6. Repeat every week on Sunday until end date
```tsx
recurring: {
    repeat: "weekly",
    weekDays: [0], // Sunday
    every: 1,
    end: new Date(2025, 6, 1) // July 1, 2025
}
```
 *

7. Repeat every month on the 5th day until end of time
```tsx
recurring: {
    repeat: "monthly",
    every: 1,
    day: 5
}
```
 *

8. Repeat every month on the last day for 4 times
```tsx
recurring: {
    repeat: "monthly",
    every: 1,
    day: -1, // Last day of the month
    count: 4
}
``` 
 *

9. Repeat every month on the last Saturday until end of time
```tsx
recurring: {
    repeat: "monthly",
    weekDays: [6], // Saturday
    every: 1,
    week: -1 // Last week of the month
}
```

10. Repeat every 2 months on the 2nd Saturday until end date
```tsx
recurring: {
    repeat: "monthly",
    weekDays: [6], // Saturday
    every: 2,
    week: 2, // Second week of the month
    end: new Date(2027, 11, 31) // December 31, 2027
}
```

11. Repeat every year on April 1st until end of time
```tsx
recurring: {
    repeat: "yearly",
    day: 1,
    month: 3, // April (0-indexed: 0=Jan, 1=Feb, 2=Mar, 3=Apr)
    every: 1
}
```

12. Repeat every year on the last day of February until end of time
```tsx
recurring: {
    repeat: "yearly",
    day: -1, // Last day of the month
    month: 1, // February (0-indexed)
    every: 1
}
```

13. Repeat every year on the last Friday of March until end of time
```tsx
recurring: {
    repeat: "yearly",
    month: 2, // March (0-indexed)
    weekDays: [5], // Friday
    every: 1,
    week: -1 // Last week of the month
}
```

***

### start

> **start**: `Date`

Defined in: [types/events.ts:20](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/types/events.ts#L20)

The start date and time of the event.

***

### timezone?

> `optional` **timezone**: `string`

Defined in: [types/events.ts:43](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/types/events.ts#L43)

The timezone of the event.

#### Default

```ts
The user's local timezone.
```

***

### title

> **title**: `string`

Defined in: [types/events.ts:16](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/types/events.ts#L16)

The title or name of the event.
