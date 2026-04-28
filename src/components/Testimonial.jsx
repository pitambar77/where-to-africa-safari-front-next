"use client";
import React, { useRef } from "react";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import TestimonialCard from "../components/TestimonialCard";

const testimonials = [
  {
    id: 1,
    profile:'/reviews-3.webp',
    travelername: "James & Steve",
    mainquote: "USA",
    para: "On our first African Safari, I booked our Zimbabwe portion through Where To Africa Experiences - this was one of the best decisions I made on the entire trip.",
  },
  {
    id: 2,
    profile:'/rev2.webp',
    travelername: "John Anderson",
    mainquote: "NEWZLAND",
    para: "Everything from booking to our safari experience was smooth and professional. Highly recommend Where To Africa for anyone planning an African adventure.",
  },
  {
    id: 3,
    profile:'/rev3.webp',
    travelername: "Kent Kauffman",
    mainquote: "USA",
    para: "I took 13 people to Victoria Falls for 3 nights and had a trip with Where To Africa. They made everything very easy, and the payment process was straightforward.",
  },
  {
    id: 4,
    profile:'/rev4.webp',
    travelername: "Justin",
    mainquote: "UNITED KINGDOM",
    para: "I thoroughly enjoyed my African Safari experience from start to finish with Where to Africa. Everything went smoothly. I would recommend this company to any of my friends, colleagues, or family.",
  },

];

const Testimonial = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="testimonial-sec max-w-[1300px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-0 py-8 sm:py-10 md:py-16 lg:py-20 bg-white">
      <div className="">
        {/* Heading */}
        <div className=" text-center">
          <p className=" text-[#a89f82] text-xs sm:text-base font-quicksand  uppercase">
            Reviews
          </p>
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-4 md:mb-10 mt-4 text-[#636363] font-normal font-cormorant ">
            Real Stories From Happy Travelers
          </h3>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center  space-x-4 my-2 md:my-6">
          <button
            ref={prevRef}
            className=" w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#aaa086] text-white flex items-center justify-center hover:bg-[#978f7d] transition"
            aria-label="Previous"
          >
            <IoArrowBack size={20} />
          </button>
          <button
            ref={nextRef}
            className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#aaa086] text-white flex items-center justify-center hover:bg-[#978f7d] transition"
            aria-label="Next"
          >
            <IoArrowForward size={20} />
          </button>
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Navigation]}
          spaceBetween={30}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          onInit={(swiper) => {
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          loop={true}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className=" mt-2 md:mt-8"
        >
          {testimonials.map((review) => (
            <SwiperSlide key={review.id}>
              <TestimonialCard
                profile={review.profile}
                travelername={review.travelername}
                mainquote={review.mainquote}
                para={review.para}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonial;
