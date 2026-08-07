"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";

import { IoArrowBack, IoArrowForward } from "react-icons/io5";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

export default function RelatedBlogs({ blogs = [] }) {
  if (!blogs.length) return null;

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const BlogCard = ({ blog }) => (
    <article className="overflow-hidden rounded-md bg-white shadow transition hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/blog/${blog.slug}`}>
        <div className="relative h-64">
          <Image
            src={blog.bannerImage}
            alt={blog.title}
            fill
            className="object-cover"
          />
        </div>
      </Link>

      <div className="p-6">
        <p className="mb-2 text-sm text-[#ab8c51]">{blog.category.name}</p>

        <Link href={`/blog/${blog.slug}`}>
          <h3 className="mb-4 font-cormorant text-3xl text-[#555] hover:text-[#ab8c51] transition">
            {blog.title}
          </h3>
        </Link>

        <p className="mb-4 line-clamp-3 text-gray-600">{blog.excerpt}</p>

        <Link
          href={`/blog/${blog.slug}`}
          className="font-quicksand text-[#ab8c51] hover:underline"
        >
          Read More →
        </Link>
      </div>
    </article>
  );

  return (
    <section className="bg-[#f8f4ec] py-16">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="mb-8 text-center font-cormorant text-5xl text-[#636363]">
          Related Articles
        </h2>

        {blogs.length > 3 && (
          <div className="mb-8 flex justify-center space-x-4">
            <button
              ref={prevRef}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#aaa086] text-white transition hover:bg-[#8f7343] cursor-pointer"
              aria-label="Previous"
            >
              <IoArrowBack size={20} />
            </button>

            <button
              ref={nextRef}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#aaa086] text-white transition hover:bg-[#8f7343] cursor-pointer"
              aria-label="Next"
            >
              <IoArrowForward size={20} />
            </button>
          </div>
        )}

        {blogs.length <= 3 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        ) : (
          <Swiper
            modules={[Navigation]}
            spaceBetween={24}
            loop={blogs.length > 3}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            onInit={(swiper) => {
              swiper.navigation.init();
              swiper.navigation.update();
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
          >
            {blogs.map((blog) => (
              <SwiperSlide key={blog._id}>
                <BlogCard blog={blog} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
}
