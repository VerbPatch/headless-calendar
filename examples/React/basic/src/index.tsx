import { createRoot } from 'react-dom/client';
import { CalendarDemo } from './calendar';

createRoot(document.getElementById('root')!).render(
  <>
    <h1>Welcome to React Calendar</h1>
    <CalendarDemo />
  </>,
);
