import type { DependencyList, EffectCache, EffectCallback } from './types';
import { haveDepsChanged } from './util';

/**
 * A cache for storing effects.
 */
export const effectCache = new Map<string | number, EffectCache>();

/**
 * Creates an effect that runs after a render if its dependencies have changed.
 * @param effect - The effect function to run.
 * @param deps - The dependency list for the effect.
 * @param effectId - A unique identifier for the effect.
 * @example
 * ```typescript
 * createEffect(() => {
 *   console.log('Component mounted or dependencies changed');
 *   return () => {
 *     console.log('Component unmounted or dependencies changed');
 *   };
 * }, [], 'my-effect');
 * ```
 */
export function createEffect(
  effect: EffectCallback,
  deps: DependencyList | undefined,
  effectId: string | number,
): void {
  const cached = effectCache.get(effectId);

  const shouldRun = !cached || haveDepsChanged(cached.deps, deps);

  if (shouldRun) {
    if (cached?.cleanup) {
      cached.cleanup();
    }

    const cleanup = effect();

    effectCache.set(effectId, { cleanup: cleanup || undefined, deps });
  }
}

/**
 * Cleans up all registered effects.
 */
export function cleanupAllEffects(): void {
  effectCache.forEach((cached) => {
    if (cached.cleanup) {
      cached.cleanup();
    }
  });
  effectCache.clear();
}

/**
 * Cleans up a specific effect by its ID.
 * @param id - The unique identifier of the effect to clean up.
 */
export function cleanupEffect(id: string | number): void {
  const cached = effectCache.get(id);
  if (cached?.cleanup) {
    cached.cleanup();
  }
  effectCache.delete(id);
}
