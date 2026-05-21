import React from "react";

const JourneyOverview = ({
  title,
  subtitle,
 
  description,
  image,
  days,
  price,
  journeyType,
  timeOfYear,
  // cities,
  level,
  levelsec,
  levelthird,
  levelfourth,
}) => {
  return (
    <section className="max-w-[1300px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-0 mt-6 md:mt-10 font-cormorant">
      {/* Header Section */}
      <div className="text-center">
        <p className="text-[#aaa086]  font-quicksand text-xs md:text-base  uppercase">{subtitle}</p>
        <div className="max-w-xl mx-auto my-2 md:my-4">
          <h5 className=" text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium leading-[1.2] text-[#686868]">
            {title}
          </h5>
        </div>
        <p className="tracking-wider capitalize font-quicksand mt-2 text-[#686868]">
          {description}
        </p>
      </div>

      {/* Details Row */}
      <div className=" overflow-x-auto md:overflow-visible py-6 md:py-10 mt-0 md:mt-6">
         <div className="flex md:flex-row md:justify-center md:gap-8 gap-4 min-w-max md:min-w-0">
        {/* Days */}
        <div className="text-center min-w-[140px] ">
          <p className="uppercase text-sm md:text-xl tracking-wide font-medium text-[#9a8f70] mb-2 md:mb-4">
           {level}
          </p>
          <p className=" text-sm md:text-2xl font-quicksand text-[#686868]">{days}</p>
        </div>

        {/* From Price */}
        <div className="text-center border-l border-gray-300 pl-8 min-w-[140px]">
          <p className="uppercase text-sm md:text-xl tracking-wide font-medium text-[#9a8f70] mb-2 md:mb-4">
            {levelsec}
          </p>
          <p className=" text-sm md:text-2xl font-quicksand text-[#686868]">{price}</p>
        </div>

        {/* Journey Type */}
        <div className="text-center border-l border-gray-300 pl-8 min-w-[140px]">
          <p className="uppercase text-sm md:text-xl tracking-wide font-medium text-[#9a8f70] mb-2 md:mb-4">
            {levelthird}
          </p>
          <p className="text-sm md:text-2xl font-quicksand text-[#686868]">{journeyType}</p>
        </div>

        {/* Time of Year */}
        <div className="text-center border-l border-gray-300 pl-8 min-w-[140px]">
          <p className="uppercase text-sm md:text-xl tracking-wide font-medium text-[#9a8f70] mb-2 md:mb-4">
            {levelfourth}
          </p>
          <p className="text-sm md:text-2xl font-quicksand text-[#686868]">{timeOfYear}</p>
        </div>

        {/* Cities & Landmarks */}
        {/* <div className="text-center md:border-l md:border-gray-300 md:pl-8 max-w-xs">
          <p className="uppercase text-xl tracking-wide font-medium text-[#9a8f70] mb-4">
            Cities & Landmarks
          </p>
          <p className="text-xl font-quicksand text-[#686868] leading-relaxed">
            {cities}
          </p>
        </div> */}
       
        </div>
      </div>

      {/* Image */}
      <div>
        <img
          src={image}
          alt={title}
          className=" h-full md:h-[650px] w-full object-cover"
        />
      </div>
    </section>
  );
};

export default JourneyOverview;
