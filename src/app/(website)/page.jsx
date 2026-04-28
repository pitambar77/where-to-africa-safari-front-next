import Home from "@/pages/homePage/Home";

async function getTrips() {
  const res = await fetch(`${process.env.API_BASE}/api/trips`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch trips");

  return res.json();
}

export default async function Page() {
  const trips = await getTrips();

  return <Home trips={trips} />;
}
