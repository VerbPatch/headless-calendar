import type { Dispatch, StateCache } from "./types";

/**
 * A cache for storing state.
 */
export const stateCache = new Map<string | number, StateCache<any>>();

/**
 * Creates a stateful value and a function to update it.
 * @param initialValue - The initial value of the state.
 * @param stateId - A unique identifier for the state.
 * @returns A tuple containing a function to get the current value and a function to set the value.
 * @example
 * ```typescript
 * const [getCount, setCount] = createState(0, 'my-counter');
 *
 * // Get the current value
 * const currentCount = getCount();
 *
 * // Update the value
 * setCount(currentCount + 1);
 * ```
 */
export function createState<T>(initialValue: T | (() => T), stateId: string | number): [() => T, Dispatch<T>] {

    if (!stateCache.has(stateId)) {
        const value = typeof initialValue === 'function' ? (initialValue as () => T)() : initialValue;
        stateCache.set(stateId, { value, listeners: new Set() });
    }

    const cached = stateCache.get(stateId) as StateCache<T>;

    const setState: Dispatch<T> = (action) => {
        const newValue = typeof action === 'function' ? (action as (prev: T) => T)(cached.value) : action;

        if (!Object.is(cached.value, newValue)) {
            cached.value = newValue;

            cached.listeners.forEach(listener => listener(newValue));
        }
    };

    return [() => cached.value, setState];
}

/**
 * Subscribes to changes in a specific state.
 * @param id - The unique identifier of the state to subscribe to.
 * @param callback - The function to call when the state changes.
 * @returns A function to unsubscribe from the state changes.
 */
export function subscribeToState<T>(id: string | number, callback: (value: T) => void): () => void {
    const cached = stateCache.get(id) as StateCache<T> | undefined;;

    if (!cached) {
        throw new Error(`State with id "${id}" does not exist. Call createState first.`);
    }

    cached.listeners.add(callback);
    return () => cached.listeners.delete(callback);
}