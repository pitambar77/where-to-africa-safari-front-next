"use client"

import React from "react";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

import AccommodationGrid from "./AccommodationGrid";
import AccommodationRelated from "./AccommodationRelated";

import "swiper/css";
import "swiper/css/navigation";

const AccommodationSlider = ({
  regions = [],
  destination,
  visibleCount
}) => {

  const router = useRouter();

  if (!regions.length) return null;

  return (
    <AccommodationGrid
      title="Overnight Accommodations"
      subtitle={`Places to Stay in ${destination?.name || "Africa"}`}
    >
      {regions.map((region) => (
        <div key={region.slug} className=" mb-8 md:mb-10">
          {/* Region Title */}
          <h3 className=" text-xl sm:text-2xl md:text-3xl font-cormorant text-[#636363] mb-6 md:mb-10 capitalize">
            {region.regionName.replace(/accommodations?/gi, "").trim()}
          </h3>

          {/* Swiper Slider */}
          <div className="relative group">
            <Swiper
              modules={[Navigation]}
              spaceBetween={32}
              slidesPerView={1}
              navigation={{
                nextEl: `.next-${region.slug}`,
                prevEl: `.prev-${region.slug}`,
              }}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
              }}
              className=""
            >
              {region.accommodations
                ?.slice(0, visibleCount)
                .map((acc) => (
                  <SwiperSlide key={acc.slug}>
                    <div
                      className="cursor-pointer"
                      onClick={() =>
                        router.push(`/accommodation/${acc.slug}`)
                      }
                    >
                      <AccommodationRelated
                        image={acc.bannerImages?.[0]}
                        nights={`Ratings ${acc.nightsStay || ""}`}
                        title={acc.name}
                        location={acc.bannerDescription}
                        tag={acc.location}
                      />
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>

            {/* LEFT BUTTON */}
            <button
              className={`prev-${region.slug} text-[#a79353] absolute z-10 top-1/2 -translate-y-1/2 left-1 sm:left-2 md:-left-8 lg:-left-6 w-10 h-10 flex items-center justify-center rounded-full border border-[#d0cab5] bg-white/80 shadow hover:bg-gray-100 transition opacity-100 cursor-pointer`}
            >
              <ChevronLeft size={22} strokeWidth={1.5} />
            </button>

            {/* RIGHT BUTTON */}
            <button
              className={`next-${region.slug} text-[#a79353] absolute z-10 top-1/2 -translate-y-1/2 right-1 sm:right-2 md:-right-8 lg:-right-6 w-10 h-10 flex items-center justify-center rounded-full border border-[#d0cab5] bg-white/80 shadow hover:bg-gray-100 transition opacity-100 cursor-pointer`}
            >
              <ChevronRight size={22} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      ))}
    </AccommodationGrid>
  );
};

export default AccommodationSlider;