<script setup lang="ts">
import { useCalendar } from '@verbpatch/vuejs-calendar';

const tzDate = new Date(new Date().setHours(20, 0, 0, 0));
const tzEndDate = new Date(new Date().setHours(21, 0, 0, 0));

const calendar = useCalendar({
  defaultView: 'month',
  startOfWeek: 0,
  locale: 'en-IN',
  initialEvents: [
    {
      id: '1',
      title: 'Simple Meeting',
      description: 'Single-day 1 hour event',
      start: new Date(new Date().setHours(9, 0, 0, 0)),
      end: new Date(new Date().setHours(10, 0, 0, 0)),
      color: '#E6194B',
    },
    {
      id: '2',
      title: 'Company Holiday',
      description: 'All-day event',
      start: new Date(),
      end: new Date(),
      allDay: true,
      color: '#FFE119',
    },
    {
      id: '3',
      title: 'Business Trip',
      description: 'Multi-day event',
      start: new Date(new Date().setHours(9, 0, 0, 0)),
      end: new Date(new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000).setHours(17, 0, 0, 0)),
      color: '#4363D8',
    },
    {
      id: '4',
      title: 'Daily Standup',
      description: 'Daily Standup (Weekdays only)',
      start: new Date(new Date().setHours(10, 0, 0, 0)),
      end: new Date(new Date().setHours(10, 30, 0, 0)),
      color: '#F58231',
      recurring: {
        repeat: 'weekly',
        every: 1,
        weekDays: [1, 2, 3, 4, 5],
      },
    },
    {
      id: '5',
      title: 'Weekly Planning',
      description: 'Weekly recurring event',
      start: new Date(new Date().setHours(14, 0, 0, 0)),
      end: new Date(new Date().setHours(15, 0, 0, 0)),
      color: '#911EB4',
      recurring: {
        repeat: 'weekly',
        every: 1,
        weekDays: [1],
        end: new Date(new Date().getFullYear(), 11, 31),
      },
    },
    {
      id: '6',
      title: 'Monthly Payday',
      description: 'Monthly by day 25',
      start: new Date(new Date().setDate(25)),
      end: new Date(new Date().setDate(25)),
      allDay: true,
      color: '#42D4F4',
      recurring: {
        repeat: 'monthly',
        every: 1,
        day: 25,
      },
    },
    {
      id: '7',
      title: 'Team Lunch',
      description: 'Monthly by week position (2nd Friday)',
      start: new Date(new Date().setHours(12, 0, 0, 0)),
      end: new Date(new Date().setHours(13, 0, 0, 0)),
      color: '#F032E6',
      recurring: {
        repeat: 'monthly',
        every: 1,
        week: 2,
        weekDays: [5],
      },
    },
    {
      id: '8',
      title: 'New Year Party',
      description: 'Yearly recurring',
      start: new Date(new Date().getFullYear(), 0, 1),
      end: new Date(new Date().getFullYear(), 0, 1),
      allDay: true,
      color: '#9A6324',
      recurring: {
        repeat: 'yearly',
        every: 1,
        month: 0,
        day: 1,
      },
    },
    {
      id: '9',
      title: 'Client Demo',
      description: 'Rich metadata',
      start: new Date(new Date().setHours(15, 0, 0, 0)),
      end: new Date(new Date().setHours(16, 0, 0, 0)),
      location: 'Conference Room A',
      url: 'https://example.com/meeting',
      color: '#000075',
    },
    {
      id: '10',
      title: 'Global Sync',
      description: `Late night sync for global teams, Timezone specific -> Actual event is ${tzDate.toDateString()} ${tzDate.toTimeString().substring(0, 8)} - ${tzEndDate.toDateString()} ${tzEndDate.toTimeString().substring(0, 8)} in America/New_York timezone, translated to local calendar timezone.`,
      start: tzDate,
      end: tzEndDate,
      color: '#64748b',
      timezone: 'America/New_York',
    },
    {
      id: '11',
      title: 'Daily Huddle (Excl. specific days)',
      description: 'Recurring with EXDATE (Exclude specific dates)',
      start: new Date(new Date().setHours(9, 30, 0, 0)),
      end: new Date(new Date().setHours(9, 45, 0, 0)),
      color: '#db2777',
      recurring: {
        repeat: 'daily',
        every: 1,
      },
      exdate: [
        new Date(new Date().setDate(new Date().getDate() + 2)),
        new Date(new Date().setDate(new Date().getDate() + 4)),
      ],
    },
    {
      id: '12',
      title: 'Ad-hoc Review',
      description: 'Recurring with RDATE (Additional dates)',
      start: new Date(new Date().setHours(13, 0, 0, 0)),
      end: new Date(new Date().setHours(14, 0, 0, 0)),
      color: '#d97706',
      recurring: {
        repeat: 'weekly',
        every: 1,
        weekDays: [3],
      },
      rdate: [new Date(new Date().setDate(new Date().getDate() + 1))],
    },

    {
      id: '13',
      title: 'Tentative Monthly Sync',
      description: 'Test: Strict RFC RRULE with Status & Transparency',
      start: new Date(new Date().setHours(11, 0, 0, 0)),
      end: new Date(new Date().setHours(12, 0, 0, 0)),
      color: '#7c3aed',

      recurring: {
        repeat: 'monthly',
        every: 1,
        byDay: ['1FR'],
      },
      status: 'TENTATIVE',
      transparency: 'TRANSPARENT',
    },
    {
      id: '14',
      title: 'Rescheduled Instance',
      description:
        'This specific instance was moved to 3pm, Recurrence Exception (RECURRENCE-ID) representation',
      start: new Date(new Date().setHours(15, 0, 0, 0)),
      end: new Date(new Date().setHours(16, 0, 0, 0)),
      color: '#059669',
      recurrenceId: new Date(new Date().setHours(14, 0, 0, 0)),
    },
  ],
});

