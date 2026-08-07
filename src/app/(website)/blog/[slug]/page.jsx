import { notFound } from "next/navigation";

import { getBlogBySlug, getRelatedBlogs } from "@/api/blogAPI.js";

import BlogHero from "@/pages/Blog/BlogHero";
import BlogContent from "@/pages/Blog/BlogContent";
import RelatedBlogs from "@/pages/Blog/RelatedBlogs";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const data = await getBlogBySlug(slug);

  if (!data?.blog) {
    return {
      title: "Blog Not Found",
    };
  }

  const { blog } = data;

  return {
    title: blog.seo?.metaTitle || blog.title,

    description: blog.seo?.metaDescription || blog.excerpt,

    keywords: blog.seo?.keywords || [],

    alternates: {
      canonical: blog.seo?.canonicalUrl,
    },

    openGraph: {
      title: blog.seo?.metaTitle || blog.title,
      description: blog.seo?.metaDescription || blog.excerpt,
      url: blog.seo?.canonicalUrl,
      images: [
        {
          url: blog.seo?.ogImage || blog.bannerImage,
        },
      ],
      type: "article",
    },

    twitter: {
      card: "summary_large_image",
      title: blog.seo?.metaTitle || blog.title,
      description: blog.seo?.metaDescription || blog.excerpt,
      images: [blog.seo?.ogImage || blog.bannerImage],
    },
  };
}

export default async function BlogDetailsPage({ params }) {
  const { slug } = await params;

  const data = await getBlogBySlug(slug);

  if (!data?.blog) {
    notFound();
  }

  const { blog, relatedBlogs } = data;

  return (
    <>
      <BlogHero blog={blog} />

      <BlogContent blog={blog} />

      <RelatedBlogs blogs={relatedBlogs} />
    </>
  );
}
