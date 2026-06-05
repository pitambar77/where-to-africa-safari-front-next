
export async function getAboutus() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE}/api/aboutus`,
      {
        next: { revalidate: 300 },
      }
    );

    const data = await res.json();

    return data?.[0] || null;
  } catch (error) {
    console.error(error);
    return null;
  }
}