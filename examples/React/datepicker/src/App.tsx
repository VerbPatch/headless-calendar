import React, { useState } from 'react';
import { DatePicker } from './DatePicker';

export const App = () => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      `Form Submitted!\nStart Date: ${startDate?.toDateString() || 'Not set'}\nEnd Date: ${endDate?.toDateString() || 'Not set'}`,
    );
  };

  return (
    <div>
      <h1>React DatePicker Example</h1>
      <p>This example shows a DatePicker component with minimal styling.</p>

      <form onSubmit={handleSubmit}>
        <div>
          <DatePicker
            label="Departure Date"
            value={startDate}
            onChange={setStartDate}
            placeholder="Select departure"
          />
        </div>

        <div>
          <DatePicker
            label="Return Date"
            value={endDate}
            onChange={setEndDate}
            placeholder="Select return"
          />
        </div>

        <button type="submit">Check Availability</button>
      </form>

      <div style={{ marginTop: '20px' }}>
        <h3>Selection State:</h3>
        <pre>
          {JSON.stringify(
            {
              startDate: startDate?.toISOString(),
              endDate: endDate?.toISOString(),
            },
            null,
            2,
          )}
        </pre>
      </div>
    </div>
  );
};
