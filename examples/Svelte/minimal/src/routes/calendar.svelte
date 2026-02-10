<script lang="ts">
  import { useCalendar, type CalendarInstance, type ViewType } from "@verbpatch/svelte-calendar";

  const calendar = useCalendar({ defaultView: "month", startOfWeek: 0, locale: "en-IN" });
</script>

<table border="0" width="840" cellspacing="0" style="height:700px;border-left:1px solid; border-top:1px solid;">
  <thead>
    <tr>
      <th colspan="2" style="border-bottom: 1px solid;">
        <button type="button" onclick={$calendar.goToPrevious}> ← </button>
        <button type="button" onclick={$calendar.goToToday}> Today </button>
        <button type="button" onclick={$calendar.goToNext}> → </button>
      </th>
      <th colspan="3" style="border-bottom: 1px solid;">
        <h3>
          {$calendar.view === "month" ? $calendar.monthData?.monthName : ""}
          {$calendar.view === "week" ? $calendar.weekData?.weekRange : ""}
          {$calendar.view === "day" ? $calendar.dayData?.dayName : ""}
        </h3>
      </th>
      <th colspan="2" style="border-bottom: 1px solid;border-right:1px solid;">
        <select
          onchange={(s: Event) => {
            const value = (s.target as HTMLSelectElement).value as ViewType;
            $calendar.changeView(value);
          }}
        >
          <option value="month">Month</option>
          <option value="week">Week</option>
          <option value="day">Day</option>
        </select>
      </th>
    </tr>
  </thead>
  <tbody>
    {#if $calendar.view == "month"}
      <tr>
        {#each $calendar.utils.daysofWeek("short") as day}
          <th style="width: 120px;border-right:1px solid; border-bottom:1px solid;">{day}</th>
        {/each}
      </tr>
      {#each $calendar.monthData?.weeks as week}
        <tr>
          {#each week as date}
            <td
              style={($calendar.monthData!.isCurrentMonth(date) == false ? "color:gray;" : $calendar.monthData!.isToday(date) ? "font-weight:bold;" : "") +
                "border-right:1px solid; border-bottom:1px solid;"}
            >
              {$calendar.utils.formatDate(date, "d")}
            </td>
          {/each}
        </tr>
      {/each}
    {/if}

    {#if $calendar.view == "week"}
      <tr>
        <td colspan="7" style="border-right:1px solid;">
          <table cellpadding="5" cellspacing="0" width="100%">
            <tbody>
              <tr>
                <td></td>
                {#each $calendar.weekData?.dates as date}
                  <td style={$calendar.weekData!.isToday(date) ? "font-weight:bold" : ""}>
                    {$calendar.utils.formatDateTime(date, "EEE d")}
                  </td>
                {/each}
              </tr>
              {#each $calendar.timeSlots as slot}
                <tr>
                  <td data-slot={slot.time} style="border-bottom: 1px solid;">
                    {slot.label}
                  </td>
                  {#each $calendar.weekData?.dates as date}
                    <td data-slot={slot.time} data-date={$calendar.utils.formatDate(date)} style={($calendar.weekData!.isToday(date) ? "font-weight:bold;" : "") + "border-bottom: 1px solid;"}>
                      &nbsp;
                    </td>
                  {/each}
                </tr>
              {/each}
            </tbody>
          </table>
        </td>
      </tr>
    {/if}

    {#if $calendar.view == "day"}
      <tr>
        <td colspan="7" align="center" style="border-right:1px solid;border-bottom:1px solid;">
          {$calendar.dayData!.dayName}
        </td>
      </tr>
      <tr>
        <td colspan="7" style="border-right:1px solid;">
          <table width="100%" cellspacing="0" style="height:100%">
            <tbody>
              {#each $calendar.timeSlots as slot}
                <tr>
                  <td data-slot={slot.time} width="25%" style="border-bottom: 1px solid;">
                    {slot.label}
                    &nbsp;
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </td>
      </tr>
    {/if}
  </tbody>
</table>
