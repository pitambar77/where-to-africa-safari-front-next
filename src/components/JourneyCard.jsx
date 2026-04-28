import React from "react";
import { HiArrowLongRight } from "react-icons/hi2";
import Link from "next/link";
import Image from "next/image";

const JourneyCard = ({ image, title, description, link }) => {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
      {/* Image */}
      <div className="w-full md:w-1/2">
        <div className="relative w-full h-64 md:h-48 rounded-sm overflow-hidden">
          <Image
            src={image }
            alt={title }
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <div className="w-full md:w-1/2">
        <h3 className="text-2xl font-medium font-cormorant text-[#636363] mb-2">
          {title}
        </h3>
        <p className="text-gray-500 mb-4 font-quicksand leading-relaxed">
          {description}
        </p>
        <div className="flex justify-end md:justify-start">
          <Link
            href={link || "#"}
            className="text-[#a89f82] font-medium font-quicksand inline-flex items-center group"
          >
            Read More
            <HiArrowLongRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JourneyCard;
