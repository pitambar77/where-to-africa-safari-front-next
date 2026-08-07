"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function HeroSlider({ blogs = [] }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  if (!blogs.length) return null;

  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        loop
        speed={700}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        pagination={{
          type: "fraction",
          el: ".hero-pagination",
          formatFractionCurrent: (number) => number.toString().padStart(2, "0"),
          formatFractionTotal: (number) => number.toString().padStart(2, "0"),
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
      >
        {blogs.map((blog) => (
          <SwiperSlide key={blog._id}>
            <div className="relative h-[520px] overflow-hidden rounded-md">
              {/* Image */}
              {/* <Image
                src={blog.image}
                alt={blog.title}
                fill
                priority
                className="object-cover"
              /> */}

              <Image
                src={blog.bannerImage}
                alt={blog.title}
                fill
                priority
                className="object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-10 left-10 z-20 max-w-2xl">
                <p className="mb-3 text-xs uppercase tracking-[4px] text-white/80 font-quicksand">
                  Featured Blog
                </p>

                <Link href={`/blog/${blog.slug}`}>
                  <h2 className="text-3xl font-cormorant text-white transition hover:text-[#ab8c51] md:text-5xl">
                    {blog.title}
                  </h2>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Previous Button */}
      <button
        ref={prevRef}
        className="absolute left-6 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg transition hover:bg-[#ab8c51] hover:text-white cursor-pointer"
      >
        <ChevronLeft size={18} />
      </button>

      {/* Next Button */}
      <button
        ref={nextRef}
        className="absolute right-6 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg transition hover:bg-[#ab8c51] hover:text-white cursor-pointer"
      >
        <ChevronRight size={18} />
      </button>

      {/* Pagination */}
      <div className="hero-pagination mt-8 text-center text-lg font-quicksand  tracking-widest text-gray-700" />
    </div>
  );
}
