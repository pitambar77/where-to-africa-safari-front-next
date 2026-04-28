import React from "react";

const ActivitySection = ({ time, title, details }) => {
  return (
    <div className="border-l-4 border-[#aaa086] pl-4">
      {time && (
        <p className="text-xs uppercase text-gray-500 tracking-wider">
          {time}
        </p>
      )}
      <h5 className="text-gray-800 font-semibold mt-1">{title}</h5>
      <p className="text-gray-600 font-quicksand text-sm mt-1">{details}</p>
    </div>
  );
};

export default ActivitySection;
