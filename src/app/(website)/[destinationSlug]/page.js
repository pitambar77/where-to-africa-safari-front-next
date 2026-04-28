
import BotswanaLandingPage from "@/pages/Botswana/BotswanaLandingPage";
import PageNotFound from "@/pages/PageNotFound";



async function getDestination(slug) {
  const res = await fetch(`${process.env.API_BASE}/api/destinations/slug/${slug}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) return null;

  return res.json();
}

export default async function Page({ params }) {
  const { destinationSlug } = await params;

  const destination = await getDestination(destinationSlug);


  if (!destination) {
      PageNotFound();
    }

  return <BotswanaLandingPage destination={destination} slug={destinationSlug} />;
}
