import { setupCalendar } from "./calendar.js";

document.querySelector("#app").innerHTML = `<div id="calendar"></div>`;
setupCalendar(document.querySelector("#calendar"));
