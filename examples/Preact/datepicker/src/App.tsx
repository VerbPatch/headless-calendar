import { useState } from 'preact/hooks';
import { DatePicker } from './DatePicker';

export const App = () => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    alert(
      `Form Submitted!\nStart Date: ${startDate?.toDateString() || 'Not set'}\nEnd Date: ${endDate?.toDateString() || 'Not set'}`,
    );
  };

  return (
    <div>
      <h1>Preact DatePicker Example</h1>
      <p>This example shows a DatePicker component with minimal styling.</p>

      <form onSubmit={handleSubmit}>
        <DatePicker
          label="Departure Date"
          value={startDate}
          onChange={setStartDate}
          placeholder="Select departure"
        />

        <DatePicker
          label="Return Date"
          value={endDate}
          onChange={setEndDate}
          placeholder="Select return"
        />

        <button type="submit">Check Availability</button>
      </form>

      <div style={{ marginTop: '20px' }}>
        <h3>Selection State:</h3>
        <pre>{JSON.stringify({ startDate, endDate }, null, 2)}</pre>
      </div>
    </div>
  );
};
