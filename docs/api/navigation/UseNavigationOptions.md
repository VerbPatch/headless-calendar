# Interface: UseNavigationOptions

Defined in: [types/views.ts:78](https://github.com/VerbPatch/headless-calendar/blob/6cbc631f0e9839e0e08d79e61837bbf4bf247ad8/packages/headless-calendar/src/types/views.ts#L78)

Configuration options for the `useNavigation` hook.

## Properties

### defaultDate

> **defaultDate**: `Date`

Defined in: [types/views.ts:86](https://github.com/VerbPatch/headless-calendar/blob/6cbc631f0e9839e0e08d79e61837bbf4bf247ad8/packages/headless-calendar/src/types/views.ts#L86)

The default date to display when the calendar is initialized.

***

### defaultView

> **defaultView**: [`ViewType`](/calendar/docs/api/navigation/ViewType)

Defined in: [types/views.ts:82](https://github.com/VerbPatch/headless-calendar/blob/6cbc631f0e9839e0e08d79e61837bbf4bf247ad8/packages/headless-calendar/src/types/views.ts#L82)

The default view to display when the calendar is initialized.

***

### locale

> **locale**: `string`

Defined in: [types/views.ts:106](https://github.com/VerbPatch/headless-calendar/blob/6cbc631f0e9839e0e08d79e61837bbf4bf247ad8/packages/headless-calendar/src/types/views.ts#L106)

The locale to use for the calendar.

***

### timezone

> **timezone**: `string`

Defined in: [types/views.ts:102](https://github.com/VerbPatch/headless-calendar/blob/6cbc631f0e9839e0e08d79e61837bbf4bf247ad8/packages/headless-calendar/src/types/views.ts#L102)

The timezone to use for the calendar.

## Events

### onDateChange()?

> `optional` **onDateChange**: (`date`) => `void`

Defined in: [types/views.ts:98](https://github.com/VerbPatch/headless-calendar/blob/6cbc631f0e9839e0e08d79e61837bbf4bf247ad8/packages/headless-calendar/src/types/views.ts#L98)

A callback function that is invoked when the current date of the calendar changes.

#### Parameters

##### date

`Date`

The new date.

#### Returns

`void`

***

### onViewChange()?

> `optional` **onViewChange**: (`view`) => `void`

Defined in: [types/views.ts:92](https://github.com/VerbPatch/headless-calendar/blob/6cbc631f0e9839e0e08d79e61837bbf4bf247ad8/packages/headless-calendar/src/types/views.ts#L92)

A callback function that is invoked when the calendar view changes.

#### Parameters

##### view

[`ViewType`](/calendar/docs/api/navigation/ViewType)

The new calendar view.

#### Returns

`void`
