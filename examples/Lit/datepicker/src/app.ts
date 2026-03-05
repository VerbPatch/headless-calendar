import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import './DatePicker';

@customElement('calendar-demo')
export class App extends LitElement {
  @state() private startDate?: Date;
  @state() private endDate?: Date;

  private _handleSubmit(e: Event) {
    e.preventDefault();
    alert(
      `Form Submitted!\nStart Date: ${this.startDate?.toDateString() || 'Not set'}\nEnd Date: ${this.endDate?.toDateString() || 'Not set'}`,
    );
  }

  render() {
    return html`
      <div>
        <h1>Lit DatePicker Example</h1>
        <p>This example shows a DatePicker component with minimal styling.</p>

        <form @submit=${this._handleSubmit}>
          <date-picker
            label="Departure Date"
            .value=${this.startDate}
            placeholder="Select departure"
            @change=${(e: CustomEvent) => (this.startDate = e.detail)}
          ></date-picker>

          <date-picker
            label="Return Date"
            .value=${this.endDate}
            placeholder="Select return"
            @change=${(e: CustomEvent) => (this.endDate = e.detail)}
          ></date-picker>

          <button type="submit">Check Availability</button>
        </form>

        <div style="margin-top: 20px">
          <h3>Selection State:</h3>
          <pre>
${JSON.stringify({ startDate: this.startDate, endDate: this.endDate }, null, 2)}</pre
          >
        </div>
      </div>
    `;
  }
}
