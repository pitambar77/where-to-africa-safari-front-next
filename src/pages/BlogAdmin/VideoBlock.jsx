"use client";

import { useState } from "react";
import axios from "axios";

import {
  Video,
  Upload,
  Loader2,
  Trash2,
  PlayCircle,
  Link2,
} from "lucide-react";

const VideoBlock = ({ block = {}, onChange = () => {} }) => {
  const [uploading, setUploading] = useState(false);

  const video = block.media?.[0];

  /* =====================================
      Upload Video
  ===================================== */

  const uploadVideo = async (file) => {
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

  /* =====================================
      Upload Poster
  ===================================== */

  const uploadPoster = async (file) => {
    if (!file) return;

    try {
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
        poster: data.media.url,
      });
    } catch (error) {
      console.error(error);
    }
  };

  /* =====================================
      Update Block
  ===================================== */

  const updateField = (field, value) => {
    onChange({
      [field]: value,
    });
  };

  /* =====================================
      Update Video
  ===================================== */

  const updateVideo = (field, value) => {
    if (!video) return;

    onChange({
      media: [
        {
          ...video,
          [field]: value,
        },
      ],
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex items-center gap-4">
        <div className="rounded-xl bg-blue-100 p-4">
          <Video size={28} className="text-blue-600" />
        </div>

        <div>
          <h2 className="text-xl font-bold">Video Block</h2>

          <p className="text-gray-500">Upload videos or embed YouTube/Vimeo.</p>
        </div>
      </div>

      {/* Video Title */}

      <div>
        <label className="mb-2 block font-medium">Video Title</label>

        <input
          type="text"
          value={block.title || ""}
          onChange={(e) => updateField("title", e.target.value)}
          className="w-full rounded-xl border p-3"
          placeholder="Amazing Safari Experience"
        />
      </div>

      {/* Description */}

      <div>
        <label className="mb-2 block font-medium">Description</label>

        <textarea
          rows={4}
          value={block.description || ""}
          onChange={(e) => updateField("description", e.target.value)}
          className="w-full rounded-xl border p-3"
          placeholder="Write a short description..."
        />
      </div>
      {/* =====================================
          Upload Video
      ===================================== */}

      <div>
        <label className="mb-3 block font-medium">Upload Video</label>

        {!video ? (
          <label className="flex h-64 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 transition hover:border-blue-500 hover:bg-blue-50">
            {uploading ? (
              <>
                <Loader2
                  size={42}
                  className="mb-4 animate-spin text-blue-600"
                />

                <h4 className="font-semibold">Uploading Video...</h4>
              </>
            ) : (
              <>
                <Upload size={46} className="mb-4 text-blue-600" />

                <h4 className="text-lg font-semibold">Upload Video</h4>

                <p className="mt-2 text-sm text-gray-500">MP4 • MOV • WEBM</p>
              </>
            )}

            <input
              hidden
              type="file"
              accept="video/*"
              onChange={(e) => uploadVideo(e.target.files[0])}
            />
          </label>
        ) : (
          <div className="overflow-hidden rounded-2xl border">
            <video
              controls
              className="w-full"
              src={video.url}
              poster={block.poster}
            />
          </div>
        )}
      </div>

      {/* =====================================
          Video Actions
      ===================================== */}

      {video && (
        <div className="flex gap-3">
          <label className="cursor-pointer rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700">
            Replace Video
            <input
              hidden
              type="file"
              accept="video/*"
              onChange={(e) => uploadVideo(e.target.files[0])}
            />
          </label>

          <button
            type="button"
            onClick={() =>
              onChange({
                media: [],
              })
            }
            className="flex items-center gap-2 rounded-xl border border-red-300 px-5 py-3 text-red-600 transition hover:bg-red-50"
          >
            <Trash2 size={18} />
            Remove
          </button>
        </div>
      )}

      {/* =====================================
          YouTube URL
      ===================================== */}

      <div>
        <label className="mb-2 flex items-center gap-2 font-medium">
          <PlayCircle size={18} />
          YouTube URL
        </label>

        <input
          type="text"
          value={block.youtubeUrl || ""}
          onChange={(e) => updateField("youtubeUrl", e.target.value)}
          placeholder="https://www.youtube.com/watch?v=..."
          className="w-full rounded-xl border p-3"
        />
      </div>

      {/* =====================================
          Vimeo URL
      ===================================== */}

      <div>
        <label className="mb-2 flex items-center gap-2 font-medium">
          <Link2 size={18} />
          Vimeo URL
        </label>

        <input
          type="text"
          value={block.vimeoUrl || ""}
          onChange={(e) => updateField("vimeoUrl", e.target.value)}
          placeholder="https://vimeo.com/123456"
          className="w-full rounded-xl border p-3"
        />
      </div>

      {/* =====================================
          Poster Image
      ===================================== */}

      <div>
        <label className="mb-3 block font-medium">Poster Image</label>

        {block.poster ? (
          <div className="overflow-hidden rounded-2xl border">
            <img
              src={block.poster}
              alt=""
              className="h-60 w-full object-cover"
            />
          </div>
        ) : (
          <label className="flex h-48 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 transition hover:border-blue-500 hover:bg-blue-50">
            <Upload size={36} className="mb-3 text-blue-600" />

            <p className="font-medium">Upload Poster Image</p>

            <input
              hidden
              type="file"
              accept="image/*"
              onChange={(e) => uploadPoster(e.target.files[0])}
            />
          </label>
        )}
      </div>

      {/* =====================================
          SEO Fields
      ===================================== */}

      {video && (
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block font-medium">Alt Text</label>

            <input
              type="text"
              value={video.alt || ""}
              onChange={(e) => updateVideo("alt", e.target.value)}
              className="w-full rounded-xl border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Caption</label>

            <input
              type="text"
              value={video.caption || ""}
              onChange={(e) => updateVideo("caption", e.target.value)}
              className="w-full rounded-xl border p-3"
            />
          </div>
        </div>
      )}

      {/* =====================================
          Playback Settings
      ===================================== */}

      <div className="rounded-2xl border bg-white shadow-sm">
        <div className="border-b px-6 py-4">
          <h3 className="text-lg font-semibold">Playback Settings</h3>

          <p className="text-sm text-gray-500">
            Configure how the video behaves on your website.
          </p>
        </div>

        <div className="grid gap-6 p-6 lg:grid-cols-2">
          {/* Controls */}

          <div className="flex items-center justify-between rounded-xl border p-4">
            <div>
              <h4 className="font-semibold">Show Controls</h4>

              <p className="text-sm text-gray-500">
                Display play, pause and seek controls.
              </p>
            </div>

            <input
              type="checkbox"
              checked={block.controls ?? true}
              onChange={(e) => updateField("controls", e.target.checked)}
              className="h-5 w-5"
            />
          </div>

          {/* Autoplay */}

          <div className="flex items-center justify-between rounded-xl border p-4">
            <div>
              <h4 className="font-semibold">Autoplay</h4>

              <p className="text-sm text-gray-500">
                Play automatically after page loads.
              </p>
            </div>

            <input
              type="checkbox"
              checked={block.autoplay || false}
              onChange={(e) => updateField("autoplay", e.target.checked)}
              className="h-5 w-5"
            />
          </div>

          {/* Loop */}

          <div className="flex items-center justify-between rounded-xl border p-4">
            <div>
              <h4 className="font-semibold">Loop Video</h4>

              <p className="text-sm text-gray-500">
                Restart automatically when finished.
              </p>
            </div>

            <input
              type="checkbox"
              checked={block.loop || false}
              onChange={(e) => updateField("loop", e.target.checked)}
              className="h-5 w-5"
            />
          </div>

          {/* Muted */}

          <div className="flex items-center justify-between rounded-xl border p-4">
            <div>
              <h4 className="font-semibold">Muted</h4>

              <p className="text-sm text-gray-500">
                Start video without sound.
              </p>
            </div>

            <input
              type="checkbox"
              checked={block.muted || false}
              onChange={(e) => updateField("muted", e.target.checked)}
              className="h-5 w-5"
            />
          </div>
        </div>
      </div>

      {/* =====================================
          Advanced Options
      ===================================== */}

      <div className="rounded-2xl border bg-white shadow-sm">
        <div className="border-b px-6 py-4">
          <h3 className="text-lg font-semibold">Advanced Options</h3>
        </div>

        <div className="grid gap-6 p-6 md:grid-cols-2">
          {/* Width */}

          <div>
            <label className="mb-2 block font-medium">Width</label>

            <select
              value={block.width || "100%"}
              onChange={(e) => updateField("width", e.target.value)}
              className="w-full rounded-xl border p-3"
            >
              <option value="100%">Full Width</option>

              <option value="75%">75%</option>

              <option value="50%">50%</option>
            </select>
          </div>

          {/* Aspect Ratio */}

          <div>
            <label className="mb-2 block font-medium">Aspect Ratio</label>

            <select
              value={block.aspectRatio || "16/9"}
              onChange={(e) => updateField("aspectRatio", e.target.value)}
              className="w-full rounded-xl border p-3"
            >
              <option value="16/9">16 : 9</option>

              <option value="4/3">4 : 3</option>

              <option value="1/1">Square</option>
            </select>
          </div>

          {/* Start Time */}

          <div>
            <label className="mb-2 block font-medium">
              Start Time (Seconds)
            </label>

            <input
              type="number"
              min={0}
              value={block.startAt || 0}
              onChange={(e) => updateField("startAt", Number(e.target.value))}
              className="w-full rounded-xl border p-3"
            />
          </div>

          {/* End Time */}

          <div>
            <label className="mb-2 block font-medium">
              End Time (Optional)
            </label>

            <input
              type="number"
              min={0}
              value={block.endAt || ""}
              onChange={(e) => updateField("endAt", Number(e.target.value))}
              className="w-full rounded-xl border p-3"
              placeholder="Leave empty"
            />
          </div>
        </div>
      </div>

      {/* =====================================
          Thumbnail Information
      ===================================== */}

      {block.poster && (
        <div className="rounded-2xl border bg-gray-50 p-6">
          <h3 className="mb-4 text-lg font-semibold">Poster Preview</h3>

          <img
            src={block.poster}
            alt="Poster"
            className="h-56 w-full rounded-xl object-cover shadow"
          />
        </div>
      )}

      {/* =====================================
          Live Preview
      ===================================== */}

      <div className="rounded-2xl border bg-white shadow-sm">
        <div className="border-b bg-gray-50 px-6 py-4">
          <h3 className="text-lg font-semibold">Live Preview</h3>

          <p className="text-sm text-gray-500">
            Preview how this video section will appear on your website.
          </p>
        </div>

        <div className="p-8">
          {block.title && (
            <div className="mb-8 text-center">
              <h2 className="text-4xl font-bold">{block.title}</h2>

              {block.description && (
                <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-gray-600">
                  {block.description}
                </p>
              )}
            </div>
          )}

          {/* Uploaded Video */}

          {video && (
            <video
              className="mx-auto rounded-2xl shadow-xl"
              style={{ width: block.width || "100%" }}
              controls={block.controls ?? true}
              autoPlay={block.autoplay}
              muted={block.muted}
              loop={block.loop}
              poster={block.poster}
              src={video.url}
            />
          )}

          {/* YouTube */}

          {!video && block.youtubeUrl && (
            <div className="overflow-hidden rounded-2xl shadow-xl">
              <iframe
                className="aspect-video w-full"
                src={block.youtubeUrl
                  .replace("watch?v=", "embed/")
                  .replace("youtu.be/", "youtube.com/embed/")}
                title="YouTube Video"
                allowFullScreen
              />
            </div>
          )}

          {/* Vimeo */}

          {!video && !block.youtubeUrl && block.vimeoUrl && (
            <div className="overflow-hidden rounded-2xl shadow-xl">
              <iframe
                className="aspect-video w-full"
                src={block.vimeoUrl.replace(
                  "vimeo.com/",
                  "player.vimeo.com/video/",
                )}
                title="Vimeo Video"
                allowFullScreen
              />
            </div>
          )}

          {/* Empty */}

          {!video && !block.youtubeUrl && !block.vimeoUrl && (
            <div className="flex h-80 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50">
              <Video size={60} className="mb-4 text-gray-400" />

              <h3 className="text-xl font-semibold">Video Preview</h3>

              <p className="mt-2 text-gray-500">
                Upload a video or paste a YouTube/Vimeo link.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* =====================================
          Statistics
      ===================================== */}

      <div className="rounded-2xl border bg-gray-50 p-6">
        <h3 className="mb-6 text-lg font-semibold">Video Information</h3>

        <div className="grid gap-6 md:grid-cols-4">
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Source</p>

            <h2 className="mt-2 text-2xl font-bold text-blue-600">
              {video
                ? "Upload"
                : block.youtubeUrl
                  ? "YouTube"
                  : block.vimeoUrl
                    ? "Vimeo"
                    : "None"}
            </h2>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Controls</p>

            <h2 className="mt-2 text-2xl font-bold text-green-600">
              {block.controls ? "ON" : "OFF"}
            </h2>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Autoplay</p>

            <h2 className="mt-2 text-2xl font-bold text-purple-600">
              {block.autoplay ? "ON" : "OFF"}
            </h2>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Loop</p>

            <h2 className="mt-2 text-2xl font-bold text-orange-600">
              {block.loop ? "YES" : "NO"}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoBlock;
