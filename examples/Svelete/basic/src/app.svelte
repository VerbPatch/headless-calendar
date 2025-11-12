<script>
  // Import all necessary functions from the wrapper
  import {
    useCalendar,
    nextDay,
    previousDay,
    nextWeek,
    previousWeek,
    nextMonth,
    previousMonth,
    changeView,
    addEvent,
  } from "@verbpatch/svelte-calendar";

  // --- Mock Event Data ---
  // Define mock events. Assuming 'date' holds the start time.
  const now = new Date();
  const mockEvents = [
    {
      id: 1,
      title: "Team Meeting",
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0),
      duration: 60,
    },
    {
      id: 2,
      title: "Project Deadline",
      date: new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 2,
        14,
        30
      ),
      duration: 120,
    },
    {
      id: 3,
      title: "Review Session",
      date: new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - 5,
        9,
        0
      ),
      duration: 30,
    },
    {
      id: 4,
      title: "Check Emails",
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 11, 0),
      duration: 15,
    },
  ];

  // Initialize the calendar store
  const calendarStore = useCalendar({
    initialDate: now,
    initialView: "month",
    firstDayOfWeek: 0, // Sunday
  });

  // --- Reactive State ---
  // Access the calendar instance reactively using Svelte's $ store syntax
  $: calendar = $calendarStore;
  $: state = calendar?.state;
  $: days = state?.days || []; // The array of day objects for the current view
  $: currentDate = state?.currentDate;
  $: currentView = state?.view || "month";
  $: currentEvents = state?.events || []; // All loaded events

  // Add mock events on initialization (only once)
  let eventsInitialized = false;
  $: if (calendar && !eventsInitialized) {
    mockEvents.forEach((event) => addEvent(calendar, event));
    eventsInitialized = true;
  }

  // --- Navigation Handlers ---
  const navigate = (direction) => {
    if (!calendar) return;

    if (currentView === "day") {
      direction === "next" ? nextDay(calendar) : previousDay(calendar);
    } else if (currentView === "week") {
      direction === "next" ? nextWeek(calendar) : previousWeek(calendar);
    } else {
      // 'month' view
      direction === "next" ? nextMonth(calendar) : previousMonth(calendar);
    }
  };

  // --- View Handlers ---
  const setView = (view) => {
    if (calendar) {
      changeView(calendar, view);
    }
  };

  // --- Rendering Logic ---
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Helper function to format the main header date display
  const getHeaderDate = () => {
    if (!currentDate) return "Loading...";

    const options = { year: "numeric", month: "long" };

    switch (currentView) {
      case "day":
        return currentDate.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      case "week":
        // Display the range of the week
        const weekStart = days[0]?.date;
        const weekEnd = days[days.length - 1]?.date;
        if (weekStart && weekEnd) {
          const startStr = weekStart.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          });
          const endStr = weekEnd.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          });
          return `${startStr} - ${endStr}`;
        }
        return currentDate.toLocaleDateString("en-US", options);
      case "month":
      default:
        return currentDate.toLocaleDateString("en-US", options);
    }
  };

  // Group days into rows for table rendering
  const getGridRows = (days) => {
    if (currentView === "day") return [days];

    const rows = [];
    let week = [];
    const daysInRow = 7;

    for (let i = 0; i < days.length; i++) {
      week.push(days[i]);
      if (week.length === daysInRow) {
        rows.push(week);
        week = [];
      }
    }
    // Handles the last week in month view if incomplete
    if (currentView === "month" && week.length > 0) {
      rows.push(week);
    }
    return rows;
  };

  $: gridRows = getGridRows(days);

  // Minimal inline styles to differentiate days/views (no CSS file needed)
  const getCellStyle = (day) => {
    let style = "border: 1px solid #ccc; padding: 5px; vertical-align: top;";

    if (currentView === "month" && !day.isCurrentMonth) {
      style += "background-color: #f5f5f5; color: #aaa;";
    }
    if (day.isToday) {
      style +=
        "background-color: #ffcccc; font-weight: bold; border-color: red;";
    }
    if (currentView === "day" || currentView === "week") {
      style += "height: 400px;"; // Give height to view cells
    }
    return style;
  };
</script>

<div
  style="font-family: Arial, sans-serif; max-width: 900px; margin: 20px auto; border: 2px solid #333; padding: 10px;"
