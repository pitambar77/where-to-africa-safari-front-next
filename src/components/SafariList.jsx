"use client"
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import SafariCard from "../pages/Accomodation/LandingPage/SafariCard";
import Filters from "./Filters";
import Overview from "./Overview";

const SafariList = ({ destinationData = [] }) => {
  

  const [selectedDestination, setSelectedDestination] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [sortBy, setSortBy] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 8;



  // =============================
  // DESTINATIONS DROPDOWN
  // =============================

  const destinations = useMemo(() => {
    return destinationData
      .filter((destination) =>
        destination.regions?.some(
          (region) => region.accommodations?.length > 0,
        ),
      )
      .map((dest) => dest.name.trim());
  }, [destinationData]);

  useEffect(() => {
    if (selectedDestination && !destinations.includes(selectedDestination)) {
      setSelectedDestination("");
    }
  }, [destinations]);

  // =============================
  // REGION DROPDOWN
  // =============================

  const regions = useMemo(() => {
    if (!selectedDestination) return [];

    const selectedDest = destinationData.find(
      (d) => d.name.trim() === selectedDestination,
    );

    if (!selectedDest) return [];

    return (
      selectedDest.regions
        ?.filter((region) => region.accommodations?.length > 0) // ✅ only regions with accommodations
        .map((r) => r.name.trim()) || []
    );
  }, [selectedDestination, destinationData]);

  useEffect(() => {
    if (selectedRegion && !regions.includes(selectedRegion)) {
      setSelectedRegion("");
    }
  }, [regions]);

  // =============================
  // EXTRACT ALL ACCOMMODATIONS
  // =============================
  const allAccommodations = useMemo(() => {
    let result = [];

    destinationData.forEach((destination) => {
      destination.regions?.forEach((region) => {
        region.accommodations?.forEach((acc) => {
          result.push({
            id: acc._id,
            title: acc.name,
            price: acc.pricePerPerson || "",
            // parseFloat(acc.pricePerPerson?.replace(/[^0-9.]/g, "")) || 0,
            nights: Number(acc.nightsStay) || 0,
            image: acc.landingImage || acc.bannerImages?.[0] || "",
            slug: acc.slug,
            destination: destination.name.trim(),
            region: region.name.trim(),
            labeldata: "Ratings",
          });
        });
      });
    });

    return result;
  }, [destinationData]);

  // =============================
  // FILTERING + SORTING
  // =============================
  const filteredSafaris = useMemo(() => {
    let filtered = [...allAccommodations];

    if (selectedDestination) {
      filtered = filtered.filter(
        (item) => item.destination === selectedDestination,
      );
    }

    if (selectedRegion) {
      filtered = filtered.filter((item) => item.region === selectedRegion);
    }

    if (selectedPriceRange === "below10k") {
      filtered = filtered.filter((item) => item.price < 10000);
    } else if (selectedPriceRange === "10kto15k") {
      filtered = filtered.filter(
        (item) => item.price >= 10000 && item.price <= 15000,
      );
    } else if (selectedPriceRange === "above15k") {
      filtered = filtered.filter((item) => item.price > 15000);
    }

    if (sortBy === "priceAsc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "priceDesc") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "nameAsc") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    return filtered;
  }, [
    allAccommodations,
    selectedDestination,
    selectedRegion,
    selectedPriceRange,
    sortBy,
  ]);

  // =============================
  // PAGINATION LOGIC
  // =============================
  const totalPages = Math.ceil(filteredSafaris.length / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const currentCards = filteredSafaris.slice(
    startIndex,
    startIndex + cardsPerPage,
  );

  // Reset to page 1 when filters change
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
          title="Signature Safari Stays"
          subtitle="Handpicked lodges and camps across Africa are designed for comfort, location advantage, privacy, and an authentic connection with the surrounding landscapes."
          description="Accommodation defines the tone of your safari. Where to Africa collaborates with distinguished lodges and camps that offer privacy, comfort, thoughtful service, and a strong sense of place."
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

          {/* Cards */}
          {currentCards.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
              {currentCards.map((item) => (
                <SafariCard
                  key={item.id}
                  safari={item}
                  link={`/accommodation/${item.slug}`}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 mt-10">
              No accommodations found.
            </p>
          )}

          {/* Pagination */}
          <div className="flex justify-center items-center mt-12 gap-2 flex-wrap">
            {currentPage > 1 && (
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                className="px-4 py-2 bg-white cursor-pointer border text-[#aaa086] rounded-md"
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

export default SafariList;
