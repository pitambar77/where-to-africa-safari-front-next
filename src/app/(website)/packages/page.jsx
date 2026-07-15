import { getItinenarylanding } from "@/lib/getItinenarylanding";
import PackageLanding from "@/pages/safariItinerary/PackageLanding";

async function getDestinations() {
  const res = await fetch(`${process.env.API_BASE}/api/destinations`, {
    next: { revalidate: 60 }, // ISR
  });

  if (!res.ok) return [];

  return res.json();
}

export async function generateMetadata() {
  const data = await getItinenarylanding();

  if (!data) {
    return { title: "Page Not Found" };
  }

  // Fetch SEO from SEO collection
  const seoRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/api/seo?referenceId=${data._id}&referenceType=itinenarylanding`,
    { next: { revalidate: 300 } },
  );

  // const seo = await seoRes.json();
  let seo = null;

if (seoRes.ok) {
  seo = await seoRes.json();
}

  return {
    title: seo?.metaTitle || data.title,

    description: seo?.metaDescription || data.subtitle,

    keywords: seo?.keywords || "Corevalue, enquiry",

    alternates: {
      canonical:
        seo?.canonicalUrl ||
        "http://wheretoafrica.manoramaseoservice.com/packages",
    },

    openGraph: {
      title: seo?.metaTitle || data.title,

      description: seo?.metaDescription || data.subtitle,

      images: [seo?.ogImage || data.image],

      url:
        seo?.canonicalUrl ||
        "http://wheretoafrica.manoramaseoservice.com/packages",
    },
  };
}

export default async function Page() {
  const landing = await getItinenarylanding();
  if (!landing) {
    return <div>No data found</div>;
  }

  const destinationData = await getDestinations();

  // Fetch SEO again for schema injection
  const seoRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/api/seo?referenceId=${landing._id}&referenceType=itinenarylanding`,
    { next: { revalidate: 300 } },
  );

  // const seo = await seoRes.json();
  let seo = null;

  if (seoRes.ok) {
    seo = await seoRes.json();
  } else {
    console.error("SEO API Error:", seoRes.status);
  }

  return (
    <>
      {/* Schema from Admin */}
      {seo?.schemaMarkup && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(seo.schemaMarkup),
          }}
        />
      )}
      <PackageLanding destinationData={destinationData}/>
    </>
  );
}
