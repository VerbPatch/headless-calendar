import { dayMap } from '../constants/time';
import { CalendarEvent, CalendarEventOccurance } from '../types/events';
import { formatDate, formatDateTime } from './date';

/**
 * Escapes special characters for iCalendar strings.
 */
const escapeICSString = (str: string): string => {
  return str.replace(/[\\,;]/g, (match) => `\\${match}`).replace(/\n/g, '\\n');
};

/**
 * Unescapes special characters in an ICS string.
 */
const unescapeICSString = (str: string): string => {
  return str.replace(/\\([\\,;nN])/g, (_, match) => {
    if (match.toLowerCase() === 'n') return '\n';
    return match;
  });
};

/**
 * Folds a line according to RFC 5545 (max 75 octets).
 */
const foldLine = (line: string): string => {
  if (line.length <= 75) return line;

  const parts = [];
  let current = line;

  while (current.length > 75) {
    parts.push(current.substring(0, 75));
    current = ' ' + current.substring(75);
  }
  parts.push(current);
  return parts.join('\r\n');
};

/**
 * Unfolds folded lines in an ICS file.
 */
const unfoldICS = (icsContent: string): string => {
  return icsContent.replace(/\r?\n /g, '');
};

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
  } else {
    if (recurring.byDay && recurring.byDay.length > 0) {
      const formattedByDay = recurring.byDay.map((d) => {
        if (typeof d === 'number') return dayMap[d];
        return d;
      });
      parts.push(`BYDAY=${formattedByDay.join(',')}`);
    }
  }

  if (recurring.day !== undefined) {
    const days = Array.isArray(recurring.day) ? recurring.day : [recurring.day];
    if (days.length > 0) parts.push(`BYMONTHDAY=${days.join(',')}`);
  } else if (recurring.byMonthDay && recurring.byMonthDay.length > 0) {
    parts.push(`BYMONTHDAY=${recurring.byMonthDay.join(',')}`);
  }

  if (recurring.month !== undefined) {
    const months = Array.isArray(recurring.month) ? recurring.month : [recurring.month];
    if (months.length > 0) parts.push(`BYMONTH=${months.map((m: number) => m + 1).join(',')}`);
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
 * Parses an iCalendar-formatted date string into a JavaScript Date object.
 * Handles DATE (YYYYMMDD) and DATE-TIME (YYYYMMDDTHHMMSSZ) formats.
 */
const parseICSDate = (icsDate: string): Date => {
  const year = parseInt(icsDate.substring(0, 4), 10);
  const month = parseInt(icsDate.substring(4, 6), 10) - 1;
  const day = parseInt(icsDate.substring(6, 8), 10);

  if (icsDate.includes('T')) {
    const hour = parseInt(icsDate.substring(9, 11), 10);
    const minute = parseInt(icsDate.substring(11, 13), 10);
    const second = parseInt(icsDate.substring(13, 15), 10);
    const isUTC = icsDate.endsWith('Z');

    if (isUTC) {
      return new Date(Date.UTC(year, month, day, hour, minute, second));
    }
    return new Date(year, month, day, hour, minute, second);
  }

  return new Date(Date.UTC(year, month, day));
};

/**
 * Parses an RFC 5545 RRULE string into a CalendarEventOccurance object.
 */
const parseRRULE = (rrule: string): CalendarEventOccurance | 'never' => {
  if (!rrule) return 'never';

  const parts = rrule.replace(/^RRULE:/i, '').split(';');
  const rule: any = { every: 1 };

  parts.forEach((part) => {
    const [key, value] = part.split('=');
    if (!key || !value) return;
    switch (key.toUpperCase()) {
      case 'FREQ':
        rule.repeat = value.toLowerCase();
        break;
      case 'INTERVAL':
        rule.every = parseInt(value, 10);
        break;
      case 'COUNT':
        rule.count = parseInt(value, 10);
        break;
      case 'UNTIL':
        rule.end = parseICSDate(value);
        break;
      case 'BYDAY':
        rule.byDay = value.split(',');
        break;
      case 'BYMONTHDAY':
        rule.byMonthDay = value.split(',').map((v) => parseInt(v, 10));
        break;
      case 'BYMONTH':
        rule.byMonth = value.split(',').map((v) => parseInt(v, 10) - 1);
        break;
      case 'BYSETPOS':
        rule.bySetPos = value.split(',').map((v) => parseInt(v, 10));
        break;
      case 'WKST':
        rule.wkst = value.toUpperCase();
        break;
    }
  });

  return rule as CalendarEventOccurance;
};

/**
 * Exports an array of calendar events to iCalendar (.ics) format, RFC5545.
 * @link https://datatracker.ietf.org/doc/html/rfc5545
 * @group calendar-events
 * @title exportToICS
 * @description Exports an array of calendar events to iCalendar (.ics) format.
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

    if (event.recurring) {
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

/**
 * Imports events from an iCalendar (.ics) string.
 * @param {string} icsContent - RFC5545 (link: https://datatracker.ietf.org/doc/html/rfc5545) standard content.
 * @returns {CalendarEvent} - ics content converted to calendarevent in array
 * @group calendar-events
 * @title importFromICS
 * @description Imports events from an iCalendar (.ics) string.
 */
export const importFromICS = (icsContent: string): CalendarEvent[] => {
  const unfolded = unfoldICS(icsContent);
  const lines = unfolded.split(/\r?\n/);
  const events: CalendarEvent[] = [];
  let currentEvent: any = null;

  lines.forEach((line) => {
    if (!line.trim()) return;

    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) return;

    const keyPart = line.substring(0, colonIndex);
    const value = line.substring(colonIndex + 1);

    const [key, ...params] = keyPart.split(';');

    switch (key.toUpperCase()) {
      case 'BEGIN':
        if (value.toUpperCase() === 'VEVENT') {
          currentEvent = {
            id: '',
            title: '',
            start: new Date(),
            end: new Date(),
            allDay: false,
          };
        }
        break;
      case 'END':
        if (value.toUpperCase() === 'VEVENT' && currentEvent) {
          events.push(currentEvent as CalendarEvent);
          currentEvent = null;
        }
        break;
      case 'UID':
        if (currentEvent) currentEvent.id = value;
        break;
      case 'SUMMARY':
        if (currentEvent) currentEvent.title = unescapeICSString(value);
        break;
      case 'DESCRIPTION':
        if (currentEvent) currentEvent.description = unescapeICSString(value);
        break;
      case 'DTSTART':
        if (currentEvent) {
          currentEvent.start = parseICSDate(value);
          if (params.some((p) => p.toUpperCase() === 'VALUE=DATE')) {
            currentEvent.allDay = true;
          }
        }
        break;
      case 'DTEND':
        if (currentEvent) {
          let end = parseICSDate(value);
          if (params.some((p) => p.toUpperCase() === 'VALUE=DATE')) {
            end = new Date(end);
            end.setDate(end.getDate() - 1);
            currentEvent.allDay = true;
          }
          currentEvent.end = end;
        }
        break;
      case 'RRULE':
        if (currentEvent) currentEvent.recurring = parseRRULE(value);
        break;
      case 'EXDATE':
        if (currentEvent) {
          const dates = value.split(',').map(parseICSDate);
          currentEvent.exdate = [...(currentEvent.exdate || []), ...dates];
        }
        break;
      case 'RDATE':
        if (currentEvent) {
          const dates = value.split(',').map(parseICSDate);
          currentEvent.rdate = [...(currentEvent.rdate || []), ...dates];
        }
        break;
      case 'RECURRENCE-ID':
        if (currentEvent) currentEvent.recurrenceId = parseICSDate(value);
        break;
      case 'STATUS':
        if (currentEvent) currentEvent.status = value.toUpperCase();
        break;
      case 'TRANSP':
        if (currentEvent) currentEvent.transparency = value.toUpperCase();
        break;
      case 'X-COLOR':
        if (currentEvent) currentEvent.color = value;
        break;
      case 'LOCATION':
        if (currentEvent) currentEvent.location = unescapeICSString(value);
        break;
      case 'URL':
        if (currentEvent) currentEvent.url = unescapeICSString(value);
        break;
      default:
        break;
    }
  });

  return events;
};
