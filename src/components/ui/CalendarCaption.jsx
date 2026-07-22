"use client";

import { format } from "date-fns";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

export default function CalendarCaption({
  month,
  onPrevMonth,
  onNextMonth,
  onPrevYear,
  onNextYear,
}) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex gap-2">
        <button type="button" onClick={onPrevYear}>
          <ChevronsLeft size={20} />
        </button>

        <button type="button" onClick={onPrevMonth}>
          <ChevronLeft size={20} />
        </button>
      </div>

      <h2 className="text-3xl font-bold">{format(month, "MMM yyyy")}</h2>

      <div className="flex gap-2">
        <button type="button" onClick={onNextMonth}>
          <ChevronRight size={20} />
        </button>

        <button type="button" onClick={onNextYear}>
          <ChevronsRight size={20} />
        </button>
      </div>
    </div>
  );
}
