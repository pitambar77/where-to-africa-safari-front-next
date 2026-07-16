import ExperienceDetails from "@/pages/experiencePage/experienceDetails/ExperienceDetails";

async function getExperience(slug) {
  const res = await fetch(
    `${process.env.API_BASE}/api/experience/slug/${slug}`,
    { cache: "no-store" },
  );

  if (!res.ok) return null;
  return res.json();
}

async function getDestinationName(slug) {
  const res = await fetch(`${process.env.API_BASE}/api/destinations`, {
    cache: "no-store",
  });

  if (!res.ok) return "";

  const destinations = await res.json();

  for (const dest of destinations) {
    for (const region of dest.regions || []) {
      const found = (region.experiences || []).find((exp) => exp.slug === slug);

      if (found) return dest.name;
    }
  }

  return "";
}

/* ================= FETCH SEO ================= */

async function getSEO(experienceId) {
  const res = await fetch(
    `${process.env.API_BASE}/api/seo?referenceId=${experienceId}&referenceType=experience`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) return null;

  return res.json();
}

/* ================= SEO METADATA ================= */

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const experience = await getExperience(slug);

  if (!experience) {
    return {
      title: "Experience Not Found",
    };
  }

  const seo = await getSEO(experience._id.toString());

  return {
    /* BASIC SEO */
    title: seo?.metaTitle || experience.title,

    description: seo?.metaDescription || experience.description || "",

    keywords: seo?.keywords || "",

    /* CANONICAL */
    alternates: {
      canonical:
        seo?.canonicalUrl ||
        `https://whereto.africa/experience/${slug}`,
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
      title: seo?.metaTitle || experience.title,

      description: seo?.metaDescription || experience.description || "",

      url:
        seo?.canonicalUrl ||
        `https://whereto.africa/experience/${slug}`,

      siteName: "Where to Africa",

      images: [
        {
          url: seo?.ogImage || experience.image || "",

          width: 1200,
          height: 630,

          alt: seo?.metaTitle || experience.title,
        },
      ],

      type: "website",
    },

    /* TWITTER */
    twitter: {
      card: "summary_large_image",

      title: seo?.metaTitle || experience.title,

      description: seo?.metaDescription || experience.description || "",

      images: [seo?.ogImage || experience.image || ""],
    },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;

  const [experience, destinationName] = await Promise.all([
    getExperience(slug),
    getDestinationName(slug),
  ]);

  if (!experience) return <div>Not Found</div>;

  /* FETCH SEO */
  const seo = await getSEO(experience._id.toString());

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

      <ExperienceDetails
        experience={experience}
        destinationName={destinationName}
      />
    </>
  );
}
