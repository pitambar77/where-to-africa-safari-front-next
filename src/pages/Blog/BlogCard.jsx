"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDays, User } from "lucide-react";

export default function BlogCard({ blog }) {
  const formattedDate = new Date(blog.publishedAt).toLocaleDateString(
    "en-US",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  );

  return (
    <article className="group overflow-hidden rounded-md bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Image */}
      <Link href={`/blog/${blog.slug}`}>
        <div className="relative h-72 overflow-hidden">
          <Image
            src={blog.bannerImage}
            alt={blog.title}
            fill
            className="object-cover transition duration-700 group-hover:scale-110"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="p-6">
        {/* Date & Category */}
        <div className="mb-4 flex flex-wrap items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <CalendarDays size={16} />
            <span>{formattedDate}</span>
          </div>

          {blog.category?.name && (
            <>
              <span className="font-medium font-quicksand uppercase tracking-wide text-[#ab8c51]">
                {blog.category.name}
              </span>
            </>
          )}
        </div>

        {/* Title */}
        <Link href={`/blog/${blog.slug}`}>
          <h3 className="mb-5 text-2xl font-cormorant leading-snug text-[#636363] transition-colors duration-300 group-hover:text-[#ab8c51]">
            {blog.title}
          </h3>
        </Link>

        {/* Author */}
        {blog.author?.name && (
          <div className="flex items-center gap-2 text-sm text-gray-500 font-quicksand">
            <User size={16} />
            <span>
              By{" "}
              <span className="font-semibold text-[#636363]">
                {blog.author.name}
              </span>
            </span>
          </div>
        )}
      </div>
    </article>
  );
}
