import BotswanaLandingPage from "@/pages/Botswana/BotswanaLandingPage";
import PageNotFound from "@/pages/PageNotFound";

async function getDestination(slug) {
  const res = await fetch(
    `${process.env.API_BASE}/api/destinations/slug/${slug}`,
    {
      next: { revalidate: 60 },
    },
  );

  if (!res.ok) return null;

  return res.json();
}

// async function getSEO(destinationId) {
//   const res = await fetch(
//     `${process.env.API_BASE}/api/seo?referenceId=${destinationId}&referenceType=destinations`,
//     {
//       next: { revalidate: 300 },
//     },
//   );

//   if (!res.ok) return null;

//   const data = await res.json();

//   return data?.data || data;
// }

async function getSEO(destinationId) {
  const res = await fetch(
    `${process.env.API_BASE}/api/seo?referenceId=${destinationId}&referenceType=destinations`,
    {
      next: { revalidate: 300 },
    },
  );

  if (!res.ok) return null;

  const contentType = res.headers.get("content-type");

  if (!contentType?.includes("application/json")) {
    console.error(`Expected JSON but got ${contentType} from ${res.url}`);
    return null;
  }

  const data = await res.json();

  return data?.data || data;
}

export async function generateMetadata({ params }) {
  const { destinationSlug } = await params;

  const destination = await getDestination(destinationSlug);

  if (!destination) {
    return {
      title: "Destination Not Found",
    };
  }

  const seo = await getSEO(destination._id.toString());

  return {
    /* ================= BASIC SEO ================= */

    title: seo?.metaTitle || destination.name,

    description: seo?.metaDescription || destination.hero?.description || "",

    keywords: seo?.keywords || "",

    /* ================= CANONICAL ================= */

    alternates: {
      canonical:
        seo?.canonicalUrl ||
        `https://whereto.africa/${destinationSlug}`,
    },

    /* ================= ROBOTS ================= */

    robots: seo?.noIndex
      ? {
          index: false,
          follow: false,
          nocache: true,
        }
      : {
          index: true,
          follow: true,
        },

    /* ================= OPEN GRAPH ================= */

    openGraph: {
      title: seo?.metaTitle || destination.name,

      description: seo?.metaDescription || destination.hero?.description || "",

      url:
        seo?.canonicalUrl ||
        `https://whereto.africa/${destinationSlug}`,

      siteName: "Where to Africa",

      images: [
        {
          url: seo?.ogImage || destination.hero?.bannerImage || "",

          width: 1200,
          height: 630,
          alt: seo?.metaTitle || destination.name,
        },
      ],

      locale: "en_US",

      type: "website",
    },

    /* ================= TWITTER ================= */

    twitter: {
      card: "summary_large_image",

      title: seo?.metaTitle || destination.name,

      description: seo?.metaDescription || destination.hero?.description || "",

      images: [seo?.ogImage || destination.hero?.bannerImage || ""],
    },

    /* ================= EXTRA ================= */

    metadataBase: new URL("https://whereto.africa"),
  };
}

export default async function Page({ params }) {
  const { destinationSlug } = await params;

  const destination = await getDestination(destinationSlug);

  if (!destination) {
   return <PageNotFound/>
  }

  /* Fetch SEO */
  const seo = await getSEO(destination._id);

  return (
    <>
      {/* Schema Markup */}
      {seo?.schemaMarkup && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(seo.schemaMarkup),
          }}
        />
      )}

      <BotswanaLandingPage destination={destination} slug={destinationSlug} />
    </>
  );
}
