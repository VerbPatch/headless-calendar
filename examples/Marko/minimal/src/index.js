import "marko/express";
import { renderIntoElement } from "marko/components";
import CalendarDemo from "./components/calendar-demo.marko";

renderIntoElement(CalendarDemo, {}, document.getElementById("root"));
