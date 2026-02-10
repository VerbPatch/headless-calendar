import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalendarComposable, useCalendar, ViewType } from '@verbpatch/angular-calendar';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgStyle],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  calendarHook: CalendarComposable = useCalendar({
    defaultDate: new Date(),
    defaultView: 'month',
    onDateChange: (date: Date) => console.log('Date updated:', date),
  });

  changeView(event: Event) {
    this.calendarHook.calendar().changeView((event.target as HTMLSelectElement).value as ViewType);
  }

  today(date: Date) {
    return this.calendarHook.calendar().weekData!.isToday(date)
      ? 'font-weight:bold;'
      : '' + 'border-bottom: 1px solid;';
  }

  formatDate(date: Date) {
    return this.calendarHook.calendar().utils.formatDate(date);
  }

  weeks() {
    return this.calendarHook.calendar().utils.daysofWeek('short');
  }
  monthDayStyle(date: Date) {
    return '';
  }
}
