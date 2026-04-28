import React from "react";
import { IoArrowForward } from "react-icons/io5";
import Image from "next/image";

const AccommodationRelated = ({
  image,
  nights,
  title,
  location,
  tag,
  onClick,
}) => {
  return (
    <div className="bg-white rounded-sm hover:shadow-lg transition overflow-hidden font-cormorant">
      {/* Image Section */}
      <div className="relative">
        <div className="relative w-full h-40">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, 33vw"
            className="object-cover"
          />
        </div>
        {tag && (
          <span className="absolute bottom-1 left-1 bg-[#a79353] text-white text-xs font-medium px-3 py-1 rounded-sm uppercase tracking-wide">
            {tag}
          </span>
        )}
      </div>

      {/* Card Content */}
      <div className="p-5 space-y-2">
        <p className="text-sm font-semibold tracking-widest text-gray-600 uppercase">
          {nights}
        </p>
        <h3 className="text-xl font-semibold text-[#a79353] leading-snug">
          {title}
        </h3>
        <p className="text-gray-500 font-quicksand line-clamp-2">{location}</p>

        <div className="flex justify-end  ">
          <button
            onClick={onClick}
            className="flex items-center cursor-pointer text-[#a79353] font-medium mt-3 group"
          >
            Learn More
            <IoArrowForward
              size={16}
              className="ml-1 transform hover:translate-x-1 transition"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccommodationRelated;
