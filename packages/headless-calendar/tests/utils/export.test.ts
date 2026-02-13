import { describe, it, expect } from 'vitest';
import { exportToICS } from '../../src/utils/export';
import { CalendarEvent } from '../../src/types/events';

describe('Export Utilities (RFC 5545)', () => {
  const baseEvent: CalendarEvent = {
    id: '1',
    title: 'Test Event',
    start: new Date('2024-01-15T10:00:00Z'),
    end: new Date('2024-01-15T11:00:00Z'),
  };

  it('should export basic event correctly', () => {
    const ics = exportToICS([baseEvent]);
    expect(ics).toContain('BEGIN:VCALENDAR');
    expect(ics).toContain('VERSION:2.0');
    expect(ics).toContain('BEGIN:VEVENT');
    expect(ics).toContain('DTSTART:20240115T100000Z');
    expect(ics).toContain('DTEND:20240115T110000Z');
    expect(ics).toContain('SUMMARY:Test Event');
    expect(ics).toContain('END:VEVENT');
  });

  it('should handle all-day events with VALUE=DATE', () => {
    const allDay: CalendarEvent = {
      ...baseEvent,
      allDay: true,
      start: new Date('2024-01-15T00:00:00Z'),
      end: new Date('2024-01-15T00:00:00Z'),
    };
    const ics = exportToICS([allDay]);
    expect(ics).toContain('DTSTART;VALUE=DATE:20240115');
    expect(ics).toContain('DTEND;VALUE=DATE:20240116');
  });

  it('should fold long lines', () => {
    const longEvent: CalendarEvent = {
      ...baseEvent,
      title:
        'A very long summary that exceeds seventy five characters to test the line folding mechanism of iCalendar export utility',
    };
    const ics = exportToICS([longEvent]);
    const lines = ics.split('\r\n');
    expect(lines.some((l) => l.length > 75)).toBe(false);
    expect(ics).toContain('\r\n ');
  });

  describe('Recurrence (RRULE)', () => {
    it('should format daily recurrence', () => {
      const event: CalendarEvent = {
        ...baseEvent,
        recurring: { repeat: 'daily', every: 2, count: 5 },
      };
      expect(exportToICS([event])).toContain('RRULE:FREQ=DAILY;INTERVAL=2;COUNT=5');

      const everyDay: CalendarEvent = {
        ...baseEvent,
        recurring: { repeat: 'daily', every: 1 },
      };
      expect(exportToICS([everyDay])).toContain('RRULE:FREQ=DAILY');
      expect(exportToICS([everyDay])).not.toContain('INTERVAL');
    });

    it('should format weekly recurrence', () => {
      const event: CalendarEvent = {
        ...baseEvent,
        recurring: { repeat: 'weekly', every: 1, weekDays: [1, 3] },
      };
      expect(exportToICS([event])).toContain('RRULE:FREQ=WEEKLY;BYDAY=MO,WE');
    });

    it('should format monthly recurrence by day', () => {
      const event: CalendarEvent = {
        ...baseEvent,
        recurring: { repeat: 'monthly', every: 1, day: 15 },
      };
      expect(exportToICS([event])).toContain('RRULE:FREQ=MONTHLY;BYMONTHDAY=15');

      const lastDayEvent: CalendarEvent = {
        ...baseEvent,
        recurring: { repeat: 'monthly', every: 1, day: -1 },
      };
      expect(exportToICS([lastDayEvent])).toContain('RRULE:FREQ=MONTHLY;BYMONTHDAY=-1');
    });

    it('should format monthly recurrence by week position', () => {
      const event: CalendarEvent = {
        ...baseEvent,
        recurring: { repeat: 'monthly', every: 1, weekDays: [1], week: 2 },
      };
      expect(exportToICS([event])).toContain('RRULE:FREQ=MONTHLY;BYDAY=2MO');

      const lastWeekEvent: CalendarEvent = {
        ...baseEvent,
        recurring: { repeat: 'monthly', every: 1, weekDays: [5], week: -1 },
      };
      expect(exportToICS([lastWeekEvent])).toContain('RRULE:FREQ=MONTHLY;BYDAY=-1FR');

      const multiDayWeek: CalendarEvent = {
        ...baseEvent,
        recurring: { repeat: 'monthly', every: 1, weekDays: [1, 3], week: 3 },
      };
      expect(exportToICS([multiDayWeek])).toContain('RRULE:FREQ=MONTHLY;BYDAY=3MO,3WE');
    });

    it('should format yearly recurrence', () => {
      const event: CalendarEvent = {
        ...baseEvent,
        recurring: { repeat: 'yearly', every: 1, month: 0, day: 1 },
      };
      expect(exportToICS([event])).toContain('RRULE:FREQ=YEARLY;BYMONTHDAY=1;BYMONTH=1');

      const yearlyWeekEvent: CalendarEvent = {
        ...baseEvent,
        recurring: { repeat: 'yearly', every: 1, month: 2, weekDays: [0], week: 1 },
      };
      expect(exportToICS([yearlyWeekEvent])).toContain('RRULE:FREQ=YEARLY;BYDAY=1SU;BYMONTH=3');
    });

    it('should handle UNTIL in recurrence', () => {
      const event: CalendarEvent = {
        ...baseEvent,
        recurring: { repeat: 'daily', every: 1, end: new Date('2024-12-31T23:59:59Z') },
      };
      expect(exportToICS([event])).toContain('RRULE:FREQ=DAILY;UNTIL=20241231T235959Z');
    });
  });

  it('should include location and url', () => {
    const event: CalendarEvent = {
      ...baseEvent,
      location: 'Virtual',
      url: 'https://example.com',
    };
    const ics = exportToICS([event]);
    expect(ics).toContain('LOCATION:Virtual');
    expect(ics).toContain('URL:https://example.com');
  });

  describe('RFC 5545 Compliance', () => {
    it('should export EXDATE', () => {
      const event: CalendarEvent = {
        ...baseEvent,
        exdate: [new Date('2024-01-16T10:00:00Z'), new Date('2024-01-17T10:00:00Z')],
      };
      const ics = exportToICS([event]);
      expect(ics).toContain('EXDATE:20240116T100000Z,20240117T100000Z');
    });

    it('should export RDATE', () => {
      const event: CalendarEvent = {
        ...baseEvent,
        rdate: [new Date('2024-01-20T10:00:00Z')],
      };
      const ics = exportToICS([event]);
      expect(ics).toContain('RDATE:20240120T100000Z');
    });

    it('should export STATUS and TRANSP', () => {
      const event: CalendarEvent = {
        ...baseEvent,
        status: 'CONFIRMED',
        transparency: 'OPAQUE',
      };
      const ics = exportToICS([event]);
      expect(ics).toContain('STATUS:CONFIRMED');
      expect(ics).toContain('TRANSP:OPAQUE');
    });

    it('should export RECURRENCE-ID', () => {
      const event: CalendarEvent = {
        ...baseEvent,
        recurrenceId: new Date('2024-01-15T10:00:00Z'),
      };
      const ics = exportToICS([event]);
      expect(ics).toContain('RECURRENCE-ID:20240115T100000Z');
    });

    it('should format RRULE with BYSETPOS and WKST', () => {
      const event: CalendarEvent = {
        ...baseEvent,
        recurring: {
          repeat: 'monthly',
          every: 1,
          byDay: ['SU'],
          bySetPos: [-1],
          wkst: 'MO',
        },
      };
      const ics = exportToICS([event]);
      expect(ics).toContain('RRULE:FREQ=MONTHLY;BYDAY=SU;BYSETPOS=-1;WKST=MO');
    });

    it('should handle BYDAY string format', () => {
      const event: CalendarEvent = {
        ...baseEvent,
        recurring: {
          repeat: 'monthly',
          every: 1,
          weekDays: ['1SU', '-1MO'],
        },
      };
      const ics = exportToICS([event]);
      expect(ics).toContain('RRULE:FREQ=MONTHLY;BYDAY=1SU,-1MO');
    });

    it('should format RRULE with byDay only (no weekDays)', () => {
      const event: CalendarEvent = {
        ...baseEvent,
        recurring: { repeat: 'monthly', every: 1, byDay: ['MO'] },
      };
      const ics = exportToICS([event]);
      expect(ics).toContain('RRULE:FREQ=MONTHLY;BYDAY=MO');
    });

    it('should format RRULE with byMonthDay array', () => {
      const event: CalendarEvent = {
        ...baseEvent,
        recurring: { repeat: 'monthly', every: 1, byMonthDay: [1, 15] },
      };
      const ics = exportToICS([event]);
      expect(ics).toContain('RRULE:FREQ=MONTHLY;BYMONTHDAY=1,15');
    });

    it('should format RRULE with byMonth array', () => {
      // 0-indexed in object (Jan=0, Feb=1), 1-indexed in export
      const event: CalendarEvent = {
        ...baseEvent,
        recurring: { repeat: 'yearly', every: 1, byMonth: [0, 11] },
      };
      const ics = exportToICS([event]);
      expect(ics).toContain('RRULE:FREQ=YEARLY;BYMONTH=1,12');
    });

    it('should format RRULE with byYearDay', () => {
      const event: CalendarEvent = {
        ...baseEvent,
        recurring: { repeat: 'yearly', every: 1, byYearDay: [1, -1] },
      };
      const ics = exportToICS([event]);
      expect(ics).toContain('RRULE:FREQ=YEARLY;BYYEARDAY=1,-1');
    });

    it('should format RRULE with byWeekNo', () => {
      const event: CalendarEvent = {
        ...baseEvent,
        recurring: { repeat: 'yearly', every: 1, byWeekNo: [1, 52] },
      };
      const ics = exportToICS([event]);
      expect(ics).toContain('RRULE:FREQ=YEARLY;BYWEEKNO=1,52');
    });

    it('should handle empty exdate/rdate arrays', () => {
      const event: CalendarEvent = {
        ...baseEvent,
        exdate: [],
        rdate: [],
      };
      const ics = exportToICS([event]);
      expect(ics).not.toContain('EXDATE');
      expect(ics).not.toContain('RDATE');
    });

    it('should prefer bySetPos over legacy week prefix in BYDAY', () => {
      const event: CalendarEvent = {
        ...baseEvent,
        recurring: {
          repeat: 'monthly',
          every: 1,
          weekDays: [1], // Monday
          week: 1, // Legacy "1st"
          bySetPos: [1], // RFC "1st"
        },
      };
      const ics = exportToICS([event]);
      // Should output BYDAY=MO;BYSETPOS=1 (or similar) NOT BYDAY=1MO
      // My implementation outputs BYDAY=MO first, then BYSETPOS=1 later.
      expect(ics).toContain('BYDAY=MO');
      expect(ics).not.toContain('BYDAY=1MO');
      expect(ics).toContain('BYSETPOS=1');
    });

    it('should format EXDATE with all-day event (DATE value)', () => {
      const event: CalendarEvent = {
        ...baseEvent,
        allDay: true,
        exdate: [new Date('2024-01-16T00:00:00Z')],
      };
      const ics = exportToICS([event]);
      // Should look like EXDATE:20240116
      // Note: formatICSDate for allDay uses yyyyMMdd
      expect(ics).toContain('EXDATE:20240116');
    });

    it('should apply legacy week prefix to string weekDays', () => {
      const event: CalendarEvent = {
        ...baseEvent,
        recurring: {
          repeat: 'monthly',
          every: 1,
          weekDays: ['SU'], // String format
          week: 1, // Legacy prefix
        },
      };
      const ics = exportToICS([event]);
      // Should prefix 'SU' with '1' -> '1SU'
      expect(ics).toContain('BYDAY=1SU');
    });

    it('should export DESCRIPTION and X-COLOR', () => {
      const event: CalendarEvent = {
        ...baseEvent,
        description: 'This is a description',
        color: '#ff0000',
      };
      const ics = exportToICS([event]);
      expect(ics).toContain('DESCRIPTION:This is a description');
      expect(ics).toContain('X-COLOR:#ff0000');
    });
  });
});
