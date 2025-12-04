---
title: Use Navigation Options
description: |-
  Defines the configuration options for the 
   hook, including default view, date, and callback functions for view and date changes.
---

# Interface: UseNavigationOptions

Defined in: [types/views.ts:88](https://github.com/VerbPatch/headless-calendar/blob/184198efa3f566732cc9638ed7e00060c7790d61/packages/headless-calendar/src/types/views.ts#L88)

Configuration options for the `useNavigation` hook.

## Properties

### defaultDate

> **defaultDate**: `Date`

Defined in: [types/views.ts:96](https://github.com/VerbPatch/headless-calendar/blob/184198efa3f566732cc9638ed7e00060c7790d61/packages/headless-calendar/src/types/views.ts#L96)

The default date to display when the calendar is initialized.

***

### defaultView

> **defaultView**: [`ViewType`](/calendar/docs/api/navigation/ViewType)

Defined in: [types/views.ts:92](https://github.com/VerbPatch/headless-calendar/blob/184198efa3f566732cc9638ed7e00060c7790d61/packages/headless-calendar/src/types/views.ts#L92)

The default view to display when the calendar is initialized.

***

### locale

> **locale**: `string`

Defined in: [types/views.ts:116](https://github.com/VerbPatch/headless-calendar/blob/184198efa3f566732cc9638ed7e00060c7790d61/packages/headless-calendar/src/types/views.ts#L116)

The locale to use for the calendar.

***

### timezone

> **timezone**: `string`

Defined in: [types/views.ts:112](https://github.com/VerbPatch/headless-calendar/blob/184198efa3f566732cc9638ed7e00060c7790d61/packages/headless-calendar/src/types/views.ts#L112)

The timezone to use for the calendar.

## Events

### onDateChange()?

> `optional` **onDateChange**: (`date`) => `void`

Defined in: [types/views.ts:108](https://github.com/VerbPatch/headless-calendar/blob/184198efa3f566732cc9638ed7e00060c7790d61/packages/headless-calendar/src/types/views.ts#L108)

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

Defined in: [types/views.ts:102](https://github.com/VerbPatch/headless-calendar/blob/184198efa3f566732cc9638ed7e00060c7790d61/packages/headless-calendar/src/types/views.ts#L102)

A callback function that is invoked when the calendar view changes.

#### Parameters

##### view

[`ViewType`](/calendar/docs/api/navigation/ViewType)

The new calendar view.

#### Returns

`void`
