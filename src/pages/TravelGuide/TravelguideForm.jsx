"use client"

import React, { useMemo, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
// adjust path based on your folder structure

import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { getAllDestinations } from "../../api/destinationAPI.js";

// const API_BASE =
//   import.meta.env.VITE_API_BASE ||
//   "";

const SECTION_TYPES = [
  { type: "h1", label: "Heading (H1)" },
  { type: "h2", label: "Subheading (H2)" },
  { type: "h3", label: "Minor Heading (H3)" },
  { type: "paragraph", label: "Paragraph" },
  { type: "image", label: "Image" },
  { type: "list", label: "List" },
  { type: "quote", label: "Quote" },
  { type: "cta", label: "Call to Action" },
  { type: "divider", label: "Divider" },
];

function slugify(str = "") {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function newSection(type) {
  // const base = { id: crypto.randomUUID(), type };
  const base = { id: uuidv4(), type };
  switch (type) {
    case "h1":
    case "h2":
    case "h3":
    case "paragraph":
    case "quote":
      return { ...base, text: "" };
    case "image":
      return { ...base, imageUrl: "", imageAlt: "" };
    case "list":
      return {
        ...base,
        items: [
          {
            id: uuidv4(),
            text: "",
            children: [],
          },
        ],
      };
    case "cta":
      return {
        ...base,
        text: "",
        ctaTitle: "",
        ctaText: "Contact Us Today!",
        ctaHref: "/contact",
      };
    case "divider":
      return base;
    default:
      return base;
  }
}

function ListEditor({ items, onChange }) {
  const updateTree = (list, id, patch) =>
    list.map((item) =>
      item.id === id
        ? { ...item, ...patch }
        : { ...item, children: updateTree(item.children, id, patch) },
    );

  const removeFromTree = (list, id) =>
    list
      .filter((item) => item.id !== id)
      .map((item) => ({
        ...item,
        children: removeFromTree(item.children, id),
      }));

  const updateItem = (id, patch) => {
    onChange(updateTree(items, id, patch));
  };

  const addChild = (id) => {
    onChange(
      updateTree(items, id, {
        children: [
          ...findItem(items, id).children,
          { id: uuidv4(), text: "", children: [] },
        ],
      }),
    );
  };

  const addSibling = () => {
    onChange([...items, { id: uuidv4(), text: "", children: [] }]);
  };

  const removeItem = (id) => {
    onChange(removeFromTree(items, id));
  };

  return (
    <ul className="ml-4 space-y-3">
      {items.map((item) => (
        <li key={item.id}>
          <div className="flex gap-2 items-center">
            <input
              value={item.text}
              onChange={(e) => updateItem(item.id, { text: e.target.value })}
              placeholder="List item"
              className="flex-1 rounded-xl border px-3 py-2"
            />

            <button
              type="button"
              onClick={() => addChild(item.id)}
              className="px-3 py-2 rounded-xl border text-sm"
            >
              + Sub
            </button>

            <button
              type="button"
              onClick={() => removeItem(item.id)}
              className="px-3 py-2 rounded-xl border text-red-600"
            >
              ✕
            </button>
          </div>

          {item.children.length > 0 && (
            <ListEditor
              items={item.children}
              onChange={(children) => updateItem(item.id, { children })}
            />
          )}
        </li>
      ))}

      <button
        type="button"
        onClick={addSibling}
        className="px-3 py-2 rounded-xl border text-sm"
      >
        + Add item
      </button>
    </ul>
  );
}

/* helper */
function findItem(items, id) {
  for (const item of items) {
    if (item.id === id) return item;
    const found = findItem(item.children, id);
    if (found) return found;
  }
}

const TravelguideForm = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [title, setTitle] = useState("");
  const [subtitle, setSubTitle] = useState("");

  const [slug, setSlug] = useState("");
  const [sections, setSections] = useState([]);
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [category, setCategory] = useState("");
  const [keywords, setKeywords] = useState(""); // comma separated
  const [thumbnail, setThumbnail] = useState(null);
  // const [thumbnailPreview, setThumbnailPreview] = useState("");

  const [destinations, setDestinations] = useState([]);
  const [loadingDestinations, setLoadingDestinations] = useState(false);

  // Auto-generate slug from title if slug is empty or matches previous pattern
  const autoSlug = useMemo(() => slugify(title), [title]);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoadingDestinations(true);
        const res = await getAllDestinations();
        setDestinations(res.data || []);
      } catch (err) {
        console.error("Failed to load destinations", err);
      } finally {
        setLoadingDestinations(false);
      }
    };

    fetchDestinations();
  }, []);

  // 🔹 load blog when editing
  useEffect(() => {
    if (!id) return;
    axiosInstance
      .get(`/api/blog/${id}`)
      .then((res) => {
        const b = res.data;
        setTitle(b.title);
        setSubTitle(b.subtitle);
        setSlug(b.slug);
        setCategory(b.category);
        setKeywords(b.keywords.join(", "));
        // setSections(b.sections || []);
        setSections(
          (b.sections || []).map((section) => ({
            id: uuidv4(), // 🔥 critical fix
            ...section,
            items: section.items || [],
          })),
        );

        // if (b.thumbnail) setThumbnailPreview(`${API_BASE}${b.thumbnail}`);
      })
      .catch((err) => console.error("Failed to load blog:", err));
  }, [id]);

  function addSection(type) {
    setSections((prev) => [...prev, newSection(type)]);
  }

  function updateSection(id, patch) {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...patch } : s)),
    );
  }

  function removeSection(id) {
    setSections((prev) => prev.filter((s) => s.id !== id));
  }

  function moveSection(id, dir) {
    setSections((prev) => {
      const idx = prev.findIndex((s) => s.id === id);
      if (idx === -1) return prev;
      const next = [...prev];
      const swapIdx = dir === "up" ? idx - 1 : idx + 1;
      if (swapIdx < 0 || swapIdx >= next.length) return prev;
      [next[idx], next[swapIdx]] = [next[swapIdx], next[idx]];
      return next;
    });
  }

  async function handleUpload(file, id) {
    const form = new FormData();
    form.append("file", file);
    try {
      const { data } = await axiosInstance.post(`/api/uploads`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (data?.url) updateSection(id, { imageUrl: data.url });
    } catch (e) {
      console.error(e);
      setError("Image upload failed");
    }
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const form = new FormData();
      form.append("title", title.trim());
      form.append("subtitle", subtitle);

      // form.append("slug", (slug || autoSlug).trim());
      form.append("category", category);
      form.append("keywords", keywords);
      form.append(
        "sections",
        JSON.stringify(sections.map(({ id, ...rest }) => rest)),
      );
      if (thumbnail) form.append("thumbnail", thumbnail);

      // const { data } = await axios.post(`${API_BASE}/api/blog`, form, {
      //   headers: { "Content-Type": "multipart/form-data" },
      // });

      if (id) {
        await axiosInstance.put(`/api/blog/${id}`, form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setSuccess("Blog updated ✓");
      } else {
        await axiosInstance.post(`/api/blog`, form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setSuccess("Blog created ✓");
      }

      // setSuccess(`Saved ✓ Post ID: ${data._id}`);
      setSections([]);
      setTitle("");
      setSubTitle("");
      setSlug("");
      router.push("/dashboard/blog");
    } catch (e) {
      console.error(e);
      setError(e?.response?.data?.error || "Save failed");
    } finally {
      setSaving(false);
    }
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-700">
            Create New Travelguide 
          </h1>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setPreview((p) => !p)}
              className="px-4 py-2 rounded-xl border shadow-sm hover:shadow transition"
            >
              {preview ? "Edit" : "Preview"}
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="px-5 py-2 rounded-xl bg-blue-600 text-white shadow hover:bg-blue-700 disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Post"}
            </button>
          </div>
        </div>

        {/* Meta */}
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title"
              className="mt-1 w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              sub Title
            </label>
            <input
              value={subtitle}
              onChange={(e) => setSubTitle(e.target.value)}
              placeholder="Enter post title"
              className="mt-1 w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {error && (
          <div className="mt-4 p-3 rounded-lg bg-red-50 text-red-700 border border-red-200">
            {error}
          </div>
        )}
        {success && (
          <div className="mt-4 p-3 rounded-lg bg-green-50 text-green-700 border border-green-200">
            {success}
          </div>
        )}

        {/* Add section toolbar */}
        <div className="mt-8 sticky top-20 z-30 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Add Section
          </h2>
          <div className="flex flex-wrap gap-2">
            {SECTION_TYPES.map((s) => (
              <button
                key={s.type}
                type="button"
                onClick={() => addSection(s.type)}
                className="px-3 py-2 rounded-xl border bg-white hover:bg-gray-50 shadow-sm"
              >
                + {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 w-full rounded-xl border px-3 py-2"
        >
          <option value="">-- Select Category --</option>
          <option value="Kilimanjaro Travel Guide">
            Kilimanjaro Travel Guide
          </option>
          <option value="Tanzania Travel Guide">Tanzania Travel Guide</option>
        </select> */}

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-4 w-full rounded-xl border px-3 py-2"
        >
          <option value="">-- Select Destination --</option>

          {loadingDestinations && (
            <option disabled>Loading destinations...</option>
          )}

          {destinations.map((dest) => (
            <option key={dest._id} value={dest.slug}>
              {dest.name}
            </option>
          ))}
        </select>

        {/* Keywords */}
        <div className=" mt-8">
          <label className="block text-sm font-medium text-gray-700">
            Keywords
          </label>
          <input
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="comma, separated, keywords"
            className="mt-1 w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            Enter keywords separated by commas
          </p>
        </div>

        {/* Thumbnail Upload */}
        <div className="md:col-span-2 mt-8">
          <label className="block text-sm font-medium text-gray-700">
            Thumbnail
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
            className="mt-1 block w-full text-sm"
          />
          {thumbnail && (
            <p className="text-xs text-gray-500 mt-2">{thumbnail.name}</p>
          )}
        </div>

        {/* Editor or Preview */}
        {!preview ? (
          <div className="mt-6 space-y-4">
            {sections.length === 0 && (
              <div className="text-gray-500 italic">
                No sections yet. Use the buttons above to add content blocks.
              </div>
            )}

            {sections.map((s, idx) => (
              <div
                key={s.id}
                className="bg-white rounded-2xl border shadow-sm p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    {idx + 1}. {s.type.toUpperCase()}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => moveSection(s.id, "up")}
                      className="px-2 py-1 rounded-lg border"
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => moveSection(s.id, "down")}
                      className="px-2 py-1 rounded-lg border"
                    >
                      ↓
                    </button>
                    <button
                      onClick={() => removeSection(s.id)}
                      className="px-2 py-1 rounded-lg border text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div className="mt-3">
                  {s.type === "h1" ||
                  s.type === "h2" ||
                  s.type === "h3" ||
                  s.type === "paragraph" ||
                  s.type === "quote" ? (
                    <textarea
                      value={s.text}
                      onChange={(e) =>
                        updateSection(s.id, { text: e.target.value })
                      }
                      rows={s.type === "paragraph" ? 4 : 2}
                      placeholder={
                        s.type === "paragraph"
                          ? "Write paragraph text..."
                          : s.type === "quote"
                            ? "Write the quote..."
                            : `Write ${s.type.toUpperCase()} text...`
                      }
                      className="w-full rounded-xl border px-3 py-2"
                    />
                  ) : null}

                  {s.type === "image" && (
                    <div className="grid md:grid-cols-3 gap-3 items-center">
                      <div className="md:col-span-2">
                        <label className="block text-sm text-gray-700">
                          Image URL
                        </label>
                        <input
                          value={s.imageUrl}
                          onChange={(e) =>
                            updateSection(s.id, { imageUrl: e.target.value })
                          }
                          placeholder="https://..."
                          className="mt-1 w-full rounded-xl border px-3 py-2"
                        />
                        <label className="block text-sm text-gray-700 mt-3">
                          Alt text
                        </label>
                        <input
                          value={s.imageAlt || ""}
                          onChange={(e) =>
                            updateSection(s.id, { imageAlt: e.target.value })
                          }
                          placeholder="Describe the image"
                          className="mt-1 w-full rounded-xl border px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700">
                          Upload
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            e.target.files?.[0] &&
                            handleUpload(e.target.files[0], s.id)
                          }
                          className="mt-1 block w-full text-sm"
                        />
                        {s.imageUrl && (
                          <img
                            src={s.imageUrl}
                            alt="preview"
                            className="mt-2 rounded-xl border"
                          />
                        )}
                      </div>
                    </div>
                  )}

                  {s.type === "list" && (
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">
                        List Items (supports nested lists)
                      </label>

                      <ListEditor
                        items={s.items}
                        onChange={(items) => updateSection(s.id, { items })}
                      />
                    </div>
                  )}

                  {s.type === "cta" && (
                    <div className="grid md:grid-cols-3 gap-3">
                      <div className="md:col-span-3">
                        <label className="block text-sm text-gray-700">
                          CTA Banner Text
                        </label>
                        <input
                          value={s.text || ""}
                          onChange={(e) =>
                            updateSection(s.id, { text: e.target.value })
                          }
                          placeholder="Wondering if your ccTLD setup is optimized?"
                          className="mt-1 w-full rounded-xl border px-3 py-2"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-gray-700">
                          CTA Content
                        </label>
                        <input
                          value={s.ctaTitle || ""}
                          onChange={(e) =>
                            updateSection(s.id, { ctaTitle: e.target.value })
                          }
                          placeholder="Contact Us Today!"
                          className="mt-1 w-full rounded-xl border px-3 py-2"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-gray-700">
                          Button Text
                        </label>
                        <input
                          value={s.ctaText || ""}
                          onChange={(e) =>
                            updateSection(s.id, { ctaText: e.target.value })
                          }
                          placeholder="Contact Us Today!"
                          className="mt-1 w-full rounded-xl border px-3 py-2"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm text-gray-700">
                          Button Link
                        </label>
                        <input
                          value={s.ctaHref || ""}
                          onChange={(e) =>
                            updateSection(s.id, { ctaHref: e.target.value })
                          }
                          placeholder="/contact or https://..."
                          className="mt-1 w-full rounded-xl border px-3 py-2"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Preview title={title} slug={slug || autoSlug} sections={sections} />
        )}
      </div>
    </div>
  );
};

function RenderList({ items }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          {item.text}
          {item.children?.length > 0 && <RenderList items={item.children} />}
        </li>
      ))}
    </ul>
  );
}

