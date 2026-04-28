// src/components/IconDropdown.jsx
import React, { useState } from "react";
import { IoIosArrowDown, IoMdSearch } from "react-icons/io";
import { amenityIcons } from "../data/amenityIcons";

const IconDropdown = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  // Find selected icon
  const selectedIcon = amenityIcons.find((i) => i.name === value);

  // Filter icons based on search
  const filteredIcons = amenityIcons.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative w-56">
      {/* Selected Button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="border w-full flex items-center justify-between gap-2 p-2 rounded bg-white shadow-sm"
      >
        <div className="flex items-center gap-2">
          {selectedIcon ? (
            <selectedIcon.icon className="text-lg" />
          ) : (
            <span className="text-gray-400">⚙️</span>
          )}
          <span className="truncate">{selectedIcon ? selectedIcon.name : "Select Amenity Icon"}</span>
        </div>
        <IoIosArrowDown
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute top-full left-0 w-full mt-1 bg-white border rounded shadow-lg z-20">
          {/* Search Bar */}
          <div className="flex items-center gap-2 px-3 py-2 border-b bg-gray-50">
            <IoMdSearch className="text-gray-500" />
            <input
              type="text"
              placeholder="Search amenities..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full outline-none bg-transparent text-sm"
            />
          </div>

          {/* Icon List */}
          <div className="max-h-56 overflow-y-auto">
            {filteredIcons.length > 0 ? (
              filteredIcons.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    onChange(item.name);
                    setOpen(false);
                    setSearch("");
                  }}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  <item.icon className="text-lg" />
                  <span>{item.name}</span>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400 py-3 text-sm">No results found</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default IconDropdown;
