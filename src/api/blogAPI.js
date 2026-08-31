

const API_URL = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8003";

/* ===========================
   Featured Blogs
=========================== */

export async function getFeaturedBlogs(limit = 5) {
  try {
    const res = await fetch(`${API_URL}/api/blogs/featured?limit=${limit}`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch featured blogs");

    const data = await res.json();

    return data.blogs || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

/* ===========================
   Blogs
=========================== */

export async function getBlogs({
  page = 1,
  limit = 6,
  search = "",
  category = "",
  author = "",
  status = "Published",
}) {
  try {
    const params = new URLSearchParams();

    params.append("page", page);
    params.append("limit", limit);

    if (search) params.append("search", search);
    if (category) params.append("category", category);
    if (author) params.append("author", author);
    if (status) params.append("status", status);

    const res = await fetch(`${API_URL}/api/blogs?${params.toString()}`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch blogs");

    return await res.json();
  } catch (error) {
    console.error(error);

    return {
      blogs: [],
      total: 0,
      page: 1,
      totalPages: 1,
      hasMore: false,
    };
  }
}

/* ===========================
   Single Blog
=========================== */

// export async function getBlogBySlug(slug) {
//   try {
//     const res = await fetch(`${API_URL}/api/blogs/${slug}`, {
//       cache: "no-store",
//     });

//     if (!res.ok) return null;

//     const data = await res.json();

//     return data.blog;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// }

export async function getBlogBySlug(slug) {
  try {
    const res = await fetch(`${API_URL}/api/blogs/${slug}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;

    return await res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

/* ===========================
   Related Blogs
=========================== */

export async function getRelatedBlogs(slug, limit = 6) {
  try {
    const res = await fetch(
      `${API_URL}/api/blogs/${slug}/related?limit=${limit}`,
      {
        cache: "no-store",
      },
    );

    if (!res.ok) return [];

    const data = await res.json();

    return data.blogs || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}
