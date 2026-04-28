import React from "react";
import JourneyCard from "./JourneyCard";

const TravelguideSection = ({
  heading = "Journey Collection",
  subheading = "On Safari with Where to Africa",
  journeys = [],
}) => {
  return (
    <section className="max-w-[1300px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-0 py-10 sm:py-12 md:py-16 bg-white ">
      {/* Section Heading */}
      <div className="text-center mb-8 md:mb-14">
        <p className=" text-[#a89f82] text-xs sm:text-base font-quicksand  uppercase mb-6">
          {heading}
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-4 md:mb-10 text-[#636363] capitalize font-normal font-cormorant">
          {subheading}
        </h2>
      </div>

      {/* Grid Layout */}
      <div className="grid sm:grid-cols-2 gap-x-12 gap-y-16">
        {journeys.map((item, index) => (
          <JourneyCard
            key={index}
            image={item.image}
            title={item.title}
            description={item.description}
            link={item.link}
          />
        ))}
      </div>
    </section>
  );
};

export default TravelguideSection;
