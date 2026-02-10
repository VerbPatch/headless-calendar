import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalendarComposable, useCalendar, generateId } from '@verbpatch/angular-calendar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  todayDate = new Date();

  calendarHook: CalendarComposable = useCalendar({
    defaultView: 'custom',
    customViewOptions: { unit: 'day', count: 2 },
    initialEvents: [
      {
        id: '1',
        title: 'Project Review',
        start: new Date(),
        end: new Date(new Date().getTime() + 3600000),
        color: '#8b5cf6',
      },
      {
        id: '2',
        title: 'Lunch Sync',
        start: new Date(new Date().setHours(12, 0)),
        end: new Date(new Date().setHours(13, 0)),
        color: '#10b981',
      },
    ],
  });

  setPreset(unit: 'day' | 'week' | 'month', count: number, include?: number[]) {
    this.calendarHook
      .calendar()
      .changeView('custom', { unit, count, includeSpecificDays: include });
  }

  getMonthsToDisplay() {
    const cal = this.calendarHook.calendar();
    const opts = cal.customViewOptions;
    if (!cal || !opts || opts.unit !== 'month') return [];

    const count = opts.count || 1;
    const months = [];
    for (let i = 0; i < count; i++) {
      const d = cal.utils.addMonths(cal.currentDate, i);
      months.push({
        month: d.getMonth(),
        year: d.getFullYear(),
        date: d,
      });
    }
    return months;
  }

  isSameDay(d1: Date, d2: Date) {
    return this.calendarHook.calendar().utils.isSameDay(d1, d2);
  }

  getDay(week: Date[], dayIdx: number) {
    return week.find((d) => d.getDay() === dayIdx);
  }

  weekHasMonthDays(week: Date[], month: number, year: number) {
    return week.some((d) => d.getMonth() === month && d.getFullYear() === year);
  }

  getEvents(date: Date) {
    return this.calendarHook.calendar().getEventsForDate(date);
  }

  getTitle() {
    const cal = this.calendarHook.calendar();
    const opts = cal.customViewOptions;
    if (!opts) return '';
    if (opts.unit === 'month') return cal.monthData?.monthName;
    if (opts.unit === 'week') return cal.weekData?.weekRange;
    return cal.dayData?.dayName;
  }
}
