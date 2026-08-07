"use client";

import { useState } from "react";
import axios from "axios";

import { Upload, Loader2, ImagePlus, Trash2, Images } from "lucide-react";

const GalleryBlock = ({ block, onChange }) => {
  const [uploading, setUploading] = useState(false);

  const images = block.media || [];

  /* ----------------------------------
      Upload Image
  ---------------------------------- */

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
        media: [...images, data.media],
      });
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  /* ----------------------------------
      Remove Image
  ---------------------------------- */

  const removeImage = (index) => {
    const updated = [...images];

    updated.splice(index, 1);

    onChange({
      media: updated,
    });
  };

  /* ----------------------------------
      Update Image
  ---------------------------------- */

  const updateImage = (index, field, value) => {
    const updated = [...images];

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
          <Images size={28} className="text-blue-600" />
        </div>

        <div>
          <h2 className="text-xl font-bold">Gallery Block</h2>

          <p className="text-gray-500">Create beautiful image galleries.</p>
        </div>
      </div>

      {/* Title */}

      <div>
        <label className="mb-2 block font-medium">Gallery Title</label>

        <input
          type="text"
          value={block.title || ""}
          onChange={(e) =>
            onChange({
              title: e.target.value,
            })
          }
          className="w-full rounded-xl border p-3"
          placeholder="Gallery title"
        />
      </div>

      {/* Columns */}

      <div>
        <label className="mb-2 block font-medium">Columns</label>

        <select
          value={block.columns || 3}
          onChange={(e) =>
            onChange({
              columns: Number(e.target.value),
            })
          }
          className="w-44 rounded-xl border p-3"
        >
          <option value={2}>2 Columns</option>
          <option value={3}>3 Columns</option>
          <option value={4}>4 Columns</option>
        </select>
      </div>
      {/* ======================================
          Upload Area
      ====================================== */}

      <div>
        <label className="mb-3 block font-medium">Gallery Images</label>

        <label className="flex h-56 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 transition hover:border-blue-500 hover:bg-blue-50">
          {uploading ? (
            <>
              <Loader2 size={42} className="mb-4 animate-spin text-blue-600" />

              <h4 className="font-semibold">Uploading...</h4>
            </>
          ) : (
            <>
              <ImagePlus size={48} className="mb-4 text-blue-600" />

              <h4 className="text-lg font-semibold">Upload Gallery Images</h4>

              <p className="mt-2 text-sm text-gray-500">
                Click here to upload images
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

      {/* ======================================
          Gallery Grid
      ====================================== */}

      {images.length > 0 && (
        <div>
          <h3 className="mb-5 text-lg font-semibold">
            Gallery Images ({images.length})
          </h3>

          <div
            className={`grid gap-5 ${
              block.columns === 2
                ? "md:grid-cols-2"
                : block.columns === 4
                  ? "md:grid-cols-4"
                  : "md:grid-cols-3"
            }`}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border bg-white shadow-sm"
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className="h-56 w-full object-cover"
                />

                <div className="space-y-4 p-4">
                  <input
                    type="text"
                    value={image.alt || ""}
                    placeholder="Alt text"
                    onChange={(e) => updateImage(index, "alt", e.target.value)}
                    className="w-full rounded-xl border p-3"
                  />

                  <textarea
                    rows={2}
                    value={image.caption || ""}
                    placeholder="Caption"
                    onChange={(e) =>
                      updateImage(index, "caption", e.target.value)
                    }
                    className="w-full rounded-xl border p-3"
                  />

                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-50 py-3 font-medium text-red-600 transition hover:bg-red-100"
                  >
                    <Trash2 size={18} />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================
          Live Preview
      ====================================== */}

      <div className="rounded-2xl border bg-white shadow-sm">
        <div className="border-b bg-gray-50 px-6 py-4">
          <h3 className="text-lg font-semibold">Live Gallery Preview</h3>

          <p className="text-sm text-gray-500">
            This is how the gallery will appear on your website.
          </p>
        </div>

        <div className="p-8">
          {block.title && (
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
              {block.title}
            </h2>
          )}

          {images.length === 0 ? (
            <div className="flex h-72 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50">
              <Images size={60} className="mb-4 text-gray-400" />

              <h4 className="text-lg font-semibold text-gray-700">
                Gallery Preview
              </h4>

              <p className="mt-2 text-gray-500">
                Upload images to preview your gallery.
              </p>
            </div>
          ) : (
            <div
              className={`grid gap-6 ${
                block.columns === 2
                  ? "grid-cols-1 md:grid-cols-2"
                  : block.columns === 4
                    ? "grid-cols-2 md:grid-cols-4"
                    : "grid-cols-1 md:grid-cols-3"
              }`}
            >
              {images.map((image, index) => (
                <figure
                  key={index}
                  className="overflow-hidden rounded-2xl bg-white shadow-lg transition hover:shadow-xl"
                >
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="h-64 w-full object-cover transition duration-500 hover:scale-105"
                  />

                  {(image.caption || image.alt) && (
                    <figcaption className="space-y-1 p-4">
                      {image.caption && (
                        <p className="font-medium text-gray-800">
                          {image.caption}
                        </p>
                      )}

                      {image.alt && (
                        <p className="text-sm text-gray-500">{image.alt}</p>
                      )}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ======================================
          Gallery Statistics
      ====================================== */}

      <div className="rounded-2xl border bg-gray-50 p-6">
        <h3 className="mb-5 text-lg font-semibold">Gallery Information</h3>

        <div className="grid gap-6 md:grid-cols-4">
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Total Images</p>

            <h3 className="mt-2 text-3xl font-bold text-blue-600">
              {images.length}
            </h3>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Columns</p>

            <h3 className="mt-2 text-3xl font-bold text-green-600">
              {block.columns || 3}
            </h3>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Images with Caption</p>

            <h3 className="mt-2 text-3xl font-bold text-purple-600">
              {images.filter((img) => img.caption).length}
            </h3>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Images with Alt</p>

            <h3 className="mt-2 text-3xl font-bold text-orange-600">
              {images.filter((img) => img.alt).length}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryBlock;
