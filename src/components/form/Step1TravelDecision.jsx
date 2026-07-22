"use client";

import { useFormContext } from "react-hook-form";
import OptionCard from "../ui/OptionCard";

const options = [
  {
    id: "yes",
    label: "Yes, I know where I want to go",
  },
  {
    id: "idea",
    label: "I have an idea",
  },
  {
    id: "help",
    label: "Help me decide",
  },
];

const Step1TravelDecision = () => {
  const { watch, setValue } = useFormContext();

  const selected = watch("travelDecision");

  return (
    <div className="max-w-5xl mx-auto">
      {/* Heading */}

      <div className="text-center mb-14 mt-10 max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl text-[#636363] font-normal font-cormorant">
          Your dream African safari starts here.
        </h2>

        <p className="mt-6 text-gray-500 text-lg font-quicksand">
          But first, we'd like to get to know you and your fellow travellers a
          bit better.
        </p>
        <p className="mt-6 text-gray-500 text-lg font-quicksand">
          Answer the following quick questions, whereafter a Travel Expert will
          be in touch with you to start tailoring your trip.
        </p>
      </div>

      <div className="text-center mb-14">
        <h2 className="text-2xl md:text-3xl text-[#636363] font-normal font-cormorant">
          Do you know where you want to travel?
        </h2>
      </div>

      {/* Options */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {options.map((item) => (
          <OptionCard
            key={item.id}
            label={item.label}
            selected={selected === item.id}
            onClick={() =>
              setValue("travelDecision", item.id, {
                shouldValidate: true,
              })
            }
            className="h-14 px-6 text-center text-lg font-quicksand font-semibold cursor-pointer"
          />
        ))}
      </div>
    </div>
  );
};

export default Step1TravelDecision;
