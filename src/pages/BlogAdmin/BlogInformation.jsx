"use client";

import React, { useRef, useState } from "react";
import { ImagePlus, Upload, X } from "lucide-react";

const BlogInformation = ({
  blog = {
    title: "",
    excerpt: "",
    bannerImage: null,
    category: "",
    author: "",
    status: "Draft",
    publishedAt: "",
    featured: false,
  },
  errors = {},
  categories = [],
  authors = [],
  onChange = () => {},
  onBannerChange = () => {},
}) => {
  const inputRef = useRef(null);

  const [dragging, setDragging] = useState(false);

  /* ---------------------------------------
     Banner Upload
  --------------------------------------- */

  const handleBanner = (file) => {
    if (!file) return;

    onBannerChange(file);
  };

  /* ---------------------------------------
     File Change
  --------------------------------------- */

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    handleBanner(file);
  };

  /* ---------------------------------------
     Drag
  --------------------------------------- */

  const handleDragOver = (e) => {
    e.preventDefault();

    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();

    setDragging(false);

    if (e.dataTransfer.files.length) {
      handleBanner(e.dataTransfer.files[0]);
    }
  };

  /* ---------------------------------------
     Remove Banner
  --------------------------------------- */

  const removeBanner = () => {
    onBannerChange(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-6">
      {/* =====================================
          Banner
      ===================================== */}

      <div className="rounded-2xl bg-white shadow-sm border">
        <div className="border-b px-6 py-4">
          <h2 className="text-xl font-semibold">Banner Image</h2>

          <p className="mt-1 text-sm text-gray-500">
            Upload a featured banner for this blog.
          </p>
        </div>

        <div className="p-6">
          {!blog.bannerImage ? (
            <div
              onClick={() => inputRef.current.click()}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`cursor-pointer rounded-xl border-2 border-dashed p-10 transition

              ${
                dragging
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-blue-500"
              }`}
            >
              <div className="flex flex-col items-center">
                <ImagePlus className="mb-4 text-blue-600" size={42} />

                <h3 className="font-semibold text-lg">Upload Banner</h3>

                <p className="mt-2 text-sm text-gray-500 text-center">
                  Drag & Drop image here
                  <br />
                  or click to browse
                </p>

                <button
                  type="button"
                  className="mt-6 rounded-lg bg-blue-600 px-6 py-3 text-white flex items-center gap-2 hover:bg-blue-700"
                >
                  <Upload size={18} />
                  Choose Image
                </button>
              </div>
            </div>
          ) : (
            <div className="relative overflow-hidden rounded-xl">
              <img
                src={
                  typeof blog.bannerImage === "string"
                    ? blog.bannerImage
                    : URL.createObjectURL(blog.bannerImage)
                }
                alt="Banner Preview"
                className="h-[350px] w-full object-cover"
              />

              <button
                type="button"
                onClick={removeBanner}
                className="absolute right-4 top-4 rounded-full bg-white p-2 shadow-lg hover:bg-red-500 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>
          )}

          <input
            ref={inputRef}
            type="file"
            hidden
            accept="image/*"
            onChange={handleFileChange}
          />

          {errors.bannerImage && (
            <p className="mt-3 text-sm text-red-500">{errors.bannerImage}</p>
          )}
        </div>
      </div>

      {/* =====================================
          Blog Details
      ===================================== */}

      <div className="rounded-2xl border bg-white shadow-sm">
        <div className="border-b px-6 py-4">
          <h2 className="text-xl font-semibold">Blog Information</h2>

          <p className="mt-1 text-sm text-gray-500">
            Basic details about your blog.
          </p>
        </div>

        <div className="grid gap-6 p-6">
          {/* -----------------------------
              Blog Title
          ----------------------------- */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Blog Title
            </label>

            <input
              type="text"
              value={blog.title}
              placeholder="Enter blog title..."
              onChange={(e) => onChange("title", e.target.value)}
              className={`w-full rounded-xl border px-4 py-3 outline-none transition-all

              ${
                errors.title
                  ? "border-red-500"
                  : "border-gray-300 focus:border-blue-500"
              }`}
            />

            <div className="mt-2 flex justify-between">
              {errors.title ? (
                <span className="text-sm text-red-500">{errors.title}</span>
              ) : (
                <span className="text-sm text-gray-400">
                  Use an SEO friendly title.
                </span>
              )}

              <span className="text-sm text-gray-400">
                {blog.title.length}/120
              </span>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Slug
            </label>

            <input
              type="text"
              value={blog.slug || ""}
              onChange={(e) => onChange("slug", e.target.value)}
              placeholder="your-blog-slug"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />

            <p className="mt-1 text-xs text-gray-500">
              Leave unchanged to automatically follow the blog title.
            </p>
          </div>
          {/* -----------------------------
              Excerpt
          ----------------------------- */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Short Description
            </label>

            <textarea
              rows={5}
              value={blog.excerpt}
              placeholder="Write a short description for this article..."
              onChange={(e) => onChange("excerpt", e.target.value)}
              className={`w-full resize-none rounded-xl border px-4 py-3 outline-none transition-all

              ${
                errors.excerpt
                  ? "border-red-500"
                  : "border-gray-300 focus:border-blue-500"
              }`}
            />

            <div className="mt-2 flex justify-between">
              {errors.excerpt ? (
                <span className="text-sm text-red-500">{errors.excerpt}</span>
              ) : (
                <span className="text-sm text-gray-400">
                  Around 150–170 characters works well.
                </span>
              )}

              <span className="text-sm text-gray-400">
                {blog.excerpt.length}/300
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* =====================================
          Settings
      ===================================== */}

      <div className="rounded-2xl border bg-white shadow-sm">
        <div className="border-b px-6 py-4">
          <h2 className="text-xl font-semibold">Blog Settings</h2>

          <p className="mt-1 text-sm text-gray-500">
            Configure category, author and publishing options.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
          {/* ==========================
              Category
          ========================== */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Category
            </label>

            <select
              value={blog.category}
              onChange={(e) => onChange("category", e.target.value)}
              className={`w-full rounded-xl border bg-white px-4 py-3 outline-none transition

              ${
                errors.category
                  ? "border-red-500"
                  : "border-gray-300 focus:border-blue-500"
              }`}
            >
              <option value="">Select Category</option>

              {categories.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>

            {errors.category && (
              <p className="mt-2 text-sm text-red-500">{errors.category}</p>
            )}
          </div>

          {/* ==========================
              Author
          ========================== */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Author
            </label>

            <select
              value={blog.author}
              onChange={(e) => onChange("author", e.target.value)}
              className={`w-full rounded-xl border bg-white px-4 py-3 outline-none transition

              ${
                errors.author
                  ? "border-red-500"
                  : "border-gray-300 focus:border-blue-500"
              }`}
            >
              <option value="">Select Author</option>

              {authors.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>

            {errors.author && (
              <p className="mt-2 text-sm text-red-500">{errors.author}</p>
            )}
          </div>

          {/* ==========================
              Status
          ========================== */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Status
            </label>

            <select
              value={blog.status}
              onChange={(e) => onChange("status", e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
            >
              <option value="Draft">Draft</option>

              <option value="Published">Published</option>
            </select>
          </div>

          {/* ==========================
              Publish Date
          ========================== */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Publish Date
            </label>

            <input
              type="datetime-local"
              value={blog.publishedAt}
              onChange={(e) => onChange("publishedAt", e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* =====================================
          Featured Blog
      ===================================== */}

      <div className="rounded-2xl border bg-white shadow-sm">
        <div className="flex items-center justify-between p-6">
          <div>
            <h3 className="text-lg font-semibold">Featured Blog</h3>

            <p className="mt-1 text-sm text-gray-500">
              Display this article in the featured blogs section.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onChange("featured", !blog.featured)}
            className={`relative h-8 w-16 rounded-full transition-all

            ${blog.featured ? "bg-blue-600" : "bg-gray-300"}`}
          >
            <span
              className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition-all

              ${blog.featured ? "left-9" : "left-1"}`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogInformation;
