// import React from "react";

// const FilterBar = ({ filters, setFilters, onFilter }) => {
//   return (
//     <div className="flex flex-wrap justify-center gap-3 px-6 py-4 bg-white shadow">
//       <select
//         className="border p-2 rounded"
//         value={filters.destination}
//         onChange={(e) => setFilters({ ...filters, destination: e.target.value })}
//       >
//         <option value="">Select Destination</option>
//         <option value="Kenya">Kenya</option>
//         <option value="Tanzania">Tanzania</option>
//         <option value="South Africa">South Africa</option>
//       </select>

//       <select
//         className="border p-2 rounded"
//         value={filters.subdestination}
//         onChange={(e) => setFilters({ ...filters, subdestination: e.target.value })}
//       >
//         <option value="">Select Subdestination</option>
//         <option value="Nairobi">Nairobi</option>
//         <option value="Serengeti">Serengeti</option>
//         <option value="Cape Town">Cape Town</option>
//       </select>

//       <button
//         onClick={onFilter}
//         className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
//       >
//         Apply Filter
//       </button>

//       <button
//         onClick={() => {
//           setFilters({ destination: "", subdestination: "" });
//           onFilter();
//         }}
//         className="border border-gray-400 px-4 py-2 rounded hover:bg-gray-100"
//       >
//         Reset
//       </button>
//     </div>
//   );
// };

// export default FilterBar;


// use select destination from backend

import React, { useState, useEffect } from "react";

const DESTINATIONS = ["Africa", "Asia", "Europe", "South America", "North America"];
const SUBDESTINATIONS = {
  Africa: ["Kenya", "Tanzania", "South Africa", "Namibia"],
  Asia: ["Japan", "Thailand", "Vietnam", "India"],
  Europe: ["France", "Italy", "Spain", "Greece"],
  "South America": ["Peru", "Brazil", "Chile"],
  "North America": ["USA", "Canada", "Mexico"],
};

const FilterBar = ({ filters, setFilters, onFilter }) => {
  const [subOptions, setSubOptions] = useState([]);

  useEffect(() => {
    // Update subdestination options whenever destination changes
    if (filters.destination) {
      setSubOptions(SUBDESTINATIONS[filters.destination] || []);
    } else {
      setSubOptions([]);
    }
  }, [filters.destination]);

  return (
    <div className="flex flex-wrap justify-center gap-3 px-6 py-4 bg-white shadow-md rounded-md">
      {/* Destination Dropdown */}
      <select
        className="border p-2 rounded min-w-[200px]"
        value={filters.destination}
        onChange={(e) =>
          setFilters({ ...filters, destination: e.target.value, subdestination: "" })
        }
      >
        <option value="">Select Destination</option>
        {DESTINATIONS.map((dest) => (
          <option key={dest} value={dest}>
            {dest}
          </option>
        ))}
      </select>

      {/* Subdestination Dropdown */}
      <select
        className="border p-2 rounded min-w-[200px]"
        value={filters.subdestination}
        onChange={(e) => setFilters({ ...filters, subdestination: e.target.value })}
        disabled={!filters.destination}
      >
        <option value="">Select Subdestination</option>
        {subOptions.map((sub) => (
          <option key={sub} value={sub}>
            {sub}
          </option>
        ))}
      </select>

      {/* Apply Filter Button */}
      <button
        onClick={onFilter}
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
      >
        Apply Filter
      </button>

      {/* Reset Filter Button */}
      <button
        onClick={() => {
          setFilters({ destination: "", subdestination: "" });
          onFilter();
        }}
        className="border border-gray-400 px-4 py-2 rounded hover:bg-gray-100"
      >
        Reset
      </button>
    </div>
  );
};

export default FilterBar;
