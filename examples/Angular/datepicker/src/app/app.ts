import { Component } from '@angular/core';
import { DatePickerComponent } from './datepicker.component';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DatePickerComponent, JsonPipe],
  template: `
    <div>
      <h1>Angular DatePicker Example</h1>
      <p>This example shows a DatePicker component with minimal styling.</p>

      <form (submit)="handleSubmit($event)">
        <date-picker
          label="Departure Date"
          [(value)]="startDate"
          placeholder="Select departure"
        ></date-picker>

        <date-picker
          label="Return Date"
          [(value)]="endDate"
          placeholder="Select return"
        ></date-picker>

        <button type="submit">Check Availability</button>
      </form>

      <div style="margin-top: 20px">
        <h3>Selection State:</h3>
        <pre>{{ { startDate: startDate, endDate: endDate } | json }}</pre>
      </div>
    </div>
  `,
})
export class App {
  startDate?: Date;
  endDate?: Date;

  handleSubmit(e: Event) {
    e.preventDefault();
    alert(
      `Form Submitted!\nStart Date: ${this.startDate?.toDateString() || 'Not set'}\nEnd Date: ${this.endDate?.toDateString() || 'Not set'}`,
    );
  }
}
