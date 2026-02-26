---
title: UseNavigationOptions
description: |-
  Defines the configuration options for the 
   hook, including default view, date, and callback functions for view and date changes.
---

# UseNavigationOptions

Defined in: [types/views.ts:134](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/views.ts#L134)

Configuration options for the `useNavigation` hook.

## Properties

### customViewOptions?

> `optional` **customViewOptions**: [`CustomViewOptions`](/calendar/docs/api/navigation/CustomViewOptions)

Defined in: [types/views.ts:166](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/views.ts#L166)

Configuration options for the 'custom' view.

***

### defaultDate

> **defaultDate**: `Date`

Defined in: [types/views.ts:142](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/views.ts#L142)

The default date to display when the calendar is initialized.

***

### defaultView

> **defaultView**: [`ViewType`](/calendar/docs/api/navigation/ViewType)

Defined in: [types/views.ts:138](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/views.ts#L138)

The default view to display when the calendar is initialized.

***

### locale

> **locale**: `string`

Defined in: [types/views.ts:162](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/views.ts#L162)

The locale to use for the calendar.

***

### timezone

> **timezone**: `string`

Defined in: [types/views.ts:158](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/views.ts#L158)

The timezone to use for the calendar.

## Events

### onDateChange()?

> `optional` **onDateChange**: (`date`) => `void`

Defined in: [types/views.ts:154](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/views.ts#L154)

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

Defined in: [types/views.ts:148](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/types/views.ts#L148)

A callback function that is invoked when the calendar view changes.

#### Parameters

##### view

[`ViewType`](/calendar/docs/api/navigation/ViewType)

The new calendar view.

#### Returns

`void`
