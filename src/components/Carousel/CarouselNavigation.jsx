// components/Carousel/CarouselNavigation.jsx
import React from "react";
import { ChevronLeft, ChevronRight, ArrowLeft, ArrowRight } from "lucide-react";

const CarouselNavigation = ({ currentPage, totalPages, onPrev, onNext }) => (
  <>
    {/* Arrows (Desktop) */}
    <div
      onClick={onPrev}
      className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 md:-translate-x-1/4 bg-[#a89f82] p-3 rounded-full shadow-md hover:bg-[#f25922] cursor-pointer transition-colors hidden md:block"
    >
      <ChevronLeft className="w-6 h-6 text-white" />
    </div>

    <div
      onClick={onNext}
      className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 md:translate-x-1/4 bg-[#a89f82] p-3 rounded-full shadow-md hover:bg-[#f25922] cursor-pointer transition-colors hidden md:block"
    >
      <ChevronRight className="w-6 h-6 text-white" />
    </div>

    {/* Pagination (Bottom) */}
    <div className="flex items-center space-x-4 mt-12 text-[#a89f82] justify-center">
      <button onClick={onPrev} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
        <ArrowLeft className="w-5 h-5" />
      </button>
      <span className="text-lg font-quicksand font-light">
        {`${(currentPage + 1).toString().padStart(2, "0")}`}{" "}
        <span className="text-gray-400">—</span>{" "}
        {`${totalPages.toString().padStart(2, "0")}`}
      </span>
      <button onClick={onNext} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  </>
);

export default CarouselNavigation;
