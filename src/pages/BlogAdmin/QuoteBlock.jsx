"use client";

import { useState } from "react";
import axios from "axios";

import { Quote, Upload, Loader2, Trash2 } from "lucide-react";

const QuoteBlock = ({ block = {},
  onChange = () => {}, }) => {
  const [uploading, setUploading] = useState(false);

  const authorImage = block.media?.[0];

  /* =====================================
      Upload Author Image
  ===================================== */

  const uploadImage = async (file) => {
    if (!file) return;

    try {
      setUploading(true);

      const formData = new FormData();

      formData.append("media", file);

      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/blogs/upload-media`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      onChange({
        media: [data.media],
      });
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const updateField = (field, value) => {
    onChange({
      [field]: value,
    });
  };

  return (
    <div className="space-y-8">
      {/* =====================================
          Header
      ===================================== */}

      <div className="flex items-center gap-4">
        <div className="rounded-xl bg-blue-100 p-4">
          <Quote size={28} className="text-blue-600" />
        </div>

        <div>
          <h2 className="text-xl font-bold">Quote Block</h2>

          <p className="text-gray-500">
            Highlight an important quotation or testimonial.
          </p>
        </div>
      </div>

      {/* Quote */}

      <div>
        <label className="mb-2 block font-medium">Quote</label>

        <textarea
          rows={6}
          value={block.quote || ""}
          onChange={(e) => updateField("quote", e.target.value)}
          className="w-full rounded-xl border p-4"
          placeholder="Enter the quote..."
        />
      </div>

      {/* Author */}

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block font-medium">Author</label>

          <input
            type="text"
            value={block.author || ""}
            onChange={(e) => updateField("author", e.target.value)}
            className="w-full rounded-xl border p-3"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">Designation</label>

          <input
            type="text"
            value={block.designation || ""}
            onChange={(e) => updateField("designation", e.target.value)}
            className="w-full rounded-xl border p-3"
            placeholder="CEO"
          />
        </div>
      </div>

      {/* Company */}

      <div>
        <label className="mb-2 block font-medium">Company</label>

        <input
          type="text"
          value={block.company || ""}
          onChange={(e) => updateField("company", e.target.value)}
          className="w-full rounded-xl border p-3"
          placeholder="Where To Africa"
        />
      </div>

      {/* Upload Author Image */}

      <div>
        <label className="mb-3 block font-medium">Author Image</label>

        {!authorImage ? (
          <label className="flex h-48 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 hover:border-blue-500">
            {uploading ? (
              <>
                <Loader2
                  className="mb-4 animate-spin text-blue-600"
                  size={40}
                />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mb-4 text-blue-600" size={42} />
                Upload Image
              </>
            )}

            <input
              hidden
              type="file"
              accept="image/*"
              onChange={(e) => uploadImage(e.target.files[0])}
            />
          </label>
        ) : (
          <div className="overflow-hidden rounded-2xl border">
            <img
              src={authorImage.url}
              alt=""
              className="h-56 w-full object-cover"
            />

            <button
              type="button"
              onClick={() =>
                onChange({
                  media: [],
                })
              }
              className="flex w-full items-center justify-center gap-2 border-t bg-red-50 py-3 text-red-600 hover:bg-red-100"
            >
              <Trash2 size={18} />
              Remove Image
            </button>
          </div>
        )}
      </div>
      {/* =====================================
          Quote Settings
      ===================================== */}

      <div className="rounded-2xl border bg-white shadow-sm">
        <div className="border-b px-6 py-4">
          <h3 className="text-lg font-semibold">Quote Settings</h3>

          <p className="text-sm text-gray-500">
            Customize the appearance of the quote section.
          </p>
        </div>

        <div className="grid gap-6 p-6 md:grid-cols-2">
          {/* Alignment */}

          <div>
            <label className="mb-2 block font-medium">Text Alignment</label>

            <select
              value={block.align || "center"}
              onChange={(e) => updateField("align", e.target.value)}
              className="w-full rounded-xl border p-3"
            >
              <option value="left">Left</option>

              <option value="center">Center</option>

              <option value="right">Right</option>
            </select>
          </div>

          {/* Style */}

          <div>
            <label className="mb-2 block font-medium">Quote Style</label>

            <select
              value={block.style || "modern"}
              onChange={(e) => updateField("style", e.target.value)}
              className="w-full rounded-xl border p-3"
            >
              <option value="modern">Modern</option>

              <option value="classic">Classic</option>

              <option value="minimal">Minimal</option>

              <option value="testimonial">Testimonial</option>
            </select>
          </div>

          {/* Background */}

          <div>
            <label className="mb-2 block font-medium">Background</label>

            <select
              value={block.background || "white"}
              onChange={(e) => updateField("background", e.target.value)}
              className="w-full rounded-xl border p-3"
            >
              <option value="white">White</option>

              <option value="light">Light Gray</option>

              <option value="dark">Dark</option>

              <option value="blue">Blue</option>
            </select>
          </div>

          {/* Text Color */}

          <div>
            <label className="mb-2 block font-medium">Text Color</label>

            <input
              type="color"
              value={block.textColor || "#111827"}
              onChange={(e) => updateField("textColor", e.target.value)}
              className="h-12 w-full rounded-xl border"
            />
          </div>
        </div>
      </div>

      {/* =====================================
          Display Options
      ===================================== */}

      <div className="rounded-2xl border bg-white shadow-sm">
        <div className="border-b px-6 py-4">
          <h3 className="text-lg font-semibold">Display Options</h3>
        </div>

        <div className="grid gap-6 p-6 lg:grid-cols-2">
          {/* Large Quote Icon */}

          <div className="flex items-center justify-between rounded-xl border p-4">
            <div>
              <h4 className="font-semibold">Large Quote Icon</h4>

              <p className="text-sm text-gray-500">
                Display a decorative quotation mark.
              </p>
            </div>

            <input
              type="checkbox"
              checked={block.showIcon ?? true}
              onChange={(e) => updateField("showIcon", e.target.checked)}
              className="h-5 w-5"
            />
          </div>

          {/* Show Author Image */}

          <div className="flex items-center justify-between rounded-xl border p-4">
            <div>
              <h4 className="font-semibold">Show Author Image</h4>

              <p className="text-sm text-gray-500">
                Display the uploaded author image.
              </p>
            </div>

            <input
              type="checkbox"
              checked={block.showImage ?? true}
              onChange={(e) => updateField("showImage", e.target.checked)}
              className="h-5 w-5"
            />
          </div>

          {/* Show Company */}

          <div className="flex items-center justify-between rounded-xl border p-4">
            <div>
              <h4 className="font-semibold">Show Company</h4>

              <p className="text-sm text-gray-500">
                Display company or organization.
              </p>
            </div>

            <input
              type="checkbox"
              checked={block.showCompany ?? true}
              onChange={(e) => updateField("showCompany", e.target.checked)}
              className="h-5 w-5"
            />
          </div>

          {/* Show Designation */}

          <div className="flex items-center justify-between rounded-xl border p-4">
            <div>
              <h4 className="font-semibold">Show Designation</h4>

              <p className="text-sm text-gray-500">
                Display author's role or job title.
              </p>
            </div>

            <input
              type="checkbox"
              checked={block.showDesignation ?? true}
              onChange={(e) => updateField("showDesignation", e.target.checked)}
              className="h-5 w-5"
            />
          </div>
        </div>
      </div>

      {/* =====================================
          Typography
      ===================================== */}

      <div className="rounded-2xl border bg-white shadow-sm">
        <div className="border-b px-6 py-4">
          <h3 className="text-lg font-semibold">Typography</h3>
        </div>

        <div className="grid gap-6 p-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block font-medium">Quote Font Size</label>

            <input
              type="range"
              min="18"
              max="48"
              value={block.fontSize || 30}
              onChange={(e) => updateField("fontSize", Number(e.target.value))}
              className="w-full"
            />

            <p className="mt-2 text-sm text-gray-500">
              {block.fontSize || 30}px
            </p>
          </div>

          <div>
            <label className="mb-2 block font-medium">Border Radius</label>

            <input
              type="range"
              min="0"
              max="40"
              value={block.radius || 20}
              onChange={(e) => updateField("radius", Number(e.target.value))}
              className="w-full"
            />

            <p className="mt-2 text-sm text-gray-500">{block.radius || 20}px</p>
          </div>
        </div>
      </div>

      {/* =====================================
          Live Preview
      ===================================== */}

      <div className="rounded-2xl border bg-white shadow-sm">
        <div className="border-b bg-gray-50 px-6 py-4">
          <h3 className="text-lg font-semibold">Live Preview</h3>

          <p className="text-sm text-gray-500">
            Preview how your quote section will appear on the website.
          </p>
        </div>

        <div className="p-8">
          <div
            className={`mx-auto max-w-4xl p-10 shadow-lg ${
              block.align === "left"
                ? "text-left"
                : block.align === "right"
                  ? "text-right"
                  : "text-center"
            } ${
              block.background === "dark"
                ? "bg-gray-900 text-white"
                : block.background === "light"
                  ? "bg-gray-100"
                  : block.background === "blue"
                    ? "bg-blue-50"
                    : "bg-white"
            }`}
            style={{
              borderRadius: `${block.radius || 20}px`,
            }}
          >
            {block.showIcon !== false && (
              <Quote
                size={64}
                className="mx-auto mb-6 text-blue-600 opacity-30"
              />
            )}

            <blockquote
              style={{
                color: block.textColor || "#111827",
                fontSize: `${block.fontSize || 30}px`,
              }}
              className="leading-relaxed italic"
            >
              {block.quote || "Your inspirational quote will appear here..."}
            </blockquote>

            {(block.author ||
              authorImage ||
              block.company ||
              block.designation) && (
              <div className="mt-10 flex flex-col items-center">
                {block.showImage !== false && authorImage && (
                  <img
                    src={authorImage.url}
                    alt={block.author}
                    className="mb-4 h-20 w-20 rounded-full object-cover shadow-lg"
                  />
                )}

                {block.author && (
                  <h4 className="text-xl font-bold">{block.author}</h4>
                )}

                {block.showDesignation !== false && block.designation && (
                  <p className="text-gray-500">{block.designation}</p>
                )}

                {block.showCompany !== false && block.company && (
                  <p className="mt-1 text-sm font-medium text-blue-600">
                    {block.company}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* =====================================
          Statistics
      ===================================== */}

      <div className="rounded-2xl border bg-gray-50 p-6">
        <h3 className="mb-6 text-lg font-semibold">Quote Statistics</h3>

        <div className="grid gap-6 md:grid-cols-4">
          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">Quote Length</p>

            <h2 className="mt-2 text-3xl font-bold text-blue-600">
              {(block.quote || "").length}
            </h2>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">Words</p>

            <h2 className="mt-2 text-3xl font-bold text-green-600">
              {(block.quote || "").trim().split(/\s+/).filter(Boolean).length}
            </h2>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">Author</p>

            <h2 className="mt-2 text-xl font-bold text-purple-600">
              {block.author || "Unknown"}
            </h2>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">Style</p>

            <h2 className="mt-2 text-xl font-bold text-orange-600 capitalize">
              {block.style || "Modern"}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteBlock;
