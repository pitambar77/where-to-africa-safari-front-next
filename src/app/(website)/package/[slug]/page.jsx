import SafariItinerary from "@/pages/safariItinerary/SafariItinerary";

async function getTrip(slug) {
  const res = await fetch(`${process.env.API_BASE}/api/trips/slug/${slug}`, {
    cache: "no-store", // or revalidate: 60
  });

  if (!res.ok) return null;

  return res.json();
}

/* ================= FETCH SEO ================= */

// async function getSEO(tripId) {
//   const res = await fetch(
//     `${process.env.API_BASE}/api/seo?referenceId=${tripId}&referenceType=trips`,
//     {
//       cache: "no-store",
//     },
//   );

//   if (!res.ok) return null;

//   return res.json();
// }

async function getSEO(tripId) {
  const res = await fetch(
    `${process.env.API_BASE}/api/seo?referenceId=${tripId}&referenceType=trips`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    console.error("SEO API Error:", res.status);
    return null;
  }

  const contentType = res.headers.get("content-type");

  if (!contentType?.includes("application/json")) {
    console.error("SEO API returned HTML instead of JSON");
    return null;
  }

  return await res.json();
}

/* ================= SEO METADATA ================= */

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const trip = await getTrip(slug);

  if (!trip) {
    return {
      title: "Package Not Found",
    };
  }

  const seo = await getSEO(trip._id.toString());

  return {
    /* BASIC SEO */
    title: seo?.metaTitle || trip.title,

    description: seo?.metaDescription || trip.description || "",

    keywords: seo?.keywords || "",

    /* CANONICAL */
    alternates: {
      canonical:
        seo?.canonicalUrl ||
        `https://wheretoafrica.manoramaseoservice.com/package/${slug}`,
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
      title: seo?.metaTitle || trip.title,

      description: seo?.metaDescription || trip.description || "",

      url:
        seo?.canonicalUrl ||
        `https://wheretoafrica.manoramaseoservice.com/package/${slug}`,

      siteName: "Where to Africa",

      images: [
        {
          url: seo?.ogImage || trip.image || "",

          width: 1200,
          height: 630,

          alt: seo?.metaTitle || trip.title,
        },
      ],

      type: "website",
    },

    /* TWITTER */
    twitter: {
      card: "summary_large_image",

      title: seo?.metaTitle || trip.title,

      description: seo?.metaDescription || trip.description || "",

      images: [seo?.ogImage || trip.image || ""],
    },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;

  const trip = await getTrip(slug);

  if (!trip) {
    return <div className="text-center py-20">Not Found</div>;
  }

  /* FETCH SEO */
  const seo = await getSEO(trip._id.toString());

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
      <SafariItinerary trip={trip} />
    </>
  );
}
