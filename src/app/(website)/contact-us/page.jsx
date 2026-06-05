import { getContactus } from "@/lib/getContactus";
import ContactUs from "@/pages/ContactUs/ContactUs";

export async function generateMetadata() {
  const data = await getContactus();

  if (!data) {
    return { title: "Page Not Found" };
  }

  // Fetch SEO from SEO collection
  const seoRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/api/seo?referenceId=${data._id}&referenceType=contactus`,
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
        "http://wheretoafrica.manoramaseoservice.com/contact-us",
    },

    openGraph: {
      title: seo?.metaTitle || data.title,

      description: seo?.metaDescription || data.subtitle,

      images: [seo?.ogImage || data.image],

      url:
        seo?.canonicalUrl ||
        "http://wheretoafrica.manoramaseoservice.com/contact-us",
    },
  };
}

export default async function Page() {
  const landing = await getContactus();

  // Fetch SEO again for schema injection
  const seoRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/api/seo?referenceId=${landing._id}&referenceType=contactus`,
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

      <ContactUs />
    </>
  );
}
