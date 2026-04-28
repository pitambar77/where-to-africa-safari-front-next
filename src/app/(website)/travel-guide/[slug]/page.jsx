import TravelguideDetails from "@/pages/TravelGuide/TravelguideDetails";


async function getBlog(slug) {
  const res = await fetch(
    `${process.env.API_BASE}/api/blog/slug/${slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;

  return res.json();
}

export default async function Page({ params }) {
  const { slug } = await params;

  const blog = await getBlog(slug);

  if (!blog) {
    return <div className="text-center py-20">Not Found</div>;
  }

  return <TravelguideDetails blog={blog} />;
}