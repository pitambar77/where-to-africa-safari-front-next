// components/Carousel/CarouselCard.jsx
import React from "react";

const CarouselCard = ({ image, title, days, price, type }) => {
  return (
    <div className="relative flex-shrink-0 rounded-lg overflow-hidden" style={{ width: `calc(50% - 1rem)` }} >
      <img src={image} alt={title} className="w-full h-96 object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-8 text-white">
        <h3 className="text-3xl font-cormorant font-light mb-2">{title}</h3>
        <p className="text-sm font-quicksand font-light uppercase tracking-wide mb-1">
          {days} | FROM {price}
        </p>
        <p className="text-sm font-quicksand uppercase tracking-wide opacity-80">
          {type}
        </p>
      </div>
    </div>
  );
};

export default CarouselCard;
