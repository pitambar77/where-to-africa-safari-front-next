import PackageLanding from "@/pages/safariItinerary/PackageLanding";

async function getDestinations() {
  const res = await fetch(
    `${process.env.API_BASE}/api/destinations`,
    {
      next: { revalidate: 60 }, // ISR
    }
  );

  if (!res.ok) return [];

  return res.json();
}

export default async function Page() {
  const destinationData = await getDestinations();

  return <PackageLanding destinationData={destinationData} />;
}