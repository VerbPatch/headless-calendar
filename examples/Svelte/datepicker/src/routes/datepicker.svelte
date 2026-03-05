<script lang="ts">
  import { useCalendar } from '@verbpatch/svelte-calendar';

  interface Props {
    label: string;
    value?: Date;
    placeholder?: string;
  }

  let { label, value = $bindable(), placeholder = 'Select a date' }: Props = $props();

  let isOpen = $state(false);
  let containerRef: HTMLDivElement;

  const calendar = useCalendar({
    calendarId: `datepicker-${label.replace(/\s+/g, '-').toLowerCase()}`,
    defaultView: 'month',
    defaultDate: value || new Date(),
  });

  function handleClickOutside(event: MouseEvent) {
    if (containerRef && !containerRef.contains(event.target as Node)) {
      isOpen = false;
    }
  }

  $effect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  function handleDateSelect(date: Date) {
    value = date;
    isOpen = false;
  }

  const displayValue = $derived(value ? $calendar.utils.formatDate(value, 'yyyy-MM-dd') : '');
</script>

<div bind:this={containerRef} style="position: relative; margin-bottom: 20px">
  <label style="display: block">{label}</label>
  <input
    type="text"
    readonly
    value={displayValue}
    {placeholder}
    onclick={() => (isOpen = !isOpen)}
  />

  {#if isOpen}
    <div style="position: absolute; top: 100%; left: 0; z-index: 1000; background: white; border: 1px solid black; padding: 10px">
      <div style="display: flex; justify-content: space-between">
        <button type="button" onclick={(e) => { e.stopPropagation(); $calendar.goToPrevious(); }}>←</button>
        <span>{$calendar.utils.formatLocalizedMonth($calendar.currentDate)}</span>
        <button type="button" onclick={(e) => { e.stopPropagation(); $calendar.goToNext(); }}>→</button>
      </div>

      <table>
        <thead>
          <tr>
            {#each $calendar.utils.daysofWeek('narrow') as day, index (day + '-' + index)}
              <th>{day}</th>
            {/each}
          </tr>
        </thead>
        <tbody>
          {#if $calendar.monthData?.weeks}
            {#each $calendar.monthData.weeks as week, i}
              <tr>
                {#each week as date, j}
                  {@const isCurrentMonth = $calendar.monthData?.isCurrentMonth(date)}
                  {@const isSelected = value && date.toDateString() === value.toDateString()}
                  {@const isToday = $calendar.monthData?.isToday(date)}
                  <td
                    onclick={(e) => { e.stopPropagation(); isCurrentMonth && handleDateSelect(date); }}
                    style="
                      cursor: {isCurrentMonth ? 'pointer' : 'default'};
                      color: {isCurrentMonth ? (isSelected ? 'blue' : 'black') : 'gray'};
                      font-weight: {isToday ? 'bold' : 'normal'};
                      border: {isSelected ? '1px solid blue' : 'none'};
                      text-align: center;
                      padding: 4px;
                    "
                  >
                    {date.getDate()}
                  </td>
                {/each}
              </tr>
            {/each}
          {/if}
        </tbody>
      </table>

      <div style="text-align: center; margin-top: 5px">
        <button type="button" onclick={(e) => { e.stopPropagation(); handleDateSelect(new Date()); }}>Today</button>
      </div>
    </div>
  {/if}
</div>
