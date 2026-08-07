"use client";

import {
  CalendarDays,
  Clock3,
  FileText,
  Star,
  Loader2,
  Save,
} from "lucide-react";

const PublishCard = ({blog = {
    status: "Draft",
    featured: false,
    content: [],
    publishedAt: "",
  },
  readingTime = 0,
  loading = false,
  onSubmit = () => {},
  onChange = () => {}, }) => {
  return (
    <div className="sticky top-24 space-y-6">
      {/* Publish Card */}
      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        <div className="border-b px-6 py-4">
          <h2 className="text-xl font-semibold">Publish</h2>

          <p className="mt-1 text-sm text-gray-500">
            Review your blog before publishing.
          </p>
        </div>

        <div className="space-y-5 p-6">
          {/* Status */}
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Status</span>

            <span
              className={`rounded-full px-3 py-1 text-sm font-medium ${
                blog.status === "Published"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {blog.status}
            </span>
          </div>

          {/* Featured */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star
                size={18}
                className={
                  blog.featured
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-400"
                }
              />

              <span className="text-gray-600">Featured</span>
            </div>

            <button
              type="button"
              onClick={() => onChange("featured", !blog.featured)}
              className={`relative h-7 w-14 rounded-full transition ${
                blog.featured ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                  blog.featured ? "left-8" : "left-1"
                }`}
              />
            </button>
          </div>

          {/* Reading Time */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock3 size={18} className="text-blue-600" />

              <span className="text-gray-600">Reading Time</span>
            </div>

            <span className="font-semibold">{readingTime} min</span>
          </div>

          {/* Blocks */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText size={18} className="text-blue-600" />

              <span className="text-gray-600">Sections</span>
            </div>

            <span className="font-semibold">{blog.content.length}</span>
          </div>

          {/* Publish Date */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CalendarDays size={18} className="text-blue-600" />

              <span className="text-gray-600">Publish Date</span>
            </div>

            <span className="text-sm text-gray-500">
              {blog.publishedAt
                ? new Date(blog.publishedAt).toLocaleDateString()
                : "-"}
            </span>
          </div>

          <hr />

          <button
            onClick={onSubmit}
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Saving...
              </>
            ) : (
              <>
                <Save size={18} />
                Save Blog
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PublishCard;
