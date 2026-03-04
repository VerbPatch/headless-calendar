<script lang="ts">
  import { useCalendar, type ViewType } from '@verbpatch/svelte-calendar';

  export let id: string;
  export let title: string;

  const calendarStore = useCalendar({
    calendarId: id,
    defaultView: 'month',
  });

  $: calendar = $calendarStore;

  function changeView(view: ViewType) {
    calendar.changeView(view);
  }
</script>

<div style="border: 1px solid #ccc; padding: 16px; border-radius: 8px; width: 350px">
  <h3 style="margin-top: 0; margin-bottom: 12px">{title} (ID: {id})</h3>

  <div style="display: flex; gap: 4px; margin-bottom: 10px">
    {#each ['month', 'week', 'day'] as viewType}
      <button
        on:click={() => changeView(viewType)}
        style="
          flex: 1;
          padding: 4px;
          font-size: 12px;
          background-color: {calendar.view === viewType ? '#007bff' : '#f0f0f0'};
          color: {calendar.view === viewType ? '#fff' : '#000'};
          border: 1px solid #ccc;
          border-radius: 4px;
          cursor: pointer;
          text-transform: capitalize;
        "
      >
        {viewType}
      </button>
    {/each}
  </div>

  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px">
    <button on:click={() => calendar.goToPrevious()}>←</button>
    <span style="font-weight: bold; font-size: 14px">
      {#if calendar.view === 'day'}
        {calendar.utils.formatLocalizedDate(calendar.currentDate)}
      {:else}
        {calendar.utils.formatLocalizedMonth(calendar.currentDate)}
      {/if}
    </span>
    <button on:click={() => calendar.goToNext()}>→</button>
  </div>

  <button
    on:click={() => calendar.goToToday()}
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
    {#if calendar.view === 'month'}
      <table style="width: 100%; border-collapse: collapse">
        <thead>
          <tr>
            {#each calendar.utils.daysofWeek('narrow') as day, index (day + '-' + index)}
              <th style="padding: 4px; font-size: 12px">{day}</th>
            {/each}
          </tr>
        </thead>
        <tbody>
          {#if calendar.monthData?.weeks}
            {#each calendar.monthData.weeks as week, i}
              <tr>
                {#each week as date, j}
                  {@const isCurrentMonth = calendar.monthData?.isCurrentMonth(date)}
                  {@const isToday = calendar.monthData?.isToday(date)}
                  <td
                    style="
                      text-align: center;
                      padding: 4px;
                      font-size: 14px;
                      color: {isCurrentMonth ? '#000' : '#ccc'};
                      background-color: {isToday ? '#e6f7ff' : 'transparent'};
                      border-radius: {isToday ? '50%' : '0'};
                    "
                  >
                    {calendar.utils.formatDate(date, 'd')}
                  </td>
                {/each}
              </tr>
            {/each}
          {/if}
        </tbody>
      </table>
    {/if}

    {#if calendar.view === 'week'}
      <div style="display: flex; flex-direction: column; gap: 8px">
        <div style="font-size: 12px; color: #666; text-align: center; margin-bottom: 4px">
          {calendar.weekData?.weekRange}
        </div>
        <div style="display: flex; justify-content: space-between; gap: 4px">
          {#if calendar.weekData?.dates}
            {#each calendar.weekData.dates as date, i}
              {@const isToday = calendar.weekData?.isToday(date)}
              <div
                style="
                  flex: 1;
                  text-align: center;
                  padding: 8px 4px;
                  border-radius: 4px;
                  background-color: {isToday ? '#e6f7ff' : '#f9f9f9'};
                  border: {isToday ? '1px solid #007bff' : '1px solid #eee'};
                "
              >
                <div style="font-size: 10px; text-transform: uppercase; color: #888">
                  {calendar.utils.formatLocalizedDate(date, undefined, undefined, { weekday: 'short' })}
                </div>
                <div style="font-weight: bold; font-size: 14px">
                  {calendar.utils.formatDate(date, 'd')}
                </div>
              </div>
            {/each}
          {/if}
        </div>
      </div>
    {/if}

    {#if calendar.view === 'day'}
      {@const isToday = calendar.dayData?.isToday}
      <div
        style="
          text-align: center;
          padding: 20px;
          border-radius: 8px;
          background-color: {isToday ? '#e6f7ff' : '#f9f9f9'};
          border: {isToday ? '1px solid #007bff' : '1px solid #eee'};
        "
      >
        <div style="font-size: 14px; color: #666; margin-bottom: 4px">
          {calendar.utils.formatLocalizedDate(calendar.currentDate, undefined, undefined, { weekday: 'long' })}
        </div>
        <div style="font-size: 32px; font-weight: bold">
          {calendar.utils.formatDate(calendar.currentDate, 'd')}
        </div>
        <div style="font-size: 14px; color: #666; margin-top: 4px">
          {calendar.utils.formatLocalizedMonth(calendar.currentDate)}
        </div>
      </div>
    {/if}
  </div>
</div>
