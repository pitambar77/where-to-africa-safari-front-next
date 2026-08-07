"use client";

import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

import { Plus, Search, Loader2, FolderOpen } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_BASE;

const BlogCategory = () => {
  /* =====================================
     STATES
  ===================================== */

  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [editingCategory, setEditingCategory] = useState(null);

  const initialForm = {
    name: "",
    description: "",
    image: null,
    imagePreview: "",
    isActive: true,
  };

  const [form, setForm] = useState(initialForm);

  const [saving, setSaving] = useState(false);

  /* =====================================
     FETCH CATEGORIES
  ===================================== */

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(`${API}/api/blog-category`);

      setCategories(data.categories || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (editingCategory) {
      setForm({
        name: editingCategory.name,
        description: editingCategory.description || "",
        image: null,
        imagePreview: editingCategory.image || "",
        isActive: editingCategory.isActive,
      });
    } else {
      setForm(initialForm);
    }
  }, [editingCategory]);

  const handleInputChange = (name, value) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    setForm((prev) => ({
      ...prev,
      image: file,
      imagePreview: URL.createObjectURL(file),
    }));
  };
  const handleSaveCategory = async () => {
    if (!form.name.trim()) {
      alert("Category name is required.");
      return;
    }

    try {
      setSaving(true);

      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("isActive", form.isActive);

      if (form.image) {
        formData.append("image", form.image);
      }

      if (editingCategory) {
        await axios.put(
          `${API}/api/blog-category/${editingCategory._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );
      } else {
        await axios.post(`${API}/api/blog-category`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      await fetchCategories();

      setShowModal(false);
      setEditingCategory(null);
      setForm(initialForm);
    } catch (error) {
      console.error("Save Category Error:", error);

      alert(error.response?.data?.message || "Failed to save category.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      if (!confirm("Delete category?")) return;

      await axios.delete(`${API}/api/blog-category/${id}`);

      await fetchCategories();
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Unable to delete category.");
    }
  };

 const toggleStatus = async (id) => {
  try {
    await axios.patch(`${API}/api/blog-category/${id}/status`);

    await fetchCategories();
  } catch (error) {
    console.error(error);

    alert(
      error.response?.data?.message ||
      "Unable to update category status."
    );
  }
};

  /* =====================================
     SEARCH
  ===================================== */

  const filteredCategories = useMemo(() => {
    return categories.filter((category) =>
      category.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [categories, search]);

  /* =====================================
     UI
  ===================================== */

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}

      <div className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-blue-100 p-4">
              <FolderOpen size={28} className="text-blue-600" />
            </div>

            <div>
              <h1 className="text-3xl font-bold">Blog Categories</h1>

              <p className="text-gray-500">Manage blog categories</p>
            </div>
          </div>

          <button
            onClick={() => {
              setEditingCategory(null);
              setShowModal(true);
            }}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
          >
            <Plus size={18} />
            Add Category
          </button>
        </div>
      </div>

      {/* Search */}

      <div className="mx-auto max-w-7xl p-6">
        <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">
          <div className="relative">
            <Search
              className="absolute left-4 top-3.5 text-gray-400"
              size={18}
            />

            <input
              type="text"
              placeholder="Search category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border py-3 pl-11 pr-4"
            />
          </div>
        </div>

        {/* Loading */}

        {loading ? (
          <div className="flex h-96 items-center justify-center">
            <Loader2 className="animate-spin text-blue-600" size={42} />
          </div>
        ) : (
          <>
            {" "}
            {/* =====================================
                Statistics
            ===================================== */}
            <div className="mb-6 grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <p className="text-sm text-gray-500">Total Categories</p>

                <h2 className="mt-2 text-3xl font-bold text-blue-600">
                  {categories.length}
                </h2>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <p className="text-sm text-gray-500">Active</p>

                <h2 className="mt-2 text-3xl font-bold text-green-600">
                  {categories.filter((item) => item.isActive).length}
                </h2>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <p className="text-sm text-gray-500">Inactive</p>

                <h2 className="mt-2 text-3xl font-bold text-red-600">
                  {categories.filter((item) => !item.isActive).length}
                </h2>
              </div>
            </div>
            {/* =====================================
                Category Table
            ===================================== */}
            <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-6 py-4 text-left">Image</th>

                      <th className="px-6 py-4 text-left">Name</th>

                      <th className="px-6 py-4 text-left">Slug</th>

                      <th className="px-6 py-4 text-left">Description</th>

                      <th className="px-6 py-4 text-center">Status</th>

                      <th className="px-6 py-4 text-center">Created</th>

                      <th className="px-6 py-4 text-center">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredCategories.length === 0 ? (
                      <tr>
                        <td
                          colSpan={7}
                          className="py-16 text-center text-gray-500"
                        >
                          No categories found.
                        </td>
                      </tr>
                    ) : (
                      filteredCategories.map((category) => (
                        <tr
                          key={category._id}
                          className="border-t hover:bg-gray-50"
                        >
                          {/* Image */}

                          <td className="px-6 py-4">
                            {category.image ? (
                              <img
                                src={category.image}
                                alt={category.name}
                                className="h-14 w-14 rounded-lg object-cover"
                              />
                            ) : (
                              <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gray-100">
                                <FolderOpen
                                  size={24}
                                  className="text-gray-400"
                                />
                              </div>
                            )}
                          </td>

                          {/* Name */}

                          <td className="px-6 py-4">
                            <h3 className="font-semibold">{category.name}</h3>
                          </td>

                          {/* Slug */}

                          <td className="px-6 py-4">
                            <code className="rounded bg-gray-100 px-2 py-1 text-sm">
                              {category.slug}
                            </code>
                          </td>

                          {/* Description */}

                          <td className="max-w-xs px-6 py-4">
                            <p className="line-clamp-2 text-gray-600">
                              {category.description || "-"}
                            </p>
                          </td>

                          {/* Status */}

                          <td className="px-6 py-4 text-center">
                            <button
                              onClick={() => toggleStatus(category._id)}
                              className={`rounded-full px-3 py-1 text-xs font-semibold
                              ${
                                category.isActive
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {category.isActive ? "Active" : "Inactive"}
                            </button>
                          </td>

                          {/* Created */}

                          <td className="px-6 py-4 text-center text-sm text-gray-500">
                            {new Date(category.createdAt).toLocaleDateString()}
                          </td>

                          {/* Actions */}

                          <td className="px-6 py-4">
                            <div className="flex justify-center gap-3">
                              <button
                                onClick={() => {
                                  setEditingCategory(category);
                                  setShowModal(true);
                                }}
                                className="rounded-lg bg-blue-50 px-4 py-2 text-blue-600 hover:bg-blue-100"
                              >
                                Edit
                              </button>

                              <button
                                onClick={() => handleDelete(category._id)}
                                className="rounded-lg bg-red-50 px-4 py-2 text-red-600 hover:bg-red-100"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-xl rounded-xl bg-white p-6">
            <h2 className="mb-5 text-2xl font-bold">
              {editingCategory ? "Edit Category" : "Create Category"}
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Category Name"
                value={form.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="w-full rounded-lg border p-3"
              />

              <textarea
                rows={4}
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                className="w-full rounded-lg border p-3"
              />

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />

              {form.imagePreview && (
                <img
                  src={form.imagePreview}
                  className="h-36 w-36 rounded-lg object-cover"
                  alt=""
                />
              )}

              <label className="flex gap-2">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) =>
                    handleInputChange("isActive", e.target.checked)
                  }
                />
                Active
              </label>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingCategory(null);
                  setForm(initialForm);
                }}
                className="rounded-lg border px-5 py-2"
              >
                Cancel
              </button>

              <button
                onClick={handleSaveCategory}
                disabled={saving}
                className="rounded-lg bg-blue-600 px-5 py-2 text-white"
              >
                {saving ? "Saving..." : editingCategory ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogCategory;
