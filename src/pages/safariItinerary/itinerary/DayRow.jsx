import React from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const DayRow = ({ day, title, isExpanded, onToggle }) => (
  <div
    className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50 transition-colors"
    onClick={onToggle}
  >
    <div className="flex space-x-4 items-center">
      <div className="font-bold text-gray-700 w-12 text-left">{day}</div>
      <div className="font-medium text-gray-900">{title}</div>
    </div>
    <div className="text-[#aaa086] font-medium text-sm flex items-center uppercase">
      {isExpanded ? "Collapse" : "Expand"}
      {isExpanded ? (
        <IoIosArrowUp className="ml-1 w-4 h-4" />
      ) : (
        <IoIosArrowDown className="ml-1 w-4 h-4" />
      )}
    </div>
  </div>
);

export default DayRow;
