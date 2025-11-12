# 📅 Headless Calendar Library

A powerful, flexible, and completely headless calendar library for applications. Built with TypeScript, zero dependencies, and designed to work with any UI framework or design system.

## ✨ Features

- 🎯 **Completely Headless** - No UI components, just logic and data
- 📅 **Multiple Views** - Month, Week, and Day views
- 🎨 **Framework Agnostic** - Works with any CSS framework or component library
- 🔄 **Event Management** - Create, update, delete, and move events
- 🖱️ **Drag & Drop** - Built-in drag and drop support
- 🎭 **TypeScript First** - Full type safety and IntelliSense support
- 🌳 **Tree Shakeable** - Import only what you need
- 📦 **Zero Dependencies**

## 🚀 Installation

```bash
npm install @verb/headless-calendar
# or
yarn add @verb/headless-calendar
# or
pnpm add @verb/headless-calendar
```

## 🎯 Quick Start

```tsx
import { useCalendar } from "@verb/headless-calendar";

function MyCalendar() {
  const calendar = useCalendar({
    defaultView: "month",
    startOfWeek: 1, // Monday
  });

  const handleDateClick = (date: Date) => {
    calendar.createEvent({
      title: "New Event",
      start: new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        9,
        0
      ),
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

## 📚 API Reference

For complete API documentation, visit our [API Documentation](https://your-docs-site.com).

## 🎨 Examples

Find more examples in our examples directory.

### Month View with Tailwind CSS

```tsx
import { useCalendar } from "@verb/headless-calendar";

function MonthCalendar() {
  const calendar = useCalendar({ defaultView: "month" });

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={calendar.goToPrevious} className="btn">
          ←
        </button>
        <h1 className="text-2xl font-bold">{calendar.monthData?.monthName}</h1>
        <button onClick={calendar.goToNext} className="btn">
          →
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendar.monthData?.weeks.flat().map((date, index) => (
          <div key={index} className="min-h-24 p-2 border">
            <div className="font-medium">{date.getDate()}</div>
            {calendar.getEventsForDate(date).map((event) => (
              <div
                key={event.id}
                className="text-xs p-1 rounded text-white mt-1"
                style={{ backgroundColor: event.color }}
              >
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

### Week View with Time Slots

```tsx
function WeekCalendar() {
  const calendar = useCalendar({
    defaultView: "week",
    startHour: 8,
    endHour: 18,
    timeSlotInterval: 30,
  });

  return (
    <div className="calendar-week">
      {/* Week Header */}
      <div className="grid grid-cols-8">
        <div></div>
        {calendar.weekData?.dates.map((date, index) => (
          <div key={index} className="text-center p-2">
            {date.toLocaleDateString("en-US", {
              weekday: "short",
              day: "numeric",
            })}
          </div>
        ))}
      </div>

      {/* Time Grid */}
      <div className="grid grid-cols-8">
        <div>
          {calendar.timeSlots.map((slot) => (
            <div key={slot.time} className="h-12 text-xs text-right pr-2">
              {slot.label}
            </div>
          ))}
        </div>

        {calendar.weekData?.dates.map((date, dateIndex) => (
          <div key={dateIndex}>
            {calendar.timeSlots.map((slot) => (
              <div
                key={slot.time}
                className="h-12 border-b border-gray-200 relative"
                onDrop={() => calendar.handleDrop({ date, time: slot.time })}
                onDragOver={(e) => e.preventDefault()}
              >
                {/* Render events for this time slot */}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Drag and Drop Events

```tsx
function DragDropCalendar() {
  const calendar = useCalendar();

  const handleEventDragStart = (event: CalendarEvent) => {
    calendar.startDrag(event);
  };

  const handleDrop = (date: Date) => {
    calendar.handleDrop({ date });
  };

  return (
    <div>
      {calendar.monthData?.weeks.flat().map((date, index) => (
        <div
          key={index}
          onDrop={() => handleDrop(date)}
          onDragOver={(e) => e.preventDefault()}
        >
          {calendar.getEventsForDate(date).map((event) => (
            <div
              key={event.id}
              draggable
              onDragStart={() => handleEventDragStart(event)}
              style={{ backgroundColor: event.color }}
            >
              {event.title}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
```

## 🔧 Advanced Usage

### Custom Event Validation

```tsx
const calendar = useCalendar({
  onEventCreate: (event) => {
    // Add custom validation
    if (event.title.length < 3) {
      throw new Error("Event title must be at least 3 characters");
    }
    console.log("Event created:", event);
  },
});
```

### Event Filtering and Searching

```tsx
const [searchTerm, setSearchTerm] = useState("");

const filteredEvents = calendar.events.filter((event) =>
  event.title.toLowerCase().includes(searchTerm.toLowerCase())
);

const upcomingEvents = calendar.events
  .filter((event) => new Date(event.start) > new Date())
  .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
```

### Integration with State Management

```tsx
// With Redux
const dispatch = useDispatch();
const calendar = useCalendar({
  onEventCreate: (event) => dispatch(addEvent(event)),
  onEventUpdate: (event) => dispatch(updateEvent(event)),
  onEventDelete: (event) => dispatch(removeEvent(event.id)),
});

// With Zustand
const { addEvent, updateEvent, removeEvent } = useEventStore();
const calendar = useCalendar({
  onEventCreate: addEvent,
  onEventUpdate: updateEvent,
  onEventDelete: (event) => removeEvent(event.id),
});
```

## 🎯 TypeScript Support

The library is built with TypeScript and provides full type safety:

```typescript
import type {
  CalendarEvent,
  CalendarOptions,
  ViewType,
  TimeSlot,
} from "@verb/headless-calendar";

// All types are exported and available for use
const handleEvent = (event: CalendarEvent) => {
  // Full IntelliSense support
  console.log(event.title, event.start, event.end);
};
```

## 🧪 Testing

```bash
npm test              # Run tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📫 Contact

- GitHub: [@rameezrajapathan](https://github.com/rameezrajapathan)
- Email: rameezrajapathan@live.com

## 🔗 Links

- [Documentation](https://your-docs-site.com)
- [Examples](https://github.com/your-username/headless-calendar/tree/main/examples)
- [Issues](https://github.com/your-username/headless-calendar/issues)
- [Changelog](https://github.com/your-username/headless-calendar/blob/main/CHANGELOG.md)

## ⚖️ License

This project is licensed under the GNU General Public License v3.0 (GPLv3). This means:

- ✅ You can use this library in your projects (commercial or non-commercial)
- ✅ You can modify the code
- ✅ You **must** make your source code available under the same GPLv3 license
- ✅ You **must** state any changes made to the code
- ✅ You **must** include the original copyright and license notice

For more details, see the [LICENSE](https://choosealicense.com/licenses/gpl-3.0/).

### 📝 Source Code Notice

As required by the GPLv3 license, any modifications to this code must be made available under the same license. When using this library, you must:

1. Provide a way for users to obtain the complete source code
2. Include the original copyright notice and license
3. State significant changes made to the library
4. Make your code that uses this library also available under GPLv3

### ⚠️ Important License Notice

This library is GPL-3.0 licensed. If you use it in your project, your project must also be released under the GPL license. This means you must make your source code available and allow others to freely modify and distribute it.

If you need a different licensing arrangement, please contact the maintainers.

---

Copyright (C) 2025 VerbPatch

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request
