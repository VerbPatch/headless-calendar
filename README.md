# 📅 Headless Calendar Library

A powerful, flexible, and completely headless calendar library for applications. Built with TypeScript, zero dependencies, and designed to work with any UI framework or design system.

## ✨ Features

- 🎯 **Completely Headless** - No UI components, just logic and data
- 📅 **Multiple Views** - Month, Week, and Day views
- 🎨 **Framework Agnostic** - Works with any CSS framework or component library
- 🔄 **Event Management** - Create, update, delete, and move events
- 🖱️ **Drag & Drop Events** - Built-in drag and drop event management support
- 🎭 **TypeScript First** - Full type safety and IntelliSense support
- 🌳 **Tree Shakeable** - Import only what you need
- 📦 **Zero Dependencies**

## 🚀 Installation

Install the relevant library for use in available framework.

| Framework                                                                                          | Package Name                                                                               | Installation Command                                                                                                                                |
| -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://cdn.simpleicons.org/javascript" alt="JavaScript" height="16" width="16"> Vanilla | [@verbpatch/headless-calendar](https://www.npmjs.com/package/@verbpatch/headless-calendar) | `npm install @verbpatch/headless-calendar`                                                                                                          |
| <img src="https://cdn.simpleicons.org/react" alt="React" height="16" width="16"> React             | [@verbpatch/react-calendar](https://www.npmjs.com/package/@verbpatch/react-calendar)       | `npm install @verbpatch/react-calendar`                                                                                                             |
| <img src="https://cdn.simpleicons.org/svelte" alt="Svelte" height="16" width="16"> Svelte          | [@verbpatch/svelte-calendar](https://www.npmjs.com/package/@verbpatch/svelte-calendar)     | `npm install @verbpatch/svelte-calendar`                                                                                                            |
| <img src="https://cdn.simpleicons.org/vue.js" alt="Vue.js" height="16" width="16"> Vuejs           | [@verbpatch/vuejs-calendar](https://www.npmjs.com/package/@verbpatch/vuejs-calendar)       | `npm install @verbpatch/vuejs-calendar`                                                                                                             |
| <img src="https://cdn.simpleicons.org/jquery" alt="jQuery" height="16" width="16"> jQuery          | [@verbpatch/jquery-calendar](https://www.npmjs.com/package/@verbpatch/jquery-calendar)     | `npm install @verbpatch/jquery-calendar` <br/> or use direct link <br/> `https://cdn.jsdelivr.net/npm/@verbpatch/jquery-calendar/dist/index.umd.js` |
| <img src="https://cdn.simpleicons.org/angular" alt="Angular" height="16" width="16"> Angular       | [@verbpatch/angular-calendar](https://www.npmjs.com/package/@verbpatch/angular-calendar)   | `npm install @verbpatch/angular-calendar`                                                                                                           |

### 🪁 Basic Javscript/Typescript Example

```js
// In plain JavaScript/TypeScript environment
import { useCalendar } from "@verbpatch/headless-calendar";

let calendar;
function bindCalendar() {
  calendar = useCalendar({ defaultView: "month" });
}

bindCalendar();
console.log(calendar.monthData);

calendar.goToNext();
bindCalendar(); // its important to regenerate calendar to get updated data

console.log(calendar.monthData.monthName);
```

### 🎨 Basic React Example

```tsx
import { useCalendar } from "@verbpatch/react-calendar";

function MyCalendar() {
  const calendar = useCalendar({
    defaultView: "month",
    startOfWeek: 1, // Monday
  });

  const handleDateClick = (date: Date) => {
    calendar.createEvent({
      title: "New Event",
      start: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 9, 0),
      end: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 10, 0),
    });
  };

  if (!calendar.monthData) return null;

  return (
    <div>
      {/* Navigation */}
      <div>
        <button onClick={calendar.goToPrevious}>←</button>
        <h2>{calendar.monthData.monthName}</h2>
        <button onClick={calendar.goToNext}>→</button>
      </div>

      {/* Calendar Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}>
        {calendar.monthData.weeks.flat().map((date, index) => (
          <div key={index} onClick={() => handleDateClick(date)}>
            <span>{date.getDate()}</span>
            {calendar.getEventsForDate(date).map((event) => (
              <div key={event.id} style={{ backgroundColor: event.color }}>
                {event.title}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
```

## 📫 Contact

- GitHub: [@rameezrajapathan](https://github.com/rameezrajapathan)
- Email: rameezrajapathan@live.com

## 🔗 Helpful Links

- Documentation: {coming soon}
- [Examples](https://github.com/VerbPatch/headless-calendar/tree/main/examples)
- [Issues](https://github.com/verbpatch/headless-calendar/issues)
- [Contributing Guide](https://github.com/verbpatch/headless-calendar/blob/main/CONTRIBUTING.md)
- [Changelog](https://github.com/verbpatch/headless-calendar/blob/main/CHANGELOG.md)

---

Copyright (C) 2025 VerbPatch
