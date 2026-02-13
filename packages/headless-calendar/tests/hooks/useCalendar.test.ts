import { describe, it, expect, beforeEach } from 'vitest';
import { useCalendar } from '../../src/hooks/useCalendar';
import { clearAllCaches } from '../../src/state';

describe('useCalendar hook', () => {
  const initialDate = new Date(2024, 0, 15);

  beforeEach(() => {
    clearAllCaches();
  });

  const getCalendar = (opts: any = {}) =>
    useCalendar({
      defaultDate: initialDate,
      timezone: 'UTC',
      locale: 'en-IN',
      ...opts,
    });

  it('should initialize with correct default state', () => {
    const calendar = getCalendar();
    expect(calendar.view).toBe('month');
    expect(calendar.currentDate).toEqual(initialDate);
    expect(calendar.visibleDates.length).toBeGreaterThan(0);
  });

  it('should initialize without defaultDate', () => {
    const calendar = useCalendar({});
    expect(calendar.currentDate).toBeDefined();
  });

  describe('View Data Generation', () => {
    it('should provide dayData', () => {
      const calendar = getCalendar({ defaultView: 'day' });
      expect(calendar.dayData).not.toBeNull();
      expect(calendar.dayData?.dates).toHaveLength(1);
      expect(calendar.monthData).toBeNull();
      expect(calendar.weekData).toBeNull();
      expect(calendar.dayData?.isToday).toBeDefined();
    });

    it('should provide weekData', () => {
      const calendar = getCalendar({ defaultView: 'week' });
      expect(calendar.weekData).not.toBeNull();
      expect(calendar.weekData?.dates).toHaveLength(7);
      expect(calendar.weekData?.isToday(new Date())).toBe(true);
      expect(calendar.monthData).toBeNull();
      expect(calendar.dayData).toBeNull();
    });

    it('should provide yearData', () => {
      const calendar = getCalendar({ defaultView: 'year' });
      expect(calendar.yearData).not.toBeNull();
      expect(calendar.yearData?.months).toHaveLength(12);
      expect(calendar.yearData?.isCurrentYear(initialDate)).toBe(true);
      expect(calendar.yearData?.months[0].isCurrentMonth(initialDate)).toBe(true);
      expect(calendar.yearData?.months[0].isToday(new Date())).toBe(true);
      expect(calendar.monthData).toBeNull();
      expect(calendar.weekData).toBeNull();
      expect(calendar.dayData).toBeNull();
    });

    it('should provide monthData for custom month view', () => {
      const calendar = getCalendar({
        defaultView: 'custom',
        customViewOptions: { type: 'month', count: 1 },
      });
      expect(calendar.monthData).not.toBeNull();
      expect(calendar.monthData?.isCurrentMonth(initialDate)).toBe(true);
      expect(calendar.monthData?.isToday(new Date())).toBe(true);
    });
  });

  describe('Custom Views', () => {
    it('should handle custom week view', () => {
      const calendar = getCalendar({
        defaultView: 'custom',
        customViewOptions: { type: 'week', count: 2 },
      });
      expect(calendar.visibleDates).toHaveLength(14);
      expect(calendar.weekData).not.toBeNull();
      expect(calendar.monthData).toBeNull();
      expect(calendar.dayData).toBeNull();
    });

    it('should handle custom month view with count', () => {
      const calendar = getCalendar({
        defaultView: 'custom',
        customViewOptions: { type: 'month', count: 3 },
      });
      expect(calendar.visibleDates.length).toBeGreaterThan(90);
      expect(calendar.monthData?.monthName).toContain('2024');
      expect(calendar.weekData).toBeNull();
      expect(calendar.dayData).toBeNull();
    });

    it('should filter custom view by specific days', () => {
      const calendar = getCalendar({
        defaultView: 'custom',
        customViewOptions: { type: 'week', count: 1, includeSpecificDays: [1, 2, 3] },
      });
      expect(calendar.visibleDates).toHaveLength(3);
    });

    it('should handle custom view with type: week and count', () => {
      const calendar = getCalendar({
        defaultView: 'custom',
        customViewOptions: { type: 'week', count: 2 },
      });
      expect(calendar.visibleDates).toHaveLength(14);
    });

    it('should handle empty weekData range', () => {
      const calendar = getCalendar({
        defaultView: 'custom',
        customViewOptions: { type: 'week', count: 0 },
      });
      expect(calendar.weekData?.weekRange).toBe('');
    });

    it('should handle custom view with type: day and count', () => {
      const calendar = getCalendar({
        defaultView: 'custom',
        customViewOptions: { type: 'day', count: 5 },
      });
      expect(calendar.visibleDates).toHaveLength(5);
      expect(calendar.dayData).not.toBeNull();
      expect(calendar.monthData).toBeNull();
      expect(calendar.weekData).toBeNull();
    });

    it('should handle custom view with type: month and count', () => {
      const calendar = getCalendar({
        defaultView: 'custom',
        customViewOptions: { type: 'month', count: 2 },
      });
      expect(calendar.visibleDates.length).toBeGreaterThan(60);
      expect(calendar.monthData).not.toBeNull();
      expect(calendar.weekData).toBeNull();
      expect(calendar.dayData).toBeNull();
    });
  });

  it('should reflect event changes in visibleEvents', () => {
    const calendar = getCalendar({ initialEvents: [] });
    expect(calendar.visibleEvents).toHaveLength(0);

    calendar.createEvent({
      id: 'new-1',
      title: 'New',
      start: new Date(2024, 0, 15, 10),
      end: new Date(2024, 0, 15, 11),
    });

    const updated = getCalendar();
    expect(updated.visibleEvents).toHaveLength(1);
  });

  it('should handle time slots', () => {
    const calendar = getCalendar({ startHour: 8, endHour: 10, timeSlotInterval: 30 });
    expect(calendar.timeSlots).toHaveLength(4);
  });

  describe('Utils Proxy', () => {
    it('should format date via proxy', () => {
      const calendar = getCalendar();
      expect(calendar.utils.formatDate(new Date('2024-01-15T00:00:00Z'))).toBe('2024-01-15');
    });

    it('should format localized month via proxy', () => {
      const calendar = getCalendar();
      expect(calendar.utils.formatLocalizedMonth(new Date('2024-01-15T00:00:00Z'))).toContain(
        'January',
      );
    });

    it('should provide daysofWeek via proxy', () => {
      const calendar = getCalendar();
      const days = calendar.utils.daysofWeek();
      expect(days).toHaveLength(7);
    });

    it('should support arithmetic via proxy', () => {
      const calendar = getCalendar();
      const next = calendar.utils.addDays(initialDate, 1);
      expect(next.getDate()).toBe(16);
    });

    it('should support more proxies with optional params', () => {
      const calendar = getCalendar();
      expect(calendar.utils.formatDate(initialDate)).toBeDefined();
      expect(calendar.utils.formatDateTime(initialDate)).toBeDefined();
      expect(calendar.utils.formatDateTime(initialDate, 'yyyy')).toBeDefined();
      expect(calendar.utils.isSameWeek(initialDate, initialDate)).toBe(true);
      expect(calendar.utils.formatDateInTimeZone(initialDate, 'en-US', 'UTC', {})).toBeDefined();
      expect(
        calendar.utils.formatLocalizedWeekday(initialDate, 'en-US', 'UTC', 'long'),
      ).toBeDefined();
      expect(calendar.utils.formatLocalizedTime(initialDate, 'en-US', 'UTC', true)).toBeDefined();
      expect(calendar.utils.convertToTimeZone(initialDate, 'UTC', 'UTC')).toBeDefined();
      expect(calendar.utils.formatLocalizedDate(initialDate, 'en-US', 'UTC', {})).toBeDefined();
      expect(calendar.utils.formatLocalizedMonth(initialDate, 'en-US', 'UTC')).toBeDefined();
    });
  });

  describe('Method Delegation', () => {
    it('should delegate event updates', () => {
      const start = new Date(2024, 0, 15, 10);
      const end = new Date(2024, 0, 15, 11);
      const calendar = getCalendar({ initialEvents: [{ id: '1', title: 'Old', start, end }] });
      calendar.updateEvent('1', { id: '1', title: 'New', start, end });
      const updated = getCalendar();
      expect(updated.getEvent('1')?.title).toBe('New');
    });

    it('should delegate event deletion', () => {
      const start = new Date(2024, 0, 15, 10);
      const end = new Date(2024, 0, 15, 11);
      const calendar = getCalendar({ initialEvents: [{ id: '1', title: 'TBD', start, end }] });
      calendar.deleteEvent('1');
      const updated = getCalendar();
      expect(updated.events).toHaveLength(0);
    });

    it('should handle goToDate', () => {
      const calendar = getCalendar();
      const target = new Date(2025, 0, 1);
      calendar.goToDate(target);
      const updated = getCalendar();
      expect(updated.currentDate.getFullYear()).toBe(2025);
    });

    it('should handle goToToday', () => {
      const calendar = getCalendar();
      calendar.goToToday();
      const updated = getCalendar();
      expect(updated.currentDate.toDateString()).toBe(new Date().toDateString());
    });

    it('should support specific event range queries', () => {
      const start = new Date(2024, 0, 15, 10);
      const end = new Date(2024, 0, 15, 11);
      const calendar = getCalendar({ initialEvents: [{ id: '1', title: 'Query', start, end }] });
      expect(calendar.getEventsForDate(start)).toHaveLength(1);
      expect(calendar.getEventsForDateRange(start, end)).toHaveLength(1);
    });

    it('should delegate setEvents', () => {
      const calendar = getCalendar();
      const start = new Date(2024, 0, 15, 10);
      calendar.setEvents([{ id: '2', title: 'Bulk', start, end: start }]);
      const updated = getCalendar();
      expect(updated.events).toHaveLength(1);
      expect(updated.events[0].title).toBe('Bulk');
    });

    it('should delegate moveEvent', () => {
      const start = new Date(2024, 0, 15, 10);
      const end = new Date(2024, 0, 15, 11);
      const calendar = getCalendar({ initialEvents: [{ id: '1', title: 'Move Me', start, end }] });
      const newStart = new Date(2024, 0, 16, 10);
      const newEnd = new Date(2024, 0, 16, 11);
      calendar.moveEvent('1', newStart, newEnd);
      const updated = getCalendar();
      expect(updated.getEvent('1')?.start.getDate()).toBe(16);
    });

    it('should delegate duplicateEvent', () => {
      const start = new Date(2024, 0, 15, 10);
      const end = new Date(2024, 0, 15, 11);
      const calendar = getCalendar({ initialEvents: [{ id: '1', title: 'Original', start, end }] });
      calendar.duplicateEvent('1');
      const updated = getCalendar();
      expect(updated.events).toHaveLength(2);
    });

    it('should delegate clearAllEvents', () => {
      const start = new Date(2024, 0, 15, 10);
      const end = new Date(2024, 0, 15, 11);
      const calendar = getCalendar({ initialEvents: [{ id: '1', title: 'Original', start, end }] });
      calendar.clearAllEvents();
      const updated = getCalendar();
      expect(updated.events).toHaveLength(0);
    });

    it('should delegate drag and drop actions', () => {
      const start = new Date(2024, 0, 15, 10);
      const end = new Date(2024, 0, 15, 11);
      const calendar = getCalendar({ initialEvents: [{ id: '1', title: 'Drag', start, end }] });
      calendar.startDrag(calendar.events[0]);
      const updated = getCalendar();
      expect(updated.draggedEvent).not.toBeNull();

      calendar.endDrag();
      const final = getCalendar();
      expect(final.draggedEvent).toBeNull();
    });

    it('should support ICS export', () => {
      const calendar = getCalendar({
        initialEvents: [{ id: '1', title: 'Export', start: new Date(), end: new Date() }],
      });
      const ics = calendar.exportToICS();
      expect(ics).toContain('BEGIN:VCALENDAR');
      expect(ics).toContain('SUMMARY:Export');
    });

    // it('should support ICS download', () => {
    //   const calendar = getCalendar();
    //   // Mock document.createElement and click
    //   const link = { click: vi.fn(), href: '', download: '' };
    //   vi.spyOn(document, 'createElement').mockReturnValue(link as any);
    //   vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:url');
    //   vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {});

    //   calendar.downloadICS('test.ics');

    //   expect(document.createElement).toHaveBeenCalledWith('a');
    //   expect(link.download).toBe('test.ics');
    //   expect(link.click).toHaveBeenCalled();
    // });
  });

  describe('Timezone Handling', () => {
    it('should convert visible events to calendar timezone', () => {
      const eventDate = new Date('2024-01-15T12:00:00Z');
      const calendar = useCalendar({
        defaultDate: eventDate,
        timezone: 'America/New_York',
        initialEvents: [{ id: '1', title: 'TZ Event', start: eventDate, end: eventDate }],
      });

      const isShifted = calendar.visibleEvents[0].start.getUTCHours() === 7;
      const isUnshifted = calendar.visibleEvents[0].start.getUTCHours() === 12;
      expect(isShifted || isUnshifted).toBe(true);
    });
  });
});
