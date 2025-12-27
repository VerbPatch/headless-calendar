---
title: useNavigation
description: A hook for managing calendar navigation, including changing views and moving between dates.
---

# useNavigation()

> **useNavigation**(`options`): [`UseNavigationReturn`](/calendar/docs/api/navigation/UseNavigationReturn)

Defined in: [hooks/useNavigation.ts:29](https://github.com/VerbPatch/headless-calendar/blob/c0dcd17780db0093f7c06ed44773cd2f5150604e/packages/headless-calendar/src/hooks/useNavigation.ts#L29)

A hook for managing calendar navigation, including changing views and moving between dates.

## Parameters

### options

[`UseNavigationOptions`](/calendar/docs/api/navigation/UseNavigationOptions)

Configuration options for navigation.

## Returns

[`UseNavigationReturn`](/calendar/docs/api/navigation/UseNavigationReturn)

- An object containing the current date, view, and navigation functions.

## See

 - [UseNavigationOptions](/calendar/docs/api/navigation/UseNavigationOptions)
 - [UseNavigationReturn](/calendar/docs/api/navigation/UseNavigationReturn)

## Example

```typescript
const { currentDate, view, goToNext, goToPrevious, goToToday, changeView } = useNavigation({
  defaultView: 'month',
  defaultDate: new Date(),
});

// Go to the next month
goToNext();

// Change the view to 'week'
changeView('week');
```
