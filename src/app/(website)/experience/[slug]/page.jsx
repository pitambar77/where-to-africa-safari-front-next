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

export default async function Page({ params }) {
  const { slug } = await params;

  const [experience, destinationName] = await Promise.all([
    getExperience(slug),
    getDestinationName(slug),
  ]);

  if (!experience) return <div>Not Found</div>;

  return (
    <ExperienceDetails
      experience={experience}
      destinationName={destinationName}
    />
  );
}
