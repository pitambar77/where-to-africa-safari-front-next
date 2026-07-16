import AccomodationDetails from "@/pages/Accomodation/AccomodationDetails/AccomodationDetails";

async function getAccommodation(slug) {
  const res = await fetch(
    `${process.env.API_BASE}/api/accommodation/slug/${slug}`,
    { cache: "no-store" },
  );

  if (!res.ok) return null;

  return res.json();
}

async function getRelated(destination, currentSlug) {
  const res = await fetch(
    `${process.env.API_BASE}/api/accommodation?destination=${destination}`,
    { cache: "no-store" },
  );

  if (!res.ok) return [];

  const data = await res.json();

  return data.filter((item) => item.slug !== currentSlug).slice(0, 6);
}

/* ================= FETCH SEO ================= */

async function getSEO(accommodationId) {
  const res = await fetch(
    `${process.env.API_BASE}/api/seo?referenceId=${accommodationId}&referenceType=accommodation`,
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

  const accommodation = await getAccommodation(slug);

  if (!accommodation) {
    return {
      title: "Accommodation Not Found",
    };
  }

  const seo = await getSEO(accommodation._id.toString());

  return {
    /* BASIC SEO */
    title: seo?.metaTitle || accommodation.title,

    description: seo?.metaDescription || accommodation.description || "",

    keywords: seo?.keywords || "",

    /* CANONICAL */
    alternates: {
      canonical:
        seo?.canonicalUrl ||
        `https://whereto.africa/accommodation/${slug}`,
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
      title: seo?.metaTitle || accommodation.title,

      description: seo?.metaDescription || accommodation.description || "",

      url:
        seo?.canonicalUrl ||
        `https://whereto.africa/accommodation/${slug}`,

      siteName: "Where to Africa",

      images: [
        {
          url: seo?.ogImage || accommodation.image || "",

          width: 1200,
          height: 630,

          alt: seo?.metaTitle || accommodation.title,
        },
      ],

      type: "website",
    },

    /* TWITTER */
    twitter: {
      card: "summary_large_image",

      title: seo?.metaTitle || accommodation.title,

      description: seo?.metaDescription || accommodation.description || "",

      images: [seo?.ogImage || accommodation.image || ""],
    },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;

  const accommodation = await getAccommodation(slug);

  if (!accommodation) {
    return <div className="text-center py-20">Not Found</div>;
  }

  const related = await getRelated(
    accommodation.destination,
    accommodation.slug,
  );

  /* FETCH SEO */
  const seo = await getSEO(accommodation._id.toString());

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

      <AccomodationDetails accommodation={accommodation} related={related} />
    </>
  );
}
