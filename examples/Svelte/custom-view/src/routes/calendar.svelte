<script lang="ts">
  import { useCalendar, generateId, type CustomViewOptions } from "@verbpatch/svelte-calendar";

  const calendar = useCalendar({
    defaultView: "custom",
    customViewOptions: { unit: "day", count: 2 },
    initialEvents: [
      { id: "1", title: "Project Review", start: new Date(), end: new Date(new Date().getTime() + 3600000), color: "#8b5cf6" },
      { id: "2", title: "Lunch Sync", start: new Date(new Date().setHours(12, 0)), end: new Date(new Date().setHours(13, 0)), color: "#10b981" },
    ],
  });

  function setPreset(options: CustomViewOptions) {
    $calendar.changeView("custom", options);
  }

  function getMonthsToDisplay() {
    const opts = $calendar.customViewOptions;
    if (!opts || opts.unit !== "month") return [];
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
    if (!opts) return "";
    if (opts.unit === "month") return $calendar.monthData?.monthName;
    if (opts.unit === "week") return $calendar.weekData?.weekRange;
    return $calendar.dayData?.dayName;
  }
</script>

<div style="font-family: sans-serif; padding: 20px;">
  <div>
    <button onclick={$calendar.goToPrevious}>Prev</button>
    <button onclick={$calendar.goToToday}>Today</button>
    <button onclick={$calendar.goToNext}>Next</button>
    <span style="margin-left: 20px;"><strong>{getTitle()}</strong></span>
  </div>

  <div style="margin: 20px 0;">
    <strong>Presets:</strong>
    <button onclick={() => setPreset({ unit: "day", count: 2 })}>2 Days</button>
    <button onclick={() => setPreset({ unit: "week", count: 1, includeSpecificDays: [1, 2, 3, 4, 5] })}>Work Week</button>
    <button onclick={() => setPreset({ unit: "week", count: 2 })}>2 Weeks</button>
    <button onclick={() => setPreset({ unit: "month", count: 1, includeSpecificDays: [1, 2, 3, 4, 5] })}>1 Month (WD)</button>
    <button onclick={() => setPreset({ unit: "month", count: 3 })}>Quarter</button>
  </div>

  <div>
    {#if $calendar.customViewOptions?.unit === "month" && $calendar.monthData}
      {#each getMonthsToDisplay() as m (m.year + "-" + m.month)}
        <div>
          <h3>{$calendar.utils.formatLocalizedMonth(m.date)}</h3>
          <table border="1" cellpadding="5" width="100%" style="border-collapse: collapse; text-align: center;">
            <thead>
              <tr>
                {#each $calendar.utils.daysofWeek("short") as day}
                  <th>{day}</th>
                {/each}
              </tr>
            </thead>
            <tbody>
              {#each $calendar.monthData.weeks as week}
                {#if week.some((d) => d.getMonth() === m.month && d.getFullYear() === m.year)}
                  <tr>
                    {#each [0, 1, 2, 3, 4, 5, 6] as dayIdx}
                      {@const date = week.find((d) => d.getDay() === dayIdx)}
                      {@const isInMonth = date && date.getMonth() === m.month && date.getFullYear() === m.year}
                      {@const isToday = date && $calendar.utils.isSameDay(date, new Date())}
                      <td style="height: 80px; vertical-align: top; background: {isToday ? '#eee' : 'transparent'};">
                        {#if isInMonth}
                          <div><strong>{date.getDate()}</strong></div>
                          {#each $calendar.getEventsForDate(date) as event}
                            <div style="border: 1px solid; font-size: 10px; margin-bottom: 2px;">{event.title}</div>
                          {/each}
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
    {:else}
      {@const data = $calendar.customViewOptions?.unit === "week" ? $calendar.weekData : $calendar.dayData}
      {#if data}
        <table border="1" cellpadding="5" width="100%" style="border-collapse: collapse; text-align: center;">
          <thead>
            <tr>
              {#each data.dates as date}
                <th>
                  {$calendar.utils.formatDate(date, "EEE d")}
                </th>
              {/each}
            </tr>
          </thead>
          <tbody>
            <tr>
              {#each data.dates as date}
                <td style="height: 100px; vertical-align: top; background: {$calendar.utils.isSameDay(date, new Date()) ? '#eee' : 'transparent'};">
                  {#each $calendar.getEventsForDate(date) as event}
                    <div style="border: 1px solid; font-size: 11px; margin-bottom: 2px;">{event.title}</div>
                  {/each}
                </td>
              {/each}
            </tr>
          </tbody>
        </table>
      {/if}
    {/if}
  </div>
</div>
