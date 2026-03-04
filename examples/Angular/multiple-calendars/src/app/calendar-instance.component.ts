import { Component, ChangeDetectionStrategy, Input, OnInit } from '@angular/core';
import { CalendarComposable, useCalendar, ViewType } from '@verbpatch/angular-calendar';
import { NgStyle, NgIf, NgFor, NgClass } from '@angular/common';

@Component({
  selector: 'calendar-instance',
  standalone: true,
  imports: [NgStyle, NgIf, NgFor, NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div style="border: 1px solid #ccc; padding: 16px; border-radius: 8px; width: 350px">
      <h3 style="margin-top: 0; margin-bottom: 12px">{{ title }} (ID: {{ calendarId }})</h3>

      <div style="display: flex; gap: 4px; margin-bottom: 10px">
        <button
          *ngFor="let viewType of ['month', 'week', 'day']"
          (click)="changeViewStr(viewType)"
          [ngStyle]="{
            flex: '1',
            padding: '4px',
            'font-size': '12px',
            'background-color': cal.view === viewType ? '#007bff' : '#f0f0f0',
            color: cal.view === viewType ? '#fff' : '#000',
            border: '1px solid #ccc',
            'border-radius': '4px',
            cursor: 'pointer',
            'text-transform': 'capitalize',
          }"
        >
          {{ viewType }}
        </button>
      </div>

      <div
        style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px"
      >
        <button (click)="cal.goToPrevious()">←</button>
        <span style="font-weight: bold; font-size: 14px">
          {{
            cal.view === 'day'
              ? cal.utils.formatLocalizedDate(cal.currentDate)
              : cal.utils.formatLocalizedMonth(cal.currentDate)
          }}
        </span>
        <button (click)="cal.goToNext()">→</button>
      </div>

      <button
        (click)="cal.goToToday()"
        style="width: 100%; margin-bottom: 15px; padding: 6px; cursor: pointer; border-radius: 4px; border: 1px solid #ccc; background-color: #fff;"
      >
        Today
      </button>

      <div style="min-height: 200px">
        <table *ngIf="cal.view === 'month'" style="width: 100%; border-collapse: collapse">
          <thead>
            <tr>
              <th
                *ngFor="let day of cal.utils.daysofWeek('narrow')"
                style="padding: 4px; font-size: 12px"
              >
                {{ day }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let week of cal.monthData?.weeks">
              <td
                *ngFor="let date of week"
                [ngStyle]="{
                  'text-align': 'center',
                  padding: '4px',
                  'font-size': '14px',
                  color: cal.monthData?.isCurrentMonth(date) ? '#000' : '#ccc',
                  'background-color': cal.monthData?.isToday(date) ? '#e6f7ff' : 'transparent',
                  'border-radius': cal.monthData?.isToday(date) ? '50%' : '0',
                }"
              >
                {{ cal.utils.formatDate(date, 'd') }}
              </td>
            </tr>
          </tbody>
        </table>

        <div *ngIf="cal.view === 'week'" style="display: flex; flex-direction: column; gap: 8px">
          <div style="font-size: 12px; color: #666; text-align: center; margin-bottom: 4px">
            {{ cal.weekData?.weekRange }}
          </div>
          <div style="display: flex; justify-content: space-between; gap: 4px">
            <div
              *ngFor="let date of cal.weekData?.dates"
              [ngStyle]="{
                flex: '1',
                'text-align': 'center',
                padding: '8px 4px',
                'border-radius': '4px',
                'background-color': cal.weekData?.isToday(date) ? '#e6f7ff' : '#f9f9f9',
                border: cal.weekData?.isToday(date) ? '1px solid #007bff' : '1px solid #eee',
              }"
            >
              <div style="font-size: 10px; text-transform: uppercase; color: #888">
                {{
                  cal.utils.formatLocalizedDate(date, undefined, undefined, { weekday: 'short' })
                }}
              </div>
              <div style="font-weight: bold; font-size: 14px">
                {{ cal.utils.formatDate(date, 'd') }}
              </div>
            </div>
          </div>
        </div>

        <div
          *ngIf="cal.view === 'day'"
          [ngStyle]="{
            'text-align': 'center',
            padding: '20px',
            'border-radius': '8px',
            'background-color': cal.dayData?.isToday ? '#e6f7ff' : '#f9f9f9',
            border: cal.dayData?.isToday ? '1px solid #007bff' : '1px solid #eee',
          }"
        >
          <div style="font-size: 14px; color: #666; margin-bottom: 4px">
            {{
              cal.utils.formatLocalizedDate(cal.currentDate, undefined, undefined, {
                weekday: 'long',
              })
            }}
          </div>
          <div style="font-size: 32px; font-weight: bold">
            {{ cal.utils.formatDate(cal.currentDate, 'd') }}
          </div>
          <div style="font-size: 14px; color: #666; margin-top: 4px">
            {{ cal.utils.formatLocalizedMonth(cal.currentDate) }}
          </div>
        </div>
      </div>
    </div>
  `,
})
export class CalendarInstanceComponent implements OnInit {
  @Input() calendarId!: string;
  @Input() title!: string;

  calendarHook!: CalendarComposable;

  ngOnInit() {
    this.calendarHook = useCalendar({
      calendarId: this.calendarId,
      defaultView: 'month',
    });
  }

  get cal() {
    return this.calendarHook.calendar();
  }

  changeViewStr(view: string) {
    this.cal.changeView(view as ViewType);
  }
}
