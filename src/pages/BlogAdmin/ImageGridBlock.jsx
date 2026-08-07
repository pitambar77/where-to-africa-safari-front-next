"use client";

import { useState } from "react";
import axios from "axios";

import { LayoutGrid, Upload, Loader2, Trash2, ImagePlus } from "lucide-react";

const ImageGridBlock = ({ block = {},
  onChange = () => {}, }) => {
  const [uploading, setUploading] = useState(false);

  const items = block.media || [];

  /* =====================================
      Upload Image
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
        media: [
          ...items,
          {
            ...data.media,
            title: "",
            description: "",
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
      Remove Image
  ===================================== */

  const removeImage = (index) => {
    const updated = [...items];

    updated.splice(index, 1);

    onChange({
      media: updated,
    });
  };

  /* =====================================
      Update Image
  ===================================== */

  const updateImage = (index, field, value) => {
    const updated = [...items];

    updated[index][field] = value;

    onChange({
      media: updated,
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex items-center gap-4">
        <div className="rounded-xl bg-blue-100 p-4">
          <LayoutGrid size={28} className="text-blue-600" />
        </div>

        <div>
          <h2 className="text-xl font-bold">Image Grid Block</h2>

          <p className="text-gray-500">Showcase images as beautiful cards.</p>
        </div>
      </div>

      {/* Section Title */}

      <div>
        <label className="mb-2 block font-medium">Section Title</label>

        <input
          type="text"
          value={block.title || ""}
          onChange={(e) =>
            onChange({
              title: e.target.value,
            })
          }
          className="w-full rounded-xl border p-3"
          placeholder="Image Grid Title"
        />
      </div>

      {/* Grid Columns */}

      <div>
        <label className="mb-2 block font-medium">Columns</label>

        <select
          value={block.columns || 3}
          onChange={(e) =>
            onChange({
              columns: Number(e.target.value),
            })
          }
          className="w-48 rounded-xl border p-3"
        >
          <option value={2}>2 Columns</option>

          <option value={3}>3 Columns</option>

          <option value={4}>4 Columns</option>
        </select>
      </div>

      {/* =====================================
          Upload Images
      ===================================== */}

      <div>
        <label className="mb-3 block font-medium">Grid Images</label>

        <label className="flex h-56 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 transition hover:border-blue-500 hover:bg-blue-50">
          {uploading ? (
            <>
              <Loader2 size={42} className="mb-4 animate-spin text-blue-600" />

              <h4 className="font-semibold">Uploading Images...</h4>
            </>
          ) : (
            <>
              <ImagePlus size={50} className="mb-4 text-blue-600" />

              <h4 className="text-lg font-semibold">Upload Images</h4>

              <p className="mt-2 text-sm text-gray-500">
                Select one or multiple images
              </p>
            </>
          )}

          <input
            hidden
            type="file"
            accept="image/*"
            multiple
            onChange={async (e) => {
              const files = Array.from(e.target.files);

              for (const file of files) {
                await uploadImage(file);
              }
            }}
          />
        </label>
      </div>

      {/* =====================================
          Grid Cards
      ===================================== */}

      {items.length > 0 && (
        <div>
          <h3 className="mb-6 text-lg font-semibold">
            Grid Items ({items.length})
          </h3>

          <div
            className={`grid gap-6 ${
              block.columns === 2
                ? "md:grid-cols-2"
                : block.columns === 4
                  ? "md:grid-cols-4"
                  : "md:grid-cols-3"
            }`}
          >
            {items.map((item, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border bg-white shadow-sm"
              >
                {/* Image */}

                <img
                  src={item.url}
                  alt={item.alt}
                  className="h-52 w-full object-cover"
                />

                {/* Card Content */}

                <div className="space-y-4 p-4">
                  {/* Title */}

                  <div>
                    <label className="mb-1 block text-sm font-medium">
                      Title
                    </label>

                    <input
                      type="text"
                      value={item.title || ""}
                      onChange={(e) =>
                        updateImage(index, "title", e.target.value)
                      }
                      placeholder="Card title"
                      className="w-full rounded-xl border p-3"
                    />
                  </div>

                  {/* Description */}

                  <div>
                    <label className="mb-1 block text-sm font-medium">
                      Description
                    </label>

                    <textarea
                      rows={3}
                      value={item.description || ""}
                      onChange={(e) =>
                        updateImage(index, "description", e.target.value)
                      }
                      placeholder="Short description"
                      className="w-full rounded-xl border p-3"
                    />
                  </div>

                  {/* Alt */}

                  <div>
                    <label className="mb-1 block text-sm font-medium">
                      Alt Text
                    </label>

                    <input
                      type="text"
                      value={item.alt || ""}
                      onChange={(e) =>
                        updateImage(index, "alt", e.target.value)
                      }
                      placeholder="SEO alt text"
                      className="w-full rounded-xl border p-3"
                    />
                  </div>

                  {/* Caption */}

                  <div>
                    <label className="mb-1 block text-sm font-medium">
                      Caption
                    </label>

                    <input
                      type="text"
                      value={item.caption || ""}
                      onChange={(e) =>
                        updateImage(index, "caption", e.target.value)
                      }
                      placeholder="Image caption"
                      className="w-full rounded-xl border p-3"
                    />
                  </div>

                  {/* Remove */}

                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-50 py-3 font-medium text-red-600 transition hover:bg-red-100"
                  >
                    <Trash2 size={18} />
                    Remove Card
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* =====================================
          Live Preview
      ===================================== */}

      <div className="rounded-2xl border bg-white shadow-sm">
        <div className="border-b bg-gray-50 px-6 py-4">
          <h3 className="text-lg font-semibold">Live Website Preview</h3>

          <p className="text-sm text-gray-500">
            Preview how the image grid will appear on your website.
          </p>
        </div>

        <div className="p-8">
          {block.title && (
            <h2 className="mb-10 text-center text-4xl font-bold text-gray-900">
              {block.title}
            </h2>
          )}

          {items.length === 0 ? (
            <div className="flex h-72 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50">
              <LayoutGrid size={60} className="mb-4 text-gray-400" />

              <h4 className="text-xl font-semibold">Image Grid Preview</h4>

              <p className="mt-2 text-gray-500">
                Upload images to see the preview.
              </p>
            </div>
          ) : (
            <div
              className={`grid gap-8 ${
                block.columns === 2
                  ? "grid-cols-1 md:grid-cols-2"
                  : block.columns === 4
                    ? "grid-cols-2 md:grid-cols-4"
                    : "grid-cols-1 md:grid-cols-3"
              }`}
            >
              {items.map((item, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-2xl bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
                >
                  <img
                    src={item.url}
                    alt={item.alt}
                    className="h-60 w-full object-cover"
                  />

                  <div className="space-y-3 p-6">
                    {item.title && (
                      <h3 className="text-xl font-bold text-gray-900">
                        {item.title}
                      </h3>
                    )}

                    {item.description && (
                      <p className="leading-7 text-gray-600">
                        {item.description}
                      </p>
                    )}

                    {item.caption && (
                      <div className="border-t pt-3">
                        <p className="text-sm italic text-gray-500">
                          {item.caption}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* =====================================
          Grid Statistics
      ===================================== */}

      <div className="rounded-2xl border bg-gray-50 p-6">
        <h3 className="mb-6 text-lg font-semibold">Grid Statistics</h3>

        <div className="grid gap-6 md:grid-cols-4">
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Total Cards</p>

            <h2 className="mt-2 text-3xl font-bold text-blue-600">
              {items.length}
            </h2>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Columns</p>

            <h2 className="mt-2 text-3xl font-bold text-green-600">
              {block.columns || 3}
            </h2>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Titles Added</p>

            <h2 className="mt-2 text-3xl font-bold text-purple-600">
              {items.filter((item) => item.title).length}
            </h2>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Descriptions</p>

            <h2 className="mt-2 text-3xl font-bold text-orange-600">
              {items.filter((item) => item.description).length}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGridBlock;
