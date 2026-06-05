import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance.js";

const SeoForm = ({ referenceId, referenceType }) => {
  const [seoId, setSeoId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const defaultForm = {
    metaTitle: "",
    metaDescription: "",
    keywords: "",
    canonicalUrl: "",
    ogImage: "",
    schemaMarkup: "", // ✅ ADD THIS
    noIndex: false,
  };

  const [form, setForm] = useState(defaultForm);

  /* ================= FETCH EXISTING SEO ================= */

  useEffect(() => {
    if (!referenceId) return;

    const fetchSEO = async () => {
      try {
        const res = await axiosInstance.get(
          `/api/seo?referenceId=${referenceId}&referenceType=${referenceType}`,
        );

        if (!res.data) return;

        setSeoId(res.data._id);

        setForm({
          metaTitle: res.data.metaTitle || "",
          metaDescription: res.data.metaDescription || "",
          keywords: res.data.keywords || "",
          canonicalUrl: res.data.canonicalUrl || "",
          ogImage: res.data.ogImage || "",
          schemaMarkup: JSON.stringify(res.data.schemaMarkup || "", null, 2), // ✅
          noIndex: res.data.noIndex || false,
        });
      } catch (err) {
        console.error("SEO fetch error:", err);
      }
    };

    fetchSEO();
  }, [referenceId, referenceType]);

  /* ================= SUBMIT ================= */


  const handleSubmit = async () => {
    try {
      setLoading(true);
      setMessage("");

      // ✅ Convert schema text → JSON object
      const payload = {
        ...form,
        schemaMarkup: form.schemaMarkup ? JSON.parse(form.schemaMarkup) : null,
      };

      if (seoId) {
        await axiosInstance.put(`/api/seo/${seoId}`, payload);
        setMessage("SEO Updated Successfully ✅");
      } else {
        const res = await axiosInstance.post("/api/seo", {
          ...payload,
          referenceId,
          referenceType,
        });

        setSeoId(res.data._id);
        setMessage("SEO Created Successfully ✅");
      }
    } catch (error) {
      console.error(error);
      setMessage("Invalid JSON or something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE ================= */

  const handleDelete = async () => {
    if (!seoId) return;

    try {
      await axiosInstance.delete(`/api/seo/${seoId}`);
      setSeoId(null);
      setForm(defaultForm);
      setMessage("SEO Deleted Successfully 🗑");
    } catch (error) {
      console.error(error);
      setMessage("Delete failed ❌");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="bg-white shadow-lg rounded-2xl p-6 space-y-6 border">
        <h2 className="text-2xl font-bold text-gray-800">🔎 SEO Settings</h2>

        {/* Meta Title */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Meta Title
          </label>
          <input
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            value={form.metaTitle}
            onChange={(e) => setForm({ ...form, metaTitle: e.target.value })}
          />
          <p className="text-sm text-gray-500 mt-1">
            {(form.metaTitle || "").length} / 60 characters
          </p>
        </div>

        {/* Meta Description */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Meta Description
          </label>
          <textarea
            rows="3"
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            value={form.metaDescription}
            onChange={(e) =>
              setForm({ ...form, metaDescription: e.target.value })
            }
          />
          <p className="text-sm text-gray-500 mt-1">
            {(form.metaDescription || "").length} / 160 characters
          </p>
        </div>

        {/* Keywords */}
        <input
          className="w-full border rounded-lg px-3 py-2"
          placeholder="Keywords"
          value={form.keywords}
          onChange={(e) => setForm({ ...form, keywords: e.target.value })}
        />

        {/* Canonical URL */}
        <input
          className="w-full border rounded-lg px-3 py-2"
          placeholder="Canonical URL"
          value={form.canonicalUrl}
          onChange={(e) => setForm({ ...form, canonicalUrl: e.target.value })}
        />

        {/* OG Image */}
        <input
          className="w-full border rounded-lg px-3 py-2"
          placeholder="OG Image URL"
          value={form.ogImage}
          onChange={(e) => setForm({ ...form, ogImage: e.target.value })}
        />

        {/* Schema Markup */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Schema Markup (JSON-LD)
          </label>

          <textarea
            rows="8"
            className="w-full border rounded-lg px-3 py-2 font-mono text-sm"
            placeholder='{
 "@context": "https://schema.org",
 "@type": "TouristDestination",
 "name": "Serengeti National Park"
}'
            value={form.schemaMarkup}
            onChange={(e) => setForm({ ...form, schemaMarkup: e.target.value })}
          />

          <p className="text-xs text-gray-500 mt-1">
            Paste valid JSON schema here
          </p>
        </div>

        {/* No Index */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={form.noIndex}
            onChange={(e) => setForm({ ...form, noIndex: e.target.checked })}
          />
          <label>No Index (Hide from Google)</label>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            {loading ? "Saving..." : seoId ? "Update SEO" : "Create SEO"}
          </button>

          {seoId && (
            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-600 text-white px-6 py-2 rounded-lg"
            >
              Delete SEO
            </button>
          )}
        </div>

        {message && (
          <p className="text-sm font-medium text-green-600">{message}</p>
        )}
      </div>
    </div>
  );
};

export default SeoForm;
