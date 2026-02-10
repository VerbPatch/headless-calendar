<script setup lang="ts">
import { computed } from 'vue';
import { useCalendar, type CustomViewOptions, generateId } from '@verbpatch/vuejs-calendar';

const calendar = useCalendar({
  defaultView: 'custom',
  customViewOptions: { unit: 'day', count: 2 },
  initialEvents: [
    {
      id: generateId(),
      title: 'Project Review',
      start: new Date(),
      end: new Date(new Date().getTime() + 3600000),
      color: '#8b5cf6',
    },
    {
      id: generateId(),
      title: 'Lunch Sync',
      start: new Date(new Date().setHours(12, 0)),
      end: new Date(new Date().setHours(13, 0)),
      color: '#10b981',
    },
  ],
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
  <div v-if="calendar" style="padding: 20px">
    <div>
      <button @click="calendar.goToPrevious">Prev</button>
      <button @click="calendar.goToToday">Today</button>
      <button @click="calendar.goToNext">Next</button>
      <span style="margin-left: 20px"
        ><strong>{{ currentTitle }}</strong></span
      >
    </div>

    <div style="margin: 20px 0">
      <strong>Presets:</strong>
      <button @click="setPreset({ unit: 'day', count: 2 })">2 Days</button>
      <button @click="setPreset({ unit: 'week', count: 1, includeSpecificDays: [1, 2, 3, 4, 5] })">
        Work Week
      </button>
      <button @click="setPreset({ unit: 'week', count: 2 })">2 Weeks</button>
      <button @click="setPreset({ unit: 'month', count: 1, includeSpecificDays: [1, 2, 3, 4, 5] })">
        1 Month Weekdays
      </button>
      <button @click="setPreset({ unit: 'month', count: 3 })">Quarter</button>
    </div>

    <div v-if="calendar.customViewOptions?.unit === 'month' && calendar.monthData">
      <div v-for="m in monthsToDisplay" :key="`${m.year}-${m.month}`">
        <h3>{{ calendar.utils.formatLocalizedMonth(m.date) }}</h3>
        <table border="1" cellpadding="5" style="border-collapse: collapse; width: 100%">
          <thead>
            <tr>
              <th v-for="day in calendar.utils.daysofWeek('short')" :key="day">{{ day }}</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(week, weekIdx) in calendar.monthData.weeks" :key="weekIdx">
              <tr v-if="week.some((d) => d.getMonth() === m.month && d.getFullYear() === m.year)">
                <td
                  v-for="dayIdx in [0, 1, 2, 3, 4, 5, 6]"
                  :key="dayIdx"
                  :style="{
                    background:
                      week.find((d) => d.getDay() === dayIdx) &&
                      calendar.utils.isSameDay(week.find((d) => d.getDay() === dayIdx)!, new Date())
                        ? '#eee'
                        : 'transparent',
                    height: '80px',
                    verticalAlign: 'top',
                  }"
                >
                  <template
                    v-if="
                      week.find((d) => d.getDay() === dayIdx) &&
                      week.find((d) => d.getDay() === dayIdx)?.getMonth() === m.month
                    "
                  >
                    <strong>{{ week.find((d) => d.getDay() === dayIdx)!.getDate() }}</strong>
                    <div>
                      <div
                        v-for="event in calendar.getEventsForDate(
                          week.find((d) => d.getDay() === dayIdx)!,
                        )"
                        :key="event.id"
                        style="font-size: 10px; border: 1px solid"
                      >
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

    <table v-else border="1" cellpadding="5" style="border-collapse: collapse; width: 100%">
      <thead>
        <tr>
          <th
            v-for="date in calendar.customViewOptions?.unit === 'week'
              ? calendar.weekData?.dates
              : calendar.dayData?.dates"
            :key="date.toISOString()"
          >
            {{ calendar.utils.formatDate(date, 'EEE d') }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td
            v-for="date in calendar.customViewOptions?.unit === 'week'
              ? calendar.weekData?.dates
              : calendar.dayData?.dates"
            :key="date.toISOString()"
            :style="{
              background: calendar.utils.isSameDay(date, new Date()) ? '#eee' : 'transparent',
              height: '100px',
              verticalAlign: 'top',
            }"
          >
            <div
              v-for="event in calendar.getEventsForDate(date)"
              :key="event.id"
              style="font-size: 11px; border: 1px solid; margin-bottom: 2px"
            >
              {{ event.title }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
