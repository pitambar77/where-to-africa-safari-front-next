"use client";

import { useFormContext } from "react-hook-form";
import OptionCard from "../ui/OptionCard";

const purposes = [
  "Big 5 Safari",
  "Great Migration",
  "Adventure",
  "Honeymoon",
  "Bush & Beach",
  "Wellness",
  "Family Safari",
  "Special Occasion",
  "Babymoon",
  "Gorilla Trekking",
  "Cultural Experience",
  "Photography",
  "Luxury Escape",
  "Walking Safari",
  "Bird Watching",
  "Not Sure",
];

const Step3Purpose = () => {
  const { watch, setValue } = useFormContext();

  const selectedPurposes = watch("purpose") || [];

  const togglePurpose = (purpose) => {
    let updated = [];

    if (selectedPurposes.includes(purpose)) {
      updated = selectedPurposes.filter((item) => item !== purpose);
    } else {
      updated = [...selectedPurposes, purpose];
    }

    setValue("purpose", updated, {
      shouldValidate: true,
    });
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Heading */}

      <div className="text-center mb-10 max-w-3xl mx-auto ">
        <h2 className="text-2xl md:text-4xl text-[#636363] font-normal font-cormorant">
          Why are you coming to Africa?
        </h2>
        <p className="mt-6 text-gray-500 text-lg font-quicksand">
          Celebrating a special occasion or just finally making your safari
          dreams come true? We want to know so we can recommend only the very
          best for you.
        </p>
        <p className="mt-6 text-gray-500 text-lg font-quicksand">
          You can select more than one option!
        </p>
      </div>

      {/* Purpose Grid */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {purposes.map((purpose) => (
          <OptionCard
            key={purpose}
            label={purpose}
            selected={selectedPurposes.includes(purpose)}
            onClick={() => togglePurpose(purpose)}
            className="h-12 font-quicksand font-semibold cursor-pointer"
          />
        ))}
      </div>

      {/* Selected Purposes */}

      {/* {selectedPurposes.length > 0 && (
        <div className="mt-10">
          <h3 className="text-lg font-semibold mb-3">Selected Experiences</h3>

          <div className="flex flex-wrap gap-3">
            {selectedPurposes.map((item) => (
              <span
                key={item}
                className="px-4 py-2 rounded-full bg-[#A30C0C] text-white text-sm font-medium"
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

export default Step3Purpose;
