# Interface: MonthData

Defined in: [types/views.ts:11](https://github.com/VerbPatch/headless-calendar/blob/6cbc631f0e9839e0e08d79e61837bbf4bf247ad8/packages/headless-calendar/src/types/views.ts#L11)

Data specific to the month view.

## Properties

### isCurrentMonth()

> **isCurrentMonth**: (`date`) => `boolean`

Defined in: [types/views.ts:25](https://github.com/VerbPatch/headless-calendar/blob/6cbc631f0e9839e0e08d79e61837bbf4bf247ad8/packages/headless-calendar/src/types/views.ts#L25)

A function to check if a date is in the current month.

#### Parameters

##### date

`Date`

The date to check.

#### Returns

`boolean`

- True if the date is in the current month, false otherwise.

***

### isToday()

> **isToday**: (`date`) => `boolean`

Defined in: [types/views.ts:31](https://github.com/VerbPatch/headless-calendar/blob/6cbc631f0e9839e0e08d79e61837bbf4bf247ad8/packages/headless-calendar/src/types/views.ts#L31)

A function to check if a date is today.

#### Parameters

##### date

`Date`

The date to check.

#### Returns

`boolean`

- True if the date is today, false otherwise.

***

### monthName

> **monthName**: `string`

Defined in: [types/views.ts:19](https://github.com/VerbPatch/headless-calendar/blob/6cbc631f0e9839e0e08d79e61837bbf4bf247ad8/packages/headless-calendar/src/types/views.ts#L19)

The localized name of the month.

***

### weeks

> **weeks**: `Date`[][]

Defined in: [types/views.ts:15](https://github.com/VerbPatch/headless-calendar/blob/6cbc631f0e9839e0e08d79e61837bbf4bf247ad8/packages/headless-calendar/src/types/views.ts#L15)

A 2D array of dates representing the weeks of the month.
