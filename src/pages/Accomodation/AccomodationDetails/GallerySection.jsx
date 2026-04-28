"use client"
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const GallerySection = ({
  title = "Gallery",
  subtitle = "Picture yourself here",
  description = "",
  images = [], // 👈 backend gallery array
}) => {
  const [currentIndex, setCurrentIndex] = useState(1);

  if (!images.length) {
    return (
      <div className="py-20 text-center text-gray-500">
        No images available for this gallery.
      </div>
    );
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const getImageAtIndex = (offset) => {
    let index = currentIndex + offset;
    if (index < 0) index = images.length + index;
    if (index >= images.length) index = index - images.length;
    return images[index];
  };

  return (
    <div className="flex flex-col items-center bg-white py-10 md:py-16 ">
      {/* GALLERY Header (UNCHANGED) */}
      <div className="font-cormorant text-center max-w-[1300px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-0">
        <p className="text-[#a89f82] text-sm md:text-base uppercase font-quicksand">
          {title}
        </p>

        <h5 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-4 md:mb-8 mt-4 text-[#636363] capitalize font-normal">
          {subtitle}
        </h5>

        <div className="mb-10 md:mb-16">
          <p className="font-quicksand mx-auto max-w-xl text-center text-gray-600   md:px-4 leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      <div className=" w-full 2xl:max-w-[1300px] 2xl:mx-auto ">
        {/* Image Gallery Container (UNCHANGED) */}
        <div className="relative overflow-hidden ">
          <div className="flex justify-center items-center gap-x-6">
            {/* Left Image */}
            <div className="hidden md:block flex-shrink-0 w-1/2">
              <img
                src={getImageAtIndex(-1).galleryImage}
                alt={getImageAtIndex(-1).galleryName}
                className="w-full h-full md:h-[420px] xl:h-[550px] object-cover"
              />
            </div>

            {/* Center Image */}
            <div className="flex-shrink-0 w-full md:w-1/2">
              <img
                src={images[currentIndex].galleryImage}
                alt={images[currentIndex].galleryName}
                className=" w-full h-full md:h-[420px] xl:h-[550px] object-cover"
              />
            </div>

            {/* Right Image */}
            <div className=" hidden md:block flex-shrink-0 w-full md:w-1/2">
              <img
                src={getImageAtIndex(1).galleryImage}
                alt={getImageAtIndex(1).galleryName}
                className=" w-full h-full md:h-[420px] xl:h-[550px] object-cover"
              />
            </div>
          </div>

          {/* Navigation Arrows (UNCHANGED POSITION) */}
          <div
            onClick={goToPrevious}
            className="absolute top-1/2 left-4 md:left-10 lg:left-1/6 -translate-y-1/2 md:translate-x-1/2 bg-[#a89f82] p-3 rounded-full shadow-md hover:bg-[#7a7870] transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>

          <div
            onClick={goToNext}
            className="absolute top-1/2 right-4 md:right-10 lg:right-1/6 -translate-y-1/2 md:-translate-x-1/2 bg-[#a89f82] p-3 rounded-full shadow-md hover:bg-[#7a7870] transition-colors cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
        </div>

        {/* Caption (UNCHANGED) */}
        <div className="text-sm text-center text-gray-700 mt-8">
          <p>{images[currentIndex].galleryName}</p>
        </div>

        {/* Pagination Dots (UNCHANGED) */}
        <div className="flex justify-center space-x-2 mt-4">
          {images.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? "bg-[#a89f82]" : "bg-gray-300"
              } hover:bg-[#a89f82] transition-colors cursor-pointer`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GallerySection;
