import AccomodationDetails from "@/pages/Accomodation/AccomodationDetails/AccomodationDetails";


async function getAccommodation(slug) {
  const res = await fetch(
    `${process.env.API_BASE}/api/accommodation/slug/${slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;

  return res.json();
}

async function getRelated(destination, currentSlug) {
  const res = await fetch(
    `${process.env.API_BASE}/api/accommodation?destination=${destination}`,
    { cache: "no-store" }
  );

  if (!res.ok) return [];

  const data = await res.json();

  return data
    .filter((item) => item.slug !== currentSlug)
    .slice(0, 6);
}

export default async function Page({ params }) {
  const { slug } = await params;

  const accommodation = await getAccommodation(slug);

  if (!accommodation) {
    return <div className="text-center py-20">Not Found</div>;
  }

  const related = await getRelated(
    accommodation.destination,
    accommodation.slug
  );

  return (
    <AccomodationDetails
      accommodation={accommodation}
      related={related}
    />
  );
}