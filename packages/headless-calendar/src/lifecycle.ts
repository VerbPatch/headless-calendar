import { callbackCache } from './state/createCallback';
import { effectCache } from './state/createEffect';
import { memoCache } from './state/createMemo';
import { stateCache } from './state/createState';

/**
 * Disposes of all state and memoized values associated with a specific calendarId.
 * This should be called when a calendar instance is destroyed or unmounted.
 * @param calendarId - The unique identifier of the calendar to dispose.
 * @group calendar
 */
export function disposeCalendar(calendarId: string): void {
  const prefix = `${calendarId}-`;

  const clearMap = (map: Map<string | number, any>) => {
    for (const key of map.keys()) {
      if (typeof key === 'string' && key.startsWith(prefix)) {
        // If it's an effect, run its cleanup first
        if (map === effectCache) {
          const effect = effectCache.get(key);
          if (effect?.cleanup) {
            effect.cleanup();
          }
        }
        map.delete(key);
      }
    }
  };

  clearMap(stateCache);
  clearMap(memoCache);
  clearMap(callbackCache);
  clearMap(effectCache);
}
