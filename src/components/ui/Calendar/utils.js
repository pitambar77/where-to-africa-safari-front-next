import {
  addMonths,
  subMonths,
  addYears,
  subYears,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
  isBefore,
  isAfter,
  isToday,
  isSameMonth,
  format,
} from "date-fns";

/* ===============================
   Month Navigation
================================ */

export const nextMonth = (date) => addMonths(date, 1);

export const previousMonth = (date) => subMonths(date, 1);

export const nextYear = (date) => addYears(date, 1);

export const previousYear = (date) => subYears(date, 1);

/* ===============================
   Calendar Grid (42 Days)
================================ */

export const getCalendarDays = (month) => {
  const monthStart = startOfMonth(month);
  const monthEnd = endOfMonth(month);

  const calendarStart = startOfWeek(monthStart, {
    weekStartsOn: 0,
  });

  const calendarEnd = endOfWeek(monthEnd, {
    weekStartsOn: 0,
  });

  return eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  });
};

/* ===============================
   Date Comparisons
================================ */

export const isSameDate = (a, b) => {
  if (!a || !b) return false;
  return isSameDay(a, b);
};

export const isPastDate = (date) => {
  const today = new Date();
  return isBefore(date, today) && !isToday(date);
};

export const isFutureDate = (date) => {
  return isAfter(date, new Date());
};

export const isTodayDate = (date) => {
  return isToday(date);
};

export const isOutsideMonth = (date, month) => {
  return !isSameMonth(date, month);
};

/* ===============================
   Range Helpers
================================ */

export const isStartDate = (date, range) => {
  return range?.from && isSameDay(date, range.from);
};

export const isEndDate = (date, range) => {
  return range?.to && isSameDay(date, range.to);
};

export const isInRange = (date, range) => {
  if (!range?.from || !range?.to) return false;

  return isAfter(date, range.from) && isBefore(date, range.to);
};

/* ===============================
   Selection Logic
================================ */

export const createRange = (currentRange, clickedDay) => {
  if (!currentRange?.from || currentRange?.to) {
    return {
      from: clickedDay,
      to: null,
    };
  }

  if (isBefore(clickedDay, currentRange.from)) {
    return {
      from: clickedDay,
      to: currentRange.from,
    };
  }

  return {
    from: currentRange.from,
    to: clickedDay,
  };
};

/* ===============================
   Labels
================================ */

export const getMonthLabel = (date) => format(date, "MMMM yyyy");

export const getDayLabel = (date) => format(date, "d");

/* ===============================
   Weekdays
================================ */

export const WEEK_DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
