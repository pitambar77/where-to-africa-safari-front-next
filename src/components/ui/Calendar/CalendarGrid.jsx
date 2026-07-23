"use client";

import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isToday,
} from "date-fns";

import { isPastDate, isStartDate, isEndDate, isInRange } from "./utils";

import CalendarCell from "./CalendarCell";

export default function CalendarGrid({
  month,
  range,
  hoveredDate,
  onHover,
  onLeave,
  onSelect,
}) {
  /* -----------------------------
     Month Start / End
  ----------------------------- */

  const monthStart = startOfMonth(month);

  const monthEnd = endOfMonth(month);

  /* -----------------------------
     Calendar Start / End
  ----------------------------- */

  const calendarStart = startOfWeek(monthStart, {
    weekStartsOn: 0,
  });

  const calendarEnd = endOfWeek(monthEnd, {
    weekStartsOn: 0,
  });

  /* -----------------------------
     All Days (42 cells)
  ----------------------------- */

  const days = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  });

  /* -----------------------------
     Convert into 6 weeks
  ----------------------------- */

  const weeks = [];

  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  return (
    <div className="calendar-grid">
      {weeks.map((week, weekIndex) => (
        <div key={weekIndex} className="calendar-week">
          {week.map((day, index) => (
            <CalendarCell
              key={day.toISOString()}
              day={day}
              month={month}
              range={range}
              hoveredDate={hoveredDate}
              previousDay={week[index - 1] || null}
              nextDay={week[index + 1] || null}
              isToday={isToday(day)}
              isDisabled={isPastDate(day)}
              isOutside={!isSameMonth(day, month)}
              onHover={onHover}
              onLeave={onLeave}
              onSelect={onSelect}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
