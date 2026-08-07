"use client";

import { Search, ChevronDown } from "lucide-react";

export default function BlogFilter({
  filters = {
    search: "",
    category: "",
    author: "",
    month: "",
  },
  setFilters = () => {},
  categories = [],
  authors = [],
  months = [],
  clearFilters = () => {},
}) {
  const handleChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className=" font-quicksand font-medium text-gray-700">
          Filter Blog By
        </h3>

        <button
          onClick={clearFilters}
          className=" text-[#ab8c51] hover:underline cursor-pointer font-quicksand"
        >
          Clear All Filters
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        {/* Search */}
        <div className="relative lg:col-span-2">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search articles by title, keyword..."
            value={filters.search}
            onChange={(e) => handleChange("search", e.target.value)}
            className="h-12 w-full rounded-full border border-gray-300 pl-11 pr-4 outline-none transition focus:border-[#ab8c51]"
          />
        </div>

        {/* Category */}
        <div className="relative font-quicksand">
          <select
            value={filters.category}
            onChange={(e) => handleChange("category", e.target.value)}
            className="h-12 w-full appearance-none rounded-full border border-gray-300 bg-white px-5 pr-10 outline-none transition focus:border-[#ab8c51]"
          >
            <option value="">Category: All</option>

            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <ChevronDown
            size={18}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
          />
        </div>

        {/* Author */}
        <div className="relative font-quicksand">
          <select
            value={filters.author}
            onChange={(e) => handleChange("author", e.target.value)}
            className="h-12 w-full appearance-none rounded-full border border-gray-300 bg-white px-5 pr-10 outline-none transition focus:border-[#ab8c51]"
          >
            <option value="">Author: All</option>

            {authors.map((author) => (
              <option key={author} value={author}>
                {author}
              </option>
            ))}
          </select>

          <ChevronDown
            size={18}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
          />
        </div>

        {/* Month */}
        <div className="relative font-quicksand">
          <select
            value={filters.month}
            onChange={(e) => handleChange("month", e.target.value)}
            className="h-12 w-full appearance-none rounded-full border border-gray-300 bg-white px-5 pr-10 outline-none transition focus:border-[#ab8c51]"
          >
            <option value="">Month: All</option>

            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>

          <ChevronDown
            size={18}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
          />
        </div>
      </div>
    </div>
  );
}
