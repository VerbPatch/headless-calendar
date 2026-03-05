<script setup lang="ts">
import { ref } from 'vue';
import DatePicker from './DatePicker.vue';

const startDate = ref<Date>();
const endDate = ref<Date>();

const handleSubmit = () => {
  alert(`Form Submitted!\nStart Date: ${startDate.value?.toDateString() || 'Not set'}\nEnd Date: ${endDate.value?.toDateString() || 'Not set'}`);
};
</script>

<template>
  <div>
    <h1>Vue DatePicker Example</h1>
    <p>This example shows a DatePicker component with minimal styling.</p>

    <form @submit.prevent="handleSubmit">
      <DatePicker 
        label="Departure Date" 
        v-model="startDate" 
        placeholder="Select departure" 
      />
      
      <DatePicker 
        label="Return Date" 
        v-model="endDate" 
        placeholder="Select return" 
      />

      <button type="submit">Check Availability</button>
    </form>

    <div style="margin-top: 20px">
      <h3>Selection State:</h3>
      <pre>{{ JSON.stringify({ startDate, endDate }, null, 2) }}</pre>
    </div>
  </div>
</template>
