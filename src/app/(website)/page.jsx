import { getHomepage } from "@/lib/getHomepage";
import Home from "@/pages/homePage/Home";

async function getTrips() {
  const res = await fetch(`${process.env.API_BASE}/api/trips`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch trips");

  return res.json();
}

// export async function generateMetadata() {
//   const data = await getHomepage();

//   if (!data) {
//     return { title: "Page Not Found" };
//   }

//   // Fetch SEO from SEO collection
//   const seoRes = await fetch(
//     `${process.env.NEXT_PUBLIC_API_BASE}/api/seo?referenceId=${data._id}&referenceType=home`,
//     { next: { revalidate: 300 } },
//   );

//   const seo = await seoRes.json();

//   return {
//     title: seo?.metaTitle || data.title,

//     description: seo?.metaDescription || data.subtitle,

//     keywords: seo?.keywords || "home ",

//     alternates: {
//       canonical:
//         seo?.canonicalUrl || "http://wheretoafrica.manoramaseoservice.com",
//     },

//     openGraph: {
//       title: seo?.metaTitle || data.title,

//       description: seo?.metaDescription || data.subtitle,

//       images: [seo?.ogImage || data.image],

//       url: seo?.canonicalUrl || "http://wheretoafrica.manoramaseoservice.com",
//     },
//   };
// }

export default async function Page() {
  const landing = await getHomepage();

  const trips = await getTrips();

  // Fetch SEO again for schema injection
  const seoRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/api/seo?referenceId=${landing._id}&referenceType=home`,
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
      <Home trips={trips} />
    </>
  );
}
