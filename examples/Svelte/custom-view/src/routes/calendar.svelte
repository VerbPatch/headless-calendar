<script lang="ts">
  import { useCalendar, generateId, type CustomViewOptions } from "@verbpatch/svelte-calendar";

  const calendar = useCalendar({ 
    defaultView: "custom", 
    customViewOptions: { unit: "day", count: 2 },
    initialEvents: [
      { id: generateId(), title: 'Project Review', start: new Date(), end: new Date(new Date().getTime() + 3600000), color: '#8b5cf6' },
      { id: generateId(), title: 'Lunch Sync', start: new Date(new Date().setHours(12, 0)), end: new Date(new Date().setHours(13, 0)), color: '#10b981' }
    ]
  });

  function setPreset(options: CustomViewOptions) {
    $calendar.changeView('custom', options);
  }

  function getMonthsToDisplay() {
    const opts = $calendar.customViewOptions;
    if (!opts || opts.unit !== 'month') return [];
    const count = opts.count || 1;
    const months = [];
    for (let i = 0; i < count; i++) {
      const d = $calendar.utils.addMonths($calendar.currentDate, i);
      months.push({ month: d.getMonth(), year: d.getFullYear(), date: d });
    }
    return months;
  }

  function getTitle() {
    const opts = $calendar.customViewOptions;
    if (!opts) return '';
    if (opts.unit === 'month') return $calendar.monthData?.monthName;
    if (opts.unit === 'week') return $calendar.weekData?.weekRange;
    return $calendar.dayData?.dayName;
  }
</script>

<div class="calendar-wrapper">
  <div class="header">
    <div class="nav">
      <button onclick={$calendar.goToPrevious}>Previous</button>
      <button onclick={$calendar.goToToday}>Today</button>
      <button onclick={$calendar.goToNext}>Next</button>
    </div>
    <h2 class="range">{getTitle()}</h2>
  </div>

  <div class="presets">
    <strong>View Presets:</strong>
    <div class="preset-buttons">
      <button onclick={() => setPreset({ unit: 'day', count: 2 })}>2 Days</button>
      <button onclick={() => setPreset({ unit: 'week', count: 1, includeSpecificDays: [1,2,3,4,5] })}>Work Week</button>
      <button onclick={() => setPreset({ unit: 'week', count: 2 })}>2 Weeks</button>
      <button onclick={() => setPreset({ unit: 'month', count: 1, includeSpecificDays: [1,2,3,4,5] })}>1 Month Weekdays</button>
      <button onclick={() => setPreset({ unit: 'month', count: 3 })}>Quarter (3 Months)</button>
    </div>
  </div>

  <div class="view-content">
    {#if $calendar.customViewOptions?.unit === 'month' && $calendar.monthData}
      <div class="month-views">
        {#each getMonthsToDisplay() as m (m.year + '-' + m.month)}
          <div class="month-container">
            <div class="month-title">{$calendar.utils.formatLocalizedMonth(m.date)}</div>
            <table class="calendar-table" border="1">
              <thead>
                <tr>
                  {#each $calendar.utils.daysofWeek('short') as day}
                    <th>{day}</th>
                  {/each}
                </tr>
              </thead>
              <tbody>
                {#each $calendar.monthData.weeks as week}
                  {#if week.some(d => d.getMonth() === m.month && d.getFullYear() === m.year)}
                    <tr>
                      {#each [0,1,2,3,4,5,6] as dayIdx}
                        {@const date = week.find(d => d.getDay() === dayIdx)}
                        {@const isInMonth = date && date.getMonth() === m.month && date.getFullYear() === m.year}
                        {@const isToday = date && $calendar.utils.isSameDay(date, new Date())}
                        <td class:empty-cell={!isInMonth} class:today={isToday}>
                          {#if isInMonth}
                            <div class="day-num">{date.getDate()}</div>
                            <div class="events">
                              {#each $calendar.getEventsForDate(date) as event}
                                <div class="event-pill" style="background-color: {event.color}">{event.title}</div>
                              {/each}
                            </div>
                          {/if}
                        </td>
                      {/each}
                    </tr>
                  {/if}
                {/each}
              </tbody>
            </table>
          </div>
        {/each}
      </div>
    {:else}
      {@const data = $calendar.customViewOptions?.unit === 'week' ? $calendar.weekData : $calendar.dayData}
      {#if data}
        <table class="calendar-table horizontal-view" border="1">
          <thead>
            <tr>
              {#each data.dates as date}
                <th>
                  <div class="day-name-small">{$calendar.utils.formatDate(date, 'EEE')}</div>
                  <div class="day-num-large">{date.getDate()}</div>
                </th>
              {/each}
            </tr>
          </thead>
          <tbody>
            <tr>
              {#each data.dates as date}
                <td class:today={$calendar.utils.isSameDay(date, new Date())}>
                  <div class="events">
                    {#each $calendar.getEventsForDate(date) as event}
                      <div class="event-pill" style="background-color: {event.color}">{event.title}</div>
                    {/each}
                  </div>
                </td>
              {/each}
            </tr>
          </tbody>
        </table>
      {/if}
    {/if}
  </div>
</div>

<style>
  .calendar-wrapper { background: white; padding: 24px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); font-family: sans-serif; max-width: 1000px; margin: 0 auto; }
  .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
  .nav { display: flex; gap: 8px; }
  .range { font-weight: 600; color: #374151; margin: 0; font-size: 1.5rem; }
  .presets { margin-bottom: 24px; padding: 16px; background: #f3f4f6; border-radius: 8px; }
  .preset-buttons { display: flex; gap: 8px; margin-top: 12px; flex-wrap: wrap; }
  .month-container { margin-bottom: 32px; }
  .month-title { font-weight: 700; font-size: 1.25rem; margin-bottom: 12px; color: #111827; margin-top: 20px; }
  .calendar-table { width: 100%; border-collapse: collapse; text-align: center; }
  .calendar-table th, .calendar-table td { border: 1px solid #ccc; padding: 8px; }
  .calendar-table th { background: #f9fafb; font-size: 0.875rem; color: #6b7280; }
  .calendar-table td { height: 100px; vertical-align: top; width: 14.28%; padding: 4px; }
  .horizontal-view td { height: 150px; padding: 8px; }
  .empty-cell { background: #f9fafb; }
  .today { background: #eff6ff !important; }
  .day-num { text-align: right; font-size: 0.875rem; color: #374151; }
  .day-num-large { font-size: 1.25rem; font-weight: 700; }
  .day-name-small { font-size: 12px; color: #6b7280; }
  .events { display: flex; flex-direction: column; gap: 4px; margin-top: 4px; }
  .event-pill { color: white; padding: 2px 6px; border-radius: 4px; font-size: 0.75rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  button { padding: 8px 16px; background: white; border: 1px solid #d1d5db; border-radius: 6px; cursor: pointer; font-weight: 500; transition: all 0.2s; }
  button:hover { background: #f3f4f6; border-color: #9ca3af; }
</style>