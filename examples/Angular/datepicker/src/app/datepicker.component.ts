import { Component, Input, Output, EventEmitter, HostListener, ElementRef, OnInit } from '@angular/core';
import { useCalendar, CalendarComposable } from '@verbpatch/angular-calendar';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'date-picker',
  standalone: true,
  imports: [NgStyle],
  template: `
    <div style="position: relative; margin-bottom: 20px">
      <label style="display: block">{{ label }}</label>
      <input
        type="text"
        readOnly
        [value]="displayValue"
        [placeholder]="placeholder"
        (click)="toggleOpen()"
      />

      @if (isOpen && cal) {
        <div
          style="position: absolute; top: 100%; left: 0; z-index: 1000; background: white; border: 1px solid black; padding: 10px"
        >
          <div style="display: flex; justify-content: space-between">
            <button type="button" (click)="prevMonth($event)">←</button>
            <span>{{ cal.utils.formatLocalizedMonth(cal.currentDate) }}</span>
            <button type="button" (click)="nextMonth($event)">→</button>
          </div>

          <table>
            <thead>
              <tr>
                @for (day of cal.utils.daysofWeek('narrow'); track day) {
                  <th style="padding: 4px; font-size: 12px">{{ day }}</th>
                }
              </tr>
            </thead>
            <tbody>
              @for (week of cal.monthData?.weeks; track $index) {
                <tr>
                  @for (date of week; track date.toISOString()) {
                    @let isCurrentMonth = cal.monthData?.isCurrentMonth(date);
                    @let isToday = cal.monthData?.isToday(date);
                    @let isSelected = value && date.toDateString() === value.toDateString();
                    <td
                      (click)="onDateClick(date, $event)"
                      [ngStyle]="{
                        'cursor': isCurrentMonth ? 'pointer' : 'default',
                        'color': isCurrentMonth ? (isSelected ? 'blue' : 'black') : 'gray',
                        'font-weight': isToday ? 'bold' : 'normal',
                        'border': isSelected ? '1px solid blue' : 'none',
                        'text-align': 'center',
                        'padding': '4px',
                        'font-size': '14px'
                      }"
                    >
                      {{ date.getDate() }}
                    </td>
                  }
                </tr>
              }
            </tbody>
          </table>

          <div style="text-align: center; margin-top: 5px">
            <button type="button" (click)="selectToday($event)">Today</button>
          </div>
        </div>
      }
    </div>
  `
})
export class DatePickerComponent implements OnInit {
  @Input() label: string = '';
  @Input() value?: Date;
  @Input() placeholder: string = 'Select a date';
  @Output() valueChange = new EventEmitter<Date>();

  isOpen = false;
  calendarHook?: CalendarComposable;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.calendarHook = useCalendar({
      calendarId: `datepicker-${this.label.replace(/\s+/g, '-').toLowerCase() || 'default'}`,
      defaultView: 'month',
      defaultDate: this.value || new Date(),
    });
  }

  get cal() {
    return this.calendarHook?.calendar();
  }

  get displayValue() {
    if (!this.value || !this.cal) return '';
    return this.cal.utils.formatDate(this.value, 'yyyy-MM-dd');
  }

  toggleOpen() {
    this.isOpen = !this.isOpen;
    if (this.isOpen && this.value && this.cal) {
      // Navigate to the month of the selected value when opening
      this.cal.goToDate(this.value);
    }
  }

  onDateClick(date: Date, event: MouseEvent) {
    event.stopPropagation();
    if (this.cal?.monthData?.isCurrentMonth(date)) {
      this.value = date;
      this.valueChange.emit(date);
      this.isOpen = false;
    }
  }

  selectToday(event: MouseEvent) {
    event.stopPropagation();
    const today = new Date();
    this.value = today;
    this.valueChange.emit(today);
    this.isOpen = false;
    // Also ensure calendar is reset to today's month for next open
    this.cal?.goToToday();
  }

  prevMonth(event: MouseEvent) {
    event.stopPropagation();
    this.cal?.goToPrevious();
  }

  nextMonth(event: MouseEvent) {
    event.stopPropagation();
    this.cal?.goToNext();
  }

  @HostListener('document:mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }
}
