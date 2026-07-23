const API = process.env.NEXT_PUBLIC_API_BASE;

export async function getFooter() {
  try {
    const res = await fetch(`${API}/api/footer`, {
      next: {
        revalidate: 60,
      },
    });

    if (!res.ok) return null;

    const data = await res.json();

    return data.footer;
  } catch (error) {
    console.error("Footer Error:", error);
    return null;
  }
}