export function Preview({ title, slug, sections }) {
  return (
    <div className="mt-6 bg-white border rounded-2xl p-6 shadow-sm">
      <div className="flex items-baseline justify-between">
        <h2 className="text-2xl font-bold text-blue-700">Preview</h2>
        <span className="text-xs text-gray-500">slug: /blog/{slug}</span>
      </div>
      <article className="prose max-w-none mt-4">
        <h1>{title || "(Untitled Post)"}</h1>
        {sections.map((s) => {
          if (s.type === "h1") return <h1 key={s.id}>{s.text}</h1>;
          if (s.type === "h2") return <h2 key={s.id}>{s.text}</h2>;
          if (s.type === "h3") return <h3 key={s.id}>{s.text}</h3>;
          if (s.type === "paragraph") return <p key={s.id}>{s.text}</p>;
          if (s.type === "quote")
            return (
              <blockquote key={s.id}>
                <p>{s.text}</p>
              </blockquote>
            );
          // if (s.type === "list")
          //   return (
          //     <ul key={s.id}>
          //       {(s.items || []).filter(Boolean).map((it, i) => (
          //         <li key={i}>{it}</li>
          //       ))}
          //     </ul>
          //   );
          if (s.type === "list") {
            return <RenderList key={s.id} items={s.items} />;
          }

          if (s.type === "image")
            return (
              <figure key={s.id}>
                {s.imageUrl && (
                  <img
                    src={s.imageUrl}
                    alt={s.imageAlt || "image"}
                    className="rounded-xl"
                  />
                )}
                {s.imageAlt && (
                  <figcaption className="text-sm text-gray-500">
                    {s.imageAlt}
                  </figcaption>
                )}
              </figure>
            );
          if (s.type === "cta")
            return (
              <div
                key={s.id}
                className="bg-teal-400 text-center rounded-lg py-10 px-6 my-6"
              >
                <p className="text-gray-800 text-lg md:text-xl mb-6">
                  {s.text}
                </p>
                <p className="text-gray-800 text-lg  mb-6">{s.ctaTitle}</p>
                <a
                  href={s.ctaHref || "#"}
                  className="bg-purple-600 text-white text-lg font-semibold px-8 py-3 rounded-lg hover:bg-purple-700 transition"
                >
                  {s.ctaText || "Learn more"}
                </a>
              </div>
            );
          if (s.type === "divider") return <hr key={s.id} />;
          return null;
        })}
      </article>
    </div>
  );
}

export default TravelguideForm;
