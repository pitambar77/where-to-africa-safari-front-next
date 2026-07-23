"use client";

import { format } from "date-fns";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import CalendarGrid from "./CalendarGrid";
import CalendarWeekdays from "./CalendarWeekdays";

export default function CalendarMonths({
  leftMonth,
  rightMonth,

  range,
  hoveredDate,

  onHover,
  onLeave,
  onSelect,

  onPreviousMonth,
  onNextMonth,
  onPreviousYear,
  onNextYear,
}) {
  return (
    <div className="calendar-container">
      {/* Month Header */}
      {/* Header */}

      <div className="calendar-header">
        {/* Left Side */}

        <div className="calendar-header-left">
          <button
            type="button"
            className="calendar-nav-btn"
            onClick={onPreviousYear}
          >
            <ChevronsLeft size={18} strokeWidth={2} />
          </button>

          <button
            type="button"
            className="calendar-nav-btn"
            onClick={onPreviousMonth}
          >
            <ChevronLeft size={18} strokeWidth={2} />
          </button>
        </div>

        {/* Month Titles */}

        <div className="calendar-header-center">
          <div className="calendar-month-heading">
            {format(leftMonth, "MMMM yyyy")}
          </div>

          <div className="calendar-month-heading">
            {format(rightMonth, "MMMM yyyy")}
          </div>
        </div>

        {/* Right Side */}

        <div className="calendar-header-right">
          <button
            type="button"
            className="calendar-nav-btn"
            onClick={onNextMonth}
          >
            <ChevronRight size={18} strokeWidth={2} />
          </button>

          <button
            type="button"
            className="calendar-nav-btn"
            onClick={onNextYear}
          >
            <ChevronsRight size={18} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Two Calendars */}

      <div className="calendar-months">
        <div className="calendar-month">
          <CalendarWeekdays />

          <CalendarGrid
            month={leftMonth}
            range={range}
            hoveredDate={hoveredDate}
            onHover={onHover}
            onLeave={onLeave}
            onSelect={onSelect}
          />
        </div>

        <div className="calendar-month">
          <CalendarWeekdays />

          <CalendarGrid
            month={rightMonth}
            range={range}
            hoveredDate={hoveredDate}
            onHover={onHover}
            onLeave={onLeave}
            onSelect={onSelect}
          />
        </div>
      </div>
    </div>
  );
}
