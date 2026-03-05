var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import './DatePicker';
let App = class App extends LitElement {
    _handleSubmit(e) {
        e.preventDefault();
        alert(`Form Submitted!\nStart Date: ${this.startDate?.toDateString() || 'Not set'}\nEnd Date: ${this.endDate?.toDateString() || 'Not set'}`);
    }
    render() {
        return html `
      <div>
        <h1>Lit DatePicker Example</h1>
        <p>This example shows a DatePicker component with minimal styling.</p>

        <form @submit=${this._handleSubmit}>
          <date-picker
            label="Departure Date"
            .value=${this.startDate}
            placeholder="Select departure"
            @change=${(e) => (this.startDate = e.detail)}
          ></date-picker>

          <date-picker
            label="Return Date"
            .value=${this.endDate}
            placeholder="Select return"
            @change=${(e) => (this.endDate = e.detail)}
          ></date-picker>

          <button type="submit">Check Availability</button>
        </form>

        <div style="margin-top: 20px">
          <h3>Selection State:</h3>
          <pre>${JSON.stringify({ startDate: this.startDate, endDate: this.endDate }, null, 2)}</pre>
        </div>
      </div>
    `;
    }
};
__decorate([
    state(),
    __metadata("design:type", Date)
], App.prototype, "startDate", void 0);
__decorate([
    state(),
    __metadata("design:type", Date)
], App.prototype, "endDate", void 0);
App = __decorate([
    customElement('calendar-demo')
], App);
export { App };
//# sourceMappingURL=app.js.map