const formatRecurrence = (r: any) => {
  if (!r || r === 'never') return 'None';

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const getNth = (n: number) => {
    if (n === -1) return 'last';
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  const formatDays = (dList: any[]) => {
    if (!dList) return '';

    const dayMap = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

    return dList
      .map((d) => {
        if (typeof d === 'number') return days[d];
        const match = d.match(/^(-?\d+)([A-Z]{2})$/);
        if (match) {
          const nth = parseInt(match[1], 10);
          const dayIndex = dayMap.indexOf(match[2]);
          return `${getNth(nth)} ${days[dayIndex]}`;
        }
        return d;
      })
      .join(', ');
  };

  let desc = '';

  if (r.repeat === 'daily') {
    desc = r.every > 1 ? `Every ${r.every} days` : 'Daily';
  } else if (r.repeat === 'weekly') {
    desc = r.every > 1 ? `Every ${r.every} weeks` : 'Weekly';
    if (r.weekDays) desc += ` on ${formatDays(r.weekDays)}`;
  } else if (r.repeat === 'monthly') {
    desc = r.every > 1 ? `Every ${r.every} months` : 'Monthly';
    if (r.day) {
      desc += ` on day ${r.day}`;
    } else if (r.week && r.weekDays) {
      desc += ` on the ${getNth(r.week)} ${formatDays(r.weekDays)}`;
    } else if (r.byDay) {
      desc += ` on ${formatDays(r.byDay)}`;
    }
  } else if (r.repeat === 'yearly') {
    desc = r.every > 1 ? `Every ${r.every} years` : 'Yearly';
    if (r.month !== undefined) {
      const mList = Array.isArray(r.month) ? r.month : [r.month];
      desc += ` in ${mList.map((m: number) => months[m]).join(', ')}`;
    }
    if (r.day) {
      desc += ` on day ${r.day}`;
    } else if (r.week && r.weekDays) {
      desc += ` on the ${getNth(r.week)} ${formatDays(r.weekDays)}`;
    }
  }

  if (r.count) desc += `, ${r.count} times`;
  if (r.end) desc += `, until ${new Date(r.end).toLocaleDateString()}`;

  return desc;
};

const getEventTimeDisplay = (e: any, utils: any) => {
  if (e.allDay) {
    let display = `${utils.formatDate(e.start)} All Day`;
    if (!utils.isSameDay(e.start, e.end)) {
      display = `${utils.formatDate(e.start)} - ${utils.formatDate(e.end)} All Day`;
    }
    return display;
  } else {
    const startDate = utils.formatDate(e.start);
    const startTime = utils.formatLocalizedTime(e.start, undefined, undefined, false);
    if (utils.isSameDay(e.start, e.end)) {
      const endTime = utils.formatLocalizedTime(e.end, undefined, undefined, false);
      return `${startDate} ${startTime} - ${endTime}`;
    } else {
      const endDate = utils.formatDate(e.end);
      const endTime = utils.formatLocalizedTime(e.end, undefined, undefined, false);
      return `${startDate} ${startTime} - ${endDate} ${endTime}`;
    }
  }
};

const isEventInSlot = (event: any, date: Date, slot: any, interval: number) => {
  if (event.allDay) return false;
  const slotStart = new Date(date);
  slotStart.setHours(slot.hour, slot.minute, 0, 0);
  const slotEnd = new Date(slotStart.getTime() + (interval || 60) * 60000);
  const eventStart = new Date(event.start);
  const eventEnd = new Date(event.end);
  return eventStart < slotEnd && eventEnd > slotStart;
};
</script>

<template>
  <div v-if="calendar">
    <h1>Vue.js Calendar Export Example</h1>

    <div style="display: flex; gap: 20px; align-items: flex-start">
      <div id="calendar" style="flex: 0 0 840px">
        <table
          border="0"
          width="840"
          cellspacing="0"
          style="height: 700px; border-left: 1px solid; border-top: 1px solid"
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
                <select
                  :value="calendar.view"
                  @change="(e: any) => calendar?.changeView(e.target.value)"
                >
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
                <th
                  v-for="day in calendar.utils.daysofWeek('short')"
                  :key="day"
                  style="width: 120px; border-right: 1px solid; border-bottom: 1px solid"
                >
                  {{ day }}
                </th>
              </tr>
              <tr v-for="(week, i) in calendar.monthData?.weeks" :key="i">
                <td
                  v-for="(date, j) in week"
                  :key="j"
                  :style="{
                    color: !calendar.monthData?.isCurrentMonth(date) ? 'gray' : undefined,
                    fontWeight: calendar.monthData?.isToday(date) ? 'bold' : 'normal',
                    borderRight: '1px solid',
                    borderBottom: '1px solid',
                    verticalAlign: 'top',
                    height: '100px',
                  }"
                >
                  <div>{{ calendar.utils.formatDate(date, 'd') }}</div>
                  <div
                    v-for="e in calendar.getEventsForDate(date)"
                    :key="e.id"
                    :style="{
                      fontSize: '10px',
                      background: e.color || '#ccc',
                      color: 'white',
                      margin: '2px 0',
                      padding: '2px',
                    }"
                  >
                    {{ e.title }}
                  </div>
                </td>
              </tr>
            </template>

            <tr v-if="calendar.view === 'week' && calendar.weekData">
              <td colspan="7" style="border-right: 1px solid">
                <table cellpadding="5" cellspacing="0" width="100%">
                  <tbody>
                    <tr>
                      <td></td>
                      <td
                        v-for="(date, i) in calendar.weekData.dates"
                        :key="i"
                        :style="{ fontWeight: calendar.weekData.isToday(date) ? 'bold' : 'normal' }"
                      >
                        {{ calendar.utils.formatDate(date, 'EEE d') }}
                      </td>
                    </tr>
                    <!-- All Day Row -->
                    <tr>
                      <td style="border-bottom: 1px solid; font-size: 11px">All Day</td>
                      <td
                        v-for="(date, i) in calendar.weekData.dates"
                        :key="i"
                        style="
                          border-bottom: 1px solid;
                          border-left: 1px solid;
                          vertical-align: top;
                          background: #fafafa;
                        "
                      >
                        <div
                          v-for="e in calendar.getEventsForDate(date).filter((ev) => ev.allDay)"
                          :key="e.id"
                          :style="{
                            fontSize: '10px',
                            background: e.color || '#ccc',
                            color: 'white',
                            margin: '1px 0',
                            padding: '2px',
                            borderRadius: '2px',
                          }"
                        >
                          {{ e.title }}
                        </div>
                      </td>
                    </tr>
                    <tr v-for="slot in calendar.timeSlots" :key="slot.time">
                      <td style="border-bottom: 1px solid">
                        {{ slot.label }}
                      </td>
                      <td
                        v-for="(date, i) in calendar.weekData.dates"
                        :key="i"
                        :style="{
                          fontWeight: calendar.weekData.isToday(date) ? 'bold' : 'normal',
                          borderBottom: '1px solid',
                          borderLeft: '1px solid',
                          verticalAlign: 'top',
                        }"
                      >
                        <div
                          v-for="e in calendar
                            .getEventsForDate(date)
                            .filter((ev) =>
                              isEventInSlot(ev, date, slot, calendar?.timeSlotInterval || 60),
                            )"
                          :key="e.id"
                          :style="{
                            fontSize: '10px',
                            background: e.color || '#ccc',
                            color: 'white',
                            margin: '1px 0',
                            padding: '2px',
                          }"
                        >
                          {{ e.title }}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>

            <template v-if="calendar.view === 'day' && calendar.dayData">
              <tr>
                <td
                  colspan="7"
                  align="center"
                  style="border-right: 1px solid; border-bottom: 1px solid"
                >
                  {{ calendar.dayData.dayName }}
                </td>
              </tr>
              <tr>
                <td colspan="7" style="border-right: 1px solid">
                  <table width="100%" cellspacing="0" style="height: 100%">
                    <tbody>
                      <!-- All Day Row -->
                      <tr
                        v-if="
                          calendar
                            .getEventsForDate(calendar.dayData.dates[0])
                            .filter((e) => e.allDay).length > 0
                        "
                      >
                        <td
                          width="25%"
                          style="border-bottom: 1px solid; font-size: 11px; padding: 5px"
                        >
                          All Day
                        </td>
                        <td style="border-bottom: 1px solid; background: #fafafa; padding: 5px">
                          <div
                            v-for="e in calendar
                              .getEventsForDate(calendar.dayData.dates[0])
                              .filter((e) => e.allDay)"
                            :key="e.id"
                            :style="{
                              fontSize: '10px',
                              background: e.color || '#ccc',
                              color: 'white',
                              margin: '2px 0',
                              padding: '2px',
                              borderRadius: '2px',
                            }"
                          >
                            {{ e.title }}
                          </div>
                        </td>
                      </tr>
                      <tr v-for="slot in calendar.timeSlots" :key="slot.time">
                        <td width="25%" style="border-bottom: 1px solid; vertical-align: top">
                          {{ slot.label }}
                        </td>
                        <td style="border-bottom: 1px solid">
                          <div
                            v-for="e in calendar
                              .getEventsForDate(calendar.dayData.dates[0])
                              .filter((ev) =>
                                isEventInSlot(
                                  ev,
                                  calendar!.dayData!.dates[0],
                                  slot,
                                  calendar?.timeSlotInterval || 60,
                                ),
                              )"
                            :key="e.id"
                            :style="{
                              fontSize: '10px',
                              background: e.color || '#ccc',
                              color: 'white',
                              margin: '1px 0',
                              padding: '2px',
                            }"
                          >
                            {{ e.title }}
                          </div>
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

      <div style="flex: 1; min-width: 300px; font-family: sans-serif">
        <div
          style="
            border: 1px solid #ccc;
            padding: 10px;
            margin-bottom: 20px;
            max-height: 400px;
            overflow-y: auto;
          "
        >
          <h3 style="margin-top: 0">Event List</h3>
          <ul style="padding-left: 20px">
            <li
              v-for="e in calendar.events"
              :key="e.id"
              style="margin-bottom: 10px; border-bottom: 1px solid #eee; padding-bottom: 5px"
            >
              <div style="display: flex; align-items: center; gap: 5px">
                <span
                  :style="{
                    display: 'inline-block',
                    width: '10px',
                    height: '10px',
                    backgroundColor: e.color || '#3174ad',
                    borderRadius: '2px',
                  }"
                ></span>
                <strong>{{ e.title }}</strong>
              </div>
              <div style="font-size: 0.85em; color: #666; marginleft: 15px">
                {{ getEventTimeDisplay(e, calendar.utils) }}
              </div>
              <div
                v-if="e.description"
                style="
                  font-size: 0.8em;
                  color: #555;
                  marginleft: 15px;
                  margintop: 2px;
                  font-style: italic;
                "
              >
                {{ e.description }}
              </div>
              <div
                v-if="e.recurring && e.recurring !== 'never'"
                style="font-size: 0.8em; color: #007bff; margintop: 2px; marginleft: 15px"
              >
                {{ formatRecurrence(e.recurring) }}
                <template v-if="e.exdate && e.exdate.length > 0">
                  (Excl: {{ e.exdate.map((d) => calendar?.utils.formatDate(d)).join(', ') }})
                </template>
                <template v-if="e.rdate && e.rdate.length > 0">
                  (Add: {{ e.rdate.map((d) => calendar?.utils.formatDate(d)).join(', ') }})
                </template>
              </div>
              <div
                v-if="e.recurrenceId"
                style="font-size: 0.8em; color: #d63384; margintop: 2px; marginleft: 15px"
              >
                Recurrence-ID:
                {{
                  typeof e.recurrenceId === 'string' ? e.recurrenceId : e.recurrenceId.toISOString()
                }}
              </div>
            </li>
          </ul>
        </div>
        <div style="border: 1px solid #ccc; padding: 10px; max-height: 400px; overflow-y: auto">
          <h3 style="margin-top: 0">
            ICS Output
            <div style="margin-bottom: 10px; float: right">
              <button @click="calendar.downloadICS('my-calendar-events.ics')">Export to ICS</button>
            </div>
          </h3>
          <pre
            style="
              white-space: pre-wrap;
              word-wrap: break-word;
              font-size: 11px;
              background: #f5f5f5;
              padding: 5px;
            "
            >{{ calendar.exportToICS() }}</pre
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
