// "use client";

// import { useEffect } from "react";
// import useCalendar from "./useCalendar";
// import CalendarHeader from "./CalendarHeader";
// import CalendarMonths from "./CalendarMonths";
// import "./calendar.css";

// export default function Calendar({
//   value = { from: null, to: null },
//   onChange,
// }) {
//   const {
//     currentMonth,
//     nextVisibleMonth,

//     range,
//     setRange,

//     nextMonth,
//     previousMonth,
//     nextYear,
//     previousYear,

//     selectDate,
//     hoveredDate,
//     hoverDate,
//     clearHover,
//   } = useCalendar(value);

//   /* ------------------------------
//      Sync external value
//   ------------------------------ */

//   useEffect(() => {
//     if (value?.from !== range?.from || value?.to !== range?.to) {
//       setRange(value || { from: null, to: null });
//     }
//   }, [value]);

//   /* ------------------------------
//      Notify Parent
//   ------------------------------ */

//   useEffect(() => {
//     if (onChange) {
//       onChange(range);
//     }
//   }, [range]);

//   return (
//     <div className="calendar-wrapper">
//       {/* Header */}

//       <CalendarHeader
//         currentMonth={currentMonth}
//         onPreviousMonth={previousMonth}
//         onNextMonth={nextMonth}
//         onPreviousYear={previousYear}
//         onNextYear={nextYear}
//       />

//       {/* Months */}

//       <CalendarMonths
//         leftMonth={currentMonth}
//         rightMonth={nextVisibleMonth}
//         range={range}
//         hoveredDate={hoveredDate}
//         onHover={hoverDate}
//         onLeave={clearHover}
//         onSelect={selectDate}
//       />
//     </div>
//   );
// }

"use client";

import { useEffect } from "react";
import useCalendar from "./useCalendar";
import CalendarMonths from "./CalendarMonths";
import "./calendar.css";

export default function Calendar({
  value = { from: null, to: null },
  onChange,
}) {
  const {
    currentMonth,
    nextVisibleMonth,

    range,
    setRange,

    nextMonth,
    previousMonth,
    nextYear,
    previousYear,

    selectDate,
    hoveredDate,
    hoverDate,
    clearHover,
  } = useCalendar(value);

  useEffect(() => {
    setRange(value || { from: null, to: null });
  }, [value, setRange]);

  useEffect(() => {
    onChange?.(range);
  }, [range, onChange]);

  return (
    <div className="calendar-wrapper">
      <CalendarMonths
        leftMonth={currentMonth}
        rightMonth={nextVisibleMonth}
        range={range}
        hoveredDate={hoveredDate}
        onHover={hoverDate}
        onLeave={clearHover}
        onSelect={selectDate}
        onPreviousMonth={previousMonth}
        onNextMonth={nextMonth}
        onPreviousYear={previousYear}
        onNextYear={nextYear}
      />
    </div>
  );
}
