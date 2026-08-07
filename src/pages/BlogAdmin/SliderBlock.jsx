"use client";

import { useState } from "react";
import axios from "axios";

import { Upload, Loader2, Trash2, Images, Plus } from "lucide-react";

const SliderBlock = ({ block, onChange }) => {
  const [uploading, setUploading] = useState(false);

  const slides = block.media || [];

  /* =====================================
      Upload Slide
  ===================================== */

  const uploadSlide = async (file) => {
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
        media: [
          ...slides,
          {
            ...data.media,
            title: "",
            subtitle: "",
            buttonText: "",
            buttonUrl: "",
          },
        ],
      });
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  /* =====================================
      Remove Slide
  ===================================== */

  const removeSlide = (index) => {
    const updated = [...slides];

    updated.splice(index, 1);

    onChange({
      media: updated,
    });
  };

  /* =====================================
      Update Slide
  ===================================== */

  const updateSlide = (index, field, value) => {
    const updated = [...slides];

    updated[index][field] = value;

    onChange({
      media: updated,
    });
  };

  /* =====================================
      Update Block
  ===================================== */

  const updateBlock = (field, value) => {
    onChange({
      [field]: value,
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex items-center gap-4">
        <div className="rounded-xl bg-blue-100 p-4">
          <Images size={28} className="text-blue-600" />
        </div>

        <div>
          <h2 className="text-xl font-bold">Slider Block</h2>

          <p className="text-gray-500">Create a responsive image slider.</p>
        </div>
      </div>

      {/* Title */}

      <div>
        <label className="mb-2 block font-medium">Slider Title</label>

        <input
          type="text"
          value={block.title || ""}
          onChange={(e) => updateBlock("title", e.target.value)}
          className="w-full rounded-xl border p-3"
          placeholder="Amazing Safari Moments"
        />
      </div>

      {/* Subtitle */}

      <div>
        <label className="mb-2 block font-medium">Slider Subtitle</label>

        <input
          type="text"
          value={block.subtitle || ""}
          onChange={(e) => updateBlock("subtitle", e.target.value)}
          className="w-full rounded-xl border p-3"
          placeholder="Discover Africa"
        />
      </div>
      {/* =====================================
          Upload Slides
      ===================================== */}

      <div>
        <label className="mb-3 block font-medium">Slider Images</label>

        <label className="flex h-56 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 transition hover:border-blue-500 hover:bg-blue-50">
          {uploading ? (
            <>
              <Loader2 size={42} className="mb-4 animate-spin text-blue-600" />

              <h4 className="font-semibold">Uploading Slides...</h4>
            </>
          ) : (
            <>
              <Upload size={46} className="mb-4 text-blue-600" />

              <h4 className="text-lg font-semibold">Upload Slider Images</h4>

              <p className="mt-2 text-sm text-gray-500">
                Select one or multiple images
              </p>
            </>
          )}

          <input
            hidden
            multiple
            type="file"
            accept="image/*"
            onChange={async (e) => {
              const files = Array.from(e.target.files);

              for (const file of files) {
                await uploadSlide(file);
              }
            }}
          />
        </label>
      </div>

      {/* =====================================
          Slides
      ===================================== */}

      {slides.length > 0 && (
        <div className="space-y-8">
          <h3 className="text-xl font-semibold">
            Slider Slides ({slides.length})
          </h3>

          {slides.map((slide, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border bg-white shadow-sm"
            >
              {/* Image */}

              <img
                src={slide.url}
                alt={slide.alt}
                className="h-72 w-full object-cover"
              />

              <div className="space-y-5 p-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold">Slide {index + 1}</h4>

                  <button
                    type="button"
                    onClick={() => removeSlide(index)}
                    className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2 text-red-600 transition hover:bg-red-100"
                  >
                    <Trash2 size={18} />
                    Remove
                  </button>
                </div>

                {/* Slide Title */}

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Slide Title
                  </label>

                  <input
                    type="text"
                    value={slide.title || ""}
                    onChange={(e) =>
                      updateSlide(index, "title", e.target.value)
                    }
                    className="w-full rounded-xl border p-3"
                    placeholder="Amazing Safari"
                  />
                </div>

                {/* Slide Subtitle */}

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Slide Subtitle
                  </label>

                  <input
                    type="text"
                    value={slide.subtitle || ""}
                    onChange={(e) =>
                      updateSlide(index, "subtitle", e.target.value)
                    }
                    className="w-full rounded-xl border p-3"
                    placeholder="Explore Africa"
                  />
                </div>

                {/* Button */}

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Button Text
                    </label>

                    <input
                      type="text"
                      value={slide.buttonText || ""}
                      onChange={(e) =>
                        updateSlide(index, "buttonText", e.target.value)
                      }
                      className="w-full rounded-xl border p-3"
                      placeholder="Read More"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Button URL
                    </label>

                    <input
                      type="text"
                      value={slide.buttonUrl || ""}
                      onChange={(e) =>
                        updateSlide(index, "buttonUrl", e.target.value)
                      }
                      className="w-full rounded-xl border p-3"
                      placeholder="/blog/safari"
                    />
                  </div>
                </div>

                {/* SEO */}

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Alt Text
                    </label>

                    <input
                      type="text"
                      value={slide.alt || ""}
                      onChange={(e) =>
                        updateSlide(index, "alt", e.target.value)
                      }
                      className="w-full rounded-xl border p-3"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Caption
                    </label>

                    <input
                      type="text"
                      value={slide.caption || ""}
                      onChange={(e) =>
                        updateSlide(index, "caption", e.target.value)
                      }
                      className="w-full rounded-xl border p-3"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* =====================================
          Slider Settings
      ===================================== */}

      <div className="rounded-2xl border bg-white shadow-sm">
        <div className="border-b px-6 py-4">
          <h3 className="text-lg font-semibold">Slider Settings</h3>

          <p className="text-sm text-gray-500">
            Configure how your slider behaves on the website.
          </p>
        </div>

        <div className="grid gap-8 p-6 lg:grid-cols-2">
          {/* Auto Play */}

          <div className="flex items-center justify-between rounded-xl border p-4">
            <div>
              <h4 className="font-semibold">Auto Play</h4>

              <p className="text-sm text-gray-500">
                Automatically move to the next slide.
              </p>
            </div>

            <input
              type="checkbox"
              checked={block.autoplay || false}
              onChange={(e) => updateBlock("autoplay", e.target.checked)}
              className="h-5 w-5"
            />
          </div>

          {/* Loop */}

          <div className="flex items-center justify-between rounded-xl border p-4">
            <div>
              <h4 className="font-semibold">Infinite Loop</h4>

              <p className="text-sm text-gray-500">
                Restart after the last slide.
              </p>
            </div>

            <input
              type="checkbox"
              checked={block.loop || false}
              onChange={(e) => updateBlock("loop", e.target.checked)}
              className="h-5 w-5"
            />
          </div>

          {/* Navigation */}

          <div className="flex items-center justify-between rounded-xl border p-4">
            <div>
              <h4 className="font-semibold">Navigation Arrows</h4>

              <p className="text-sm text-gray-500">
                Display previous and next buttons.
              </p>
            </div>

            <input
              type="checkbox"
              checked={block.navigation ?? true}
              onChange={(e) => updateBlock("navigation", e.target.checked)}
              className="h-5 w-5"
            />
          </div>

          {/* Pagination */}

          <div className="flex items-center justify-between rounded-xl border p-4">
            <div>
              <h4 className="font-semibold">Pagination Dots</h4>

              <p className="text-sm text-gray-500">Show slide indicators.</p>
            </div>

            <input
              type="checkbox"
              checked={block.pagination ?? true}
              onChange={(e) => updateBlock("pagination", e.target.checked)}
              className="h-5 w-5"
            />
          </div>
        </div>
      </div>

      {/* =====================================
          Speed Settings
      ===================================== */}

      <div className="rounded-2xl border bg-white shadow-sm">
        <div className="border-b px-6 py-4">
          <h3 className="text-lg font-semibold">Animation Settings</h3>
        </div>

        <div className="grid gap-6 p-6 md:grid-cols-2">
          {/* Delay */}

          <div>
            <label className="mb-2 block font-medium">
              Autoplay Delay (ms)
            </label>

            <input
              type="number"
              min={1000}
              step={500}
              value={block.delay || 3000}
              onChange={(e) => updateBlock("delay", Number(e.target.value))}
              className="w-full rounded-xl border p-3"
            />

            <p className="mt-2 text-sm text-gray-500">
              Example: 3000 = 3 seconds
            </p>
          </div>

          {/* Speed */}

          <div>
            <label className="mb-2 block font-medium">
              Transition Speed (ms)
            </label>

            <input
              type="number"
              min={200}
              step={100}
              value={block.speed || 600}
              onChange={(e) => updateBlock("speed", Number(e.target.value))}
              className="w-full rounded-xl border p-3"
            />

            <p className="mt-2 text-sm text-gray-500">
              Example: 600 = smooth transition
            </p>
          </div>
        </div>
      </div>

      {/* =====================================
          Responsive Slides
      ===================================== */}

      <div className="rounded-2xl border bg-white shadow-sm">
        <div className="border-b px-6 py-4">
          <h3 className="text-lg font-semibold">Responsive Layout</h3>
        </div>

        <div className="grid gap-6 p-6 md:grid-cols-3">
          <div>
            <label className="mb-2 block font-medium">Desktop</label>

            <input
              type="number"
              min={1}
              max={6}
              value={block.desktop || 1}
              onChange={(e) => updateBlock("desktop", Number(e.target.value))}
              className="w-full rounded-xl border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Tablet</label>

            <input
              type="number"
              min={1}
              max={4}
              value={block.tablet || 1}
              onChange={(e) => updateBlock("tablet", Number(e.target.value))}
              className="w-full rounded-xl border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Mobile</label>

            <input
              type="number"
              min={1}
              max={2}
              value={block.mobile || 1}
              onChange={(e) => updateBlock("mobile", Number(e.target.value))}
              className="w-full rounded-xl border p-3"
            />
          </div>
        </div>
      </div>
      {/* =====================================
          Live Preview
      ===================================== */}

      <div className="rounded-2xl border bg-white shadow-sm">
        <div className="border-b bg-gray-50 px-6 py-4">
          <h3 className="text-lg font-semibold">Live Slider Preview</h3>

          <p className="text-sm text-gray-500">
            Preview how your slider will appear on the website.
          </p>
        </div>

        <div className="p-8">
          {block.title && (
            <div className="mb-10 text-center">
              <h2 className="text-4xl font-bold">{block.title}</h2>

              {block.subtitle && (
                <p className="mt-3 text-lg text-gray-500">{block.subtitle}</p>
              )}
            </div>
          )}

          {slides.length === 0 ? (
            <div className="flex h-80 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50">
              <Images size={60} className="mb-4 text-gray-400" />

              <h3 className="text-xl font-semibold">Slider Preview</h3>

              <p className="mt-2 text-gray-500">
                Upload slides to preview your slider.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Featured Slide */}

              <div className="relative overflow-hidden rounded-3xl shadow-xl">
                <img
                  src={slides[0].url}
                  alt={slides[0].alt}
                  className="h-[450px] w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                <div className="absolute bottom-10 left-10 max-w-xl text-white">
                  {slides[0].subtitle && (
                    <p className="mb-3 text-lg">{slides[0].subtitle}</p>
                  )}

                  <h2 className="mb-4 text-5xl font-bold">
                    {slides[0].title || "Slide Title"}
                  </h2>

                  {slides[0].buttonText && (
                    <button className="rounded-xl bg-white px-6 py-3 font-semibold text-black">
                      {slides[0].buttonText}
                    </button>
                  )}
                </div>
              </div>

              {/* Thumbnails */}

              <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
                {slides.map((slide, index) => (
                  <div
                    key={index}
                    className="overflow-hidden rounded-xl border bg-white shadow"
                  >
                    <img
                      src={slide.url}
                      alt={slide.alt}
                      className="h-32 w-full object-cover"
                    />

                    <div className="p-3">
                      <h4 className="truncate font-semibold">
                        {slide.title || `Slide ${index + 1}`}
                      </h4>

                      <p className="mt-1 truncate text-sm text-gray-500">
                        {slide.subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* =====================================
          Statistics
      ===================================== */}

      <div className="rounded-2xl border bg-gray-50 p-6">
        <h3 className="mb-6 text-lg font-semibold">Slider Statistics</h3>

        <div className="grid gap-6 md:grid-cols-4">
          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">Total Slides</p>

            <h2 className="mt-2 text-3xl font-bold text-blue-600">
              {slides.length}
            </h2>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">Auto Play</p>

            <h2 className="mt-2 text-3xl font-bold text-green-600">
              {block.autoplay ? "ON" : "OFF"}
            </h2>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">Loop</p>

            <h2 className="mt-2 text-3xl font-bold text-purple-600">
              {block.loop ? "YES" : "NO"}
            </h2>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">Speed</p>

            <h2 className="mt-2 text-3xl font-bold text-orange-600">
              {block.speed || 600}ms
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderBlock;
