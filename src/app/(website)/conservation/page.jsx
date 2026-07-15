import { getConservation } from "@/lib/getConservation";
import ImpactPage from "@/pages/Impact/ImpactPage";

export async function generateMetadata() {
  const data = await getConservation();

  if (!data) {
    return { title: "Page Not Found" };
  }

  // Fetch SEO from SEO collection
  const seoRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/api/seo?referenceId=${data._id}&referenceType=conservation`,
    { next: { revalidate: 300 } },
  );

  // const seo = await seoRes.json();

  let seo = null;

  if (seoRes.ok) {
    const contentType = seoRes.headers.get("content-type");

    if (contentType?.includes("application/json")) {
      seo = await seoRes.json();
    } else {
      console.error("SEO API returned non-JSON");
    }
  }

  return {
    title: seo?.metaTitle || data.title,

    description: seo?.metaDescription || data.subtitle,

    keywords: seo?.keywords || "about ",

    alternates: {
      canonical:
        seo?.canonicalUrl ||
        "http://wheretoafrica.manoramaseoservice.com/conservation",
    },

    openGraph: {
      title: seo?.metaTitle || data.title,

      description: seo?.metaDescription || data.subtitle,

      images: [seo?.ogImage || data.image],

      url:
        seo?.canonicalUrl ||
        "http://wheretoafrica.manoramaseoservice.com/conservation",
    },
  };
}

export default async function Page() {
  // const landing = await getConservation();

  // // Fetch SEO again for schema injection
  // const seoRes = await fetch(
  //   `${process.env.NEXT_PUBLIC_API_BASE}/api/seo?referenceId=${landing._id}&referenceType=conservation`,
  //   { next: { revalidate: 300 } },
  // );

  // const seo = await seoRes.json();

  const landing = await getConservation();

  if (!landing) {
    return <div>No data found</div>;
  }

  const seoRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/api/seo?referenceId=${landing._id}&referenceType=conservation`,
    { next: { revalidate: 300 } },
  );

  let seo = null;

  if (seoRes.ok) {
    const contentType = seoRes.headers.get("content-type");

    if (contentType?.includes("application/json")) {
      seo = await seoRes.json();
    } else {
      console.error("SEO API returned non-JSON");
    }
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
      <ImpactPage />
    </>
  );
}
