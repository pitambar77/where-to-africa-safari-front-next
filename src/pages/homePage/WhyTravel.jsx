// import WhyTravelCard from "../homePage/WhyTravelCard";
import React from "react";
import Image from "next/image";

const WhyTravel = () => {
  const reasons = [
    {
      image: "/images/why-us1.webp",
      title: "Local Knowledge",
      description:
        "Trips are designed with local guides and partners, ensuring authentic experiences while supporting livelihoods and sharing genuine regional understanding.",
    },
    {
      image: "/images/why-us2.webp",
      title: "Responsible Travel",
      description:
        "Journeys support conservation and local communities through low-impact travel practices that protect wildlife habitats, respect culture, and benefit destinations responsibly globally.",
    },
    {
      image: "/images/why-us3.webp",
      title: "Careful Planning",
      description:
        "Each itinerary balances comfort, adventure, and realistic travel pacing to deliver smooth, enjoyable journeys across multiple African destinations, safely planned for guests.",
    },
  ];

  return (
    <>
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-0 py-8 sm:py-10 md:py-16 lg:py-20 bg-white flex flex-col items-center">
        {/* Heading Section */}
        <div className="text-center">
          <p className="text-[#a89f82] uppercase font-quicksand text-xs sm:text-base tracking-wide">
            Trusted African Travel Experiences
          </p>

          <h5 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mt-3 mb-4 md:mb-6 text-[#636363] font-normal font-cormorant leading-tight">
            Why Our Travelers Choose Us
          </h5>

          <p className="font-quicksand text-sm sm:text-base text-gray-600 max-w-xl mx-auto mb-8 md:mb-12">
            Where to Africa focuses on responsible planning, local partnerships,
            and meaningful travel experiences across Southern and East Africa
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="group flex flex-col bg-gray-50 rounded-md overflow-hidden shadow-sm hover:shadow-lg transition duration-500 hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative w-full h-48 sm:h-56 md:h-60 overflow-hidden">
                <Image
                  src={reason.image}
                  alt={`${reason.title} - African travel benefit`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition duration-700 group-hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6 text-center">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-cormorant font-medium mb-3 sm:mb-4 text-[#636363]">
                  {reason.title}
                </h3>

                <p className="text-sm sm:text-base text-[#636363] font-quicksand leading-relaxed">
                  {reason.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default WhyTravel;
