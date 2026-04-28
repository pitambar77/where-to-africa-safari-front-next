"use client"

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./Partner.css";

const partners = [
  "/images/part1.webp",
  "/images/part2.webp",
  "/images/part3.webp",
  "/images/part4.webp",
  "/images/part5.webp",
  "/images/part6.webp",
];

const Partner = () => {
  // const partners = [part1, part2, part3, part4, part5, part6];

  return (
    <section className="partner-sec py-8 sm:py-10 md:py-16 lg:py-20">
      <div className=" max-w-[1300px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-0">
        <div className=" text-center">
          <p className=" text-[#a89f82] font-quicksand uppercase">
            Our Partners
          </p>
          <h5 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl max-w-4xl mx-auto  mb-8 mt-4 text-[#636363] font-normal font-cormorant">
            Trusted Partners Powering Our Global Journey
          </h5>
          <p className=" font-quicksand max-w-xl mx-auto mb-0 md:mb-10 ">
            Our Partners In Africa Will Make Your Dream Trip, A Trip To Never
            Forget
          </p>
        </div>

        <Swiper
          modules={[Pagination]}
          spaceBetween={30}
          slidesPerView={5}
          loop={true}
          pagination={{ clickable: true }}
          breakpoints={{
            0: { slidesPerView: 1 },
            480: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
          }}
        >
          {partners.map((partner, index) => (
            <SwiperSlide key={index}>
              <div className="partner_iteam">
                <img
                  src={partner}
                  alt={`Partner ${index + 1}`}
                  className="w-100"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Partner;
