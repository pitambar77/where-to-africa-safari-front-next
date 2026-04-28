import AccomodationLanding from "@/pages/Accomodation/LandingPage/AccomodationLanding";

async function getDestinations() {
  const res = await fetch(
    `${process.env.API_BASE}/api/destinations`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Failed to fetch");

  return res.json();
}

export default async function Page() {
  const destinations = await getDestinations();

  return <AccomodationLanding destinationData={destinations} />;
}