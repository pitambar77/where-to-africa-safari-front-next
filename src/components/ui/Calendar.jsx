// "use client";

// import { useState } from "react";
// import { DayPicker } from "react-day-picker";
// import { addMonths, subMonths, addYears, subYears } from "date-fns";
// import "react-day-picker/dist/style.css";

// import CalendarCaption from "./CalendarCaption";

// export default function Calendar({ value, onChange }) {
//   const [month, setMonth] = useState(new Date());

//   return (
//     <div className="calendar-wrapper rounded-xl border border-gray-300 bg-white p-6">
//       {/* <CalendarCaption
//         month={month}
//         onPrevMonth={() => setMonth(subMonths(month, 1))}
//         onNextMonth={() => setMonth(addMonths(month, 1))}
//         onPrevYear={() => setMonth(subYears(month, 1))}
//         onNextYear={() => setMonth(addYears(month, 1))}
//       /> */}

//       <DayPicker
//         mode="range"
//         numberOfMonths={2}
//         month={month}
//         onMonthChange={setMonth}
//         selected={value}
//         onSelect={onChange}
//         disabled={{ before: new Date() }}
//         showOutsideDays
//       />
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { addMonths, subMonths, addYears, subYears, format } from "date-fns";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import "react-day-picker/dist/style.css";

export default function Calendar({ value, onChange }) {
  const [month, setMonth] = useState(new Date());

  return (
    <div className="calendar-wrapper  bg-white p-8">
      {/* Header */}
      <div className="relative mb-8 h-10 max-w-xl mx-auto">
        {/* Left Navigation */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center gap-1">
          <button
            type="button"
            onClick={() => setMonth(subYears(month, 1))}
            className="p-1 hover:text-[#aa8b51]"
          >
            <ChevronsLeft size={22} />
          </button>

          <button
            type="button"
            onClick={() => setMonth(subMonths(month, 1))}
            className="p-1 hover:text-[#aa8b51]"
          >
            <ChevronLeft size={22} />
          </button>
        </div>

        {/* Right Navigation */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-1">
          <button
            type="button"
            onClick={() => setMonth(addMonths(month, 1))}
            className="p-1 hover:text-[#aa8b51]"
          >
            <ChevronRight size={22} />
          </button>

          <button
            type="button"
            onClick={() => setMonth(addYears(month, 1))}
            className="p-1 hover:text-[#aa8b51]"
          >
            <ChevronsRight size={22} />
          </button>
        </div>
      </div>

      <DayPicker
        mode="range"
        month={month}
        onMonthChange={setMonth}
        selected={value}
        onSelect={onChange}
        numberOfMonths={2}
        showOutsideDays
        pagedNavigation
        disabled={{ before: new Date() }}
        hideNavigation
      />
    </div>
  );
}
