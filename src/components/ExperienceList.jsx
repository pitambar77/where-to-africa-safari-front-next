"use client";

import { useEffect, useState, useMemo } from "react";
import SafariCard from "../pages/Accomodation/LandingPage/SafariCard";
import Overview from "./Overview";
import Filters from "./Filters";

const ExperienceList = ({ destinationData = [], experiences = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDestination, setSelectedDestination] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [sortBy, setSortBy] = useState("");

  const cardsPerPage = 8;

  const allExperiences = useMemo(() => {
    let result = [];

    destinationData.forEach((destination) => {
      destination.regions?.forEach((region) => {
        region.experiences?.forEach((expId) => {
          const exp = experiences.find(
            (e) => e._id.toString() === (expId._id || expId).toString(),
          );

          if (exp) {
            result.push({
              id: exp._id,
              title: exp.bannerTitle,
              price: exp.experienceInfo?.pricePerPerson || "",
              nights: exp.experienceInfo?.days || "",
              image: exp.bannerImage || "",
              slug: exp.slug,
              destination: destination.name.trim(),
              region: region.name.trim(),
            });
          }
        });
      });
    });

    return result;
  }, [destinationData, experiences]);

  const destinations = useMemo(() => {
    return destinationData
      .filter((destination) =>
        destination.regions?.some((region) => region.experiences?.length > 0),
      )
      .map((dest) => dest.name.trim());
  }, [destinationData]);

  const regions = useMemo(() => {
    if (!selectedDestination) return [];

    const selectedDest = destinationData.find(
      (d) => d.name.trim() === selectedDestination,
    );

    if (!selectedDest) return [];

    return (
      selectedDest.regions
        ?.filter((region) => region.experiences?.length > 0)
        .map((r) => r.name.trim()) || []
    );
  }, [selectedDestination, destinationData]);

  const filteredExperiences = useMemo(() => {
    let filtered = [...allExperiences];

    if (selectedDestination) {
      filtered = filtered.filter(
        (item) => item.destination === selectedDestination,
      );
    }

    if (selectedRegion) {
      filtered = filtered.filter((item) => item.region === selectedRegion);
    }

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
    allExperiences,
    selectedDestination,
    selectedRegion,
    selectedPriceRange,
    sortBy,
  ]);

  useEffect(() => {
    setSelectedRegion("");
  }, [selectedDestination]);

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
  // PAGINATION
  // =============================

  const totalPages = Math.ceil(filteredExperiences.length / cardsPerPage);

  const startIndex = (currentPage - 1) * cardsPerPage;

  const currentCards = filteredExperiences.slice(
    startIndex,
    startIndex + cardsPerPage,
  );

  // =============================
  // RENDER
  // =============================
  return (
    <div className=" bg-[#fbf6ea]">
      <div className=" max-w-[1300px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-0 pb-8 sm:pb-10 md:pb-16">
        <Overview
          title="Journey Into Africa "
          subtitle="“Where to Africa” brings you closer to wild places, local stories, and small details most travellers miss completely on safari trips."
          description="Choose experiences across Zambia, Zimbabwe, South Africa, Botswana, Tanzania, Kenya, and Namibia, including game drives, guided walks, river journeys, desert days, and cultural visits, all smoothly planned to suit the seasons, your comfort, and your pace."
        />

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

        <div className="">
          {currentCards.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
              {currentCards.map((item) => (
                <SafariCard
                  key={item.id}
                  safari={item}
                  link={`/experience/${item.slug}`}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 mt-10">
              No experiences found.
            </p>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-12 gap-2 flex-wrap">
              {currentPage > 1 && (
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className="px-4 py-2 bg-white border text-[#aaa086] rounded-md cursor-pointer"
                >
                  Prev
                </button>
              )}

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`w-8 h-8 rounded-md cursor-pointer ${
                    currentPage === index + 1
                      ? "bg-[#aaa086] text-white"
                      : "bg-white border text-[#aaa086]"
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              {currentPage < totalPages && (
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className="px-4 py-2 bg-[#aaa086] text-white rounded-md cursor-pointer"
                >
                  Next
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExperienceList;
