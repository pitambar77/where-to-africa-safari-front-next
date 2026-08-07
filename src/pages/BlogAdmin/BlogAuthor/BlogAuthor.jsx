"use client";

import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

import { User, Plus, Search, Loader2 } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_BASE;

const BlogAuthor = () => {
  /* =====================================
     STATES
  ===================================== */

  const [authors, setAuthors] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [editingAuthor, setEditingAuthor] = useState(null);

  const initialForm = {
    name: "",
    designation: "",
    email: "",
    bio: "",
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: "",
    profileImage: null,
    imagePreview: "",
    isActive: true,
  };

  const [form, setForm] = useState(initialForm);

  const [saving, setSaving] = useState(false);

  /* =====================================
     FETCH AUTHORS
  ===================================== */

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(`${API}/api/blog-author`);

      setAuthors(data.authors || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  /* =====================================
     SEARCH
  ===================================== */

  const filteredAuthors = useMemo(() => {
    return authors.filter((author) =>
      author.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [authors, search]);

  /* =====================================
   EDIT MODE
===================================== */

  useEffect(() => {
    if (editingAuthor) {
      setForm({
        name: editingAuthor.name || "",
        designation: editingAuthor.designation || "",
        email: editingAuthor.email || "",
        bio: editingAuthor.bio || "",
        facebook: editingAuthor.facebook || "",
        instagram: editingAuthor.instagram || "",
        twitter: editingAuthor.twitter || "",
        linkedin: editingAuthor.linkedin || "",
        profileImage: null,
        imagePreview: editingAuthor.profileImage || "",
        isActive: editingAuthor.isActive,
      });
    } else {
      setForm(initialForm);
    }
  }, [editingAuthor]);

  /* =====================================
   INPUT CHANGE
===================================== */

  const handleInputChange = (name, value) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =====================================
   IMAGE CHANGE
===================================== */

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image.");
      return;
    }

    setForm((prev) => ({
      ...prev,
      profileImage: file,
      imagePreview: URL.createObjectURL(file),
    }));
  };

  /* =====================================
   SAVE AUTHOR
===================================== */

  const handleSaveAuthor = async () => {
    if (!form.name.trim()) {
      alert("Author name is required.");
      return;
    }

    try {
      setSaving(true);

      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("designation", form.designation);
      formData.append("email", form.email);
      formData.append("bio", form.bio);
      formData.append("facebook", form.facebook);
      formData.append("instagram", form.instagram);
      formData.append("twitter", form.twitter);
      formData.append("linkedin", form.linkedin);
      formData.append("isActive", form.isActive);

      if (form.profileImage) {
        formData.append("profileImage", form.profileImage);
      }

      if (editingAuthor) {
        await axios.put(
          `${API}/api/blog-author/${editingAuthor._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );
      } else {
        await axios.post(`${API}/api/blog-author`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      await fetchAuthors();

      setShowModal(false);
      setEditingAuthor(null);
      setForm(initialForm);
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Unable to save author.");
    } finally {
      setSaving(false);
    }
  };

  /* =====================================
   DELETE AUTHOR
===================================== */

  const handleDelete = async (id) => {
    try {
      if (!confirm("Delete this author?")) return;

      await axios.delete(`${API}/api/blog-author/${id}`);

      await fetchAuthors();
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Unable to delete author.");
    }
  };

  /* =====================================
   TOGGLE STATUS
===================================== */

  const toggleStatus = async (id) => {
    try {
      await axios.patch(`${API}/api/blog-author/${id}/status`);

      await fetchAuthors();
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Unable to update status.");
    }
  };
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
              <User size={28} className="text-blue-600" />
            </div>

            <div>
              <h1 className="text-3xl font-bold">Blog Authors</h1>

              <p className="text-gray-500">Manage blog authors</p>
            </div>
          </div>

          <button
            onClick={() => {
              setEditingAuthor(null);
              setShowModal(true);
            }}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
          >
            <Plus size={18} />
            Add Author
          </button>
        </div>
      </div>

      {/* Search */}

      <div className="mx-auto max-w-7xl p-6">
        <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-3.5 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search author..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border py-3 pl-11 pr-4"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex h-96 items-center justify-center">
            <Loader2 size={42} className="animate-spin text-blue-600" />
          </div>
        ) : (
          <>
            {/* =====================================
    Statistics
===================================== */}

            <div className="mb-6 grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <p className="text-sm text-gray-500">Total Authors</p>

                <h2 className="mt-2 text-3xl font-bold text-blue-600">
                  {authors.length}
                </h2>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <p className="text-sm text-gray-500">Active</p>

                <h2 className="mt-2 text-3xl font-bold text-green-600">
                  {authors.filter((author) => author.isActive).length}
                </h2>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <p className="text-sm text-gray-500">Inactive</p>

                <h2 className="mt-2 text-3xl font-bold text-red-600">
                  {authors.filter((author) => !author.isActive).length}
                </h2>
              </div>
            </div>

            {/* =====================================
    Author Table
===================================== */}

            <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-6 py-4 text-left">Profile</th>

                      <th className="px-6 py-4 text-left">Name</th>

                      <th className="px-6 py-4 text-left">Designation</th>

                      <th className="px-6 py-4 text-left">Email</th>

                      <th className="px-6 py-4 text-center">Status</th>

                      <th className="px-6 py-4 text-center">Created</th>

                      <th className="px-6 py-4 text-center">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredAuthors.length === 0 ? (
                      <tr>
                        <td
                          colSpan={7}
                          className="py-16 text-center text-gray-500"
                        >
                          No authors found.
                        </td>
                      </tr>
                    ) : (
                      filteredAuthors.map((author) => (
                        <tr
                          key={author._id}
                          className="border-t hover:bg-gray-50"
                        >
                          {/* Profile */}

                          <td className="px-6 py-4">
                            {author.profileImage ? (
                              <img
                                src={author.profileImage}
                                alt={author.name}
                                className="h-14 w-14 rounded-full object-cover"
                              />
                            ) : (
                              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
                                <User size={24} className="text-gray-400" />
                              </div>
                            )}
                          </td>

                          {/* Name */}

                          <td className="px-6 py-4">
                            <h3 className="font-semibold">{author.name}</h3>
                          </td>

                          {/* Designation */}

                          <td className="px-6 py-4 text-gray-600">
                            {author.designation || "-"}
                          </td>

                          {/* Email */}

                          <td className="px-6 py-4">{author.email || "-"}</td>

                          {/* Status */}

                          <td className="px-6 py-4 text-center">
                            <button
                              onClick={() => toggleStatus(author._id)}
                              className={`rounded-full px-3 py-1 text-xs font-semibold
  ${
    author.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
  }`}
                            >
                              {author.isActive ? "Active" : "Inactive"}
                            </button>
                          </td>

                          {/* Created */}

                          <td className="px-6 py-4 text-center text-sm text-gray-500">
                            {new Date(author.createdAt).toLocaleDateString()}
                          </td>

                          {/* Actions */}

                          <td className="px-6 py-4">
                            <div className="flex justify-center gap-3">
                              <button
                                onClick={() => {
                                  setEditingAuthor(author);
                                  setShowModal(true);
                                }}
                                className="rounded-lg bg-blue-50 px-4 py-2 text-blue-600 hover:bg-blue-100"
                              >
                                Edit
                              </button>

                              <button
                                onClick={() => handleDelete(author._id)}
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

            {showModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-5">
                <div className="w-full max-w-3xl rounded-2xl bg-white p-6">
                  <h2 className="mb-6 text-2xl font-bold">
                    {editingAuthor ? "Edit Author" : "Create Author"}
                  </h2>

                  <div className="grid gap-5 md:grid-cols-2">
                    <input
                      type="text"
                      placeholder="Author Name"
                      value={form.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      className="rounded-lg border p-3"
                    />

                    <input
                      type="text"
                      placeholder="Designation"
                      value={form.designation}
                      onChange={(e) =>
                        handleInputChange("designation", e.target.value)
                      }
                      className="rounded-lg border p-3"
                    />

                    <input
                      type="email"
                      placeholder="Email"
                      value={form.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="rounded-lg border p-3"
                    />

                    <input
                      type="text"
                      placeholder="Facebook URL"
                      value={form.facebook}
                      onChange={(e) =>
                        handleInputChange("facebook", e.target.value)
                      }
                      className="rounded-lg border p-3"
                    />

                    <input
                      type="text"
                      placeholder="Instagram URL"
                      value={form.instagram}
                      onChange={(e) =>
                        handleInputChange("instagram", e.target.value)
                      }
                      className="rounded-lg border p-3"
                    />

                    <input
                      type="text"
                      placeholder="Twitter URL"
                      value={form.twitter}
                      onChange={(e) =>
                        handleInputChange("twitter", e.target.value)
                      }
                      className="rounded-lg border p-3"
                    />

                    <input
                      type="text"
                      placeholder="LinkedIn URL"
                      value={form.linkedin}
                      onChange={(e) =>
                        handleInputChange("linkedin", e.target.value)
                      }
                      className="rounded-lg border p-3"
                    />

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </div>

                  <textarea
                    rows={5}
                    placeholder="Author Bio"
                    value={form.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    className="mt-5 w-full rounded-lg border p-3"
                  />

                  {form.imagePreview && (
                    <img
                      src={form.imagePreview}
                      alt=""
                      className="mt-5 h-36 w-36 rounded-full object-cover"
                    />
                  )}

                  <label className="mt-5 flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={form.isActive}
                      onChange={(e) =>
                        handleInputChange("isActive", e.target.checked)
                      }
                    />
                    Active
                  </label>

                  <div className="mt-8 flex justify-end gap-3">
                    <button
                      onClick={() => {
                        setShowModal(false);
                        setEditingAuthor(null);
                        setForm(initialForm);
                      }}
                      className="rounded-lg border px-5 py-2"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={handleSaveAuthor}
                      disabled={saving}
                      className="rounded-lg bg-blue-600 px-5 py-2 text-white"
                    >
                      <>
                        {saving && (
                          <Loader2
                            size={16}
                            className="mr-2 inline animate-spin"
                          />
                        )}

                        {editingAuthor ? "Update Author" : "Create Author"}
                      </>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Part 1D */}
          </>
        )}
      </div>
    </div>
  );
};

export default BlogAuthor;
