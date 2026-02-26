---
title: useNavigation
description: A hook for managing calendar navigation, including changing views and moving between dates.
---

# useNavigation()

> **useNavigation**(`options`): [`UseNavigationReturn`](/calendar/docs/api/navigation/UseNavigationReturn)

Defined in: [hooks/useNavigation.ts:35](https://github.com/VerbPatch/headless-calendar/blob/73d96f289f76a26fdb3ad1a935ddf2631e7bcf75/packages/headless-calendar/src/hooks/useNavigation.ts#L35)

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
