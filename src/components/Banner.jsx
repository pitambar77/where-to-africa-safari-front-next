
"use client";

import Image from "next/image";

const Banner = ({ title, subtitle, imageUrl }) => {
  return (
    <section className="relative h-[40vh] md:h-[650px] lg:h-[80vh] 2xl:h-[90vh] overflow-hidden">
      {/* Background Image */}
      <Image
        src={imageUrl}
        alt={title || "Africa safari destination"}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>

      {/* Content */}
      <div className="relative z-20 flex flex-col justify-center h-full max-w-[1300px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-0 text-white">
        <h1
          className="font-cormorant font-semibold capitalize leading-tight 
          text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-3 md:mb-4"
        >
          {title}
        </h1>

        {subtitle && (
          <p className="font-quicksand text-xs sm:text-sm md:text-base max-w-xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
};

export default Banner;
