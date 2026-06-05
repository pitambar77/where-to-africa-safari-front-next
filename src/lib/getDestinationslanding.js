export async function getDestinationlanding() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/api/destinations`,
    {
      next: { revalidate: 300 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch destinations");
  }

  return res.json();
}