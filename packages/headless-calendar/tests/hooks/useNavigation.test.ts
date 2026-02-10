import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useNavigation } from '../../src/hooks/useNavigation';
import { clearAllCaches } from '../../src/state';

describe('useNavigation hook', () => {
  const initialDate = new Date(2024, 0, 15); // Jan 15, 2024

  beforeEach(() => {
    clearAllCaches();
  });

  const getNav = (opts: any = {}) => useNavigation({
    defaultView: 'month',
    defaultDate: initialDate,
    timezone: 'UTC',
    locale: 'en-US',
    ...opts
  });

  it('should initialize with default values', () => {
    const nav = getNav();
    expect(nav.view).toBe('month');
    expect(nav.currentDate).toEqual(initialDate);
  });

  describe('Standard Navigation', () => {
    it('should navigate in Day view', () => {
      const nav = getNav({ defaultView: 'day' });
      nav.goToNext();
      expect(getNav({ defaultView: 'day' }).currentDate.getDate()).toBe(16);
      nav.goToPrevious();
      nav.goToPrevious();
      expect(getNav({ defaultView: 'day' }).currentDate.getDate()).toBe(14);
    });

    it('should navigate in Week view', () => {
      const nav = getNav({ defaultView: 'week' });
      nav.goToNext();
      expect(getNav({ defaultView: 'week' }).currentDate.getDate()).toBe(22);
      nav.goToPrevious();
      nav.goToPrevious();
      expect(getNav({ defaultView: 'week' }).currentDate.getDate()).toBe(8);
    });

    it('should navigate in Month view', () => {
      const nav = getNav();
      nav.goToNext();
      expect(getNav().currentDate.getMonth()).toBe(1);
      nav.goToPrevious();
      nav.goToPrevious();
      expect(getNav().currentDate.getMonth()).toBe(11);
    });

    it('should navigate in Year view', () => {
      const nav = getNav({ defaultView: 'year' });
      nav.goToNext();
      expect(getNav({ defaultView: 'year' }).currentDate.getFullYear()).toBe(2025);
      nav.goToPrevious();
      nav.goToPrevious();
      expect(getNav({ defaultView: 'year' }).currentDate.getFullYear()).toBe(2023);
    });
  });

  describe('Custom View Navigation', () => {
    it('should navigate with unit: day', () => {
      const opts = { defaultView: 'custom' as const, customViewOptions: { unit: 'day' as const, count: 3 } };
      const nav = getNav(opts);
      nav.goToNext();
      expect(getNav(opts).currentDate.getDate()).toBe(18);
      nav.goToPrevious();
      nav.goToPrevious();
      expect(getNav(opts).currentDate.getDate()).toBe(12);
    });

    it('should navigate with unit: week', () => {
      const opts = { defaultView: 'custom' as const, customViewOptions: { unit: 'week' as const, count: 2 } };
      const nav = getNav(opts);
      nav.goToNext();
      expect(getNav(opts).currentDate.getDate()).toBe(29);
      nav.goToPrevious();
      nav.goToPrevious();
      expect(getNav(opts).currentDate.getDate()).toBe(1);
    });

    it('should navigate with unit: month', () => {
      const opts = { defaultView: 'custom' as const, customViewOptions: { unit: 'month' as const, count: 2 } };
      const nav = getNav(opts);
      nav.goToNext();
      expect(getNav(opts).currentDate.getMonth()).toBe(2); // March
      nav.goToPrevious();
      nav.goToPrevious();
      expect(getNav(opts).currentDate.getMonth()).toBe(10); // Nov 2023
    });

    it('should navigate with unit: day', () => {
      const opts = { defaultView: 'custom' as const, customViewOptions: { unit: 'day' as const, count: 1 } };
      const nav = getNav(opts);
      nav.goToNext();
      expect(getNav(opts).currentDate.getDate()).toBe(16);
      nav.goToPrevious();
      expect(getNav(opts).currentDate.getDate()).toBe(15);
    });

    it('should navigate with unit: week', () => {
      const opts = { defaultView: 'custom' as const, customViewOptions: { unit: 'week' as const, count: 1 } };
      const nav = getNav(opts);
      nav.goToNext();
      expect(getNav(opts).currentDate.getDate()).toBe(initialDate.getDate() + 7);
      nav.goToPrevious();
      expect(getNav(opts).currentDate.getDate()).toBe(initialDate.getDate());
    });
  });

  it('should handle goToToday', () => {
    const spy = vi.fn();
    const nav = getNav({ onDateChange: spy });
    nav.goToToday();
    const updated = getNav();
    const now = new Date();
    expect(updated.currentDate.getDate()).toBe(now.getDate());
    expect(updated.currentDate.getMonth()).toBe(now.getMonth());
    expect(spy).toHaveBeenCalled();
  });

  it('should handle goToDate', () => {
    const spy = vi.fn();
    const nav = getNav({ onDateChange: spy });
    const target = new Date(2025, 5, 20);
    nav.goToDate(target);
    expect(getNav().currentDate).toEqual(target);
    expect(spy).toHaveBeenCalledWith(target);
  });

  it('should call onViewChange when changing view', () => {
    const spy = vi.fn();
    const nav = getNav({ onViewChange: spy });
    nav.changeView('day');
    expect(spy).toHaveBeenCalledWith('day');
  });

  it('should call onDateChange when navigating', () => {
    const spy = vi.fn();
    const nav = getNav({ onDateChange: spy });
    nav.goToNext();
    expect(spy).toHaveBeenCalled();

    nav.goToPrevious();
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('should throw error on invalid view type', () => {
    const nav = getNav();
    expect(() => nav.changeView('invalid' as any)).toThrow('Invalid view type: invalid');
  });
});
