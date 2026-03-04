import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  createState,
  subscribeToState,
  clearAllCaches,
  createMemo,
  createEffect,
  cleanupEffect,
  cleanupAllEffects,
} from '../../src/state/index';
import { haveDepsChanged } from '../../src/state/util';

describe('State Engine', () => {
  beforeEach(() => {
    clearAllCaches();
  });

  describe('createState', () => {
    it('should initialize with value', () => {
      const [getVal] = createState(1, 's1');
      expect(getVal()).toBe(1);
    });

    it('should initialize with function', () => {
      const [getVal] = createState(() => 1 + 1, 's2');
      expect(getVal()).toBe(2);
    });

    it('should update value', () => {
      const [getVal, setVal] = createState(0, 's3');
      setVal(5);
      expect(getVal()).toBe(5);
    });

    it('should update with function', () => {
      const [getVal, setVal] = createState(10, 's4');
      setVal((prev) => prev + 5);
      expect(getVal()).toBe(15);
    });

    it('should notify subscribers', () => {
      const [, setVal] = createState(0, 'notify');
      const spy = vi.fn();
      subscribeToState('notify', spy);

      setVal(1);
      expect(spy).toHaveBeenCalledWith(1);
    });

    it('should allow unsubscribing', () => {
      const [, setVal] = createState(0, 'unsub');
      const spy = vi.fn();
      const unsubscribe = subscribeToState('unsub', spy);

      setVal(1);
      expect(spy).toHaveBeenCalledTimes(1);

      unsubscribe();
      setVal(2);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should throw when subscribing to non-existent state', () => {
      expect(() => subscribeToState('non-existent', () => {})).toThrow();
    });
  });

  describe('createMemo', () => {
    it('should return initial value', () => {
      const val = createMemo(() => 'result', [], 'memo');
      expect(val).toBe('result');
    });

    it('should recompute only when deps change', () => {
      let count = 0;
      const factory = () => {
        count++;
        return `val-${count}`;
      };

      const val1 = createMemo(factory, [1], 'm1');
      const val2 = createMemo(factory, [1], 'm1');
      const val3 = createMemo(factory, [2], 'm1');

      expect(val1).toBe('val-1');
      expect(val2).toBe('val-1');
      expect(val3).toBe('val-2');
      expect(count).toBe(2);
    });
  });

  describe('createEffect', () => {
    it('should run effect initially', () => {
      const spy = vi.fn();
      createEffect(spy, [], 'e1');
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should rerun when deps change', () => {
      const spy = vi.fn();
      let dep = 1;

      createEffect(spy, [dep], 'e2');
      dep = 2;
      createEffect(spy, [dep], 'e2');

      expect(spy).toHaveBeenCalledTimes(2);
    });

    it('should run cleanup when deps change', () => {
      const cleanup = vi.fn();
      const effect = vi.fn(() => cleanup);

      createEffect(effect, [1], 'cleanup-test');
      createEffect(effect, [2], 'cleanup-test');

      expect(cleanup).toHaveBeenCalledTimes(1);
    });

    it('should run cleanup via cleanupEffect', () => {
      const cleanup = vi.fn();
      createEffect(() => cleanup, [], 'specific-cleanup');

      cleanupEffect('specific-cleanup');
      expect(cleanup).toHaveBeenCalledTimes(1);
    });

    it('should run cleanup via cleanupAllEffects', () => {
      const cleanup1 = vi.fn();
      const cleanup2 = vi.fn();

      createEffect(() => cleanup1, [], 'c1');
      createEffect(() => cleanup2, [], 'c2');

      cleanupAllEffects();
      expect(cleanup1).toHaveBeenCalledTimes(1);
      expect(cleanup2).toHaveBeenCalledTimes(1);
    });

    it('should handle cleanupEffect for non-existent effect', () => {
      expect(() => cleanupEffect('nothing')).not.toThrow();
    });
  });

  describe('haveDepsChanged', () => {
    it('should return true if either deps is undefined', () => {
      expect(haveDepsChanged(undefined, [])).toBe(true);
      expect(haveDepsChanged([], undefined)).toBe(true);
    });

    it('should return true if lengths differ', () => {
      expect(haveDepsChanged([1], [1, 2])).toBe(true);
    });

    it('should return false if deps are identical', () => {
      expect(haveDepsChanged([1, 'a'], [1, 'a'])).toBe(false);
    });

    it('should return true if deps differ', () => {
      expect(haveDepsChanged([1], [2])).toBe(true);
    });
  });
});
