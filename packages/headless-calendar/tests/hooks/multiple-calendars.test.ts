import { describe, it, expect, beforeEach } from 'vitest';
import { useCalendar } from '../../src/hooks/useCalendar';
import { clearAllCaches } from '../../src/state';
import { disposeCalendar } from '../../src/lifecycle';

describe('multiple calendars support', () => {
  beforeEach(() => {
    clearAllCaches();
  });

  it('should maintain independent states when different calendarIds are used', () => {
    const date1 = new Date(2024, 0, 1); // Jan
    const date2 = new Date(2024, 2, 1); // Mar

    const cal1 = useCalendar({
      calendarId: 'cal-1',
      defaultDate: date1,
      defaultView: 'month',
    });

    const cal2 = useCalendar({
      calendarId: 'cal-2',
      defaultDate: date2,
      defaultView: 'month',
    });

    expect(cal1.currentDate.getMonth()).toBe(0);
    expect(cal2.currentDate.getMonth()).toBe(2);

    // Navigate cal1
    cal1.goToNext();

    // Refresh instances (since they are hooks, in a real app they'd re-render,
    // here we call again with same options to get latest state from cache)
    const cal1Updated = useCalendar({
      calendarId: 'cal-1',
      defaultDate: date1,
      defaultView: 'month',
    });
    const cal2Updated = useCalendar({
      calendarId: 'cal-2',
      defaultDate: date2,
      defaultView: 'month',
    });

    expect(cal1Updated.currentDate.getMonth()).toBe(1); // February
    expect(cal2Updated.currentDate.getMonth()).toBe(2); // Still March
    expect(cal1Updated.currentDate).not.toEqual(cal2Updated.currentDate);
  });

  it('should conflict states when same calendarId (or default) is used', () => {
    const date1 = new Date(2024, 0, 1);

    // Both use default-calendar ID
    const cal1 = useCalendar({
      defaultDate: date1,
    });

    const cal2 = useCalendar({
      defaultDate: date1,
    });

    expect(cal1.currentDate).toEqual(cal2.currentDate);

    // Navigate cal1
    cal1.goToNext();

    const cal2Updated = useCalendar({
      defaultDate: date1,
    });

    // cal2 should have been affected because they share the same state ID
    expect(cal2Updated.currentDate.getMonth()).toBe(1);
  });

  it('should maintain independent events', () => {
    const cal1 = useCalendar({
      calendarId: 'cal-1',
    });

    const cal2 = useCalendar({
      calendarId: 'cal-2',
    });

    const now = new Date();
    const oneHourLater = new Date(now.getTime() + 3600000);

    cal1.createEvent({
      id: 'event-1',
      title: 'Event 1',
      start: now,
      end: oneHourLater,
    });

    const cal1Updated = useCalendar({ calendarId: 'cal-1' });
    const cal2Updated = useCalendar({ calendarId: 'cal-2' });

    expect(cal1Updated.events).toHaveLength(1);
    expect(cal2Updated.events).toHaveLength(0);
  });

  it('should correctly dispose a specific calendar instance', () => {
    const date1 = new Date(2024, 0, 1);
    const cal1 = useCalendar({
      calendarId: 'to-be-disposed',
      defaultDate: date1,
    });

    // Navigate to change state from default
    cal1.goToNext();
    const cal1Changed = useCalendar({ calendarId: 'to-be-disposed' });
    expect(cal1Changed.currentDate.getMonth()).toBe(1); // Feb

    // Dispose
    disposeCalendar('to-be-disposed');

    // New instance with same ID should now use its own NEW default instead of old cached state
    const cal1New = useCalendar({
      calendarId: 'to-be-disposed',
      defaultDate: date1,
    });
    expect(cal1New.currentDate.getMonth()).toBe(0); // Back to Jan
  });

  it('should not affect other instances when one is disposed', () => {
    const date1 = new Date(2024, 0, 1);
    const date2 = new Date(2024, 5, 1);

    const cal1 = useCalendar({ calendarId: 'cal-1', defaultDate: date1 });
    const cal2 = useCalendar({ calendarId: 'cal-2', defaultDate: date2 });

    cal1.goToNext();
    cal2.goToNext();

    disposeCalendar('cal-1');

    const cal1Check = useCalendar({ calendarId: 'cal-1', defaultDate: date1 });
    const cal2Check = useCalendar({ calendarId: 'cal-2', defaultDate: date2 });

    expect(cal1Check.currentDate.getMonth()).toBe(0); // Reset to Jan
    expect(cal2Check.currentDate.getMonth()).toBe(6); // Still July (Jun + 1)
  });
});
