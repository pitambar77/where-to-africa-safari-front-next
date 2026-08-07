"use client";

import Link from "next/link";
import { CalendarDays, User, Tag, ChevronRight } from "lucide-react";

export default function BlogHero({ blog }) {
  if (!blog) return null;

  const formattedDate = blog.publishedAt
    ? new Date(blog.publishedAt).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  return (
    <section className="bg-white pt-10 pb-12">
      <div className="mx-auto max-w-7xl px-4">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="transition hover:text-[#ab8c51]">
            Home
          </Link>

          <ChevronRight size={14} />

          <Link href="/blog" className="transition hover:text-[#ab8c51]">
            Blog
          </Link>

          <ChevronRight size={14} />

          <span className="text-[#ab8c51]">{blog.title}</span>
        </div>

        {/* Title */}
        <h1 className="mb-6 text-center font-cormorant text-4xl leading-tight text-[#636363] md:text-6xl ">
          {blog.title}
        </h1>

        {/* Meta */}
        <div className=" font-quicksand mb-8 flex flex-wrap items-center justify-center gap-6 text-gray-600">
          {/* Author */}
          <div className="flex items-center gap-2">
            <User size={16} className="text-[#ab8c51]" />
            <span>
              By{" "}
              <span className="font-medium text-[#636363]">
                {blog.author?.name}
              </span>
            </span>
          </div>

          {/* Date */}
          <div className="flex items-center gap-2">
            <CalendarDays size={16} className="text-[#ab8c51]" />
            <span>{formattedDate}</span>
          </div>

          {/* Category */}
          {blog.category?.name && (
            <div className="flex items-center gap-2">
              <Tag size={16} className="text-[#ab8c51]" />
              <span>{blog.category.name}</span>
            </div>
          )}
        </div>

        {/* Excerpt */}
        {blog.excerpt && (
          <p className="mx-auto max-w-3xl text-center leading-8 text-gray-600">
            {blog.excerpt}
          </p>
        )}
      </div>
    </section>
  );
}
