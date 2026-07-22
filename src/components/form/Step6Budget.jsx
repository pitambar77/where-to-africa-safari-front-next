"use client";

import { useFormContext } from "react-hook-form";
import { DollarSign } from "lucide-react";

import Select from "../ui/Select";
import RangeSlider from "../ui/RangeSlider";

const currencies = [
  {
    label: "USD ($)",
    value: "USD",
    symbol: "$",
    min: 4000,
    max: 40000,
    step: 500,
  },
  {
    label: "EUR (€)",
    value: "EUR",
    symbol: "€",
    min: 3500,
    max: 35000,
    step: 500,
  },
  {
    label: "GBP (£)",
    value: "GBP",
    symbol: "£",
    min: 3000,
    max: 30000,
    step: 500,
  },
  {
    label: "AUD (A$)",
    value: "AUD",
    symbol: "A$",
    min: 6000,
    max: 60000,
    step: 1000,
  },
  {
    label: "CAD (C$)",
    value: "CAD",
    symbol: "C$",
    min: 5500,
    max: 55000,
    step: 1000,
  },
  {
    label: "ZAR (R)",
    value: "ZAR",
    symbol: "R",
    min: 80000,
    max: 800000,
    step: 10000,
  },
];

const Step6Budget = () => {
  const { watch, setValue } = useFormContext();

  const currency = watch("currency") || "USD";

  const selectedCurrency =
    currencies.find((item) => item.value === currency) || currencies[0];

  const budget = Number(watch("budget")) || selectedCurrency.min;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Heading */}

      <div className="text-center mb-10 max-w-3xl mx-auto ">
        <h2 className="text-2xl md:text-4xl text-[#636363] font-normal font-cormorant">
          What is your budget, per person?
        </h2>
        <p className="mt-6 text-gray-500 text-lg font-quicksand">
          The price below is per person for the trip, including your
          accommodation, activities, and local travel but excludes the costs of
          your international flights.
        </p>
      </div>

      {/* Currency */}

      <div className=" w-40 mx-auto mb-8">
        <Select
          label=""
          value={currency}
          onChange={(e) => {
            const selected = currencies.find(
              (item) => item.value === e.target.value,
            );

            setValue("currency", selected.value);
            setValue("budget", selected.min);
          }}
          options={currencies}
        />
      </div>

      {/* Budget Slider */}

      <div className="">
        <RangeSlider
          min={selectedCurrency.min}
          max={selectedCurrency.max}
          step={selectedCurrency.step}
          value={budget}
          symbol={selectedCurrency.symbol}
          onChange={(value) => setValue("budget", value)}
        />
      </div>

      {/* Budget Summary */}

      {/* <div className="mt-10 rounded-xl bg-gray-50 border border-gray-200 p-6">
        <h3 className="text-xl font-semibold mb-5">Budget Summary</h3>

        <div className="grid md:grid-cols-2 gap-5">
          <div className="rounded-lg bg-white border p-5">
            <p className="text-gray-500">Currency</p>

            <h4 className="text-2xl font-bold mt-2">{currency}</h4>
          </div>

          <div className="rounded-lg bg-white border p-5">
            <p className="text-gray-500">Estimated Budget</p>

            <h4 className="text-2xl font-bold mt-2 text-[#A30C0C]">
              {currency} {budget.toLocaleString()}
            </h4>
          </div>
        </div>
      </div> */}

      {/* Budget Tips */}

      {/* <div className="mt-10 rounded-xl bg-[#FFF7F4] border border-[#F5D6C6] p-6">
        <h3 className="font-semibold text-xl mb-3">Budget Guide</h3>

        <ul className="space-y-2 text-gray-600">
          <li>• Budget Safari : $4,000 - $8,000</li>

          <li>• Mid-range Safari : $8,000 - $15,000</li>

          <li>• Luxury Safari : $15,000 - $25,000</li>

          <li>• Ultra Luxury Safari : $25,000+</li>
        </ul>
      </div> */}
    </div>
  );
};

export default Step6Budget;
