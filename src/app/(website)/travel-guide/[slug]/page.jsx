import TravelguideDetails from "@/pages/TravelGuide/TravelguideDetails";

async function getBlog(slug) {
  const res = await fetch(`${process.env.API_BASE}/api/blog/slug/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;

  return res.json();
}

/* ================= FETCH SEO ================= */

async function getSEO(blogId) {
  const res = await fetch(
    `${process.env.API_BASE}/api/seo?referenceId=${blogId}&referenceType=blog`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) return null;

  return res.json();
}

/* ================= SEO METADATA ================= */

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const blog = await getBlog(slug);

  if (!blog) {
    return {
      title: "Travel Guide Not Found",
    };
  }

  const seo = await getSEO(blog._id.toString());

  return {
    /* BASIC SEO */
    title: seo?.metaTitle || blog.title,

    description: seo?.metaDescription || blog.description || "",

    keywords: seo?.keywords || "",

    /* CANONICAL */
    alternates: {
      canonical:
        seo?.canonicalUrl ||
        `https://wheretoafrica.manoramaseoservice.com/travel-guide/${slug}`,
    },

    /* ROBOTS */
    robots: seo?.noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
        },

    /* OPEN GRAPH */
    openGraph: {
      title: seo?.metaTitle || blog.title,

      description: seo?.metaDescription || blog.description || "",

      url:
        seo?.canonicalUrl ||
        `https://wheretoafrica.manoramaseoservice.com/travel-guide/${slug}`,

      siteName: "Where to Africa",

      images: [
        {
          url: seo?.ogImage || blog.image || "",

          width: 1200,
          height: 630,

          alt: seo?.metaTitle || blog.title,
        },
      ],

      type: "article",
    },

    /* TWITTER */
    twitter: {
      card: "summary_large_image",

      title: seo?.metaTitle || blog.title,

      description: seo?.metaDescription || blog.description || "",

      images: [seo?.ogImage || blog.image || ""],
    },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;

  const blog = await getBlog(slug);

  if (!blog) {
    return <div className="text-center py-20">Not Found</div>;
  }

  /* FETCH SEO */
  const seo = await getSEO(blog._id.toString());

  return (
    <>
      {seo?.schemaMarkup && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(seo.schemaMarkup),
          }}
        />
      )}
      <TravelguideDetails blog={blog} />
    </>
  );
}
