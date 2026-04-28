"use client";

import React, { useState, useRef } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Image from "next/image";

const TripHighlights = ({ highlights = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!highlights.length) return null;

  // Responsive cards per view (no window usage)
  const cardsPerView = 3; // controlled via CSS

  const maxIndex = Math.max(0, highlights.length - cardsPerView);

  const goToPrevious = () => setCurrentIndex((prev) => Math.max(0, prev - 1));
  const goToNext = () =>
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));

  // Swipe
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e) => (touchStartX.current = e.touches[0].clientX);

  const handleTouchMove = (e) => (touchEndX.current = e.touches[0].clientX);

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) goToNext();
    if (distance < -50) goToPrevious();
  };

  return (
    <section className="bg-white py-8 md:py-12 font-cormorant">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-0">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl xl:text-6xl text-[#636363]">
            Trip Highlights
          </h2>
          <p className="mt-4 text-lg font-quicksand text-gray-600">
            The must-do experiences you can cross off your bucket list
          </p>
        </div>

        {/* Navigation */}
        <div className="flex justify-end mb-6 space-x-2">
          <button
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className="p-3 rounded-full border border-[#aaa086] text-[#aaa086] disabled:opacity-50"
          >
            <IoIosArrowBack />
          </button>

          <button
            onClick={goToNext}
            disabled={currentIndex >= maxIndex}
            className="p-3 rounded-full border border-[#aaa086] text-[#aaa086] disabled:opacity-50"
          >
            <IoIosArrowForward />
          </button>
        </div>

        {/* Slider */}
        <div
          className="overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex gap-8 transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
            }}
          >
            {highlights.map((item, i) => (
              <div key={i} className="flex-none w-full sm:w-1/2 lg:w-1/3 py-2">
                <div className="bg-white rounded-md shadow-sm overflow-hidden h-full flex flex-col">
                  {/* Image */}
                  <div className="relative w-full h-60">
                    <Image
                      src={item.tripHighlightImage}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                    {item.status === "Include" && (
                      <span className="absolute top-3 left-3 bg-[#ae9d71] text-white text-xs px-3 py-1 rounded">
                        Included Experience
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-semibold text-[#636363] mb-4">
                      {item.title}
                    </h3>
                    <p className="text-[#636363] font-quicksand flex-grow">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-3 h-3 rounded-full ${
                i === currentIndex ? "bg-[#ae9d71]" : "bg-[#dbdad6]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TripHighlights;
