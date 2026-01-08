---
title: UseNavigationOptions
description: |-
  Defines the configuration options for the 
   hook, including default view, date, and callback functions for view and date changes.
---

# UseNavigationOptions

Defined in: [types/views.ts:111](https://github.com/VerbPatch/headless-calendar/blob/61268b1f62ea267e33767c46cf07b70c5e3c1eeb/packages/headless-calendar/src/types/views.ts#L111)

Configuration options for the `useNavigation` hook.

## Properties

### defaultDate

> **defaultDate**: `Date`

Defined in: [types/views.ts:119](https://github.com/VerbPatch/headless-calendar/blob/61268b1f62ea267e33767c46cf07b70c5e3c1eeb/packages/headless-calendar/src/types/views.ts#L119)

The default date to display when the calendar is initialized.

***

### defaultView

> **defaultView**: [`ViewType`](/calendar/docs/api/navigation/ViewType)

Defined in: [types/views.ts:115](https://github.com/VerbPatch/headless-calendar/blob/61268b1f62ea267e33767c46cf07b70c5e3c1eeb/packages/headless-calendar/src/types/views.ts#L115)

The default view to display when the calendar is initialized.

***

### locale

> **locale**: `string`

Defined in: [types/views.ts:139](https://github.com/VerbPatch/headless-calendar/blob/61268b1f62ea267e33767c46cf07b70c5e3c1eeb/packages/headless-calendar/src/types/views.ts#L139)

The locale to use for the calendar.

***

### timezone

> **timezone**: `string`

Defined in: [types/views.ts:135](https://github.com/VerbPatch/headless-calendar/blob/61268b1f62ea267e33767c46cf07b70c5e3c1eeb/packages/headless-calendar/src/types/views.ts#L135)

The timezone to use for the calendar.

## Events

### onDateChange()?

> `optional` **onDateChange**: (`date`) => `void`

Defined in: [types/views.ts:131](https://github.com/VerbPatch/headless-calendar/blob/61268b1f62ea267e33767c46cf07b70c5e3c1eeb/packages/headless-calendar/src/types/views.ts#L131)

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

Defined in: [types/views.ts:125](https://github.com/VerbPatch/headless-calendar/blob/61268b1f62ea267e33767c46cf07b70c5e3c1eeb/packages/headless-calendar/src/types/views.ts#L125)

A callback function that is invoked when the calendar view changes.

#### Parameters

##### view

[`ViewType`](/calendar/docs/api/navigation/ViewType)

The new calendar view.

#### Returns

`void`
