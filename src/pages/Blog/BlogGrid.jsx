"use client";

import BlogCard from "./BlogCard";

export default function BlogGrid({ blogs = [], loading }) {
  if (loading && blogs.length === 0) {
    return (
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-xl border bg-white"
          >
            <div className="h-72 animate-pulse bg-gray-200" />

            <div className="space-y-4 p-6">
              <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />

              <div className="h-6 w-full animate-pulse rounded bg-gray-200" />

              <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200" />

              <div className="mt-8 h-4 w-1/3 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!loading && blogs.length === 0) {
    return (
      <div className="py-24 text-center">
        <h3 className="mb-2 text-3xl font-serif text-gray-800">
          No Blogs Found
        </h3>

        <p className="text-gray-500">
          Try changing your search or filter options.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3">
      {blogs.map((blog) => (
        <BlogCard key={blog._id} blog={blog} />
      ))}
    </div>
  );
}
