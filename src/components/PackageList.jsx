"use client"

import { useEffect, useState, useMemo } from "react";
import SafariCard from "../pages/Accomodation/LandingPage/SafariCard";
import Filters from "./Filters";
import Overview from "./Overview";

const PackageList = ({ destinationData }) => {
  // const [destinationData, setDestinationData] = useState([]);

  const [selectedDestination, setSelectedDestination] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [sortBy, setSortBy] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 8;


  // =============================
  // DESTINATIONS DROPDOWN (ONLY WITH TRIPS)
  // =============================
  const destinations = useMemo(() => {
    return destinationData
      .filter((destination) =>
        destination.regions?.some((region) => region.trips?.length > 0),
      )
      .map((dest) => dest.name.trim());
  }, [destinationData]);

  // Reset destination if removed
  useEffect(() => {
    if (selectedDestination && !destinations.includes(selectedDestination)) {
      setSelectedDestination("");
    }
  }, [destinations]);

  // =============================
  // REGIONS DROPDOWN (ONLY WITH TRIPS)
  // =============================
  const regions = useMemo(() => {
    if (!selectedDestination) return [];

    const selectedDest = destinationData.find(
      (d) => d.name.trim() === selectedDestination,
    );

    if (!selectedDest) return [];

    return (
      selectedDest.regions
        ?.filter((region) => region.trips?.length > 0)
        .map((r) => r.name.trim()) || []
    );
  }, [selectedDestination, destinationData]);

  // Reset region if invalid
  useEffect(() => {
    if (selectedRegion && !regions.includes(selectedRegion)) {
      setSelectedRegion("");
    }
  }, [regions]);



  const allTrips = useMemo(() => {
    const tripMap = new Map(); // ✅ prevents duplicates

    destinationData.forEach((destination) => {
      destination.regions?.forEach((region) => {
        region.trips?.forEach((trip) => {
          if (!tripMap.has(trip._id)) {
            tripMap.set(trip._id, {
              id: trip._id,
              title: trip.title,
              price: trip.price || "",
              nights: trip.duration || 0,
              image: trip.image || "",
              slug: trip.slug,
              destination: destination.name.trim(),
              region: region.name.trim(),
              labeldata: "",
            });
          }
        });
      });
    });

    return Array.from(tripMap.values()); // ✅ only unique trips
  }, [destinationData]);

  // =============================
  // FILTERING + SORTING
  // =============================
  const filteredTrips = useMemo(() => {
    let filtered = [...allTrips];

    if (selectedDestination) {
      filtered = filtered.filter(
        (item) => item.destination === selectedDestination,
      );
    }

    if (selectedRegion) {
      filtered = filtered.filter((item) => item.region === selectedRegion);
    }

    // Price filtering (convert to number for comparison)
    if (selectedPriceRange) {
      filtered = filtered.filter((item) => {
        const numericPrice =
          parseFloat(item.price?.replace(/[^0-9.]/g, "")) || 0;

        if (selectedPriceRange === "below10k") {
          return numericPrice < 10000;
        } else if (selectedPriceRange === "10kto15k") {
          return numericPrice >= 10000 && numericPrice <= 15000;
        } else if (selectedPriceRange === "above15k") {
          return numericPrice > 15000;
        }

        return true;
      });
    }

    if (sortBy === "priceAsc") {
      filtered.sort(
        (a, b) =>
          parseFloat(a.price.replace(/[^0-9.]/g, "")) -
          parseFloat(b.price.replace(/[^0-9.]/g, "")),
      );
    } else if (sortBy === "priceDesc") {
      filtered.sort(
        (a, b) =>
          parseFloat(b.price.replace(/[^0-9.]/g, "")) -
          parseFloat(a.price.replace(/[^0-9.]/g, "")),
      );
    } else if (sortBy === "nameAsc") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    return filtered;
  }, [
    allTrips,
    selectedDestination,
    selectedRegion,
    selectedPriceRange,
    sortBy,
  ]);

  // =============================
  // PAGINATION
  // =============================
  const totalPages = Math.ceil(filteredTrips.length / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const currentCards = filteredTrips.slice(
    startIndex,
    startIndex + cardsPerPage,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedDestination, selectedRegion, selectedPriceRange, sortBy]);

  const handleReset = () => {
    setSelectedDestination("");
    setSelectedRegion("");
    setSelectedPriceRange("");
    setSortBy("");
    setCurrentPage(1);
  };

  // =============================
  // ADVANCED PAGINATION
  // =============================
  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    const maxVisible = 3;
    const half = Math.floor(maxVisible / 2);

    let start = Math.max(2, currentPage - half);
    let end = Math.min(totalPages - 1, currentPage + half);

    if (currentPage <= half + 1) {
      start = 2;
      end = Math.min(1 + maxVisible, totalPages - 1);
    }

    if (currentPage >= totalPages - half) {
      start = Math.max(totalPages - maxVisible, 2);
      end = totalPages - 1;
    }

    pages.push(1);

    if (start > 2) pages.push("leftDots");

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) pages.push("rightDots");

    if (totalPages > 1) pages.push(totalPages);

    return pages.map((p, index) => {
      if (p === "leftDots" || p === "rightDots") {
        return (
          <span key={index} className="px-2 text-gray-500">
            ...
          </span>
        );
      }

      return (
        <button
          key={index}
          onClick={() => setCurrentPage(p)}
          className={`w-8 h-8 rounded-md cursor-pointer ${
            currentPage === p
              ? "bg-[#aaa086] text-white"
              : "bg-white border text-[#aaa086]"
          }`}
        >
          {p}
        </button>
      );
    });
  };

  // =============================
  // RENDER
  // =============================
  return (
    <div className=" bg-[#fbf6ea]">
      <div className=" max-w-[1300px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-0 pb-8 sm:pb-10 md:pb-16">
      <Overview
        title="Travel Made Easy"
        subtitle={`"Where to Africa" designs safari packages that bring together wildlife, landscapes, and culture into a clear, carefully planned journey.`}
        description="Each package across Africa balances game drives, scenic routes, quality accommodation, and local expertise, ensuring your experience is organised, comfortable, and genuinely fulfilling throughout your time away."
      />

      <div className="">
        <Filters
          destinations={destinations}
          regions={regions}
          selectedDestination={selectedDestination}
          setSelectedDestination={setSelectedDestination}
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
          selectedPriceRange={selectedPriceRange}
          setSelectedPriceRange={setSelectedPriceRange}
          sortBy={sortBy}
          setSortBy={setSortBy}
          onReset={handleReset}
        />

        {currentCards.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentCards.map((item) => (
              <SafariCard
                key={item.id}
                safari={item}
                link={`/package/${item.slug}`}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 mt-10">No packages found.</p>
        )}

        <div className="flex justify-center items-center mt-12 gap-2 flex-wrap">
          {currentPage > 1 && (
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              className="px-4 py-2 bg-white border text-[#aaa086] cursor-pointer rounded-md"
            >
              Prev
            </button>
          )}

          {renderPagination()}

          {currentPage < totalPages && (
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className="px-4 py-2 bg-[#aaa086] cursor-pointer text-white rounded-md"
            >
              Next
            </button>
          )}
        </div>
      </div>
       </div>
    </div>
  );
};

export default PackageList;
