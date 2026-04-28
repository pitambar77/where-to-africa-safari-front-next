import SafariItinerary from "@/pages/safariItinerary/SafariItinerary";

async function getTrip(slug) {
  const res = await fetch(
    `${process.env.API_BASE}/api/trips/slug/${slug}`,
    {
      cache: "no-store", // or revalidate: 60
    }
  );

  if (!res.ok) return null;

  return res.json();
}

export default async function Page({ params }) {
  const { slug } = await params;

  const trip = await getTrip(slug);

  if (!trip) {
    return <div className="text-center py-20">Not Found</div>;
  }


  return <SafariItinerary trip={trip} />;
}