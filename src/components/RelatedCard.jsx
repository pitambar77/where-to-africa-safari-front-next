"use client"

import React, { useRef, useState } from "react";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import SafariPackBox from "../pages/homePage/safariPackBox";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const RelatedCard = ({ data = [], onCardClick }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  const [currentSlide, setCurrentSlide] = useState(1);

  return (
    <section className=" py-8">
      {/* Heading */}
      <div className="  max-w-[1300px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-0  font-cormorant text-center mb-6 md:mb-10">
        <p className="font-quicksand text-[#a89f82] text-sm md:text-base uppercase">
          Your Journeys
        </p>

        <h5 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl mt-4 capitalize text-[#636363] font-normal">
          Check in to your other property
        </h5>
      </div>

      {/* Slider */}
      <div className="w-full 2xl:max-w-[1300px] 2xl:mx-auto relative pl-0 sm:pl-6 md:pl-10 lg:pl-16 xl:pl-20 2xl:pl-0">
        {/* Navigation Arrows */}
        <div className="absolute inset-y-0 left-0 sm:left-0 md:left-0 lg:left-10 right-0 md:right-16 flex items-center justify-between px-2 md:px-6 pointer-events-none z-10">
          <button
            ref={prevRef}
            className="pointer-events-auto bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition"
          >
            <IoArrowBack className="text-[#8f866f]" />
          </button>

          <button
            ref={nextRef}
            className="pointer-events-auto bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition"
          >
            <IoArrowForward className="text-[#8f866f]" />
          </button>
        </div>

        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={6}
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
            480: { slidesPerView: 1.2 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 2.3 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 3.3 },
          }}
          className="[&_.swiper-pagination]:hidden"
        >
          {data.length > 0 ? (
            data.map((item) => (
              <SwiperSlide key={item._id}>
                <div
                  className="p-2 cursor-pointer"
                  onClick={() => onCardClick(item.slug)}
                >
                  <SafariPackBox
                    image={item.landingImage}
                    title={item.name}
                    price={item.pricePerPerson}
                    link={`/accommodation/${item.slug}`} 
                  />
                </div>
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <div className="text-center py-10">No Packages Available</div>
            </SwiperSlide>
          )}
        </Swiper>

        {/* Custom Pagination */}
        <div className="flex items-center justify-center gap-4 mt-8 text-[#8f866f] font-semibold">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="cursor-pointer"
          >
            <IoArrowBack />
          </button>

          <span>{String(currentSlide).padStart(2, "0")}</span>

          <div className="w-10 h-[1px] bg-[#8f866f]"></div>

          <span>{String(data.length).padStart(2, "0")}</span>

          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="cursor-pointer"
          >
            <IoArrowForward />
          </button>
        </div>
      </div>
    </section>
  );
};

export default RelatedCard;
