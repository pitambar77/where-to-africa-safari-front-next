import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import Link from "next/link";

const ExperienceCarousel = ({
  title = "Guest Favorites in South Africa",
  description = `"I just returned from the safari to South Africa and I had to let you
  know what an amazing trip it was. The trip was well planned and very
  special... every moment was filled with excitement. Our Tauck Director
  made this experience a joy for all of us. The animals we saw and the
  places we visited were amazing. Thank you for making this so special
  for me."`,
  author = "",
  data = [],
  slidesPerView = 2.5,
  slidesPerGroup = 2,
  
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(data.length / slidesPerGroup),
  );
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <section className="  relative">
      <div className=" w-full 2xl:max-w-[1300px] 2xl:mx-auto pl-4 sm:pl-6 md:pl-16 2xl:pl-0 py-8 sm:py-10 md:py-16">
        <div className=" px-4 md:px-10 lg:px-16 xl:px-20 2xl:px-28">
          {/* Background Overlay */}
          <div className="absolute inset-0 before:absolute before:top-0 before:left-0 before:w-full before:h-2/3 before:bg-[#faf6ef] before:z-0"></div>

          {/* Header Section */}
          <div className="max-w-full mx-auto text-center mb-8 md:mb-14 relative">
            <p className="text-[#a89f82] font-quicksand uppercase mb-4">
              {title}
            </p>
            {description && (
              <h5 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-cormorant mb-0 md:mb-8 mt-4 text-[#636363] capitalize font-normal">
                {description}
              </h5>
            )}
            {/* {author && (
          <p className="font-quicksand text-[#636363] text-lg md:text-xl leading-relaxed mb-4">
            {author}
          </p>
        )} */}
          </div>
        </div>

        <div className=" ">
          {/* Carousel Section */}
          <div className="relative">
            <Swiper
              modules={[Navigation]}
              slidesPerView={slidesPerView}
              slidesPerGroup={slidesPerGroup}
              spaceBetween={24}
              navigation={{
                nextEl: ".swiper-next",
                prevEl: ".swiper-prev",
              }}
              breakpoints={{
                0: { slidesPerView: 1, slidesPerGroup: 1 },
                768: { slidesPerView, slidesPerGroup },
              }}
              onInit={(swiper) => {
                const total = Math.ceil(
                  data.length / swiper.params.slidesPerGroup,
                );
                setTotalPages(total);
                setIsBeginning(swiper.isBeginning);
                setIsEnd(swiper.isEnd);
              }}
              onSlideChange={(swiper) => {
                const group = swiper.params.slidesPerGroup || slidesPerGroup;
                const page = Math.ceil((swiper.activeIndex + 1) / group);
                const total = Math.ceil(data.length / group);
                setCurrentPage(page);
                setTotalPages(total);
                setIsBeginning(swiper.isBeginning);
                setIsEnd(swiper.isEnd);
              }}
              className="pb-10"
            >
              {data.map((item, index) => (
                <SwiperSlide key={item.id || item.slug || index}>
                  <Link
                    href={item.path}
                    className="relative group overflow-hidden rounded-sm shadow-lg cursor-pointer"
                  >
                    <div className="relative w-full h-96 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <h3 className="text-white text-lg md:text-xl font-normal capitalize font-cormorant leading-tight">
                        {item.title}
                      </h3>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Side Navigation Buttons */}
            <button
              className={`swiper-prev cursor-pointer absolute left-0 md:-left-6 top-1/2 -translate-y-1/2 bg-white shadow-md p-3 rounded-full transition z-10 ${
                isBeginning
                  ? "opacity-40 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
              disabled={isBeginning}
            >
              <FaArrowLeftLong className="text-[#a89f82]" size={18} />
            </button>

            <button
              className={`swiper-next cursor-pointer absolute right-4 md:right-1/6 top-1/2 -translate-y-1/2 bg-white shadow-md p-3 rounded-full transition z-10 ${
                isEnd ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100"
              }`}
              disabled={isEnd}
            >
              <FaArrowRightLong className="text-[#a89f82]" size={18} />
            </button>
          </div>
        </div>
        {/* Pagination Controls */}
        <div className="flex items-center space-x-4 mt-12 text-[#a89f82] justify-center font-cormorant">
          <button
            className={`swiper-prev rounded-full transition ${
              isBeginning
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-gray-100"
            }`}
            disabled={isBeginning}
          >
            <FaArrowLeftLong className="w-8 h-5" />
          </button>

          <div className="text-lg font-quicksand font-light flex items-center">
            {String(currentPage).padStart(2, "0")}
            <span className="text-gray-400">
              <div className="w-16 flex-1 h-[1px] bg-[#a89f82] mx-3"></div>
            </span>
            {String(totalPages).padStart(2, "0")}
          </div>

          <button
            className={`swiper-next rounded-full transition ${
              isEnd ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100"
            }`}
            disabled={isEnd}
          >
            <FaArrowRightLong className="text-[#a89f82] w-8 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ExperienceCarousel;
