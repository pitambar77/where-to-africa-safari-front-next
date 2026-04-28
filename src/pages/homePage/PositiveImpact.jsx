import "./PositiveImpact.css";
import Link from "next/link";
import Image from "next/image";
const PositiveImpact = () => {
  return (
    <div className="relative min-h-[50vh] sm:min-h-[60vh] md:min-h-[70vh] lg:min-h-[80vh] xl:min-h-[90vh] overflow-hidden">
      <Image
        src="/images/impact-banner.webp"
        alt="African safari travel experience with family and wildlife"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      {/* <div className="relative z-10 mx-auto max-w-[1300px] px-5 sm:px-6 md:px-10 lg:px-16 xl:px-0 py-14 sm:py-16 md:py-20 lg:py-24 flex items-center h-full"> */}
      <div className="relative z-10 mx-auto max-w-[1300px] px-5 sm:px-6 md:px-10 lg:px-16 xl:px-0 py-14 sm:py-16 md:py-20 lg:py-24 flex items-start lg:items-center h-full">
        {/* TEXT CONTENT */}
        <div className="text-white max-w-lg sm:max-w-xl md:max-w-2xl">
          {/* Small Heading */}
          <p className="text-xs sm:text-base uppercase font-quicksand tracking-[2px] sm:tracking-widest mb-3 sm:mb-4">
            Travel With A Purpose
          </p>

          {/* Main Heading */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-cormorant leading-tight mb-4 sm:mb-6">
            Meaningful African travel led responsibly
          </h1>

          {/* Paragraphs */}
          <p className="text-sm sm:text-base md:text-lg font-quicksand text-gray-200 mb-3 sm:mb-4 leading-relaxed">
            We work with local partners to support community livelihoods through
            fair employment and respectful cultural experiences.
          </p>

          <p className="text-sm sm:text-base md:text-lg font-quicksand text-gray-200 mb-3 sm:mb-4 leading-relaxed">
            Wildlife activities follow responsible guidelines that reduce
            disturbance and support conservation and habitat protection.
          </p>

          <p className="text-sm sm:text-base md:text-lg font-quicksand text-gray-200 mb-6 sm:mb-8 leading-relaxed">
            Travel decisions focus on long-term benefits, ensuring tourism
            supports people, nature, and destinations beyond each visit.
          </p>

          {/* Button */}
          <Link
            href="/about-us"
            className="inline-block px-5 sm:px-6 py-2.5 sm:py-3 border border-white text-white uppercase text-xs sm:text-sm tracking-widest hover:bg-white hover:text-black transition duration-300"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PositiveImpact;
