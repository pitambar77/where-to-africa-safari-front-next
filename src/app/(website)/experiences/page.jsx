import { getExperienceLanding } from "@/lib/getExperiencelanding";
import ExperienceLanding from "@/pages/experiencePage/ExperienceLanding";

async function getData() {
  const [destRes, expRes] = await Promise.all([
    fetch(`${process.env.API_BASE}/api/destinations`, {
      cache: "no-store",
    }),
    fetch(`${process.env.API_BASE}/api/experience`, {
      cache: "no-store",
    }),
  ]);

  if (!destRes.ok || !expRes.ok) return { destinations: [], experiences: [] };

  const [destinations, experiences] = await Promise.all([
    destRes.json(),
    expRes.json(),
  ]);

  return { destinations, experiences };
}

export async function generateMetadata() {
  const data = await getExperienceLanding();

  if (!data) {
    return { title: "Page Not Found" };
  }

  // Fetch SEO from SEO collection
  const seoRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/api/seo?referenceId=${data._id}&referenceType=experiencelanding`,
    { next: { revalidate: 300 } },
  );

  const seo = await seoRes.json();

  return {
    title: seo?.metaTitle || data.title,

    description: seo?.metaDescription || data.subtitle,

    keywords: seo?.keywords || "Corevalue, enquiry",

    alternates: {
      canonical:
        seo?.canonicalUrl || "http://wheretoafrica.manoramaseoservice.com/experiences",
    },

    openGraph: {
      title: seo?.metaTitle || data.title,

      description: seo?.metaDescription || data.subtitle,

      images: [seo?.ogImage || data.image],

      url: seo?.canonicalUrl || "http://wheretoafrica.manoramaseoservice.com/experiences",
    },
  };
}

export default async function Page() {
  const landing = await getExperienceLanding();

  const { destinations, experiences } = await getData();

  // Fetch SEO again for schema injection
  const seoRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/api/seo?referenceId=${landing._id}&referenceType=experiencelanding`,
    { next: { revalidate: 300 } },
  );

  const seo = await seoRes.json();

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
     <ExperienceLanding destinations={destinations} experiences={experiences} />
    </>
   
  );
}
