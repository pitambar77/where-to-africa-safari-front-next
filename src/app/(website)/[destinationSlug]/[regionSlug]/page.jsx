import { notFound } from "next/navigation";

import DestinationDetails from "@/pages/destinationPage/destinationDetailsPage/DestinationDetails";

async function getRegion(destinationSlug, regionSlug) {
  const res = await fetch(
    `${process.env.API_BASE}/api/destinations/${destinationSlug}/regions/${regionSlug}`,
    {
      next: { revalidate: 60 }, // ISR caching
    },
  );

  if (!res.ok) return null;

  return res.json();
}

async function getDestination(destinationSlug) {
  const res = await fetch(
    `${process.env.API_BASE}/api/destinations/slug/${destinationSlug}`,
    {
      next: { revalidate: 60 },
    },
  );

  if (!res.ok) return null;

  return res.json();
}

/* ================= FETCH SEO ================= */

async function getSEO(regionId) {
  const res = await fetch(
    `${process.env.API_BASE}/api/seo?referenceId=${regionId}&referenceType=regions`,
    {
      next: { revalidate: 300 },
    },
  );

  if (!res.ok) return null;

  return res.json();
}

/* ================= SEO METADATA ================= */

export async function generateMetadata({ params }) {
  const { destinationSlug, regionSlug } = await params;

  const region = await getRegion(destinationSlug, regionSlug);

  if (!region) {
    return {
      title: "Region Not Found",
    };
  }

  const seo = await getSEO(region._id.toString());

  return {
    /* BASIC */
    title: seo?.metaTitle || region.name,

    description: seo?.metaDescription || region.description || "",

    keywords: seo?.keywords || "",

    /* CANONICAL */
    alternates: {
      canonical:
        seo?.canonicalUrl ||
        `https://wheretoafrica.manoramaseoservice.com/${destinationSlug}/${regionSlug}`,
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
      title: seo?.metaTitle || region.name,

      description: seo?.metaDescription || region.description || "",

      url:
        seo?.canonicalUrl ||
        `https://wheretoafrica.manoramaseoservice.com/${destinationSlug}/${regionSlug}`,

      siteName: "Where to Africa",

      images: [
        {
          url: seo?.ogImage || region.image || "",

          width: 1200,
          height: 630,

          alt: seo?.metaTitle || region.name,
        },
      ],

      type: "website",
    },

    /* TWITTER */
    twitter: {
      card: "summary_large_image",

      title: seo?.metaTitle || region.name,

      description: seo?.metaDescription || region.description || "",

      images: [seo?.ogImage || region.image || ""],
    },
  };
}

export default async function Page({ params }) {
  const { destinationSlug, regionSlug } = await params;

  // ✅ Fetch in parallel (faster)
  const [region, destination] = await Promise.all([
    getRegion(destinationSlug, regionSlug),
    getDestination(destinationSlug),
  ]);

  // ✅ THIS is the correct 404 trigger
  if (!region || !destination) {
    notFound();
  }

  /* FETCH SEO */
  const seo = await getSEO(region._id.toString());

  return (
    <>
      {/* SCHEMA MARKUP */}
      {seo?.schemaMarkup && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(seo.schemaMarkup),
          }}
        />
      )}
      <DestinationDetails
        region={region}
        destination={destination}
        destinationSlug={destinationSlug}
        regionSlug={regionSlug}
      />
    </>
  );
}
