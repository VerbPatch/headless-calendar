import { describe, it, expect } from 'vitest';
import { exportToICS, importFromICS } from '../../src/utils/ics';
import { CalendarEvent } from '../../src/types/events';

describe('ICS Utilities (RFC 5545) - 100% Coverage Target', () => {
  const baseEvent: CalendarEvent = {
    id: '1',
    title: 'Test',
    start: new Date(Date.UTC(2024, 0, 15, 10, 0, 0)),
    end: new Date(Date.UTC(2024, 0, 15, 11, 0, 0)),
  };

  describe('exportToICS', () => {
    it('covers formatRRULE all branches', () => {
      // interval
      expect(exportToICS([{ ...baseEvent, recurring: { repeat: 'daily', every: 2 } }])).toContain('INTERVAL=2');
      
      // count
      expect(exportToICS([{ ...baseEvent, recurring: { repeat: 'daily', every: 1, count: 5 } }])).toContain('COUNT=5');

      // until
      expect(exportToICS([{ ...baseEvent, recurring: { repeat: 'daily', every: 1, end: new Date(Date.UTC(2024, 0, 20)) } }])).toContain('UNTIL=20240120');

      // weekly prefix (numeric weekDays, week)
      expect(exportToICS([{ ...baseEvent, recurring: { repeat: 'weekly', every: 1, weekDays: [1], week: 2 } }])).toContain('BYDAY=2MO');
      
      // weekly prefix (string weekDays, week -1)
      expect(exportToICS([{ ...baseEvent, recurring: { repeat: 'weekly', every: 1, weekDays: ['FR'], week: -1 } }])).toContain('BYDAY=-1FR');

      // weekly WITHOUT week prefix
      expect(exportToICS([{ ...baseEvent, recurring: { repeat: 'weekly', every: 1, weekDays: [1, 'WE'] } }])).toContain('BYDAY=MO,WE');

      // empty weekDays array
      expect(exportToICS([{ ...baseEvent, recurring: { repeat: 'weekly', every: 1, weekDays: [] } }])).not.toContain('BYDAY=');

      // byDay array
      expect(exportToICS([{ ...baseEvent, recurring: { repeat: 'monthly', every: 1, byDay: ['MO'] } }])).toContain('BYDAY=MO');
      // byDay array with numbers
      expect(exportToICS([{ ...baseEvent, recurring: { repeat: 'monthly', every: 1, byDay: [2] } }])).toContain('BYDAY=TU');
      // empty byDay array
      expect(exportToICS([{ ...baseEvent, recurring: { repeat: 'monthly', every: 1, byDay: [] } }])).not.toContain('BYDAY=');

      // day property (number)
      expect(exportToICS([{ ...baseEvent, recurring: { repeat: 'monthly', every: 1, day: 10 } }])).toContain('BYMONTHDAY=10');
      // day property (array)
      expect(exportToICS([{ ...baseEvent, recurring: { repeat: 'monthly', every: 1, day: [10, 12] } }])).toContain('BYMONTHDAY=10,12');
      // empty day array
      expect(exportToICS([{ ...baseEvent, recurring: { repeat: 'monthly', every: 1, day: [] } }])).not.toContain('BYMONTHDAY=');

      // byMonthDay array
      expect(exportToICS([{ ...baseEvent, recurring: { repeat: 'monthly', every: 1, byMonthDay: [1, -1] } }])).toContain('BYMONTHDAY=1,-1');
      // empty byMonthDay array
      expect(exportToICS([{ ...baseEvent, recurring: { repeat: 'monthly', every: 1, byMonthDay: [] } }])).not.toContain('BYMONTHDAY=');

      // month property (number)
      expect(exportToICS([{ ...baseEvent, recurring: { repeat: 'yearly', every: 1, month: 5 } }])).toContain('BYMONTH=6');
      // month property (array)
      expect(exportToICS([{ ...baseEvent, recurring: { repeat: 'yearly', every: 1, month: [5, 6] } }])).toContain('BYMONTH=6,7');
      // empty month array
      expect(exportToICS([{ ...baseEvent, recurring: { repeat: 'yearly', every: 1, month: [] } }])).not.toContain('BYMONTH=');

      // byMonth array
      expect(exportToICS([{ ...baseEvent, recurring: { repeat: 'yearly', every: 1, byMonth: [0, 11] } }])).toContain('BYMONTH=1,12');
      // empty byMonth array
      expect(exportToICS([{ ...baseEvent, recurring: { repeat: 'yearly', every: 1, byMonth: [] } }])).not.toContain('BYMONTH=');

      // byYearDay
      expect(exportToICS([{ ...baseEvent, recurring: { repeat: 'yearly', every: 1, byYearDay: [100] } }])).toContain('BYYEARDAY=100');
      // empty byYearDay
      expect(exportToICS([{ ...baseEvent, recurring: { repeat: 'yearly', every: 1, byYearDay: [] } }])).not.toContain('BYYEARDAY=');

      // byWeekNo
      expect(exportToICS([{ ...baseEvent, recurring: { repeat: 'yearly', every: 1, byWeekNo: [20] } }])).toContain('BYWEEKNO=20');
      // empty byWeekNo
      expect(exportToICS([{ ...baseEvent, recurring: { repeat: 'yearly', every: 1, byWeekNo: [] } }])).not.toContain('BYWEEKNO=');

      // bySetPos
      expect(exportToICS([{ ...baseEvent, recurring: { repeat: 'monthly', every: 1, bySetPos: [-1] } }])).toContain('BYSETPOS=-1');
      // empty bySetPos
      expect(exportToICS([{ ...baseEvent, recurring: { repeat: 'monthly', every: 1, bySetPos: [] } }])).not.toContain('BYSETPOS=');

      // wkst
      expect(exportToICS([{ ...baseEvent, recurring: { repeat: 'weekly', every: 1, wkst: 'SU' } }])).toContain('WKST=SU');
    });

    it('covers recurrenceId Date branch', () => {
      expect(exportToICS([{ ...baseEvent, recurrenceId: new Date(Date.UTC(2024, 0, 15, 10, 0, 0)) }])).toContain('RECURRENCE-ID:20240115T100000Z');
      expect(exportToICS([{ ...baseEvent, recurrenceId: 'STRINGID' }])).toContain('RECURRENCE-ID:STRINGID');
    });

    it('covers line folding', () => {
      expect(exportToICS([{ ...baseEvent, description: 'A'.repeat(80) + ' ' + 'B'.repeat(80) }])).toContain('\r\n ');
    });

    it('covers all fields', () => {
      const e: CalendarEvent = {
        ...baseEvent,
        title: 'Title, with; semi\nand newline',
        location: 'L,1',
        url: 'U',
        status: 'CONFIRMED',
        transparency: 'OPAQUE',
        color: '#f00',
        exdate: [new Date(Date.UTC(2024, 0, 16))],
        rdate: [new Date(Date.UTC(2024, 0, 17))]
      };
      const ics = exportToICS([e]);
      expect(ics).toContain('SUMMARY:Title\\, with\\; semi\\nand newline');
      expect(ics).toContain('LOCATION:L\\,1');
      expect(ics).toContain('URL:U');
      expect(ics).toContain('STATUS:CONFIRMED');
      expect(ics).toContain('TRANSP:OPAQUE');
      expect(ics).toContain('X-COLOR:#f00');
      expect(ics).toContain('EXDATE:20240116');
      expect(ics).toContain('RDATE:20240117');
    });

    it('covers formatICSDate allDay', () => {
      const e: CalendarEvent = {
        ...baseEvent,
        allDay: true,
        start: new Date(Date.UTC(2024, 0, 15)),
        end: new Date(Date.UTC(2024, 0, 15)),
        exdate: [new Date(Date.UTC(2024, 0, 16))],
        rdate: [new Date(Date.UTC(2024, 0, 17))],
        recurrenceId: new Date(Date.UTC(2024, 0, 15))
      };
      const ics = exportToICS([e]);
      expect(ics).toContain('DTSTART;VALUE=DATE:20240115');
      expect(ics).toContain('DTEND;VALUE=DATE:20240116');
      expect(ics).toContain('EXDATE:20240116');
      expect(ics).toContain('RDATE:20240117');
      expect(ics).toContain('RECURRENCE-ID:20240115');
    });

    it('covers recurring never and allDay false', () => {
      const e: CalendarEvent = { ...baseEvent, recurring: 'never', allDay: false };
      const ics = exportToICS([e, { ...baseEvent, title: 'S' }]);
      expect(ics).not.toContain('RRULE');
      expect(ics).toContain('SUMMARY:S');
      expect(ics).toContain('DTSTART:20240115T100000Z');
    });
  });

  describe('importFromICS', () => {
    it('covers switch default case and missing currentEvent', () => {
      const ics = [
        'BEGIN:VCALENDAR',
        'RANDOM:KEY',
        'UID:123',
        'SUMMARY:A',
        'DESCRIPTION:B',
        'DTSTART:20240115T100000Z',
        'DTEND:20240115T110000Z',
        'RRULE:FREQ=DAILY',
        'EXDATE:20240116T100000Z',
        'RDATE:20240117T100000Z',
        'RECURRENCE-ID:20240115T100000Z',
        'STATUS:CONFIRMED',
        'TRANSP:OPAQUE',
        'X-COLOR:red',
        'LOCATION:Loc',
        'URL:http://u.com',
        'END:VCALENDAR'
      ].join('\r\n');
      expect(importFromICS(ics)).toHaveLength(0);
    });

    it('covers basic event', () => {
      const ics = [
        'BEGIN:VCALENDAR',
        'BEGIN:VEVENT',
        'UID:U123',
        'SUMMARY:A',
        'DESCRIPTION:B',
        'DTSTART:20240115T100000Z',
        'DTEND:20240115T110000Z',
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');
      const events = importFromICS(ics);
      expect(events[0].id).toBe('U123');
      expect(events[0].title).toBe('A');
      expect(events[0].description).toBe('B');
      expect(events[0].start.getUTCFullYear()).toBe(2024);
      expect(events[0].end.getUTCFullYear()).toBe(2024);
    });

    it('covers all parseRRULE parts and empty RRULE', () => {
      const ics = [
        'BEGIN:VCALENDAR',
        'BEGIN:VEVENT',
        'RRULE:FREQ=DAILY;INTERVAL=2;COUNT=5;UNTIL=20241231T000000Z;BYDAY=MO;BYMONTHDAY=1;BYMONTH=1;BYSETPOS=1;WKST=SU;MALFORMED;=NOKEY',
        'END:VEVENT',
        'BEGIN:VEVENT',
        'RRULE:',
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');
      const events = importFromICS(ics);
      const r = events[0].recurring as any;
      expect(r.repeat).toBe('daily');
      expect(r.every).toBe(2);
      expect(r.count).toBe(5);
      expect(r.end).toBeInstanceOf(Date);
      expect(r.byDay).toEqual(['MO']);
      expect(r.byMonthDay).toEqual([1]);
      expect(r.byMonth).toEqual([0]); // 0-indexed
      expect(r.bySetPos).toEqual([1]);
      expect(r.wkst).toBe('SU');

      const emptyR = events[1].recurring as any;
      expect(emptyR).toBe('never');
    });

    it('covers allDay DTSTART/DTEND param', () => {
      const ics = [
        'BEGIN:VCALENDAR',
        'BEGIN:VEVENT',
        'DTSTART;VALUE=DATE:20240115',
        'DTEND;VALUE=DATE:20240116',
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');
      const e = importFromICS(ics)[0];
      expect(e.allDay).toBe(true);
      expect(e.start.getUTCDate()).toBe(15);
      expect(e.end.getUTCDate()).toBe(15); // inclusive mapping
    });

    it('covers local date times without Z', () => {
      const ics = [
        'BEGIN:VCALENDAR',
        'BEGIN:VEVENT',
        'DTSTART:20240115T100000',
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');
      const e = importFromICS(ics)[0];
      expect(e.start.getFullYear()).toBe(2024);
    });

    it('covers EXDATE/RDATE and metadata', () => {
      const ics = [
        'BEGIN:VCALENDAR',
        'BEGIN:VEVENT',
        'EXDATE:20240116T100000Z,20240117T100000Z',
        'RDATE:20240118T100000Z',
        'STATUS:CONFIRMED',
        'TRANSP:OPAQUE',
        'LOCATION:Virtual',
        'URL:http://example.com',
        'X-COLOR:red',
        'RECURRENCE-ID:20240115T100000Z',
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');
      const e = importFromICS(ics)[0];
      expect(e.exdate).toHaveLength(2);
      expect(e.rdate).toHaveLength(1);
      expect(e.status).toBe('CONFIRMED');
      expect(e.transparency).toBe('OPAQUE');
      expect(e.location).toBe('Virtual');
      expect(e.url).toBe('http://example.com');
      expect(e.color).toBe('red');
      expect(e.recurrenceId).toBeInstanceOf(Date);
    });

    it('covers unescapeICSString', () => {
      const ics = [
        'BEGIN:VCALENDAR',
        'BEGIN:VEVENT',
        'SUMMARY:A\\, B\\; C\\nN',
        'DESCRIPTION:D\\N E',
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');
      const e = importFromICS(ics)[0];
      expect(e.title).toBe('A, B; C\nN');
      expect(e.description).toBe('D\n E');
    });

    it('covers unfolding and skipped lines', () => {
      const ics = [
        'IGNORE ME',
        '',
        'BEGIN:VCALENDAR',
        'BEGIN:VEVENT',
        'SUMMARY:Folded ',
        ' Text',
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');
      expect(importFromICS(ics)[0].title).toBe('Folded Text');
    });

    it('covers empty file', () => {
      expect(importFromICS('')).toHaveLength(0);
    });

    it('covers switch default case and missing currentEvent', () => {
      const ics = [
        'BEGIN:VCALENDAR',
        'RANDOM:KEY',
        'UID:123',
        'SUMMARY:A',
        'DESCRIPTION:B',
        'DTSTART:20240115T100000Z',
        'DTEND:20240115T110000Z',
        'RRULE:FREQ=DAILY',
        'RRULE:',
        'EXDATE:20240116T100000Z',
        'RDATE:20240117T100000Z',
        'RECURRENCE-ID:20240115T100000Z',
        'STATUS:CONFIRMED',
        'TRANSP:OPAQUE',
        'X-COLOR:red',
        'LOCATION:Loc',
        'URL:http://u.com',
        'END:VCALENDAR'
      ].join('\r\n');
      expect(importFromICS(ics)).toHaveLength(0);
    });
  });
});
