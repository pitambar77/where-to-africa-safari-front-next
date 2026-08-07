"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Save, Eye, Upload, Loader2, ArrowLeft } from "lucide-react";

import { useRouter } from "next/navigation";
import axios from "axios";
import BlogInformation from "./BlogInformation";
import BlogSEO from "./BlogSEO";
import ContentBuilder from "./ContentBuilder";
import PublishCard from "./PublishCard";

/* =====================================================
   INITIAL BLOG
===================================================== */

const initialBlog = {
  title: "",
  excerpt: "",
  bannerImage: null,

  category: "",
  author: "",

  featured: false,

  status: "Draft",

  publishedAt: "",

  seo: {
    metaTitle: "",
    metaDescription: "",
    keywords: [],
    canonicalUrl: "",
    ogImage: "",
  },

  content: [],
};

/* =====================================================
   CREATE BLOG
===================================================== */

const API = process.env.NEXT_PUBLIC_API_BASE;

const CreateBlog = ({ editMode = false, blogData = null }) => {
  const router = useRouter();

  /* =====================================================
     STATES
  ===================================================== */ 

  const [blog, setBlog] = useState(initialBlog);

  const [categories, setCategories] = useState([]);

  const [authors, setAuthors] = useState([]);

  const [loading, setLoading] = useState(false);

  const [pageLoading, setPageLoading] = useState(true);

  const [uploading, setUploading] = useState(false);

  const [errors, setErrors] = useState({});

  /* =====================================================
     FETCH CATEGORY + AUTHOR
  ===================================================== */

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setPageLoading(true);

      const [categoryRes, authorRes] = await Promise.all([
        axios.get(`${API}/api/blog-category`),
        axios.get(`${API}/api/blog-author`),
      ]);

      setCategories(categoryRes.data.categories || []);

      setAuthors(authorRes.data.authors || []);
    } catch (error) {
      console.error(error);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    if (!blogData) return;

    setBlog({
      title: blogData.title || "",
      excerpt: blogData.excerpt || "",
      bannerImage: blogData.bannerImage || null,

      category: blogData.category?._id || "",
      author: blogData.author?._id || "",

      featured: blogData.featured || false,

      status: blogData.status || "Draft",

      publishedAt: blogData.publishedAt
        ? blogData.publishedAt.slice(0, 16)
        : "",

      seo: {
        metaTitle: blogData.seo?.metaTitle || "",
        metaDescription: blogData.seo?.metaDescription || "",
        keywords: blogData.seo?.keywords || [],
        canonicalUrl: blogData.seo?.canonicalUrl || "",
        ogImage: blogData.seo?.ogImage || "",
      },

      content: blogData.content || [],
    });
  }, [blogData]);

  /* =====================================================
     HANDLE CHANGE
  ===================================================== */

  const handleChange = (name, value) => {
    setBlog((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =====================================================
     HANDLE SEO
  ===================================================== */

  const handleSEOChange = (name, value) => {
    setBlog((prev) => ({
      ...prev,
      seo: {
        ...prev.seo,
        [name]: value,
      },
    }));
  };

  /* =====================================================
     CONTENT UPDATE
  ===================================================== */

  const handleContentChange = (blocks) => {
    setBlog((prev) => ({
      ...prev,
      content: blocks,
    }));
  };

  /* =====================================================
     BANNER
  ===================================================== */

  const handleBannerChange = (file) => {
    setBlog((prev) => ({
      ...prev,
      bannerImage: file,
    }));
  };

  /* =====================================================
     VALIDATION
  ===================================================== */

  const validate = () => {
    const validation = {};

    if (!blog.title.trim()) {
      validation.title = "Title is required";
    }

    if (!blog.excerpt.trim()) {
      validation.excerpt = "Excerpt is required";
    }

    if (!blog.category) {
      validation.category = "Category is required";
    }

    if (!blog.author) {
      validation.author = "Author is required";
    }

    if (!blog.bannerImage) {
      validation.bannerImage = "Banner image required";
    }

    setErrors(validation);

    return Object.keys(validation).length === 0;
  };

  /* =====================================================
     READING TIME
  ===================================================== */

  const readingTime = useMemo(() => {
    let words = 0;

    blog.content.forEach((block) => {
      if (block.content) {
        words += block.content.replace(/<[^>]*>/g, "").split(/\s+/).length;
      }
    });

    return Math.max(1, Math.ceil(words / 200));
  }, [blog.content]);

  /* =====================================================
     SAVE BLOG
     (implemented Part 5)
  ===================================================== */
  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      const formData = new FormData();

      // Basic Information
      formData.append("title", blog.title);
      formData.append("excerpt", blog.excerpt);
      formData.append("category", blog.category);
      formData.append("author", blog.author);
      formData.append("status", blog.status);
      formData.append("featured", blog.featured);
      formData.append("publishedAt", blog.publishedAt);

      // Banner Image
      if (blog.bannerImage instanceof File) {
        formData.append("bannerImage", blog.bannerImage);
      }

      // SEO
      formData.append("seo", JSON.stringify(blog.seo));

      // Content Blocks
      formData.append("content", JSON.stringify(blog.content));

      const url = editMode
        ? `${API}/api/blogs/${blogData._id}`
        : `${API}/api/blogs`;

      const method = editMode ? "put" : "post";

      await axios({
        method,
        url,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Blog created successfully!");

      router.push("/dashboard/blog");
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Unable to create blog.");
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     PREVIEW
  ===================================================== */

  const previewBlog = () => {
    localStorage.setItem("blog-preview", JSON.stringify(blog));

    window.open("/admin/blog/preview", "_blank");
  };

  /* =====================================================
     LOADING
  ===================================================== */

  if (pageLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
      </div>
    );
  }

  /* =====================================================
     UI
  ===================================================== */

  return (
    <div className="min-h-screen bg-slate-100">
      {/* HEADER */}

      <div className="sticky top-0 z-30 border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between p-5">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="rounded-lg border p-2 hover:bg-gray-100"
            >
              <ArrowLeft size={18} />
            </button>

            <div>
              <h1 className="text-3xl font-bold">
  {editMode ? "Edit Blog" : "Create Blog"}
</h1>

              <p className="text-gray-500">
                Build beautiful content with blocks.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={previewBlog}
              className="flex items-center gap-2 rounded-lg border px-5 py-2"
            >
              <Eye size={18} />
              Preview
            </button>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <Save size={18} />
              )}
              {editMode ? "Update Blog" : "Save Blog"}
            </button>
          </div>
        </div>
      </div>

      {/* PAGE */}

      <div className="mx-auto grid max-w-7xl grid-cols-12 gap-6 p-6">
        {/* LEFT */}

        <div className="col-span-12 lg:col-span-8 space-y-6">
          {/* Part 2 */}

          <BlogInformation
            blog={blog}
            errors={errors}
            categories={categories}
            authors={authors}
            onChange={handleChange}
            onBannerChange={handleBannerChange}
          />

          {/* Part 3 */}

          <BlogSEO seo={blog.seo} onChange={handleSEOChange} />

          {/* Part 4 */}

          <ContentBuilder
            blocks={blog.content}
            onChange={handleContentChange}
          />
        </div>

        {/* RIGHT */}

        <div className="col-span-12 lg:col-span-4">
          {/* Part 5 */}

          <PublishCard
            blog={blog}
            readingTime={readingTime}
            loading={loading}
            uploading={uploading}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
