"use client";

import clsx from "clsx";
import { ChevronDown } from "lucide-react";

const Select = ({ label, value, onChange, options = [], error }) => {
  return (
    <div className="space-y-2 w-full">
      {label && <label className="font-quicksand tracking-wide font-medium text-gray-700 ">{label}</label>}

      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          className={clsx(
            "w-full h-12",
            "appearance-none",
            "rounded-md",
            "border",
            "px-4",
            "mt-4",
            "outline-none",
            "font-quicksand",
            error ? "border-red-500" : "border-gray-300",
          )}
        >
          {options.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>

        <ChevronDown
          className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
          size={20}
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Select;
