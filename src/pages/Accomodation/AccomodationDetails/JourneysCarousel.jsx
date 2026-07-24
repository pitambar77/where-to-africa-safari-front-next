"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { useRouter } from "next/navigation";

import "swiper/css";
import "swiper/css/navigation";

const JourneysCarousel = ({ journeys = [], destinationSlug }) => {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  if (!journeys.length) return null;

  const useSwiper = journeys.length > 2;

  return (
    <section className=" py-8 sm:py-10 md:py-16 relative bg-gray-50">
      {/* ---------- Heading ---------- */}
      <div className="text-center max-w-6xl mx-auto mb-8 md:mb-14 font-cormorant">
        <p className=" font-quicksand text-[#a89f82] text-sm md:text-base uppercase mb-4 md:mb-6">
          Related Journeys
        </p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-[#636363] capitalize font-normal">
          Other Journeys You May Enjoy
        </h2>
      </div>

      {/* ---------- Swiper ---------- */}
      {/* <div className="relative w-full 2xl:max-w-[1300px] 2xl:mx-auto pl-4 md:pl-10 lg:pl-16 xl:pl-20 2xl:pl-0">
        <Swiper
          modules={[Navigation]}
          slidesPerView={2.5}
          slidesPerGroup={2}
          spaceBetween={24}
          navigation={{
            nextEl: ".swiper-next",
            prevEl: ".swiper-prev",
          }}
          breakpoints={{
            0: { slidesPerView: 1, slidesPerGroup: 1 },
            768: { slidesPerView: 2.5, slidesPerGroup: 2 },
          }}
          onInit={(swiper) => {
            const total = Math.ceil(
              journeys.length / swiper.params.slidesPerGroup
            );
            setTotalPages(total);
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          onSlideChange={(swiper) => {
            const group = swiper.params.slidesPerGroup || 2;
            const page = Math.ceil((swiper.activeIndex + 1) / group);
            const total = Math.ceil(journeys.length / group);

            setCurrentPage(page);
            setTotalPages(total);
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          className="pb-10"
        >
          {journeys.map((region) => (
            <SwiperSlide key={region._id}>
             
              <div
                onClick={() =>
                  router.push(`/${destinationSlug}/${region.slug}`)
                }
                className="relative h-[300px] md:h-[420px] rounded-sm overflow-hidden cursor-pointer"
              >
                <img
                  src={region.image}
                  alt={region.name}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                <div className="absolute bottom-0 left-0 p-8 text-white">
                  <h3 className=" text-2xl md:text-3xl font-cormorant font-light mb-2">
                    {region.name}
                  </h3>
                  {region.subtitle && (
                    <p className="text-sm font-quicksand opacity-80">
                      {region.subtitle}
                    </p>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

     
        <button
          className={`swiper-prev absolute left-2 md:left-9 top-1/2 -translate-y-1/2 bg-white shadow-md p-3 rounded-full transition z-10 ${
            isBeginning
              ? "opacity-40 cursor-not-allowed"
              : "hover:bg-gray-100 cursor-pointer"
          }`}
          disabled={isBeginning}
        >
          <FaArrowLeftLong className="text-[#a89f82]" size={18} />
        </button>

        <button
          className={`swiper-next absolute right-2 md:right-1/6 top-1/2 -translate-y-1/2 bg-white shadow-md p-3 rounded-full transition z-10 ${
            isEnd
              ? "opacity-40 cursor-not-allowed"
              : "hover:bg-gray-100 cursor-pointer"
          }`}
          disabled={isEnd}
        >
          <FaArrowRightLong className="text-[#a89f82]" size={18} />
        </button>
      </div> */}

      <div
        className={`relative w-full 2xl:max-w-[1300px] 2xl:mx-auto ${
          useSwiper
            ? "pl-4 md:pl-10 lg:pl-16 xl:pl-20 2xl:pl-0"
            : "px-4 md:px-10 lg:px-16 xl:px-0"
        }`}
      >
        {useSwiper ? (
          <>
            <Swiper
              modules={[Navigation]}
              slidesPerView={2.5}
              slidesPerGroup={2}
              spaceBetween={24}
              navigation={{
                nextEl: ".swiper-next",
                prevEl: ".swiper-prev",
              }}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                  slidesPerGroup: 1,
                },
                768: {
                  slidesPerView: 2.5,
                  slidesPerGroup: 2,
                },
              }}
              onInit={(swiper) => {
                const total = Math.ceil(
                  journeys.length / swiper.params.slidesPerGroup,
                );
                setTotalPages(total);
                setIsBeginning(swiper.isBeginning);
                setIsEnd(swiper.isEnd);
              }}
              onSlideChange={(swiper) => {
                const group = swiper.params.slidesPerGroup || 2;
                const page = Math.ceil((swiper.activeIndex + 1) / group);
                const total = Math.ceil(journeys.length / group);

                setCurrentPage(page);
                setTotalPages(total);
                setIsBeginning(swiper.isBeginning);
                setIsEnd(swiper.isEnd);
              }}
              className="pb-10"
            >
              {journeys.map((region) => (
                <SwiperSlide key={region._id}>
                  <div
                    onClick={() =>
                      router.push(`/${destinationSlug}/${region.slug}`)
                    }
                    className="relative h-[300px] md:h-[420px] rounded-sm overflow-hidden cursor-pointer"
                  >
                    <img
                      src={region.image}
                      alt={region.name}
                      className="w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                    <div className="absolute bottom-0 left-0 p-8 text-white">
                      <h3 className="text-2xl md:text-3xl font-cormorant font-light mb-2">
                        {region.name}
                      </h3>

                      {region.subtitle && (
                        <p className="text-sm font-quicksand opacity-80">
                          {region.subtitle}
                        </p>
                      )}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Side Arrows */}
            <button
              className={`swiper-prev absolute left-2 md:left-9 top-1/2 -translate-y-1/2 bg-white shadow-md p-3 rounded-full transition z-10 ${
                isBeginning
                  ? "opacity-40 cursor-not-allowed"
                  : "hover:bg-gray-100 cursor-pointer"
              }`}
              disabled={isBeginning}
            >
              <FaArrowLeftLong className="text-[#a89f82]" size={18} />
            </button>

            <button
              className={`swiper-next absolute right-2 md:right-1/6 top-1/2 -translate-y-1/2 bg-white shadow-md p-3 rounded-full transition z-10 ${
                isEnd
                  ? "opacity-40 cursor-not-allowed"
                  : "hover:bg-gray-100 cursor-pointer"
              }`}
              disabled={isEnd}
            >
              <FaArrowRightLong className="text-[#a89f82]" size={18} />
            </button>
          </>
        ) : (
          <div className="flex flex-wrap justify-center gap-6">
            {journeys.map((region) => (
              <div
                key={region._id}
                className="w-full md:w-[48%] max-w-[600px]"
                onClick={() =>
                  router.push(`/${destinationSlug}/${region.slug}`)
                }
              >
                <div className="relative h-[300px] md:h-[420px] rounded-sm overflow-hidden cursor-pointer">
                  <img
                    src={region.image}
                    alt={region.name}
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                  <div className="absolute bottom-0 left-0 p-8 text-white">
                    <h3 className="text-2xl md:text-3xl font-cormorant font-light mb-2">
                      {region.name}
                    </h3>

                    {region.subtitle && (
                      <p className="text-sm font-quicksand opacity-80">
                        {region.subtitle}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center space-x-4 mt-6 md:mt-12 text-[#a89f82] justify-center font-cormorant">
        <button
          className={`swiper-prev ${
            isBeginning
              ? "opacity-40 cursor-not-allowed"
              : "hover:bg-gray-100 cursor-pointer"
          }`}
          disabled={isBeginning}
        >
          <FaArrowLeftLong className="w-8 h-5" />
        </button>

        <div className="text-lg font-quicksand font-light flex items-center">
          {String(currentPage).padStart(2, "0")}
          <span className="mx-3 w-16 h-[1px] bg-[#a89f82] inline-block"></span>
          <span className="text-gray-400">
            {String(totalPages).padStart(2, "0")}
          </span>
        </div>

        <button
          className={`swiper-next ${
            isEnd
              ? "opacity-40 cursor-not-allowed"
              : "hover:bg-gray-100 cursor-pointer"
          }`}
          disabled={isEnd}
        >
          <FaArrowRightLong className="text-[#a89f82] w-8 h-5" />
        </button>
      </div>
    </section>
  );
};

export default JourneysCarousel;
