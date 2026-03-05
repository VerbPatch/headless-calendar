import { createSignal, type Component } from 'solid-js';
import { DatePicker } from './DatePicker';

const App: Component = () => {
  const [startDate, setStartDate] = createSignal<Date>();
  const [endDate, setEndDate] = createSignal<Date>();

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    alert(`Form Submitted!\nStart Date: ${startDate()?.toDateString() || 'Not set'}\nEnd Date: ${endDate()?.toDateString() || 'Not set'}`);
  };

  return (
    <div>
      <h1>Solidjs DatePicker Example</h1>
      <p>This example shows a DatePicker component with minimal styling.</p>

      <form onSubmit={handleSubmit}>
        <DatePicker 
          label="Departure Date" 
          value={startDate()} 
          onChange={setStartDate} 
          placeholder="Select departure" 
        />
        
        <DatePicker 
          label="Return Date" 
          value={endDate()} 
          onChange={setEndDate} 
          placeholder="Select return" 
        />

        <button type="submit">Check Availability</button>
      </form>

      <div style={{ 'margin-top': '20px' }}>
        <h3>Selection State:</h3>
        <pre>{JSON.stringify({ startDate: startDate(), endDate: endDate() }, null, 2)}</pre>
      </div>
    </div>
  );
};

export default App;
