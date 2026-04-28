import { useState } from "react";
import { RiResetLeftFill } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";

const Filters = ({
  destinations,
  regions,
  selectedDestination,
  setSelectedDestination,
  selectedRegion,
  setSelectedRegion,
  selectedPriceRange,
  setSelectedPriceRange,
  sortBy,
  setSortBy,
  onReset,
}) => {
  const [spinning, setSpinning] = useState(false);

  return (
    <div>
      <div className="flex flex-wrap md:flex-nowrap gap-4 mb-8 items-center justify-between">
        {/* LEFT SIDE */}
        <div className="flex flex-wrap md:flex-nowrap gap-4 items-center font-quicksand">
          <p className="font-semibold uppercase tracking-wider text-[#aaa086] whitespace-nowrap">
            Filter by:
          </p>

          {/* DESTINATION */}
          <div className="relative">
            <select
              className="appearance-none border rounded-sm px-3 py-2 pr-10 cursor-pointer bg-white text-[#aaa086] w-full outline-none focus:outline-none focus:ring-0 focus:border-[#aaa086]"
              value={selectedDestination}
              onChange={(e) => setSelectedDestination(e.target.value)}
            >
              <option value="">Destinations</option>
              {destinations.map((dest) => (
                <option key={dest} value={dest}>
                  {dest}
                </option>
              ))}
            </select>

            {/* Custom Icon */}
            <MdKeyboardArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[#aaa086] pointer-events-none text-xl" />
          </div>
          {/* REGION */}

          <div className="relative">
            <select
              className="appearance-none cursor-pointer border rounded-sm px-3 py-2 pr-10 bg-white text-[#aaa086] w-full outline-none focus:outline-none focus:ring-0 focus:border-[#aaa086]"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              disabled={!selectedDestination}
            >
              <option value="">Regions</option>
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>

            {/* Custom Icon */}
            <MdKeyboardArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[#aaa086] pointer-events-none text-xl" />
          </div>

          {/* RESET BUTTON */}
          <button
            onClick={() => {
              setSpinning(true);
              onReset();

              setTimeout(() => {
                setSpinning(false);
              }, 600);
            }}
            className="flex items-center cursor-pointer gap-2 text-sm px-4 py-2 rounded-md border border-[#aaa086] text-[#aaa086] hover:bg-[#aaa086] hover:text-white transition-all duration-300 whitespace-nowrap"
          >
            Reset
            <RiResetLeftFill
              className={`text-lg transition-transform duration-500 ${
                spinning ? "rotate-[360deg]" : ""
              }`}
            />
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-2 whitespace-nowrap">
          <p className="font-semibold uppercase tracking-wider text-[#aaa086] whitespace-nowrap">
            Sort By :
          </p>
          <div className="relative">
            <select
              className="appearance-none cursor-pointer border rounded-sm px-3 py-2 pr-10 bg-white text-[#aaa086] w-full outline-none focus:outline-none focus:ring-0 focus:border-[#aaa086]"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="">Iconic</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
              <option value="nameAsc">Name: A–Z</option>
            </select>

            {/* Custom Icon */}
            <MdKeyboardArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[#aaa086] pointer-events-none text-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
