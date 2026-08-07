"use client";

import { useState } from "react";
import axios from "axios";

import {
  Image,
  Upload,
  Loader2,
  LayoutPanelLeft,
  LayoutPanelTop,
} from "lucide-react";

const TextImageBlock = ({ block = {},
  onChange = () => {}, }) => {
  const [uploading, setUploading] = useState(false);

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

  /* ----------------------------------
     Update Field
  ---------------------------------- */

  const updateField = (name, value) => {
    onChange({
      [name]: value,
    });
  };

  const image = block.media?.[0];

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Text + Image Block</h3>

          <p className="text-sm text-gray-500">
            Add a title, description and image.
          </p>
        </div>

        {/* Layout */}

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => updateField("layout", "left")}
            className={`rounded-xl border p-3 transition ${
              block.layout === "left" ? "bg-blue-600 text-white" : "bg-white"
            }`}
          >
            <LayoutPanelLeft size={20} />
          </button>

          <button
            type="button"
            onClick={() => updateField("layout", "right")}
            className={`rounded-xl border p-3 transition ${
              block.layout === "right" ? "bg-blue-600 text-white" : "bg-white"
            }`}
          >
            <LayoutPanelTop size={20} />
          </button>
        </div>
      </div>

      {/* Title */}

      <div>
        <label className="mb-2 block font-medium">Title</label>

        <input
          type="text"
          value={block.title || ""}
          onChange={(e) => updateField("title", e.target.value)}
          className="w-full rounded-xl border p-3 outline-none focus:border-blue-500"
          placeholder="Enter section title"
        />
      </div>

      {/* Subtitle */}

      <div>
        <label className="mb-2 block font-medium">Subtitle</label>

        <input
          type="text"
          value={block.subtitle || ""}
          onChange={(e) => updateField("subtitle", e.target.value)}
          className="w-full rounded-xl border p-3 outline-none focus:border-blue-500"
          placeholder="Enter subtitle"
        />
      </div>
      {/* ======================================
          Description
      ====================================== */}

      <div>
        <label className="mb-2 block font-medium">Description</label>

        <textarea
          rows={8}
          value={block.content || ""}
          onChange={(e) => updateField("content", e.target.value)}
          placeholder="Write your content here..."
          className="w-full rounded-xl border p-4 outline-none transition focus:border-blue-500"
        />
      </div>

      {/* ======================================
          Image Upload
      ====================================== */}

      <div>
        <label className="mb-3 block font-medium">Image</label>

        {!image ? (
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-10 transition hover:border-blue-500 hover:bg-blue-50">
            {uploading ? (
              <>
                <Loader2
                  size={40}
                  className="mb-4 animate-spin text-blue-600"
                />

                <p className="font-medium">Uploading...</p>
              </>
            ) : (
              <>
                <Upload size={42} className="mb-4 text-blue-600" />

                <h4 className="text-lg font-semibold">Upload Image</h4>

                <p className="mt-2 text-sm text-gray-500">PNG, JPG or WEBP</p>
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
            <img src={image.url} alt="" className="h-80 w-full object-cover" />
          </div>
        )}
      </div>

      {/* ======================================
          Alt Text
      ====================================== */}

      {image && (
        <div>
          <label className="mb-2 block font-medium">Alt Text</label>

          <input
            type="text"
            value={image.alt || ""}
            onChange={(e) =>
              onChange({
                media: [
                  {
                    ...image,
                    alt: e.target.value,
                  },
                ],
              })
            }
            className="w-full rounded-xl border p-3 outline-none focus:border-blue-500"
            placeholder="Describe the image..."
          />
        </div>
      )}

      {/* ======================================
          Caption
      ====================================== */}

      {image && (
        <div>
          <label className="mb-2 block font-medium">Caption</label>

          <input
            type="text"
            value={image.caption || ""}
            onChange={(e) =>
              onChange({
                media: [
                  {
                    ...image,
                    caption: e.target.value,
                  },
                ],
              })
            }
            className="w-full rounded-xl border p-3 outline-none focus:border-blue-500"
            placeholder="Image caption..."
          />
        </div>
      )}
      {/* ======================================
          Image Actions
      ====================================== */}

      {image && (
        <div className="flex gap-3">
          {/* Replace */}

          <label className="cursor-pointer rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700">
            Replace Image
            <input
              hidden
              type="file"
              accept="image/*"
              onChange={(e) => uploadImage(e.target.files[0])}
            />
          </label>

          {/* Remove */}

          <button
            type="button"
            onClick={() =>
              onChange({
                media: [],
              })
            }
            className="rounded-xl border border-red-300 px-5 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
          >
            Remove Image
          </button>
        </div>
      )}

      {/* ======================================
          Live Preview
      ====================================== */}

      <div className="rounded-2xl border bg-white shadow-sm">
        <div className="border-b bg-gray-50 px-6 py-4">
          <h3 className="text-lg font-semibold">Live Preview</h3>

          <p className="text-sm text-gray-500">
            This is how the section will appear on your website.
          </p>
        </div>

        <div
          className={`grid gap-10 p-8 lg:grid-cols-2 ${
            block.layout === "left"
              ? ""
              : "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1"
          }`}
        >
          {/* Image */}

          <div>
            {image ? (
              <img
                src={image.url}
                alt={image.alt}
                className="h-80 w-full rounded-2xl object-cover shadow"
              />
            ) : (
              <div className="flex h-80 items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50">
                <div className="text-center">
                  <Image size={60} className="mx-auto mb-4 text-gray-400" />

                  <p className="text-gray-500">No Image Selected</p>
                </div>
              </div>
            )}
          </div>

          {/* Text */}

          <div className="flex flex-col justify-center">
            {block.subtitle && (
              <p className="mb-2 font-medium uppercase tracking-wider text-blue-600">
                {block.subtitle}
              </p>
            )}

            <h2 className="mb-5 text-4xl font-bold text-gray-900">
              {block.title || "Section Title"}
            </h2>

            <div className="leading-8 text-gray-600 whitespace-pre-wrap">
              {block.content || "Your content will appear here..."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextImageBlock;
