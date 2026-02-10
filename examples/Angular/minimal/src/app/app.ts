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
  calendarHook: CalendarComposable = useCalendar({
    defaultView: 'month',
    startOfWeek: 0,
    locale: 'en-IN',
  });

  get cal() {
    return this.calendarHook.calendar();
  }

  changeView(event: Event) {
    this.cal.changeView((event.target as HTMLSelectElement).value as ViewType);
  }
}