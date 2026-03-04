<script setup lang="ts">
import { useCalendar, type ViewType } from '@verbpatch/vuejs-calendar';

const props = defineProps<{
  id: string;
  title: string;
}>();

const calendar = useCalendar({
  calendarId: props.id,
  defaultView: 'month',
});

const changeView = (view: ViewType) => {
  calendar.value?.changeView(view);
};
</script>

<template>
  <div style="border: 1px solid #ccc; padding: 16px; border-radius: 8px; width: 350px">
    <h3 style="margin-top: 0; margin-bottom: 12px">{{ title }} (ID: {{ id }})</h3>

    <div style="display: flex; gap: 4px; margin-bottom: 10px">
      <button
        v-for="viewType in ['month', 'week', 'day']"
        :key="viewType"
        @click="changeView(viewType as ViewType)"
        :style="{
          flex: 1,
          padding: '4px',
          fontSize: '12px',
          backgroundColor: calendar?.view === viewType ? '#007bff' : '#f0f0f0',
          color: calendar?.view === viewType ? '#fff' : '#000',
          border: '1px solid #ccc',
          borderRadius: '4px',
          cursor: 'pointer',
          textTransform: 'capitalize',
        }"
      >
        {{ viewType }}
      </button>
    </div>

    <div
      style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
      "
    >
      <button @click="calendar?.goToPrevious">←</button>
      <span style="font-weight: bold; font-size: 14px">
        {{
          calendar?.view === 'day'
            ? calendar?.utils.formatLocalizedDate(calendar.currentDate)
            : calendar?.utils.formatLocalizedMonth(calendar?.currentDate!)
        }}
      </span>
      <button @click="calendar?.goToNext">→</button>
    </div>

    <button
      @click="calendar?.goToToday"
      style="
        width: 100%;
        margin-bottom: 15px;
        padding: 6px;
        cursor: pointer;
        border-radius: 4px;
        border: 1px solid #ccc;
        background-color: #fff;
      "
    >
      Today
    </button>

    <div style="min-height: 200px">
      <!-- Month View -->
      <table v-if="calendar?.view === 'month'" style="width: 100%; border-collapse: collapse">
        <thead>
          <tr>
            <th
              v-for="(day, index) in calendar?.utils.daysofWeek('narrow')"
              :key="day + '-' + index"
              style="padding: 4px; font-size: 12px"
            >
              {{ day }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(week, i) in calendar?.monthData?.weeks" :key="i">
            <td
              v-for="(date, j) in week"
              :key="j"
              :style="{
                textAlign: 'center',
                padding: '4px',
                fontSize: '14px',
                color: calendar?.monthData?.isCurrentMonth(date) ? '#000' : '#ccc',
                backgroundColor: calendar?.monthData?.isToday(date) ? '#e6f7ff' : 'transparent',
                borderRadius: calendar?.monthData?.isToday(date) ? '50%' : '0',
              }"
            >
              {{ calendar?.utils.formatDate(date, 'd') }}
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Week View -->
      <div v-if="calendar?.view === 'week'" style="display: flex; flex-direction: column; gap: 8px">
        <div style="font-size: 12px; color: #666; text-align: center; margin-bottom: 4px">
          {{ calendar?.weekData?.weekRange }}
        </div>
        <div style="display: flex; justify-content: space-between; gap: 4px">
          <div
            v-for="(date, i) in calendar?.weekData?.dates"
            :key="i"
            :style="{
              flex: 1,
              textAlign: 'center',
              padding: '8px 4px',
              borderRadius: '4px',
              backgroundColor: calendar?.weekData?.isToday(date) ? '#e6f7ff' : '#f9f9f9',
              border: calendar?.weekData?.isToday(date) ? '1px solid #007bff' : '1px solid #eee',
            }"
          >
            <div style="font-size: 10px; text-transform: uppercase; color: #888">
              {{
                calendar?.utils.formatLocalizedDate(date, undefined, undefined, {
                  weekday: 'short',
                })
              }}
            </div>
            <div style="font-weight: bold; font-size: 14px">
              {{ calendar?.utils.formatDate(date, 'd') }}
            </div>
          </div>
        </div>
      </div>

      <!-- Day View -->
      <div
        v-if="calendar?.view === 'day'"
        :style="{
          textAlign: 'center',
          padding: '20px',
          borderRadius: '8px',
          backgroundColor: calendar?.dayData?.isToday ? '#e6f7ff' : '#f9f9f9',
          border: calendar?.dayData?.isToday ? '1px solid #007bff' : '1px solid #eee',
        }"
      >
        <div style="font-size: 14px; color: #666; margin-bottom: 4px">
          {{
            calendar?.utils.formatLocalizedDate(calendar.currentDate, undefined, undefined, {
              weekday: 'long',
            })
          }}
        </div>
        <div style="font-size: 32px; font-weight: bold">
          {{ calendar?.utils.formatDate(calendar.currentDate, 'd') }}
        </div>
        <div style="font-size: 14px; color: #666; margin-top: 4px">
          {{ calendar?.utils.formatLocalizedMonth(calendar.currentDate) }}
        </div>
      </div>
    </div>
  </div>
</template>