>
  <h1
    style="text-align: center; color: #333; border-bottom: 1px solid #333; padding-bottom: 10px;"
  >
    Headless Calendar (Svelte Minimal UI)
  </h1>

  <!-- View Selection Buttons -->
  <div style="margin: 10px 0; text-align: center;">
    <button
      on:click={() => setView("day")}
      style="margin: 2px; padding: 8px 15px; border: 1px solid #007bff; background-color: {currentView ===
      'day'
        ? '#007bff'
        : '#fff'}; color: {currentView === 'day'
        ? '#fff'
        : '#007bff'}; cursor: pointer;">Day View</button
    >
    <button
      on:click={() => setView("week")}
      style="margin: 2px; padding: 8px 15px; border: 1px solid #007bff; background-color: {currentView ===
      'week'
        ? '#007bff'
        : '#fff'}; color: {currentView === 'week'
        ? '#fff'
        : '#007bff'}; cursor: pointer;">Week View</button
    >
    <button
      on:click={() => setView("month")}
      style="margin: 2px; padding: 8px 15px; border: 1px solid #007bff; background-color: {currentView ===
      'month'
        ? '#007bff'
        : '#fff'}; color: {currentView === 'month'
        ? '#fff'
        : '#007bff'}; cursor: pointer;">Month View</button
    >
  </div>

  <!-- Navigation and Header -->
  <div
    style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; padding: 10px; background-color: #eee;"
  >
    <button
      on:click={() => navigate("prev")}
      style="padding: 5px 10px; cursor: pointer;"
      >&lt; Previous {currentView}</button
    >
    <h2 style="font-size: 20px; margin: 0; color: #333;">{getHeaderDate()}</h2>
    <button
      on:click={() => navigate("next")}
      style="padding: 5px 10px; cursor: pointer;"
      >Next {currentView} &gt;</button
    >
  </div>

  <!-- Calendar Grid Table -->
  <table style="width: 100%; border-collapse: collapse; table-layout: fixed;">
    <!-- Day Names Header (for week/month view) -->
    <thead>
      <tr>
        {#if currentView !== "day"}
          {#each dayNames as dayName}
            <th
              style="border: 1px solid #ccc; padding: 5px; background-color: #ddd;"
              >{dayName}</th
            >
          {/each}
        {/if}
      </tr>
    </thead>

    <tbody>
      {#each gridRows as week}
        <tr>
          {#each week as day}
            <td
              style={getCellStyle(day)}
              colspan={currentView === "day" ? 7 : 1}
            >
              <div style="font-size: 14px; margin-bottom: 5px; color: #333;">
                <!-- Display Day Number, or Weekday name + Day number for day view -->
                {#if currentView === "day" || currentView === "week"}
                  {day.date.toLocaleDateString("en-US", {
                    weekday: "short",
                    day: "numeric",
                  })}
                {:else}
                  {day.date.getDate()}
                {/if}
              </div>

              <!-- Display Events for this Day -->
              {#if day.events.length > 0}
                <div style="font-size: 10px; margin-top: 5px;">
                  <ul
                    style="list-style: none; padding: 0; margin: 0; max-height: 100px; overflow-y: auto;"
                  >
                    {#each day.events as event}
                      <li
                        style="background-color: #e6f7ff; border: 1px solid #b3e0ff; margin-bottom: 2px; padding: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"
                      >
                        <span style="font-weight: bold;"
                          >{event.date.toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}</span
                        >
                        - {event.title}
                      </li>
                    {/each}
                  </ul>
                </div>
              {/if}
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>

  <!-- Debug/All Events List -->
  <div style="margin-top: 20px; border-top: 1px solid #ddd; padding-top: 10px;">
    <h3 style="font-size: 14px; margin-bottom: 5px; color: #888;">
      All Loaded Events:
    </h3>
    <ul
      style="list-style-type: none; padding-left: 0; font-size: 12px; max-height: 100px; overflow-y: auto; border: 1px solid #ddd; padding: 5px;"
    >
      {#each currentEvents as event}
        <li style="margin-bottom: 2px;">
          <span style="font-weight: bold;">{event.title}</span> on
          {event.date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })} at
          {event.date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </li>
      {/each}
    </ul>
  </div>
</div>
