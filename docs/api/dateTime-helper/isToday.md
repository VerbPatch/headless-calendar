# Function: isToday()

> **isToday**(`date`): `boolean`

Defined in: [utils/date.ts:537](https://github.com/VerbPatch/headless-calendar/blob/ad664e8132227ddee70c073e0baff568256ccda9/packages/headless-calendar/src/utils/date.ts#L537)

Checks if a given date is today.

## Parameters

### date

`Date`

The date to check.

## Returns

`boolean`

- True if the date is today, false otherwise.

## See

[isSameDay](https://verbpatch.com/calendar/docs/api/dateTime-helper/isSameDay)

## Example

```ts
const result = isToday(new Date()); // true
```
