"use client";

import { useFormContext } from "react-hook-form";
import OptionCard from "../ui/OptionCard";

const destinations = [
  "South Africa",
  "Botswana",
  "Tanzania",
  "Kenya",
  "Rwanda",
  "Namibia",
  "Zimbabwe",
  "Zambia",
  "Victoria Falls",
  "Kruger",
  "Cape Town",
  "Okavango Delta",
  "Mauritius",
  "Mozambique",
  "Zanzibar",
  "I don't know",
];

const Step2Destination = () => {
  const { watch, setValue } = useFormContext();

  const selectedDestinations = watch("destination") || [];

  const toggleDestination = (destination) => {
    let updated = [];

    if (selectedDestinations.includes(destination)) {
      updated = selectedDestinations.filter((item) => item !== destination);
    } else {
      updated = [...selectedDestinations, destination];
    }

    setValue("destination", updated, {
      shouldValidate: true,
    });
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Heading */}

      <div className="text-center mb-14 max-w-3xl mx-auto mt-10">
        <h2 className="text-2xl md:text-4xl text-[#636363] font-normal font-cormorant">
          Where in Africa would you like to go?
        </h2>
        <p className="mt-6 text-gray-500 text-lg font-quicksand">
          Africa is our home, and we know it better than an elephant knows its
          trunk! If you have a place in mind, select it below, or your Travel
          Expert can recommend one later.
        </p>
      </div>

      {/* Destination Grid */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {destinations.map((destination) => (
          <OptionCard
            key={destination}
            label={destination}
            selected={selectedDestinations.includes(destination)}
            onClick={() => toggleDestination(destination)}
            className="h-12 font-quicksand font-semibold cursor-pointer"
          />
        ))}
      </div>

      {/* Selected Destinations */}
      {/* 
      {selectedDestinations.length > 0 && (
        <div className="mt-10">
          <h4 className="font-semibold text-lg mb-3">Selected Destinations</h4>

          <div className="flex flex-wrap gap-3">
            {selectedDestinations.map((item) => (
              <span
                key={item}
                className="bg-[#A30C0C] text-white px-4 py-2 rounded-full text-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Step2Destination;
