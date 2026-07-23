"use client";

import { format } from "date-fns";
import clsx from "clsx";

export default function CalendarDay({
  day,
  onSelect,
  disabled,
  outside,
  selectedStart,
  selectedEnd,
  inRange,
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => {
        if (!disabled) {
          onSelect(day);
        }
      }}
      className={clsx(
        "calendar-day",

        outside && "calendar-day-outside",

        disabled && "calendar-day-disabled",

        inRange && "calendar-day-range",

        selectedStart && "calendar-day-start",

        selectedEnd && "calendar-day-end",

        selectedStart &&
          selectedEnd &&
          "calendar-day-single"
      )}
    >
      {/* Left range background */}
      {selectedEnd && !selectedStart && (
        <span className="calendar-range-left" />
      )}

      {/* Right range background */}
      {selectedStart && !selectedEnd && (
        <span className="calendar-range-right" />
      )}

      {/* Middle range */}
      {inRange && (
        <span className="calendar-range-middle" />
      )}

      {/* Day Number */}
      <span className="calendar-day-number">
        {format(day, "d")}
      </span>
    </button>
  );
}