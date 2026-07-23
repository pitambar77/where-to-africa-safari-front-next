"use client";

import {
  format,
  isSameDay,
  isAfter,
  isBefore,
  addDays,
  subDays,
} from "date-fns";

export default function CalendarCell({
  day,
  month,
  range,
  hoveredDate,

  previousDay,
  nextDay,

  isToday,
  isDisabled,
  isOutside,

  onHover,
  onLeave,
  onSelect,
}) {
  /* --------------------------
      Selection States
  --------------------------- */

  const isStart = range?.from && isSameDay(day, range.from);

  const isEnd = range?.to && isSameDay(day, range.to);

  const isSelected = isStart || isEnd;

  const isBetween =
    range?.from &&
    range?.to &&
    isAfter(day, range.from) &&
    isBefore(day, range.to);

  /* --------------------------
      Hover Preview
  --------------------------- */

  const isHoverRange =
    range?.from &&
    !range?.to &&
    hoveredDate &&
    isAfter(day, range.from) &&
    isBefore(day, hoveredDate);

  /* --------------------------
      Connected Range
  --------------------------- */

  //   const previousInRange = previousDay && (isBetween || isStart);

  //   const nextInRange = nextDay && (isBetween || isEnd);
  const previousDate = subDays(day, 1);
  const nextDate = addDays(day, 1);

  const previousInRange =
    range?.from &&
    range?.to &&
    (isSameDay(previousDate, range.from) ||
      isSameDay(previousDate, range.to) ||
      (isAfter(previousDate, range.from) && isBefore(previousDate, range.to)));

  const nextInRange =
    range?.from &&
    range?.to &&
    (isSameDay(nextDate, range.from) ||
      isSameDay(nextDate, range.to) ||
      (isAfter(nextDate, range.from) && isBefore(nextDate, range.to)));

  return (
    <div
      className={[
        "calendar-cell",

        isOutside && "outside",

        isDisabled && "disabled",

        isToday && "today",

        isBetween && "range",

        isHoverRange && "hover-range",

        isStart && "start",

        isEnd && "end",
      ]
        .filter(Boolean)
        .join(" ")}
      onMouseEnter={() => {
        if (!isDisabled) {
          onHover(day);
        }
      }}
      onMouseLeave={onLeave}
      onClick={() => {
        if (!isDisabled) {
          onSelect(day);
        }
      }}
    >
      {/* Left Connector */}

      {(isBetween || isEnd) && previousInRange && (
        <div className="range-left" />
      )}

      {/* Right Connector */}

      {(isBetween || isStart) && nextInRange && <div className="range-right" />}

      {/* Day */}

      <div className="calendar-number">{format(day, "d")}</div>
    </div>
  );
}
