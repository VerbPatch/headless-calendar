<script lang="ts">
  import DatePicker from './datepicker.svelte';

  let startDate = $state<Date | undefined>();
  let endDate = $state<Date | undefined>();

  function handleSubmit() {
    alert(`Form Submitted!\nStart Date: ${startDate?.toDateString() || 'Not set'}\nEnd Date: ${endDate?.toDateString() || 'Not set'}`);
  }
</script>

<div>
  <h1>Svelte DatePicker Example</h1>
  <p>This example shows a DatePicker component with minimal styling.</p>

  <form onsubmit={handleSubmit}>
    <DatePicker 
      label="Departure Date" 
      bind:value={startDate} 
      placeholder="Select departure" 
    />
    
    <DatePicker 
      label="Return Date" 
      bind:value={endDate} 
      placeholder="Select return" 
    />

    <button type="submit">Check Availability</button>
  </form>

  <div style="margin-top: 20px">
    <h3>Selection State:</h3>
    <pre>{JSON.stringify({ startDate, endDate }, null, 2)}</pre>
  </div>
</div>
