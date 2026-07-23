// "use client";

// import {
//   startOfMonth,
//   endOfMonth,
//   startOfWeek,
//   endOfWeek,
//   eachDayOfInterval,
//   isSameMonth,
//   isToday,
//   isBefore,
//   isAfter,
//   isSameDay,
//   format,
// } from "date-fns";

// import CalendarDay from "./CalendarDay";

// export default function CalendarMonth({ month, selected, onSelect }) {
//   // First day of current month
//   const monthStart = startOfMonth(month);

//   // Last day of current month
//   const monthEnd = endOfMonth(month);

//   // Sunday before first day
//   const calendarStart = startOfWeek(monthStart, {
//     weekStartsOn: 0,
//   });

//   // Saturday after last day
//   const calendarEnd = endOfWeek(monthEnd, {
//     weekStartsOn: 0,
//   });

//   // All days to render (6 weeks)
//   const days = eachDayOfInterval({
//     start: calendarStart,
//     end: calendarEnd,
//   });

//   const today = new Date();

//   const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

//   const getDayState = (day) => {
//     const disabled = isBefore(day, today) && !isToday(day);

//     const outside = !isSameMonth(day, month);

//     const selectedStart = selected?.from && isSameDay(day, selected.from);

//     const selectedEnd = selected?.to && isSameDay(day, selected.to);

//     const inRange =
//       selected?.from &&
//       selected?.to &&
//       isAfter(day, selected.from) &&
//       isBefore(day, selected.to);

//     return {
//       disabled,
//       outside,
//       selectedStart,
//       selectedEnd,
//       inRange,
//     };
//   };

//   return (
//     <div className="calendar-month">
//       {/* Month Heading */}

//       <div className="calendar-month-title">{format(month, "MMMM yyyy")}</div>

//       {/* Weekday Names */}

//       <div className="calendar-weekdays">
//         {weekdays.map((day) => (
//           <div key={day} className="calendar-weekday">
//             {day}
//           </div>
//         ))}
//       </div>

//       {/* Days Grid */}

//       <div className="calendar-grid">
//         {days.map((day) => {
//           const state = getDayState(day);

//           return (
//             <CalendarDay
//               key={day.toISOString()}
//               day={day}
//               onSelect={onSelect}
//               {...state}
//             />
//           );
//         })}
//       </div>
//     </div>
//   );
// }

"use client";

import { format } from "date-fns";
import CalendarWeekdays from "./CalendarWeekdays";
import CalendarGrid from "./CalendarGrid";

export default function CalendarMonth({
  month,
  range,
  hoveredDate,
  onHover,
  onLeave,
  onSelect,
}) {
  return (
    <div className="calendar-month">
      {/* Month Title */}
      <div className="calendar-month-title">{format(month, "MMMM yyyy")}</div>

      {/* Weekday Header */}
      <CalendarWeekdays />

      {/* Calendar Grid */}
      <CalendarGrid
        month={month}
        range={range}
        hoveredDate={hoveredDate}
        onHover={onHover}
        onLeave={onLeave}
        onSelect={onSelect}
      />
    </div>
  );
}
