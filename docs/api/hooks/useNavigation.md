# Function: useNavigation()

> **useNavigation**(`options`): [`UseNavigationReturn`](https://verbpatch.com/calendar/docs/api/navigation/UseNavigationReturn)

Defined in: [hooks/useNavigation.ts:27](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/hooks/useNavigation.ts#L27)

A hook for managing calendar navigation, including changing views and moving between dates.

## Parameters

### options

[`UseNavigationOptions`](https://verbpatch.com/calendar/docs/api/navigation/UseNavigationOptions)

Configuration options for navigation.

## Returns

[`UseNavigationReturn`](https://verbpatch.com/calendar/docs/api/navigation/UseNavigationReturn)

- An object containing the current date, view, and navigation functions.

## See

 - [UseNavigationOptions](https://verbpatch.com/calendar/docs/api/navigation/UseNavigationOptions)
 - [UseNavigationReturn](https://verbpatch.com/calendar/docs/api/navigation/UseNavigationReturn)

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
