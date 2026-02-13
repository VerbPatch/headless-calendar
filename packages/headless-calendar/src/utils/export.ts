import { dayMap } from '../constants/time';
import { CalendarEvent, CalendarEventOccurance } from '../types/events';
import { formatDate, formatDateTime } from './date';

/**
 * Formats a Date object into an iCalendar-compliant string.
 * @param date - The date to format.
 * @param allDay - Whether the event is all-day.
 * @returns An iCalendar-formatted date string.
 */
const formatICSDate = (date: Date, allDay: boolean = false): string => {
  if (allDay) {
    return formatDate(date, { format: 'yyyyMMdd', timeZone: 'UTC' });
  }

  return formatDateTime(date, { format: 'yyyyMMddTHHmmssZ', timeZone: 'UTC' });
};

/**
 * Escapes special characters for iCalendar strings.
 */
const escapeICSString = (str: string): string => {
  return str.replace(/[\\,;]/g, (match) => `\\${match}`).replace(/\n/g, '\\n');
};

/**
 * Folds a line according to RFC 5545 (max 75 octets).
 */
const foldLine = (line: string): string => {
  if (line.length <= 75) return line;

  const parts = [];
  let current = line;

  while (current.length > 75) {
    // Basic folding: take 75 chars, then next line starts with a space
    // Note: This doesn't account for multi-byte UTF-8 character splitting perfectly
    // but is standard for basic JS string lengths.
    parts.push(current.substring(0, 75));
    current = ' ' + current.substring(75);
  }
  parts.push(current);
  return parts.join('\r\n');
};

/**
 * Formats a recurrence rule into RFC 5545 RRULE string.
 */
const formatRRULE = (recurring: CalendarEventOccurance | 'never'): string | null => {
  if (recurring === 'never') return null;

  const parts: string[] = [];

  parts.push(`FREQ=${recurring.repeat.toUpperCase()}`);

  if (recurring.every > 1) {
    parts.push(`INTERVAL=${recurring.every}`);
  }

  if (recurring.count) {
    parts.push(`COUNT=${recurring.count}`);
  } else if (recurring.end) {
    parts.push(`UNTIL=${formatICSDate(recurring.end)}`);
  }

  if (recurring.weekDays && recurring.weekDays.length > 0) {
    const byDay = recurring.weekDays.map((d) => {
      if (typeof d === 'number') return dayMap[d];
      return d;
    });

    if (recurring.week !== undefined && !recurring.bySetPos) {
      const prefix = recurring.week === -1 ? '-1' : recurring.week;
      const prefixedDays = recurring.weekDays.map((d) => {
        if (typeof d === 'number') return `${prefix}${dayMap[d]}`;
        return `${prefix}${d}`;
      });
      parts.push(`BYDAY=${prefixedDays.join(',')}`);
    } else {
      parts.push(`BYDAY=${byDay.join(',')}`);
    }
  } else if (recurring.byDay && recurring.byDay.length > 0) {
    const formattedByDay = recurring.byDay.map((d) => {
      if (typeof d === 'number') return dayMap[d];
      return d;
    });
    parts.push(`BYDAY=${formattedByDay.join(',')}`);
  }

  if (recurring.day !== undefined) {
    const days = Array.isArray(recurring.day) ? recurring.day : [recurring.day];
    parts.push(`BYMONTHDAY=${days.join(',')}`);
  } else if (recurring.byMonthDay && recurring.byMonthDay.length > 0) {
    parts.push(`BYMONTHDAY=${recurring.byMonthDay.join(',')}`);
  }

  if (recurring.month !== undefined) {
    const months = Array.isArray(recurring.month) ? recurring.month : [recurring.month];
    parts.push(`BYMONTH=${months.map((m) => m + 1).join(',')}`);
  } else if (recurring.byMonth && recurring.byMonth.length > 0) {
    parts.push(`BYMONTH=${recurring.byMonth.map((m) => m + 1).join(',')}`);
  }

  if (recurring.byYearDay && recurring.byYearDay.length > 0) {
    parts.push(`BYYEARDAY=${recurring.byYearDay.join(',')}`);
  }

  if (recurring.byWeekNo && recurring.byWeekNo.length > 0) {
    parts.push(`BYWEEKNO=${recurring.byWeekNo.join(',')}`);
  }

  if (recurring.bySetPos && recurring.bySetPos.length > 0) {
    parts.push(`BYSETPOS=${recurring.bySetPos.join(',')}`);
  }

  if (recurring.wkst) {
    parts.push(`WKST=${recurring.wkst}`);
  }

  return `RRULE:${parts.join(';')}`;
};

/**
 * Exports an array of calendar events to iCalendar (.ics) format.
 */
export const exportToICS = (
  events: CalendarEvent[],
  prodId: string = '-//VerbPatch//Headless Calendar//EN',
): string => {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    `PRODID:${prodId}`,
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
  ];

  events.forEach((event) => {
    lines.push('BEGIN:VEVENT');
    lines.push(`UID:${event.id}`);
    lines.push(`DTSTAMP:${formatICSDate(new Date())}`);

    if (event.allDay) {
      lines.push(`DTSTART;VALUE=DATE:${formatICSDate(event.start, true)}`);
      const endDate = new Date(event.end);
      endDate.setDate(endDate.getDate() + 1);
      lines.push(`DTEND;VALUE=DATE:${formatICSDate(endDate, true)}`);
    } else {
      lines.push(`DTSTART:${formatICSDate(event.start)}`);
      lines.push(`DTEND:${formatICSDate(event.end)}`);
    }

    lines.push(`SUMMARY:${escapeICSString(event.title)}`);

    if (event.description) {
      lines.push(`DESCRIPTION:${escapeICSString(event.description)}`);
    }

    if (event.color) {
      lines.push(`X-COLOR:${event.color}`);
    }

    if (event.recurring && event.recurring !== 'never') {
      const rrule = formatRRULE(event.recurring);
      if (rrule) lines.push(rrule);
    }

    if (event.exdate && event.exdate.length > 0) {
      const exdates = event.exdate.map((d) => formatICSDate(d, event.allDay)).join(',');
      lines.push(`EXDATE:${exdates}`);
    }

    if (event.rdate && event.rdate.length > 0) {
      const rdates = event.rdate.map((d) => formatICSDate(d, event.allDay)).join(',');
      lines.push(`RDATE:${rdates}`);
    }

    if (event.recurrenceId) {
      const rid =
        event.recurrenceId instanceof Date
          ? formatICSDate(event.recurrenceId, event.allDay)
          : event.recurrenceId;
      lines.push(`RECURRENCE-ID:${rid}`);
    }

    if (event.status) {
      lines.push(`STATUS:${event.status}`);
    }

    if (event.transparency) {
      lines.push(`TRANSP:${event.transparency}`);
    }

    if (event.location) lines.push(`LOCATION:${escapeICSString(event.location)}`);
    if (event.url) lines.push(`URL:${escapeICSString(event.url)}`);

    lines.push('END:VEVENT');
  });

  lines.push('END:VCALENDAR');

  return lines.map(foldLine).join('\r\n');
};
