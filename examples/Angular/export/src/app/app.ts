import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CalendarComposable, useCalendar, ViewType } from '@verbpatch/angular-calendar';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  tzDate = new Date(new Date().setHours(20, 0, 0, 0));
  tzEndDate = new Date(new Date().setHours(21, 0, 0, 0));

  calendarHook: CalendarComposable = useCalendar({
    defaultView: 'month',
    startOfWeek: 0,
    locale: 'en-IN',
    initialEvents: [
      {
        id: '1',
        title: 'Simple Meeting',
        description: 'Single-day 1 hour event',
        start: new Date(new Date().setHours(9, 0, 0, 0)),
        end: new Date(new Date().setHours(10, 0, 0, 0)),
        color: '#E6194B',
      },
      {
        id: '2',
        title: 'Company Holiday',
        description: 'All-day event',
        start: new Date(),
        end: new Date(),
        allDay: true,
        color: '#FFE119',
      },
      {
        id: '3',
        title: 'Business Trip',
        description: 'Multi-day event',
        start: new Date(new Date().setHours(9, 0, 0, 0)),
        end: new Date(
          new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000).setHours(17, 0, 0, 0),
        ),
        color: '#4363D8',
      },
      {
        id: '4',
        title: 'Daily Standup',
        description: 'Daily Standup (Weekdays only)',
        start: new Date(new Date().setHours(10, 0, 0, 0)),
        end: new Date(new Date().setHours(10, 30, 0, 0)),
        color: '#F58231',
        recurring: {
          repeat: 'weekly',
          every: 1,
          weekDays: [1, 2, 3, 4, 5],
        },
      },
      {
        id: '5',
        title: 'Weekly Planning',
        description: 'Weekly recurring event',
        start: new Date(new Date().setHours(14, 0, 0, 0)),
        end: new Date(new Date().setHours(15, 0, 0, 0)),
        color: '#911EB4',
        recurring: {
          repeat: 'weekly',
          every: 1,
          weekDays: [1],
          end: new Date(new Date().getFullYear(), 11, 31),
        },
      },
      {
        id: '6',
        title: 'Monthly Payday',
        description: 'Monthly by day 25',
        start: new Date(new Date().setDate(25)),
        end: new Date(new Date().setDate(25)),
        allDay: true,
        color: '#42D4F4',
        recurring: {
          repeat: 'monthly',
          every: 1,
          day: 25,
        },
      },
      {
        id: '7',
        title: 'Team Lunch',
        description: 'Monthly by week position (2nd Friday)',
        start: new Date(new Date().setHours(12, 0, 0, 0)),
        end: new Date(new Date().setHours(13, 0, 0, 0)),
        color: '#F032E6',
        recurring: {
          repeat: 'monthly',
          every: 1,
          week: 2,
          weekDays: [5],
        },
      },
      {
        id: '8',
        title: 'New Year Party',
        description: 'Yearly recurring',
        start: new Date(new Date().getFullYear(), 0, 1),
        end: new Date(new Date().getFullYear(), 0, 1),
        allDay: true,
        color: '#9A6324',
        recurring: {
          repeat: 'yearly',
          every: 1,
          month: 0,
          day: 1,
        },
      },
      {
        id: '9',
        title: 'Client Demo',
        description: 'Rich metadata',
        start: new Date(new Date().setHours(15, 0, 0, 0)),
        end: new Date(new Date().setHours(16, 0, 0, 0)),
        location: 'Conference Room A',
        url: 'https://example.com/meeting',
        color: '#000075',
      },
      {
        id: '10',
        title: 'Global Sync',
        description: `Late night sync for global teams, Timezone specific.`,
        start: this.tzDate,
        end: this.tzEndDate,
        color: '#64748b',
        timezone: 'America/New_York',
      },
      {
        id: '11',
        title: 'Daily Huddle (Excl. specific days)',
        description: 'Recurring with EXDATE (Exclude specific dates)',
        start: new Date(new Date().setHours(9, 30, 0, 0)),
        end: new Date(new Date().setHours(9, 45, 0, 0)),
        color: '#db2777',
        recurring: {
          repeat: 'daily',
          every: 1,
        },
        exdate: [
          new Date(new Date().setDate(new Date().getDate() + 2)),
          new Date(new Date().setDate(new Date().getDate() + 4)),
        ],
      },
      {
        id: '12',
        title: 'Ad-hoc Review',
        description: 'Recurring with RDATE (Additional dates)',
        start: new Date(new Date().setHours(13, 0, 0, 0)),
        end: new Date(new Date().setHours(14, 0, 0, 0)),
        color: '#d97706',
        recurring: {
          repeat: 'weekly',
          every: 1,
          weekDays: [3],
        },
        rdate: [new Date(new Date().setDate(new Date().getDate() + 1))],
      },

      {
        id: '13',
        title: 'Tentative Monthly Sync',
        description: 'Test: Strict RFC RRULE with Status & Transparency',
        start: new Date(new Date().setHours(11, 0, 0, 0)),
        end: new Date(new Date().setHours(12, 0, 0, 0)),
        color: '#7c3aed',

        recurring: {
          repeat: 'monthly',
          every: 1,
          byDay: ['1FR'],
        },
        status: 'TENTATIVE',
        transparency: 'TRANSPARENT',
      },
      {
        id: '14',
        title: 'Rescheduled Instance',
        description:
          'This specific instance was moved to 3pm, Recurrence Exception (RECURRENCE-ID) representation',
        start: new Date(new Date().setHours(15, 0, 0, 0)),
        end: new Date(new Date().setHours(16, 0, 0, 0)),
        color: '#059669',
        recurrenceId: new Date(new Date().setHours(14, 0, 0, 0)),
      },
    ],
  });

  get cal() {
    return this.calendarHook.calendar();
  }

  changeView(event: Event) {
    this.cal.changeView((event.target as HTMLSelectElement).value as ViewType);
  }

  formatRecurrence(r: any) {
    if (!r || r === 'never') return 'None';

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    const getNth = (n: number) => {
      if (n === -1) return 'last';
      const suffixes = ['th', 'st', 'nd', 'rd'];
      const v = n % 100;
      return n + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
    };

    const formatDays = (dList: any[]) => {
      if (!dList) return '';

      const dayMap = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

      return dList
        .map((d) => {
          if (typeof d === 'number') return days[d];
          const match = d.match(/^(-?\d+)([A-Z]{2})$/);
          if (match) {
            const nth = parseInt(match[1], 10);
            const dayIndex = dayMap.indexOf(match[2]);
            return `${getNth(nth)} ${days[dayIndex]}`;
          }
          return d;
        })
        .join(', ');
    };

    let desc = '';

    if (r.repeat === 'daily') {
      desc = r.every > 1 ? `Every ${r.every} days` : 'Daily';
    } else if (r.repeat === 'weekly') {
      desc = r.every > 1 ? `Every ${r.every} weeks` : 'Weekly';
      if (r.weekDays) desc += ` on ${formatDays(r.weekDays)}`;
    } else if (r.repeat === 'monthly') {
      desc = r.every > 1 ? `Every ${r.every} months` : 'Monthly';
      if (r.day) {
        desc += ` on day ${r.day}`;
      } else if (r.week && r.weekDays) {
        desc += ` on the ${getNth(r.week)} ${formatDays(r.weekDays)}`;
      } else if (r.byDay) {
        desc += ` on ${formatDays(r.byDay)}`;
      }
    } else if (r.repeat === 'yearly') {
      desc = r.every > 1 ? `Every ${r.every} years` : 'Yearly';
      if (r.month !== undefined) {
        const mList = Array.isArray(r.month) ? r.month : [r.month];
        desc += ` in ${mList.map((m: number) => months[m]).join(', ')}`;
      }
      if (r.day) {
        desc += ` on day ${r.day}`;
      } else if (r.week && r.weekDays) {
        desc += ` on the ${getNth(r.week)} ${formatDays(r.weekDays)}`;
      }
    }

    if (r.count) desc += `, ${r.count} times`;
    if (r.end) desc += `, until ${new Date(r.end).toLocaleDateString()}`;

    return desc;
  }

  getEventTimeDisplay(e: any) {
    const utils = this.cal.utils;
    if (e.allDay) {
      let display = `${utils.formatDate(e.start)} All Day`;
      if (!utils.isSameDay(e.start, e.end)) {
        display = `${utils.formatDate(e.start)} - ${utils.formatDate(e.end)} All Day`;
      }
      return display;
    } else {
      const startDate = utils.formatDate(e.start);
      const startTime = utils.formatLocalizedTime(e.start, undefined, undefined, false);
      if (utils.isSameDay(e.start, e.end)) {
        const endTime = utils.formatLocalizedTime(e.end, undefined, undefined, false);
        return `${startDate} ${startTime} - ${endTime}`;
      } else {
        const endDate = utils.formatDate(e.end);
        const endTime = utils.formatLocalizedTime(e.end, undefined, undefined, false);
        return `${startDate} ${startTime} - ${endDate} ${endTime}`;
      }
    }
  }

  isEventInSlot(event: any, date: Date, slot: any) {
    if (event.allDay) return false;
    const interval = this.cal.timeSlotInterval || 60;
    const slotStart = new Date(date);
    slotStart.setHours(slot.hour, slot.minute, 0, 0);
    const slotEnd = new Date(slotStart.getTime() + interval * 60000);
    const eventStart = new Date(event.start);
    const eventEnd = new Date(event.end);
    return eventStart < slotEnd && eventEnd > slotStart;
  }

  getEventsAtSlot(date: Date, slot: any) {
    return this.cal.getEventsForDate(date).filter((ev) => this.isEventInSlot(ev, date, slot));
  }

  getAllDayEvents(date: Date) {
    return this.cal.getEventsForDate(date).filter((ev) => ev.allDay);
  }

  formatRecurrenceId(id: any): string {
    return id instanceof Date ? id.toISOString() : id;
  }
}
