// import React from "react";

// const MonthCircle = ({ month, isActive, onHover }) => {
//   return (
//     <div
//       onMouseEnter={() => onHover(month)}
//       className={`w-16 h-16 rounded-full flex items-center justify-center font-semibold uppercase transition-all duration-300 cursor-pointer ${
//         isActive
//           ? `${month.color} border-b-4 border-[#a89f82] scale-105`
//           : month.color
//       }`}
//     >
//       {month.name}
//     </div>
//   );
// };

// export default MonthCircle;


import React from "react";
// import { getSeasonColor } from "../../utils/seasonColor"; 
// adjust path if needed

const getSeasonColor = (seasonText = "") => {
  const text = seasonText.toLowerCase();

  if (text.includes("dry") || text.includes("summer"))
    return {
      bg: "bg-[#A5D6A7]",
      text: "text-[#2e7d32]",
      label: "Excellent",
    };

  if (text.includes("wet"))
    return {
      bg: "bg-[#E1D7F8]",
      text: "text-[#5e35b1]",
      label: "Mixed",
    };

  if (text.includes("shoulder") || text.includes("transitional"))
    return {
      bg: "bg-[#F1F8C0]",
      text: "text-[#9e9d24]",
      label: "Good",
    };

  return {
    bg: "bg-gray-200",
    text: "text-gray-600",
    label: "Good",
  };
};

const MonthCircle = ({ month, isActive, onHover }) => {
  const seasonColor = getSeasonColor(month.season);

  return (
    <div
      onMouseEnter={() => onHover(month)}
      className={`
        w-16 h-16 rounded-full
        flex items-center justify-center
        font-semibold uppercase cursor-pointer
        transition-all duration-300
        ${seasonColor.bg}
        ${isActive ? "border-b-4 border-[#a89f82] scale-105" : ""}
      `}
    >
      {month.name.slice(0, 3).toUpperCase()}
    </div>
  );
};

export default MonthCircle;
