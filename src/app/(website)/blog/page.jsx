"use client";

import { useEffect, useMemo, useState } from "react";

import { getBlogs, getFeaturedBlogs } from "@/api/blogAPI.js";
import HeroSlider from "@/pages/Blog/HeroSlider";
import BlogFilter from "@/pages/Blog/BlogFilter";
import BlogGrid from "@/pages/Blog/BlogGrid";
import LoadMore from "@/pages/Blog/LoadMore";

const PAGE_SIZE = 6;

export default function BlogPage() {
  const [featuredBlogs, setFeaturedBlogs] = useState([]);

  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [filters, setFilters] = useState({
    search: "",
    category: "",
    author: "",
    month: "",
  });

  // Fetch Featured Blogs
  useEffect(() => {
    const fetchFeaturedBlogs = async () => {
      try {
        const data = await getFeaturedBlogs();
        setFeaturedBlogs(data || []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchFeaturedBlogs();
  }, []);

  // Fetch Blogs
  useEffect(() => {
    fetchBlogs(1, true);
  }, []);

  const fetchBlogs = async (pageNumber, reset = false) => {
    try {
      setLoading(true);

      const data = await getBlogs({
        page: pageNumber,
        limit: PAGE_SIZE,
      });

      const newBlogs = data.blogs || [];

      if (reset) {
        setBlogs(newBlogs);
      } else {
        setBlogs((prev) => [...prev, ...newBlogs]);
      }

      setHasMore(newBlogs.length === PAGE_SIZE);
      setPage(pageNumber);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // Client Side Filtering
  useEffect(() => {
    let result = [...blogs];

    if (filters.search) {
      result = result.filter((blog) =>
        blog.title?.toLowerCase().includes(filters.search.toLowerCase()),
      );
    }

    if (filters.category) {
      result = result.filter(
        (blog) => blog.category?.name === filters.category,
      );
    }

    if (filters.author) {
      result = result.filter((blog) => blog.author?.name === filters.author);
    }

    if (filters.month) {
      result = result.filter((blog) => {
        const month = new Date(blog.publishedAt).toLocaleString("default", {
          month: "long",
        });

        return month === filters.month;
      });
    }

    setFilteredBlogs(result);
  }, [blogs, filters]);

  // Dropdown Options
  const categories = useMemo(() => {
    return [...new Set(blogs.map((b) => b.category?.name).filter(Boolean))];
  }, [blogs]);

  const authors = useMemo(() => {
    return [...new Set(blogs.map((b) => b.author?.name).filter(Boolean))];
  }, [blogs]);

  const months = useMemo(() => {
    return [
      ...new Set(
        blogs.map((blog) =>
          new Date(blog.publishedAt).toLocaleString("default", {
            month: "long",
          }),
        ),
      ),
    ];
  }, [blogs]);

  const clearFilters = () => {
    setFilters({
      search: "",
      category: "",
      author: "",
      month: "",
    });
  };

  return (
    <main className="bg-white">
      {/* Page Title */}
      <section className="py-14">
        <div className="container mx-auto px-4">
          <h1 className="text-center font-cormorant text-6xl text-[#636363]">
            The Blog
          </h1>
        </div>
      </section>

      {/* Hero Slider */}
      <section className="pb-14">
        <div className="container mx-auto px-4">
          <HeroSlider blogs={featuredBlogs} />
        </div>
      </section>

      {/* Filters */}
      <section className="pb-8">
        <div className="container mx-auto px-4">
          <BlogFilter
            filters={filters}
            setFilters={setFilters}
            categories={categories}
            authors={authors}
            months={months}
            clearFilters={clearFilters}
          />
        </div>
      </section>

      {/* Blog Count */}
      <section className="pb-8">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm font-semibold font-quicksand tracking-widest uppercase text-[#ab8c51]">
            {filteredBlogs.length} Articles
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="pb-12">
        <div className="container mx-auto px-4">
          <BlogGrid blogs={filteredBlogs} loading={loading} />
        </div>
      </section>

      {/* Load More */}
      {hasMore && (
        <section className="pb-20">
          <div className=" container mx-auto px-4 flex justify-center">
            <LoadMore loading={loading} onClick={() => fetchBlogs(page + 1)} />
          </div>
        </section>
      )}
    </main>
  );
}
