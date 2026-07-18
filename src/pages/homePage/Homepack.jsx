"use client";

import SafariPackBox from "./safariPackBox";
import React, { useState, useRef, useMemo, useEffect } from "react";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Overview from "../../components/Overview";

const Homepack = ({ trips = [], loading }) => {
  // const [trips, setTrips] = useState([]);
  const [activeDestination, setActiveDestination] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(1);

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  // ✅ Unique destinations (optimized)
  const uniqueDestinations = useMemo(() => {
    return [
      ...new Map(
        trips
          .filter((t) => t.destination)
          .map((t) => [t.destination._id, t.destination]),
      ).values(),
    ].sort((a, b) => a.name.localeCompare(b.name));
  }, [trips]);

  // ✅ Set default active destination
  useEffect(() => {
    if (uniqueDestinations.length > 0 && !activeDestination) {
      setActiveDestination(uniqueDestinations[0]._id);
    }
  }, [uniqueDestinations, activeDestination]);

  // ✅ Filtered trips
  const filteredTrips = useMemo(() => {
    return trips.filter((t) => t.destination?._id === activeDestination);
  }, [trips, activeDestination]);

  return (
    <section className="bg-[#fbf6ea] pb-8 sm:pb-10 md:pb-16 ">
      <Overview
        title={"Welcome to Our Africa"}
        subtitle={
          "We promote responsible African Tours that protect wilderness, support local communities, and celebrate culture through thoughtful journey planning"
        }
        description={
          "...travel experiences that help preserve wildlife, strengthen communities, and ensure tourism benefits the places you visit..."
        }
      />

      {/* Tabs Section */}
      <div className="px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-28">
        <div className="w-full relative md:my-14 my-10">
          <ul className="w-full flex flex-wrap justify-center gap-2 list-none p-0 m-0">
            {uniqueDestinations
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((dest) => (
                <li
                  key={dest._id}
                  onClick={() => setActiveDestination(dest._id)}
                  className={`px-4 py-2 text-white text-sm rounded-full cursor-pointer transition whitespace-nowrap
                    ${
                      activeDestination === dest._id
                        ? "bg-[#8f866f]"
                        : "bg-[#aaa086] hover:bg-[#8f866f]"
                    }`}
                >
                  {dest.name} Packages
                </li>
              ))}
          </ul>
        </div>
      </div>
      {/* Slider Section */}
      <div className="">
        <div className="w-full 2xl:max-w-[1300px] 2xl:mx-auto relative pl-0 md:pl-[80px] 2xl:pl-0 ">
          <div className="absolute inset-y-0 left-0 md:left-10 right-0 md:right-20 flex items-center justify-between px-2 md:px-6 pointer-events-none z-10">
            {/* Prev */}
            <button
              ref={prevRef}
              className="pointer-events-auto cursor-pointer bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition"
            >
              <IoArrowBack className="text-[#8f866f]" />
            </button>

            {/* Next */}
            <button
              ref={nextRef}
              className="pointer-events-auto cursor-pointer bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition"
            >
              <IoArrowForward className="text-[#8f866f]" />
            </button>
          </div>

          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={5}
            slidesPerView={3}
            loop
            pagination={{ type: "fraction" }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            onSlideChange={(swiper) => {
              setCurrentSlide(swiper.realIndex + 1);
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            breakpoints={{
              0: { slidesPerView: 1 },
              480: {
                slidesPerView: 1.2,
              },
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 2.5,
              },
              1024: {
                slidesPerView: 3,
              },
              1280: {
                slidesPerView: 3.5,
              },
            }}
            className="[&_.swiper-pagination]:hidden"
          >
            {loading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <SwiperSlide key={index}>
                  <SkeletonCard />
                </SwiperSlide>
              ))
            ) : filteredTrips.length > 0 ? (
              filteredTrips.map((trip) => (
                <SwiperSlide key={trip._id}>
                  <div className="p-2">
                    <SafariPackBox
                      image={trip.image}
                      title={trip.title}
                      price={trip.price}
                      link={`/package/${trip.slug}`}
                    />
                  </div>
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide>
                <div className="text-center py-10 w-full">
                  No Packages Available
                </div>
              </SwiperSlide>
            )}
          </Swiper>

          {/* Custom Pagination */}
          <div className="flex items-center justify-center gap-4 mt-8 text-[#8f866f] font-semibold">
            {/* Prev */}
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="cursor-pointer"
            >
              <IoArrowBack />
            </button>

            {/* Current */}
            <span>{String(currentSlide).padStart(2, "0")}</span>

            {/* Line */}
            <div className="w-10 h-[1px] bg-[#8f866f]"></div>

            {/* Total */}
            <span>{String(filteredTrips.length).padStart(2, "0")}</span>

            {/* Next */}
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="cursor-pointer"
            >
              <IoArrowForward />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Homepack;
