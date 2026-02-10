<script setup lang="ts">
import { useCalendar } from '@verbpatch/vuejs-calendar';

const calendar = useCalendar({
  defaultView: 'month',
  startOfWeek: 0,
  locale: 'en-IN',
});
</script>

<template>
  <div v-if="calendar">
    <h1>Vue.js Calendar minimal Example</h1>
    <table border="0" width="840" cellspacing="0" style="height: 700px; border-left: 1px solid; border-top: 1px solid">
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
            <select :value="calendar.view" @change="(e: any) => calendar?.changeView(e.target.value)">
              <option value="month">Month</option>
              <option value="week">Week</option>
              <option value="day">Day</option>
            </select>
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-if="calendar.view === 'month'">
          <tr>
            <th v-for="day in calendar.utils.daysofWeek('short')" :key="day"
              style="width: 120px; border-right: 1px solid; border-bottom: 1px solid">
              {{ day }}
            </th>
          </tr>
          <tr v-for="(week, i) in calendar.monthData?.weeks" :key="i">
            <td v-for="(date, j) in week" :key="j" :style="{
              color: !calendar.monthData?.isCurrentMonth(date) ? 'gray' : undefined,
              fontWeight: calendar.monthData?.isToday(date) ? 'bold' : 'normal',
              borderRight: '1px solid',
              borderBottom: '1px solid',
            }">
              {{ calendar.utils.formatDate(date, 'd') }}
            </td>
          </tr>
        </template>

        <tr v-if="calendar.view === 'week'">
          <td colspan="7" style="border-right: 1px solid">
            <table cellpadding="5" cellspacing="0" width="100%">
              <tbody>
                <tr>
                  <td></td>
                  <td v-for="(date, i) in calendar.weekData?.dates" :key="i"
                    :style="{ fontWeight: calendar.weekData?.isToday(date) ? 'bold' : 'normal' }">
                    {{ calendar.utils.formatDateTime(date, 'EEE d') }}
                  </td>
                </tr>
                <tr v-for="slot in calendar.timeSlots" :key="slot.time">
                  <td style="border-bottom: 1px solid">
                    {{ slot.label }}
                  </td>
                  <td v-for="(date, i) in calendar.weekData?.dates" :key="i" :style="{
                    fontWeight: calendar.weekData?.isToday(date) ? 'bold' : 'normal',
                    borderBottom: '1px solid',
                  }">
                    &nbsp;
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>

        <template v-if="calendar.view === 'day'">
          <tr>
            <td colspan="7" align="center" style="border-right: 1px solid; border-bottom: 1px solid">
              {{ calendar.dayData?.dayName }}
            </td>
          </tr>
          <tr>
            <td colspan="7" style="border-right: 1px solid">
              <table width="100%" cellspacing="0" style="height: 100%">
                <tbody>
                  <tr v-for="slot in calendar.timeSlots" :key="slot.time">
                    <td width="25%" style="border-bottom: 1px solid">
                      {{ slot.label }}
                      &nbsp;
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>