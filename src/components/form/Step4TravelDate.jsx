"use client";

import { useFormContext } from "react-hook-form";
import { CalendarDays } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { format, isBefore, startOfMonth } from "date-fns";
import OptionCard from "../ui/OptionCard";
import Select from "../ui/Select";
import Calendar from "../ui/Calendar";

const dayOptions = [
  { label: "Select Days", value: "" },

  { label: "3 Days", value: "3" },
  { label: "4 Days", value: "4" },
  { label: "5 Days", value: "5" },
  { label: "6 Days", value: "6" },
  { label: "7 Days", value: "7" },
  { label: "8 Days", value: "8" },
  { label: "9 Days", value: "9" },
  { label: "10 Days", value: "10" },
  { label: "11 Days", value: "11" },
  { label: "12 Days", value: "12" },
  { label: "13 Days", value: "13" },
  { label: "14 Days", value: "14" },
  { label: "15 Days", value: "15" },
  { label: "16 Days", value: "16" },
  { label: "17 Days", value: "17" },
  { label: "18 Days", value: "18" },
  { label: "19 Days", value: "19" },
  { label: "20 Days", value: "20" },
];

const Step4TravelDate = () => {
  const { watch, setValue } = useFormContext();

  const today = new Date();

  const [year, setYear] = useState(today.getFullYear());

  const months = useMemo(() => {
    return Array.from({ length: 12 }).map((_, index) => {
      const date = new Date(year, index, 1);

      return {
        name: format(date, "MMM"),
        value: format(date, "MMMM"),
        date,
      };
    });
  }, [year]);

  const travelType = watch("travelType") || "idea";

  const selectedMonth = watch("month");

  const selectedDays = watch("days");

  const selectedDateRange = watch("dateRange");

  return (
    <div className="max-w-5xl mx-auto">
      {/* Heading */}

      <div className="text-center my-10 max-w-3xl mx-auto ">
        <h2 className="text-2xl md:text-4xl text-[#636363] font-normal font-cormorant">
          When would you like to travel?
        </h2>
      </div>
      {/* Toggle */}

      <div className="flex justify-center mb-10 font-quicksand font-semibold">
        <div className="inline-flex border border-gray-400">
          <button
            type="button"
            onClick={() => setValue("travelType", "idea")}
            className={`px-10 py-4 text-xl cursor-pointer

    ${travelType === "idea" ? "bg-[#aaa085] text-white" : "bg-white"}`}
          >
            I have an idea
          </button>

          <button
            type="button"
            onClick={() => setValue("travelType", "exact")}
            className={`px-10 py-4 text-xl cursor-pointer

    ${travelType === "exact" ? "bg-[#aaa085] text-white" : "bg-white"}`}
          >
            I have exact dates
          </button>
        </div>
      </div>

      {/* IDEA SECTION */}

      {travelType === "idea" && (
        <div className="space-y-12">
          {/* Year */}

          <div className="flex items-center justify-center gap-8">
            <button
              type="button"
              disabled={year <= today.getFullYear()}
              onClick={() => setYear(year - 1)}
              className={`cursor-pointer ${
                year <= today.getFullYear()
                  ? "opacity-40 cursor-not-allowed"
                  : ""
              }`}
            >
              <ChevronLeft size={28} className="text-gray-400" />
            </button>

            <h3 className="text-xl font-quicksand font-semibold">{year}</h3>

            <button
              type="button"
              onClick={() => setYear(year + 1)}
              className="cursor-pointer"
            >
              <ChevronRight size={28} className="text-gray-700" />
            </button>
          </div>

          {/* Months */}

          <div className="flex gap-4">
            {/* Months */}

            <div className="grid grid-cols-6 gap-3 flex-1">
              {months.map((month) => {
                const disabled = isBefore(
                  startOfMonth(month.date),
                  startOfMonth(today),
                );

                return (
                  <button
                    key={month.value}
                    type="button"
                    disabled={disabled}
                    onClick={() => !disabled && setValue("month", month.value)}
                    className={`h-12 font-quicksand font-semibold cursor-pointer transition

          ${
            disabled
              ? "bg-gray-100 text-gray-300 cursor-not-allowed"
              : selectedMonth === month.value
                ? "bg-[#aaa085] text-white"
                : "bg-[#F4F4F4] hover:bg-gray-200 cursor-pointer"
          }`}
                  >
                    {month.name}
                  </button>
                );
              })}
            </div>

            {/* Any Month */}

            <button
              type="button"
              onClick={() => setValue("month", "Any Month")}
              className={`w-42 h-[110px] flex items-center justify-center font-quicksand font-semibold cursor-pointer transition

    ${
      selectedMonth === "Any Month"
        ? "bg-[#aaa085] text-white"
        : "bg-[#F4F4F4] hover:bg-gray-200"
    }`}
            >
              Any month
            </button>
          </div>

          {/* Days */}

          <div className="flex items-center justify-center gap-10 mt-10">
            <h2 className="text-2xl md:text-3xl text-[#636363] font-normal font-cormorant">
              How many days would you like to travel?
            </h2>

            <div className="w-80 font-quicksand font-semibold cursor-pointer">
              <Select
                value={selectedDays}
                onChange={(e) => setValue("days", e.target.value)}
                options={[
                  {
                    label: "Select Days",
                    value: "",
                  },
                  {
                    label: "3-5 Days",
                    value: "3-5",
                  },
                  {
                    label: "5-7 Days",
                    value: "5-7",
                  },
                  {
                    label: "7-10 Days",
                    value: "7-10",
                  },
                  {
                    label: "10-14 Days",
                    value: "10-14",
                  },
                  {
                    label: "14+ Days",
                    value: "14+",
                  },
                ]}
              />
            </div>
          </div>
        </div>
      )}

      {/* EXACT DATE SECTION */}

      {travelType === "exact" && (
        <div className="space-y-8 max-w-3xl mx-auto">
          {/* <Calendar
            value={selectedDateRange}
            onChange={(range) =>
              setValue("dateRange", range, {
                shouldDirty: true,
                shouldTouch: true,
                shouldValidate: true,
              })
            }
          /> */}

          <Calendar
            value={selectedDateRange}
            onChange={(range) =>
              setValue("dateRange", range, {
                shouldDirty: true,
                shouldTouch: true,
                shouldValidate: true,
              })
            }
          />

          {/* Selected Date Preview */}

          {/* {selectedDateRange && (
            <div className="mt-8 rounded-xl border border-[#A30C0C] bg-red-50 p-5">
              <h4 className="font-semibold text-lg mb-2">
                Selected Travel Dates
              </h4>

              <div className="flex flex-col md:flex-row gap-6 text-gray-700">
                <div>
                  <span className="font-medium">Start Date:</span>{" "}
                  {selectedDateRange?.from.toLocaleDateString()}
                </div>

                <div>
                  <span className="font-medium">End Date:</span>{" "}
                  {selectedDateRange?.to.toLocaleDateString()}
                </div>
              </div>
            </div>
          )} */}
        </div>
      )}
    </div>
  );
};

export default Step4TravelDate;
