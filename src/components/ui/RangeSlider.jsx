"use client";

const RangeSlider = ({
  min = 4000,
  max = 40000,
  step = 1000,
  value,
  onChange,
  symbol = "$",
}) => {
  return (
    <div className=" max-w-3xl mx-auto py-4">
      {/* Current Value */}

      <div className="flex justify-center mb-10">
        <div className="bg-[#aaa085] text-white px-10 py-3 rounded-full text-lg font-quicksand font-medium">
          {symbol}
          {value.toLocaleString()}
        </div>
      </div>

      {/* Slider */}

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className=" custom-range w-full accent-[#aaa085] cursor-pointer"
      />

      {/* Min & Max */}

      <div className="flex justify-between mt-10 font-quicksand">
        <div>
          <h3 className="text-xl font-medium text-[#2E2E2E]">
            {symbol}
            {min.toLocaleString()}
          </h3>

          <p className=" font-medium ">
            per person
          </p>
        </div>

        <div className="text-right">
          <h3 className="text-xl font-medium text-[#2E2E2E]">
            {symbol}
            {max.toLocaleString()}
          </h3>

          <p className="font-medium ">
            per person
          </p>
        </div>
      </div>
    </div>
  );
};

export default RangeSlider;
