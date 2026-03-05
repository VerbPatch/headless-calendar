import { component$, useStore, $ } from '@builder.io/qwik';
import { DatePicker } from './DatePicker';

export const App = component$(() => {
  const state = useStore({
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
  });

  const handleSubmit = $((e: Event) => {
    e.preventDefault();
    alert(
      `Form Submitted!\nStart Date: ${state.startDate?.toDateString() || 'Not set'}\nEnd Date: ${state.endDate?.toDateString() || 'Not set'}`,
    );
  });

  return (
    <div>
      <h1>Qwik DatePicker Example</h1>
      <p>This example shows a DatePicker component with minimal styling.</p>

      <form onSubmit$={handleSubmit}>
        <DatePicker
          label="Departure Date"
          value={state.startDate}
          onChange$={$((d: Date) => (state.startDate = d))}
          placeholder="Select departure"
        />

        <DatePicker
          label="Return Date"
          value={state.endDate}
          onChange$={$((d: Date) => (state.endDate = d))}
          placeholder="Select return"
        />

        <button type="submit">Check Availability</button>
      </form>

      <div style={{ marginTop: '20px' }}>
        <h3>Selection State:</h3>
        <pre>{JSON.stringify({ startDate: state.startDate, endDate: state.endDate }, null, 2)}</pre>
      </div>
    </div>
  );
});
