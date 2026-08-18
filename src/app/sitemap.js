const BASE_URL = "https://whereto.africa";

export default async function sitemap() {
  try {
    const res = await fetch(`${process.env.API_BASE}/api/sitemap`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return [];
    }

    const data = await res.json();

    // --------------------------------
    // STATIC PAGES
    // --------------------------------

    const staticUrls = data.staticPages.map((page) => ({
      url: `${BASE_URL}${page.path}`,
      lastModified: new Date(),
    }));

    // --------------------------------
    // DESTINATIONS
    // /botswana
    // /kenya
    // --------------------------------

    const destinationUrls = data.destinations.map((destination) => ({
      url: `${BASE_URL}/${destination.slug}`,
      lastModified: destination.updatedAt
        ? new Date(destination.updatedAt)
        : new Date(),
    }));

    // --------------------------------
    // REGIONS
    // /botswana/okavango-delta
    // --------------------------------

    const regionUrls = data.regions.map((region) => ({
      url: `${BASE_URL}/${region.destinationSlug}/${region.slug}`,
      lastModified: region.updatedAt ? new Date(region.updatedAt) : new Date(),
    }));

    // --------------------------------
    // PACKAGES / TRIPS
    // /package/botswana-safari
    // --------------------------------

    const packageUrls = data.trips.map((trip) => ({
      url: `${BASE_URL}/package/${trip.slug}`,
      lastModified: trip.updatedAt ? new Date(trip.updatedAt) : new Date(),
    }));

    // --------------------------------
    // EXPERIENCES
    // /experience/wildlife-safari
    // --------------------------------

    const experienceUrls = data.experiences.map((experience) => ({
      url: `${BASE_URL}/experience/${experience.slug}`,
      lastModified: experience.updatedAt
        ? new Date(experience.updatedAt)
        : new Date(),
    }));

    // --------------------------------
    // ACCOMMODATIONS
    // /accommodation/lodge-name
    // --------------------------------

    const accommodationUrls = data.accommodations.map((accommodation) => ({
      url: `${BASE_URL}/accommodation/${accommodation.slug}`,
      lastModified: accommodation.updatedAt
        ? new Date(accommodation.updatedAt)
        : new Date(),
    }));

    // --------------------------------
    // BLOGS
    // /blog/blog-slug
    // --------------------------------

    const blogUrls = data.blogs.map((blog) => ({
      url: `${BASE_URL}/blog/${blog.slug}`,
      lastModified: blog.updatedAt ? new Date(blog.updatedAt) : new Date(),
    }));

    // --------------------------------
    // TRAVEL GUIDES
    // /travel-guide/guide-slug
    // --------------------------------

    const travelGuideUrls = (data.travelGuides || []).map((guide) => ({
      url: `${BASE_URL}/travel-guide/${guide.slug}`,
      lastModified: guide.updatedAt ? new Date(guide.updatedAt) : new Date(),
    }));

    // --------------------------------
    // FINAL SITEMAP
    // --------------------------------

    return [
      ...staticUrls,
      ...destinationUrls,
      ...regionUrls,
      ...packageUrls,
      ...experienceUrls,
      ...accommodationUrls,
      ...blogUrls,
      ...travelGuideUrls,
    ];
  } catch (error) {
    console.error("Sitemap generation error:", error);

    return [];
  }
}
