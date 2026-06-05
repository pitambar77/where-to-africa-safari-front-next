import { getAccomodationlanding } from "@/lib/getAccomodationlanding";
import AccomodationLanding from "@/pages/Accomodation/LandingPage/AccomodationLanding";

async function getDestinations() {
  const res = await fetch(`${process.env.API_BASE}/api/destinations`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch");

  return res.json();
}

export async function generateMetadata() {
  const data = await getAccomodationlanding();

  if (!data) {
    return { title: "Page Not Found" };
  }

  // Fetch SEO from SEO collection
  const seoRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/api/seo?referenceId=${data._id}&referenceType=accommodationlanding`,
    { next: { revalidate: 300 } },
  );

  const seo = await seoRes.json();

  return {
    title: seo?.metaTitle || data.title,

    description: seo?.metaDescription || data.subtitle,

    keywords: seo?.keywords || "Corevalue, enquiry",

    alternates: {
      canonical:
        seo?.canonicalUrl ||
        "http://wheretoafrica.manoramaseoservice.com/accommodations",
    },

    openGraph: {
      title: seo?.metaTitle || data.title,

      description: seo?.metaDescription || data.subtitle,

      images: [seo?.ogImage || data.image],

      url:
        seo?.canonicalUrl ||
        "http://wheretoafrica.manoramaseoservice.com/accommodations",
    },
  };
}

export default async function Page() {
  const landing = await getAccomodationlanding();

  const destinations = await getDestinations();

  // Fetch SEO again for schema injection
  const seoRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/api/seo?referenceId=${landing._id}&referenceType=accommodationlanding`,
    { next: { revalidate: 300 } },
  );

  const seo = await seoRes.json();

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
      <AccomodationLanding destinationData={destinations} />
    </>
  );
}
