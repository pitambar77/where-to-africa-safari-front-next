// components/Carousel/CarouselContainer.jsx
import React, { useState } from "react";
import CarouselNavigation from "./CarouselNavigation";

const CarouselContainer = ({ items, renderItem, cardsPerView = 2 }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const totalCards = items.length;
  const totalPages = Math.ceil(totalCards / cardsPerView);

  // Each card takes an equal fraction of total width
  const cardWidthPercent = 100 / cardsPerView;

  // Move one full "page" worth of cards per click
  const translationValue = (currentPage * 100) / totalPages;

  const goToNextPage = () =>
    setCurrentPage((p) => (p + 1) % totalPages);

  const goToPreviousPage = () =>
    setCurrentPage((p) => (p - 1 + totalPages) % totalPages);

  return (
    <div className="relative w-full max-w-[1320px] mx-auto px-4 mt-5">
      {/* Outer viewport */}
      <div className="overflow-hidden">
        {/* Inner track */}
        <div
          className="flex transition-transform duration-500 ease-in-out gap-x-8"
          style={{
            width: `${(totalCards / cardsPerView) * 100}%`,
            transform: `translateX(-${currentPage * (100 / totalPages)}%)`,
          }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0"
              style={{
                width: `calc(${cardWidthPercent}% - 1rem)`, // 2 cards visible
              }}
            >
              {renderItem(item)}
            </div>
          ))}
        </div>
      </div>

      {/* Arrows & Pagination */}
      <CarouselNavigation
        currentPage={currentPage}
        totalPages={totalPages}
        onPrev={goToPreviousPage}
        onNext={goToNextPage}
      />
    </div>
  );
};

export default CarouselContainer;
