// "use client";

// import { format } from "date-fns";
// import {
//   ChevronLeft,
//   ChevronRight,
//   ChevronsLeft,
//   ChevronsRight,
// } from "lucide-react";

// export default function CalendarHeader({
//   month,
//   onPrevMonth,
//   onNextMonth,
//   onPrevYear,
//   onNextYear,
// }) {
//   return (
//     <div className="calendar-header">
//       {/* Left Navigation */}

//       <div className="calendar-nav calendar-nav-left">
//         <button type="button" onClick={onPrevYear} className="calendar-nav-btn">
//           <ChevronsLeft size={22} strokeWidth={2.5} />
//         </button>

//         <button
//           type="button"
//           onClick={onPrevMonth}
//           className="calendar-nav-btn"
//         >
//           <ChevronLeft size={22} strokeWidth={2.5} />
//         </button>
//       </div>

//       {/* Current Month */}

//       <h2 className="calendar-title">{format(month, "MMMM yyyy")}</h2>

//       {/* Right Navigation */}

//       <div className="calendar-nav calendar-nav-right">
//         <button
//           type="button"
//           onClick={onNextMonth}
//           className="calendar-nav-btn"
//         >
//           <ChevronRight size={22} strokeWidth={2.5} />
//         </button>

//         <button type="button" onClick={onNextYear} className="calendar-nav-btn">
//           <ChevronsRight size={22} strokeWidth={2.5} />
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";

import { format } from "date-fns";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

export default function CalendarHeader({
  currentMonth,
  onPreviousMonth,
  onNextMonth,
  onPreviousYear,
  onNextYear,
}) {
  return (
    <div className="calendar-header">
      {/* Left Navigation */}
      <div className="calendar-header-left">
        <button
          type="button"
          className="calendar-nav-btn"
          onClick={onPreviousYear}
          aria-label="Previous Year"
        >
          <ChevronsLeft size={10} strokeWidth={1} />
        </button>

        <button
          type="button"
          className="calendar-nav-btn"
          onClick={onPreviousMonth}
          aria-label="Previous Month"
        >
          <ChevronLeft size={10} strokeWidth={1} />
        </button>
      </div>

      {/* Current Month */}
      <div className="calendar-header-title">
        {format(currentMonth, "MMMM yyyy")}
      </div>

      {/* Right Navigation */}
      <div className="calendar-header-right">
        <button
          type="button"
          className="calendar-nav-btn"
          onClick={onNextMonth}
          aria-label="Next Month"
        >
          <ChevronRight size={10} strokeWidth={1} />
        </button>

        <button
          type="button"
          className="calendar-nav-btn"
          onClick={onNextYear}
          aria-label="Next Year"
        >
          <ChevronsRight size={10} strokeWidth={1} />
        </button>
      </div>
    </div>
  );
}
