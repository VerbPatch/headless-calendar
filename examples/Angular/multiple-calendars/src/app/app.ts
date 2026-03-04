import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CalendarInstanceComponent } from './calendar-instance.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CalendarInstanceComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div style="padding: 20px; font-family: sans-serif; color: #333">
      <h1>Multiple Calendars Example</h1>
      <p style="color: #666; margin-bottom: 30px">
        Each calendar below has a unique <code>calendarId</code> and maintains its own independent
        state (date, view, etc.).
      </p>

      <div style="display: flex; gap: 30px; flex-wrap: wrap">
        <calendar-instance calendarId="calendar-left" title="Left Calendar"></calendar-instance>
        <calendar-instance calendarId="calendar-right" title="Right Calendar"></calendar-instance>
      </div>

      <div style="margin-top: 50px; border-top: 1px solid #eee; padding-top: 30px">
        <h2>Default Calendar</h2>
        <p style="color: #666">
          This one uses the default ID. If you added another one without an ID, they would conflict.
        </p>
        <calendar-instance
          calendarId="default-calendar"
          title="Standard Calendar"
        ></calendar-instance>
      </div>
    </div>
  `,
})
export class App {}
