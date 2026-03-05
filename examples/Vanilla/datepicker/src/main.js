import { setupDatePicker } from './datepicker';

const state = {
  startDate: undefined,
  endDate: undefined,
};

document.querySelector('#app').innerHTML = `
  <div>
    <h1>Vanilla JS DatePicker Example</h1>
    <p>This example shows a DatePicker component with minimal styling.</p>

    <form id="my-form">
      <div id="start-date-picker"></div>
      <div id="end-date-picker"></div>
      <button type="submit">Check Availability</button>
    </form>

    <div style="margin-top: 20px">
      <h3>Selection State:</h3>
      <pre id="state-display"></pre>
    </div>
  </div>
`;

const updateDisplay = () => {
  document.querySelector('#state-display').innerText = JSON.stringify(state, null, 2);
};

setupDatePicker(document.querySelector('#start-date-picker'), {
  label: 'Departure Date',
  placeholder: 'Select departure',
  onChange: (date) => {
    state.startDate = date;
    updateDisplay();
  },
});

setupDatePicker(document.querySelector('#end-date-picker'), {
  label: 'Return Date',
  placeholder: 'Select return',
  onChange: (date) => {
    state.endDate = date;
    updateDisplay();
  },
});

document.querySelector('#my-form').onsubmit = (e) => {
  e.preventDefault();
  alert(
    `Form Submitted!\nStart Date: ${state.startDate?.toDateString() || 'Not set'}\nEnd Date: ${state.endDate?.toDateString() || 'Not set'}`,
  );
};

updateDisplay();
