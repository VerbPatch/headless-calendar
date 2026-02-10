<script setup lang="ts">
import { useCalendar } from '@verbpatch/vuejs-calendar';

const calendar = useCalendar({
  defaultView: 'month',
});

const monthDayStyle = (date: Date): string => {
  let style = 'border-right:1px solid; border-bottom:1px solid;';
  if (!calendar.value?.monthData!.isCurrentMonth(date)) {
    style += 'color:gray;';
  }
  if (calendar.value?.monthData!.isToday(date)) {
    style += 'font-weight:bold;';
  }
  return style;
};
</script>

<template>
  <h1>Vue Js Calendar Minimal Example</h1>

  <div class="card">
    <table
      border="0"
      width="840"
      cellspacing="0"
      style="height: 700px; border-left: 1px solid; border-top: 1px solid"
      v-show="calendar != null"
      v-if="calendar != null"
    >
      <thead>
        <tr>
          <th colspan="2" style="border-bottom: 1px solid">
            <button type="button" @click="calendar.goToPrevious">←</button>
            <button type="button" @click="calendar.goToToday">Today</button>
            <button type="button" @click="calendar.goToNext">→</button>
          </th>
          <th colspan="3" style="border-bottom: 1px solid">
            <h3>
              {{ calendar.view === 'month' ? calendar.monthData?.monthName : '' }}
              {{ calendar.view === 'week' ? calendar.weekData?.weekRange : '' }}
              {{ calendar.view === 'day' ? calendar.dayData?.dayName : '' }}
            </h3>
          </th>
          <th colspan="2" style="border-bottom: 1px solid; border-right: 1px solid">
            <select @change="(s: any) => calendar?.changeView(s.target.value)">
              <option value="month">Month</option>
              <option value="week">Week</option>
              <option value="day">Day</option>
            </select>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-show="calendar.view == 'month'">
          <th
            v-for="day in calendar.utils.daysofWeek('short')"
            style="width: 120px; border-right: 1px solid; border-bottom: 1px solid"
          >
            {{ day }}
          </th>
        </tr>
        <tr v-show="calendar.view == 'month'" v-for="week in calendar.monthData?.weeks">
          <td v-for="date in week" :style="monthDayStyle(date)">
            {{ calendar.utils.formatDate(date, 'd') }}
          </td>
        </tr>

        <tr v-show="calendar.view == 'week'">
          <td colspan="7" style="border-right: 1px solid">
            <table cellpadding="5" cellspacing="0" width="100%">
              <tbody>
                <tr>
                  <td></td>
                  <td
                    v-for="date in calendar.weekData?.dates"
                    :style="calendar.weekData!.isToday(date) ? 'font-weight:bold' : ''"
                  >
                    {{ calendar.utils.formatDateTime(date, 'EEE d') }}
                  </td>
                </tr>
                <tr v-for="slot in calendar.timeSlots">
                  <td :data-slot="slot.time" style="border-bottom: 1px solid">
                    {{ slot.label }}
                  </td>
                  <td
                    v-for="date in calendar.weekData?.dates"
                    :data-slot="slot.time"
                    :data-date="calendar.utils.formatDate(date)"
                    :style="
                      (calendar.weekData!.isToday(date) ? 'font-weight:bold;' : '') +
                      'border-bottom: 1px solid;'
                    "
                  >
                    &nbsp;
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>

        <tr v-if="calendar.view == 'day'">
          <td colspan="7" align="center" style="border-right: 1px solid; border-bottom: 1px solid">
            {{ calendar.dayData!.dayName }}
          </td>
        </tr>
        <tr v-if="calendar.view == 'day'">
          <td colspan="7" style="border-right: 1px solid">
            <table width="100%" cellspacing="0" style="height: 100%">
              <tbody>
                <tr v-for="slot in calendar.timeSlots">
                  <td data-slot="{slot.time}" width="25%" style="border-bottom: 1px solid">
                    {{ slot.label }}
                    &nbsp;
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
