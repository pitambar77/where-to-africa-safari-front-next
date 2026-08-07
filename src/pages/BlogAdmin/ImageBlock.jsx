"use client";

import { useState } from "react";
import axios from "axios";

import { Image, Upload, Loader2 } from "lucide-react";

const ImageBlock = ({ block = {},
  onChange = () => {}, }) => {
  const [uploading, setUploading] = useState(false);

  const image = block.media?.[0];

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
        media: [data.media],
      });
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const updateImage = (field, value) => {
    onChange({
      media: [
        {
          ...image,
          [field]: value,
        },
      ],
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}

      <div>
        <h3 className="text-lg font-semibold">Image Block</h3>

        <p className="text-sm text-gray-500">
          Upload a single image with title and caption.
        </p>
      </div>

      {/* Title */}

      <div>
        <label className="mb-2 block font-medium">Image Title</label>

        <input
          type="text"
          value={block.title || ""}
          onChange={(e) =>
            onChange({
              title: e.target.value,
            })
          }
          placeholder="Image title"
          className="w-full rounded-xl border p-3 focus:border-blue-500 outline-none"
        />
      </div>

      {/* ======================================
          Upload Image
      ====================================== */}

      <div>
        <label className="mb-3 block font-medium">Image</label>

        {!image ? (
          <label className="flex h-72 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 transition hover:border-blue-500 hover:bg-blue-50">
            {uploading ? (
              <>
                <Loader2
                  size={42}
                  className="mb-4 animate-spin text-blue-600"
                />

                <p className="font-medium">Uploading...</p>
              </>
            ) : (
              <>
                <Upload size={46} className="mb-4 text-blue-600" />

                <h4 className="text-lg font-semibold">Upload Image</h4>

                <p className="mt-2 text-sm text-gray-500">PNG • JPG • WEBP</p>
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
              src={image.url}
              alt={image.alt}
              className="h-96 w-full object-cover"
            />
          </div>
        )}
      </div>

      {/* ======================================
          Replace / Remove
      ====================================== */}

      {image && (
        <div className="flex gap-3">
          <label className="cursor-pointer rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700">
            Replace Image
            <input
              hidden
              type="file"
              accept="image/*"
              onChange={(e) => uploadImage(e.target.files[0])}
            />
          </label>

          <button
            type="button"
            onClick={() =>
              onChange({
                media: [],
              })
            }
            className="rounded-xl border border-red-300 px-5 py-3 font-medium text-red-600 transition hover:bg-red-50"
          >
            Remove
          </button>
        </div>
      )}

      {/* ======================================
          Alt Text
      ====================================== */}

      {image && (
        <div>
          <label className="mb-2 block font-medium">Alt Text</label>

          <input
            type="text"
            value={image.alt || ""}
            onChange={(e) => updateImage("alt", e.target.value)}
            placeholder="Describe this image"
            className="w-full rounded-xl border p-3 outline-none focus:border-blue-500"
          />
        </div>
      )}

      {/* ======================================
          Caption
      ====================================== */}

      {image && (
        <div>
          <label className="mb-2 block font-medium">Caption</label>

          <textarea
            rows={3}
            value={image.caption || ""}
            onChange={(e) => updateImage("caption", e.target.value)}
            placeholder="Image caption..."
            className="w-full rounded-xl border p-3 outline-none focus:border-blue-500"
          />
        </div>
      )}

      {/* ======================================
          Live Preview
      ====================================== */}

      <div className="rounded-2xl border bg-white shadow-sm">
        <div className="border-b bg-gray-50 px-6 py-4">
          <h3 className="text-lg font-semibold">Live Preview</h3>

          <p className="text-sm text-gray-500">
            Preview how this image block will appear on your website.
          </p>
        </div>

        <div className="space-y-6 p-8">
          {block.title && (
            <h2 className="text-center text-3xl font-bold text-gray-900">
              {block.title}
            </h2>
          )}

          {image ? (
            <figure>
              <img
                src={image.url}
                alt={image.alt || block.title}
                className="h-auto max-h-[600px] w-full rounded-2xl object-cover shadow-lg"
              />

              {(image.caption || image.alt) && (
                <figcaption className="mt-4 text-center text-sm text-gray-500">
                  {image.caption || image.alt}
                </figcaption>
              )}
            </figure>
          ) : (
            <div className="flex h-80 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50">
              <Image size={60} className="mb-4 text-gray-400" />

              <p className="text-gray-500">
                Upload an image to preview it here.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ======================================
          Image Information
      ====================================== */}

      {image && (
        <div className="rounded-2xl border bg-gray-50 p-6">
          <h3 className="mb-5 text-lg font-semibold">Image Details</h3>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500">
                Public ID
              </p>

              <p className="mt-1 break-all text-sm font-medium">
                {image.publicId}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500">
                Media Type
              </p>

              <p className="mt-1 text-sm font-medium capitalize">
                {image.type}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500">
                Alt Text Length
              </p>

              <p className="mt-1 text-sm font-medium">
                {(image.alt || "").length} Characters
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500">
                Caption Length
              </p>

              <p className="mt-1 text-sm font-medium">
                {(image.caption || "").length} Characters
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageBlock;
