<script setup lang="ts">
import CalendarDemo from './calendar.vue';
</script>

<template>
  <div style="padding: 20px; font-family: sans-serif; color: #333">
    <h1>Multiple Calendars Example</h1>
    <p style="color: #666; margin-bottom: 30px">
      Each calendar below has a unique <code>calendarId</code> and maintains its own independent
      state (date, view, etc.).
    </p>

    <div style="display: flex; gap: 30px; flex-wrap: wrap">
      <CalendarDemo id="calendar-left" title="Left Calendar" />
      <CalendarDemo id="calendar-right" title="Right Calendar" />
    </div>

    <div style="margin-top: 50px; border-top: 1px solid #eee; padding-top: 30px">
      <h2>Default Calendar</h2>
      <p style="color: #666">
        This one uses the default ID. If you added another one without an ID, they would conflict.
      </p>
      <CalendarDemo id="default-calendar" title="Standard Calendar" />
    </div>
  </div>
</template>
