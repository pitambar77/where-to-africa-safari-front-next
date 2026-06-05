import { getAboutus } from "@/lib/getAboutus";
import AboutUs from "@/pages/AboutUs/AboutUs";

export async function generateMetadata() {
  const data = await getAboutus();

  if (!data) {
    return { title: "Page Not Found" };
  }

  // Fetch SEO from SEO collection
  const seoRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/api/seo?referenceId=${data._id}&referenceType=aboutus`,
    { next: { revalidate: 300 } },
  );

  const seo = await seoRes.json();

  return {
    title: seo?.metaTitle || data.title,

    description: seo?.metaDescription || data.subtitle,

    keywords: seo?.keywords || "about ",

    alternates: {
      canonical:
        seo?.canonicalUrl ||
        "http://wheretoafrica.manoramaseoservice.com/about-us",
    },

    openGraph: {
      title: seo?.metaTitle || data.title,

      description: seo?.metaDescription || data.subtitle,

      images: [seo?.ogImage || data.image],

      url:
        seo?.canonicalUrl ||
        "http://wheretoafrica.manoramaseoservice.com/about-us",
    },
  };
}

export default async function Page() {
  const landing = await getAboutus();

  // Fetch SEO again for schema injection
  const seoRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/api/seo?referenceId=${landing._id}&referenceType=aboutus`,
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
      <AboutUs />
    </>
  );
}
