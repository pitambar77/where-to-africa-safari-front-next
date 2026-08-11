"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import axios from "axios";

import { Plus, Search, Loader2, FileText, Pencil, Trash2 } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_BASE;

const BlogList = () => {
  /* =====================================
     STATES
  ===================================== */

  const [blogs, setBlogs] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalBlogs, setTotalBlogs] = useState(0);

  const [stats, setStats] = useState({
    published: 0,
    draft: 0,
    featured: 0,
  });

  /* =====================================
     FETCH BLOGS
  ===================================== */

  useEffect(() => {
    fetchBlogs(page);
  }, [page]);

  // const fetchBlogs = async () => {
  //   try {
  //     setLoading(true);

  //     const { data } = await axios.get(`${API}/api/blogs`);

  //     setBlogs(data.blogs || []);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchBlogs = async (currentPage = 1) => {
    try {
      setLoading(true);

      // ==========================================
      // 1. Fetch current page for table
      // ==========================================

      const { data } = await axios.get(
        `${API}/api/blogs?page=${currentPage}&limit=9`,
      );

      setBlogs(data.blogs || []);
      setTotalPages(data.totalPages || 1);
      setTotalBlogs(data.total || 0);

      // ==========================================
      // 2. Fetch ALL blogs for statistics
      // ==========================================

      const { data: statsData } = await axios.get(
        `${API}/api/blogs?page=1&limit=${data.total}`,
      );

      const allBlogs = statsData.blogs || [];

      setStats({
        published: allBlogs.filter((blog) => blog.status === "Published")
          .length,

        draft: allBlogs.filter((blog) => blog.status === "Draft").length,

        featured: allBlogs.filter((blog) => blog.featured === true).length,
      });
    } catch (error) {
      console.error("Fetch Blogs Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // const fetchBlogs = async (currentPage = 1) => {
  //   try {
  //     setLoading(true);

  //     const { data } = await axios.get(
  //       `${API}/api/blogs?page=${currentPage}&limit=9`,
  //     );

  //     setBlogs(data.blogs || []);
  //     setTotalPages(data.totalPages || 1);
  //     setTotalBlogs(data.total || 0);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  /* =====================================
    Delete Blog
===================================== */

  const deleteBlog = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?",
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${API}/api/blogs/${id}`);

      fetchBlogs(page);
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Unable to delete blog.");
    }
  };

  /* =====================================
    Toggle Featured
===================================== */

  const toggleFeatured = async (id) => {
    try {
      await axios.patch(`${API}/api/blogs/${id}/featured`);

      fetchBlogs(page);
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Unable to update featured.");
    }
  };

  /* =====================================
    Toggle Status
===================================== */

  const toggleStatus = async (blog) => {
    try {
      const newStatus = blog.status === "Published" ? "Draft" : "Published";

      await axios.patch(`${API}/api/blogs/${blog._id}/status`, {
        status: newStatus,
      });

      fetchBlogs(page);
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Unable to update status.");
    }
  };

  /* =====================================
     SEARCH
  ===================================== */

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) =>
      blog.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [blogs, search]);

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}

      <div className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-blue-100 p-4">
              <FileText size={28} className="text-blue-600" />
            </div>

            <div>
              <h1 className="text-3xl font-bold">Blogs</h1>

              <p className="text-gray-500">Manage all blogs</p>
            </div>
          </div>

          <Link
            href="/dashboard/blog/create"
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
          >
            <Plus size={18} />
            Create Blog
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl p-6">
        <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-3.5 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search blog..."
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

            <div className="mb-6 grid gap-6 md:grid-cols-4">
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <p className="text-sm text-gray-500">Total Blogs</p>

                <h2 className="mt-2 text-3xl font-bold text-blue-600">
                  {totalBlogs}
                </h2>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <p className="text-sm text-gray-500">Published</p>

                <h2 className="mt-2 text-3xl font-bold text-green-600">
                  {/* {blogs.filter((b) => b.status === "Published").length} */}
                  {stats.published}
                </h2>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <p className="text-sm text-gray-500">Draft</p>

                <h2 className="mt-2 text-3xl font-bold text-yellow-600">
                  {/* {blogs.filter((b) => b.status === "Draft").length} */}
                  {stats.draft}
                </h2>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <p className="text-sm text-gray-500">Featured</p>

                <h2 className="mt-2 text-3xl font-bold text-purple-600">
                  {/* {blogs.filter((b) => b.featured).length} */}
                  {stats.featured}
                </h2>
              </div>
            </div>

            {/* =====================================
    Blog Table
===================================== */}

            <div className="overflow-hidden rounded-md bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-6 py-4 text-left">Banner</th>

                      <th className="px-6 py-4 text-left">Title</th>

                      <th className="px-6 py-4 text-left">Category</th>

                      <th className="px-6 py-4 text-left">Author</th>

                      <th className="px-6 py-4 text-center">Status</th>

                      <th className="px-6 py-4 text-center">Featured</th>

                      <th className="px-6 py-4 text-center">Reading</th>

                      <th className="px-6 py-4 text-center">Views</th>

                      <th className="px-6 py-4 text-center">Published</th>

                      <th className="px-6 py-4 text-center">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredBlogs.length === 0 ? (
                      <tr>
                        <td
                          colSpan={10}
                          className="py-16 text-center text-gray-500"
                        >
                          No blogs found.
                        </td>
                      </tr>
                    ) : (
                      filteredBlogs.map((blog) => (
                        <tr
                          key={blog._id}
                          className="border-t hover:bg-gray-50"
                        >
                          {/* Banner */}

                          <td className="px-6 py-4">
                            {blog.bannerImage ? (
                              <img
                                src={blog.bannerImage}
                                alt={blog.title}
                                className="h-14 w-20 rounded-lg object-cover"
                              />
                            ) : (
                              <div className="flex h-14 w-20 items-center justify-center rounded-lg bg-gray-100">
                                <FileText size={24} className="text-gray-400" />
                              </div>
                            )}
                          </td>

                          {/* Title */}

                          <td className="px-6 py-4">
                            <h3 className="font-semibold">{blog.title}</h3>
                          </td>

                          {/* Category */}

                          <td className="px-6 py-4">
                            {blog.category?.name || "-"}
                          </td>

                          {/* Author */}

                          <td className="px-6 py-4">
                            {blog.author?.name || "-"}
                          </td>

                          {/* Status */}

                          <td className="px-6 py-4 text-center">
                            <button
                              onClick={() => toggleStatus(blog)}
                              className={`rounded-full px-4 py-1 text-xs font-semibold transition ${
                                blog.status === "Published"
                                  ? "bg-green-100 text-green-700 hover:bg-green-200"
                                  : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                              }`}
                            >
                              {blog.status}
                            </button>
                          </td>

                          {/* Featured */}

                          <td className="px-6 py-4 text-center">
                            <button
                              onClick={() => toggleFeatured(blog._id)}
                              className={`rounded-full px-4 py-1 text-xs font-semibold transition ${
                                blog.featured
                                  ? "bg-purple-100 text-purple-700 hover:bg-purple-200"
                                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                              }`}
                            >
                              {blog.featured ? "Featured" : "Normal"}
                            </button>
                          </td>

                          {/* Reading */}

                          <td className="px-6 py-4 text-center">
                            {blog.readingTime} min
                          </td>

                          {/* Views */}

                          <td className="px-6 py-4 text-center">
                            {blog.views}
                          </td>

                          {/* Published */}

                          <td className="px-6 py-4 text-center text-sm text-gray-500">
                            {blog.publishedAt
                              ? new Date(blog.publishedAt).toLocaleDateString()
                              : "-"}
                          </td>

                          {/* Actions */}

                          <td className="px-6 py-4">
                            <div className="flex justify-center gap-3">
                              <Link
                                href={`/dashboard/blog/edit/${blog._id}`}
                                className="rounded-lg bg-blue-50 px-4 py-2 text-blue-600 hover:bg-blue-100"
                              >
                                <Pencil size={16} />
                              </Link>

                              <button
                                onClick={() => deleteBlog(blog._id)}
                                className="rounded-lg bg-red-50 px-4 py-2 text-red-600 transition hover:bg-red-100"
                              >
                                <Trash2 size={16} />
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

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6 flex items-center justify-between rounded-2xl bg-white px-6 py-4 shadow-sm">
                {/* Showing */}
                <p className="text-sm text-gray-500">
                  Showing page {page} of {totalPages}
                </p>

                <div className="flex items-center gap-2">
                  {/* Previous */}
                  <button
                    onClick={() => setPage((prev) => prev - 1)}
                    disabled={page === 1}
                    className="rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Previous
                  </button>

                  {/* Page Numbers */}
                  {Array.from({ length: totalPages }, (_, index) => {
                    const pageNumber = index + 1;

                    return (
                      <button
                        key={pageNumber}
                        onClick={() => setPage(pageNumber)}
                        className={`h-10 w-10 rounded-lg text-sm font-medium transition ${
                          page === pageNumber
                            ? "bg-blue-600 text-white"
                            : "border text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}

                  {/* Next */}
                  <button
                    onClick={() => setPage((prev) => prev + 1)}
                    disabled={page === totalPages}
                    className="rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BlogList;
