<script setup lang="ts">
import { computed } from 'vue';
import { useCalendar, type CustomViewOptions, generateId } from '@verbpatch/vuejs-calendar';

const calendar = useCalendar({
  defaultView: "custom",
  customViewOptions: { unit: "day", count: 2 },
  initialEvents: [
    { id: generateId(), title: 'Project Review', start: new Date(), end: new Date(new Date().getTime() + 3600000), color: '#8b5cf6' },
    { id: generateId(), title: 'Lunch Sync', start: new Date(new Date().setHours(12, 0)), end: new Date(new Date().setHours(13, 0)), color: '#10b981' }
  ]
});

const setPreset = (options: CustomViewOptions) => {
  calendar.value?.changeView('custom', options);
};

const monthsToDisplay = computed(() => {
  const cal = calendar.value;
  const opts = cal?.customViewOptions;
  if (!cal || !opts || opts.unit !== 'month') return [];
  const count = opts.count || 1;
  const months = [];
  for (let i = 0; i < count; i++) {
    const d = cal.utils.addMonths(cal.currentDate, i);
    months.push({ month: d.getMonth(), year: d.getFullYear(), date: d });
  }
  return months;
});

const currentTitle = computed(() => {
  const cal = calendar.value;
  const opts = cal?.customViewOptions;
  if (!cal || !opts) return '';
  if (opts.unit === 'month') return cal.monthData?.monthName;
  if (opts.unit === 'week') return cal.weekData?.weekRange;
  return cal.dayData?.dayName;
});
</script>

<template>
  <div v-if="calendar" class="calendar-wrapper">
    <div class="header">
      <div class="nav">
        <button @click="calendar.goToPrevious">Previous</button>
        <button @click="calendar.goToToday">Today</button>
        <button @click="calendar.goToNext">Next</button>
      </div>
      <h2 class="range">{{ currentTitle }}</h2>
    </div>

    <div class="presets">
      <strong>View Presets:</strong>
      <div class="preset-buttons">
        <button @click="setPreset({ unit: 'day', count: 2 })">2 Days</button>
        <button @click="setPreset({ unit: 'week', count: 1, includeSpecificDays: [1,2,3,4,5] })">Work Week</button>
        <button @click="setPreset({ unit: 'week', count: 2 })">2 Weeks</button>
        <button @click="setPreset({ unit: 'month', count: 1, includeSpecificDays: [1,2,3,4,5] })">1 Month Weekdays</button>
        <button @click="setPreset({ unit: 'month', count: 3 })">Quarter (3 Months)</button>
      </div>
    </div>

    <div class="view-content">
      <div v-if="calendar.customViewOptions?.unit === 'month' && calendar.monthData" class="month-views">
        <div v-for="m in monthsToDisplay" :key="`${m.year}-${m.month}`" class="month-container">
          <div class="month-title">{{ calendar.utils.formatLocalizedMonth(m.date) }}</div>
          <table border="1" class="calendar-table">
            <thead>
              <tr>
                <th v-for="day in calendar.utils.daysofWeek('short')" :key="day">{{ day }}</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(week, weekIdx) in calendar.monthData.weeks" :key="weekIdx">
                <tr v-if="week.some(d => d.getMonth() === m.month && d.getFullYear() === m.year)">
                  <td v-for="dayIdx in [0,1,2,3,4,5,6]" :key="dayIdx" 
                      :class="{ 
                        'empty-cell': !week.find(d => d.getDay() === dayIdx) || week.find(d => d.getDay() === dayIdx)?.getMonth() !== m.month,
                        'today': week.find(d => d.getDay() === dayIdx) && calendar.utils.isSameDay(week.find(d => d.getDay() === dayIdx)!, new Date())
                      }">
                    <template v-if="week.find(d => d.getDay() === dayIdx) && week.find(d => d.getDay() === dayIdx)?.getMonth() === m.month">
                      <div class="day-num">{{ week.find(d => d.getDay() === dayIdx)!.getDate() }}</div>
                      <div class="events">
                        <div v-for="event in calendar.getEventsForDate(week.find(d => d.getDay() === dayIdx)!)" 
                             :key="event.id" class="event-pill" :style="{ backgroundColor: event.color }">
                          {{ event.title }}
                        </div>
                      </div>
                    </template>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>

      <table v-else border="1" class="calendar-table horizontal-view">
        <thead>
          <tr>
            <th v-for="date in (calendar.customViewOptions?.unit === 'week' ? calendar.weekData?.dates : calendar.dayData?.dates)" :key="date.toISOString()">
              <div class="day-name-small">{{ calendar.utils.formatDate(date, 'EEE') }}</div>
              <div class="day-num-large">{{ date.getDate() }}</div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td v-for="date in (calendar.customViewOptions?.unit === 'week' ? calendar.weekData?.dates : calendar.dayData?.dates)" 
                :key="date.toISOString()" 
                :class="{ 'today': calendar.utils.isSameDay(date, new Date()) }">
              <div class="events">
                <div v-for="event in calendar.getEventsForDate(date)" 
                     :key="event.id" class="event-pill" :style="{ backgroundColor: event.color }">
                  {{ event.title }}
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.calendar-wrapper { background: white; padding: 24px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); font-family: sans-serif; max-width: 1000px; margin: 0 auto; }
.header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
.nav { display: flex; gap: 8px; }
.range { font-weight: 600; color: #374151; margin: 0; }
.presets { margin-bottom: 24px; padding: 16px; background: #f3f4f6; border-radius: 8px; }
.preset-buttons { display: flex; gap: 8px; margin-top: 12px; flex-wrap: wrap; }
.month-container { margin-bottom: 32px; }
.month-title { font-weight: 700; font-size: 1.25rem; margin-bottom: 12px; color: #111827; margin-top: 20px; }
.calendar-table { width: 100%; border-collapse: collapse; text-align: center; }
.calendar-table th, .calendar-table td { border: 1px solid #ccc; padding: 8px; }
.calendar-table th { background: #f9fafb; font-size: 0.875rem; color: #6b7280; }
.calendar-table td { height: 100px; vertical-align: top; width: 14.28%; }
.horizontal-view td { height: 150px; }
.empty-cell { background: #f9fafb; }
.today { background: #eff6ff !important; }
.day-num { text-align: right; font-size: 0.875rem; color: #374151; }
.day-num-large { font-size: 1.25rem; font-weight: normal; }
.day-name-small { font-size: 12px; color: #6b7280; }
.events { display: flex; flex-direction: column; gap: 4px; margin-top: 4px; }
.event-pill { color: white; padding: 2px 6px; border-radius: 4px; font-size: 0.75rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
button { padding: 8px 16px; background: white; border: 1px solid #d1d5db; border-radius: 6px; cursor: pointer; font-weight: 500; transition: all 0.2s; }
button:hover { background: #f3f4f6; border-color: #9ca3af; }
</style>