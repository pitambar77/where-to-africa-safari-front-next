"use client";

import React, { useRef } from "react";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";

const impactProjects = [
  {
    image:
      "/images/community-partner.webp",
    title: "Community Partnerships",
    description:
      "Local communities are engaged through fair employment, cultural respect, and collaboration with guides, artisans, and service providers, ensuring tourism income supports livelihoods and strengthens local economies while preserving traditions and encouraging long-term participation in responsible tourism initiatives.",
  },
  {
    image:
      "/images/wildlife-protection.webp",
    title: "Wildlife Protection",
    description:
      "Activities are selected to minimize disturbance, follow ethical viewing guidelines, and support conservation-focused tourism that protects habitats, encourages responsible wildlife encounters, and contributes to long-term preservation of Africa’s natural ecosystems and biodiversity.",
  },
  {
    image:
      "/images/low-impact-travel.webp",
    title: "Low Impact Travel",
    description:
      "Travel routes, accommodations, and activities are chosen to reduce environmental strain, manage visitor flow, and limit overuse of sensitive areas, helping destinations remain healthy, balanced, and welcoming for future travelers and local residents alike.",
  },
  {
    image:
      "/images/Accommodation-re.webp",
    title: "Responsible Accommodation Choices",
    description:
      "Accommodation partners are selected based on responsible operations, fair labor practices, environmental awareness, and community involvement, ensuring stays contribute positively to surrounding areas rather than placing unnecessary pressure on local resources.",
  },
  {
    image:
      "/images/education-and-awareness.webp",
    title: "Education And Awareness",
    description:
      "Travelers receive clear guidance on respectful behavior, cultural understanding, and environmental responsibility, helping guests make informed choices that support conservation, community wellbeing, and positive interactions throughout their journey across African destinations.",
  },
];

const ImpactOfYourStay = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className=" py-8 sm:py-10 md:py-16 bg-gray-50 text-gray-800">
      {/* Header */}
      <div className="text-center px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-28 mb-6 md:mb-12">
        <div className="font-cormorant text-center  ">
          <h2 className=" font-quicksand text-[#a89f82] text-sm md:text-base uppercase">
            {" "}
            Travel Responsibly
          </h2>

          <h5 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mb-4 md:mb-8 mt-4 text-[#636363] capitalize font-normal">
            Our Sustainable Commitments
          </h5>
          <p className=" text-sm sm:text-base md:text-lg max-w-4xl mx-auto text-gray-600 font-quicksand leading-relaxed">
            Responsible travel means understanding impact and acting carefully.
            Where to Africa focuses on practices that support communities
            protect wildlife, respect cultures, and reduce environmental
            pressure while ensuring tourism creates long-term benefits for
            destinations and people rather than short-term gains alone.
          </p>
        </div>

        {/* Custom Nav Buttons */}
        <div className="flex justify-center space-x-4 mt-4 md:mt-8">
          <button
            ref={prevRef}
            className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#aaa086] text-white flex items-center justify-center hover:bg-[#978f7d] transition"
            aria-label="Previous"
          >
            <IoArrowBack size={20} />
          </button>
          <button
            ref={nextRef}
            className=" w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#aaa086] text-white flex items-center justify-center hover:bg-[#978f7d] transition"
            aria-label="Next"
          >
            <IoArrowForward size={20} />
          </button>
        </div>
      </div>

      {/* Swiper Slider */}
      <div className=" w-full 2xl:max-w-[1300px] 2xl:mx-auto pl-6 md:pl-10 lg:pl-16 xl:pl-20 2xl:pl-0">
        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={1}
          onInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          breakpoints={{
            640: { slidesPerView: 1.2 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3.5 },
            1280: { slidesPerView: 4.5 },
          }}
          className="impact-swiper"
        >
          {impactProjects.map((project, index) => (
            <SwiperSlide key={index}>
              <div className=" max-w-xs text-left mx-auto">
                <div className="relative w-full h-48 mb-4 overflow-hidden rounded-sm">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <h3 className=" text-xl md:text-2xl font-normal font-cormorant text-[#636363] mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-700 text-sm md:text-base leading-relaxed font-quicksand pr-6 ">
                  {project.description}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ImpactOfYourStay;
