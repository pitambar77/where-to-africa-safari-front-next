import React from "react";

const ThingsToDoCard = ({ image, title,onClick }) => {
  return (
    <div
    onClick={onClick}
     className="relative group overflow-hidden rounded-sm">
      <img
        src={image}
        alt={title}
        className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 p-8">
        <h3 className="text-white text-lg md:text-xl font-normal font-cormorant leading-tight">
          {title}
        </h3>
      </div>
    </div>
  );
};

export default ThingsToDoCard;
