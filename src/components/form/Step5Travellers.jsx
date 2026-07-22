"use client";

import { useFormContext } from "react-hook-form";
import { Minus, Plus, Users } from "lucide-react";

const Counter = ({
  title,
  subtitle,
  value,
  onIncrease,
  onDecrease,
  min = 0,
}) => {
  return (
    <div className="flex items-center justify-between rounded-md border border-gray-200 bg-white p-6 shadow-sm space-x-16">
      <div>
        <h3 className="text-xl font-semibold font-quicksand text-[#222]">{title}</h3>

        <p className="text-gray-500 font-quicksand mt-1">{subtitle}</p>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onDecrease}
          disabled={value <= min}
          className={`w-9 h-9 rounded-full border flex items-center justify-center transition cursor-pointer
          ${
            value <= min ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100"
          }`}
        >
          <Minus size={12} />
        </button>

        <span className="text-xl font-quicksand min-w-[30px] text-center">
          {value}
        </span>

        <button
          type="button"
          onClick={onIncrease}
          className="w-9 h-9  rounded-full bg-[#aaa085] text-white flex items-center justify-center hover:bg-[#ac975d] transition cursor-pointer"
        >
          <Plus size={12} />
        </button>
      </div>
    </div>
  );
};

const Step5Travellers = () => {
  const { watch, setValue } = useFormContext();

  const adults = watch("adults") || 2;
  const children = watch("children") || 0;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Heading */}

      <div className="text-center mb-10 mt-10 max-w-3xl mx-auto ">
        <h2 className="text-2xl md:text-4xl text-[#636363] font-normal font-cormorant">
          Who will be travelling with you?
        </h2>
        <p className="mt-6 text-gray-500 text-lg font-quicksand">
          How many people (including you!) are coming to Africa? Please note
          that children older than 12 are considered adults. This helps us find
          availability for your stay.
        </p>
      </div>

      {/* Counters */}

      <div className=" flex gap-4 items-center justify-center">
        {/* Adults */}

        <Counter
          title="Adults"
          subtitle=""
          value={adults}
          min={1}
          onIncrease={() => setValue("adults", adults + 1)}
          onDecrease={() => setValue("adults", Math.max(1, adults - 1))}
        />

        {/* Children */}

        <Counter
          title="Children"
          subtitle=""
          value={children}
          min={0}
          onIncrease={() => setValue("children", children + 1)}
          onDecrease={() => setValue("children", Math.max(0, children - 1))}
        />
      </div>

      {/* Summary */}
{/* 
      <div className="mt-12 rounded-xl bg-[#F8F8F8] p-6 border">
        <h3 className="text-xl font-semibold mb-3">Travel Summary</h3>

        <div className="flex flex-wrap gap-4 text-lg">
          <span className="px-4 py-2 rounded-full bg-[#A30C0C] text-white">
            👨 Adults: {adults}
          </span>

          <span className="px-4 py-2 rounded-full bg-[#A30C0C] text-white">
            👧 Children: {children}
          </span>

          <span className="px-4 py-2 rounded-full bg-green-600 text-white">
            Total Travellers: {adults + children}
          </span>
        </div>
      </div> */}
    </div>
  );
};

export default Step5Travellers;
