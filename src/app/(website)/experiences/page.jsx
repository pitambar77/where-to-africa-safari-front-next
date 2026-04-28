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

export default async function Page() {
  const { destinations, experiences } = await getData();

  return (
    <ExperienceLanding destinations={destinations} experiences={experiences} />
  );
}
