import React from "react";

const DayTab = ({ location, isActive, onClick }) => (
  <button
    className={`px-4 py-2 text-sm font-medium transition-all duration-300 whitespace-nowrap border-b-4 ${
      isActive
        ? "border-[#aaa086] text-[#aaa086] bg-gray-50"
        : "border-transparent text-gray-700 hover:text-gray-900 hover:border-gray-300"
    }`}
    onClick={onClick}
  >
    {location}
  </button>
);

export default DayTab;
