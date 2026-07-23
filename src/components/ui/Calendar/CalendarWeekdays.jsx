"use client";

import { WEEK_DAYS } from "./utils";

export default function CalendarWeekdays() {
  return (
    <div className="calendar-weekdays">
      {WEEK_DAYS.map((day) => (
        <div key={day} className="calendar-weekday">
          {day}
        </div>
      ))}
    </div>
  );
}
