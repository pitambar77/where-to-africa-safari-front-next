import { notFound } from "next/navigation";

import DestinationDetails from "@/pages/destinationPage/destinationDetailsPage/DestinationDetails";

async function getRegion(destinationSlug, regionSlug) {
  const res = await fetch(
    `${process.env.API_BASE}/api/destinations/${destinationSlug}/regions/${regionSlug}`,
    {
      next: { revalidate: 60 }, // ISR caching
    },
  );

  if (!res.ok) return null;

  return res.json();
}

async function getDestination(destinationSlug) {
  const res = await fetch(
    `${process.env.API_BASE}/api/destinations/slug/${destinationSlug}`,
    {
      next: { revalidate: 60 },
    },
  );

  if (!res.ok) return null;

  return res.json();
}

export default async function Page({ params }) {
  const { destinationSlug, regionSlug } = await params;

  // ✅ Fetch in parallel (faster)
  const [region, destination] = await Promise.all([
    getRegion(destinationSlug, regionSlug),
    getDestination(destinationSlug),
  ]);

  // ✅ THIS is the correct 404 trigger
  if (!region || !destination) {
    notFound();
  }

  return (
    <DestinationDetails
      region={region}
      destination={destination}
      destinationSlug={destinationSlug}
      regionSlug={regionSlug}
    />
  );
}
