import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";

const BlogSEO = ({
  seo = {
    metaTitle: "",
    metaDescription: "",
    keywords: [],
    canonicalUrl: "",
    ogImage: "",
  },
  onChange = () => {},
}) => {
  const [keywordInput, setKeywordInput] = useState("");

  useEffect(() => {
  setKeywordInput((seo?.keywords || []).join(", "));
}, [seo?.keywords]);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* ===========================
          Header
      =========================== */}

      <div className="border-b px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
            <Search className="text-blue-600" size={22} />
          </div>

          <div>
            <h2 className="text-xl font-semibold">SEO Settings</h2>

            <p className="text-sm text-gray-500">
              Optimize this article for search engines.
            </p>
          </div>
        </div>
      </div>

      {/* ===========================
          Body
      =========================== */}

      <div className="space-y-8 p-6">
        {/* ===========================
            Meta Title
        =========================== */}

        <div>
          <label className="mb-2 block font-medium text-gray-700">
            Meta Title
          </label>

          <input
            type="text"
            value={seo.metaTitle}
            onChange={(e) => onChange("metaTitle", e.target.value)}
            placeholder="Enter SEO Title"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
          />

          <div className="mt-2 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Recommended: 50–60 characters
            </p>

            <span
              className={`text-sm font-medium

              ${seo.metaTitle.length > 60 ? "text-red-500" : "text-green-600"}`}
            >
              {seo.metaTitle.length}/60
            </span>
          </div>
        </div>

        {/* ===========================
            Meta Description
        =========================== */}

        <div>
          <label className="mb-2 block font-medium text-gray-700">
            Meta Description
          </label>

          <textarea
            rows={5}
            value={seo.metaDescription}
            onChange={(e) => onChange("metaDescription", e.target.value)}
            placeholder="Write a short SEO description..."
            className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
          />

          <div className="mt-2 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Recommended: 150–160 characters
            </p>

            <span
              className={`text-sm font-medium

              ${
                seo.metaDescription.length > 160
                  ? "text-red-500"
                  : "text-green-600"
              }`}
            >
              {seo.metaDescription.length}/160
            </span>
          </div>
        </div>
        {/* ===========================
            Keywords
        =========================== */}

        <div>
          <label className="mb-2 block font-medium text-gray-700">
            SEO Keywords
          </label>

          <input
            type="text"
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();

                onChange(
                  "keywords",
                  keywordInput
                    .split(",")
                    .map((k) => k.trim())
                    .filter(Boolean),
                );
              }
            }}
            placeholder="Safari, Tanzania, Wildlife, Africa..."
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
          />

          {/* <input
            type="text"
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
            onBlur={() =>
              onChange(
                "keywords",
                keywordInput
                  .split(",")
                  .map((k) => k.trim())
                  .filter(Boolean),
              )
            }
            placeholder="Safari, Tanzania, Wildlife, Africa..."
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
          /> */}

          <p className="mt-2 text-sm text-gray-500">
            Separate keywords with commas.
          </p>

          {(seo.keywords || []).length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {seo.keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700"
                >
                  {keyword}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* ===========================
            Canonical URL
        =========================== */}

        <div>
          <label className="mb-2 block font-medium text-gray-700">
            Canonical URL
          </label>

          <input
            type="url"
            value={seo.canonicalUrl}
            onChange={(e) => onChange("canonicalUrl", e.target.value)}
            placeholder="https://example.com/blog/my-blog"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
          />

          <p className="mt-2 text-sm text-gray-500">
            Leave empty if not required.
          </p>
        </div>

        {/* ===========================
            Open Graph Image
        =========================== */}

        <div>
          <label className="mb-2 block font-medium text-gray-700">
            Open Graph Image
          </label>

          <input
            type="text"
            value={seo.ogImage}
            onChange={(e) => onChange("ogImage", e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
          />

          <p className="mt-2 text-sm text-gray-500">
            Paste an uploaded image URL or use the banner image URL.
          </p>

          {seo.ogImage && (
            <div className="mt-4 overflow-hidden rounded-xl border">
              <img
                src={seo.ogImage}
                alt="Open Graph Preview"
                className="h-56 w-full object-cover"
              />
            </div>
          )}
        </div>
        {/* ===========================
            SEO Score
        =========================== */}

        <div className="rounded-xl border border-blue-100 bg-blue-50 p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">SEO Score</h3>

            {(() => {
              let score = 0;

              if (seo.metaTitle?.length >= 30) score++;
              if (seo.metaDescription?.length >= 120) score++;
              if ((seo.keywords || []).length >= 3) score++;
              if (seo.canonicalUrl) score++;
              if (seo.ogImage) score++;

              const percent = score * 20;

              let color = "bg-red-500";
              let label = "Needs Improvement";

              if (percent >= 80) {
                color = "bg-green-500";
                label = "Excellent";
              } else if (percent >= 60) {
                color = "bg-yellow-500";
                label = "Good";
              }

              return (
                <span
                  className={`rounded-full px-4 py-2 text-sm font-semibold text-white ${color}`}
                >
                  {label} ({percent}%)
                </span>
              );
            })()}
          </div>

          <div className="mt-5 space-y-2 text-sm">
            <p
              className={
                seo.metaTitle?.length >= 30 ? "text-green-600" : "text-red-500"
              }
            >
              • Meta title should be at least 30 characters.
            </p>

            <p
              className={
                seo.metaDescription?.length >= 120
                  ? "text-green-600"
                  : "text-red-500"
              }
            >
              • Meta description should be 120–160 characters.
            </p>

            <p
              className={
                (seo.keywords || []).length >= 3
                  ? "text-green-600"
                  : "text-red-500"
              }
            >
              • Add at least 3 keywords.
            </p>

            <p className={seo.canonicalUrl ? "text-green-600" : "text-red-500"}>
              • Canonical URL recommended.
            </p>

            <p className={seo.ogImage ? "text-green-600" : "text-red-500"}>
              • Open Graph image recommended.
            </p>
          </div>
        </div>

        {/* ===========================
            Google Preview
        =========================== */}

        <div className="rounded-xl border bg-white p-6">
          <h3 className="mb-5 text-lg font-semibold">Google Search Preview</h3>

          <div className="rounded-lg border p-5">
            <p className="truncate text-sm text-green-700">
              {seo.canonicalUrl || "https://yourwebsite.com/blog/example"}
            </p>

            <h2 className="mt-1 text-xl font-medium text-blue-700">
              {seo.metaTitle || "Your Blog Title Will Appear Here"}
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              {seo.metaDescription ||
                "Your meta description will appear here exactly like Google search results."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogSEO;
