import { useState, useMemo } from "react";
import {
  addMonths,
  subMonths,
  addYears,
  subYears,
  isBefore,
  isSameDay,
} from "date-fns";

export default function useCalendar(initialRange = { from: null, to: null }) {
  // Current visible month
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Selected range
  const [range, setRange] = useState(initialRange);

  // Hovered day (for preview)
  const [hoveredDate, setHoveredDate] = useState(null);

  /* ===============================
     Navigation
  ============================== */

  const nextMonth = () => {
    setCurrentMonth((prev) => addMonths(prev, 1));
  };

  const previousMonth = () => {
    setCurrentMonth((prev) => subMonths(prev, 1));
  };

  const nextYear = () => {
    setCurrentMonth((prev) => addYears(prev, 1));
  };

  const previousYear = () => {
    setCurrentMonth((prev) => subYears(prev, 1));
  };

  /* ===============================
     Date Selection
  ============================== */

  const selectDate = (day) => {
    // First click
    if (!range.from || (range.from && range.to)) {
      setRange({
        from: day,
        to: null,
      });

      return;
    }

    // Click same day
    if (isSameDay(day, range.from)) {
      setRange({
        from: day,
        to: null,
      });

      return;
    }

    // Click before start
    if (isBefore(day, range.from)) {
      setRange({
        from: day,
        to: range.from,
      });

      return;
    }

    // Normal end date
    setRange({
      from: range.from,
      to: day,
    });
  };

  /* ===============================
     Hover
  ============================== */

  const hoverDate = (day) => {
    setHoveredDate(day);
  };

  const clearHover = () => {
    setHoveredDate(null);
  };

  /* ===============================
     Reset
  ============================== */

  const clearSelection = () => {
    setRange({
      from: null,
      to: null,
    });

    setHoveredDate(null);
  };

  /* ===============================
     Months
  ============================== */

  const nextVisibleMonth = useMemo(() => {
    return addMonths(currentMonth, 1);
  }, [currentMonth]);

  /* ===============================
     Return
  ============================== */

  return {
    currentMonth,
    nextVisibleMonth,

    range,
    hoveredDate,

    nextMonth,
    previousMonth,
    nextYear,
    previousYear,

    selectDate,

    hoverDate,
    clearHover,

    clearSelection,

    setCurrentMonth,
    setRange,
  };
}
