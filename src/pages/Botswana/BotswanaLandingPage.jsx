"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "../../api/axiosInstance";

import "swiper/css";
import "swiper/css/navigation";

import Banner from "../../components/Banner";
import Overview from "../../components/Overview";
import DestinationGrid from "../../components/DestinationGrid";
import PackageCardGridSection from "../../components/PackageCardGridSection";
import SafariCard from "../../components/SafariCard";
import ExperienceCarousel from "../../components/ExperienceCarousel";

import TravelguideSection from "../../components/TravelguideSection";

import PageNotFound from "../PageNotFound.jsx";
import AccommodationSlider from "../../components/AccommodationSlider.jsx";

const BotswanaLandingPage = ({ slug, destination }) => {
  const [travelGuides, setTravelGuides] = useState([]);
  const [activeRegion, setActiveRegion] = useState(0);
  const [visibleCount, setVisibleCount] = useState();

  const router = useRouter();

  const accommodationRef = useRef(null);

  // ✅ Fetch blogs only (keep small client fetch)
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await axiosInstance.get("/api/blog");

        const filtered = data.filter(
          (blog) =>
            blog.category?.trim().toLowerCase() ===
            destination.name?.trim().toLowerCase(),
        );

        setTravelGuides(filtered);
      } catch (error) {
        console.error(error);
      }
    };

    if (destination?.name) {
      fetchBlogs();
    }
  }, [destination]);

  if (!destination) {
    return <PageNotFound />;
  }

  // ✅ Destructure the fields properly from the destination object
  const { hero, regions, trips, experiences, accommodations } = destination;

  const regionAccommodations =
    regions
      ?.filter(
        (region) => region.accommodations && region.accommodations.length > 0,
      )
      .map((region) => ({
        regionName: region.name,
        slug: region.slug,
        accommodations: region.accommodations,
      })) || [];

  // ✅ Flatten region-based nested data
  // const allTrips = regions?.flatMap((region) => region.trips || []) || [];
  const allTrips = [
    ...new Map(
      (regions?.flatMap((region) => region.trips || []) || []).map((trip) => [
        trip._id,
        trip,
      ]),
    ).values(),
  ];

  // const allExperiences =
  //   regions?.flatMap((region) => region.experiences || []) || [];
  const allExperiences = [
    ...new Map(
      (regions?.flatMap((region) => region.experiences || []) || []).map(
        (exp) => [exp.slug, exp], // use slug as unique key
      ),
    ).values(),
  ];
  const allAccommodations =
    regions?.flatMap((region) => region.accommodations || []) || [];

  // ✅ Flatten region-based blogs (travel guides)
  const allTravelGuides =
    regions?.flatMap((region) => region.blogs || []) || [];

  // ✅ Handle experiences data safely
  const experienceData = experiences?.[0];

  const journeys = [
    {
      image: experienceData?.bannerImage,
      title: experienceData?.bannerTitle || "Experience the Wild",
      description:
        experienceData?.bannerDescription || "Unforgettable experiences await.",
      link: "#",
    },
    ...(experienceData?.highlights?.map((h) => ({
      image: h.image,
      title: h.name,
      description: h.description,
      link: "#",
    })) || []),
  ];

  const totalAccommodations =
    regionAccommodations[activeRegion]?.accommodations?.length || 0;

  return (
    <div>
      {/* ===== Hero Banner ===== */}
      <Banner
        title={hero?.title || "Explore Botswana"}
        subtitle={hero?.subtitle || "Discover wildlife and natural beauty"}
        imageUrl={
          hero?.bannerImage ||
          "https://www.discoverafrica.com/wp-content/uploads/2021/12/kzn_game_2.jpg"
        }
      />

      {/* ===== Overview Section ===== */}
      <div className="bg-[#faf5e9]">
        <Overview
          title={hero?.overviewTitle || "Welcome to Safari"}
          subtitle={
            hero?.overviewSubTitle ||
            "A place where nature, culture, and experiences come together to create unforgettable journeys. "
          }
          description={
            hero?.overviewDescription ||
            " This destination offers a unique blend of natural beauty, diverse landscapes, and meaningful travel experiences. From remarkable scenery and wildlife to local traditions and welcoming communities, every visit reveals something special."
          }
        />

        {/* ===== Regions Section ===== */}

        {regions?.length > 0 && (
          <DestinationGrid
            data={regions
              .filter((region) => {
                const name = region.name?.toLowerCase() || "";

                return (
                  !name.includes("package") &&
                  !name.includes("accommodation") &&
                  !name.includes("accomodation")
                );
              })
              .map((region) => ({
                name: region.name,
                image: region.image,
                alt: region.description,
                path: `/${slug}/${region.slug}`,
              }))}
            title=""
          />
        )}
      </div>

      {/* ===== Trips Section ===== */}

      {allTrips?.length > 0 && (
        <PackageCardGridSection
          title="Your Journeys"
          subtitle={`${destination?.name || "Botswana"} Trips to Inspire`}
          data={allTrips.map((trip) => ({
            id: trip.slug, // 👈 IMPORTANT CHANGE
            title: trip.title,
            country: destination?.name,
            image: trip.image,
            price: trip.price,
            nights: trip.duration,
          }))}
          CardComponent={SafariCard}
          onCardClick={(slug) => router.push(`/package/${slug}`)}
          emptyMessage="No trips found."
        />
      )}

      {/* ===== Experience Carousel ===== */}

      {allExperiences?.length > 0 && (
        <ExperienceCarousel
          title="Our Experiences"
          description={`Explore ${destination.name} Experiences`}
          data={allExperiences.map((exp) => ({
            id: exp.slug, // must exist
            image: exp.bannerImage,
            title: exp.bannerTitle,
          }))}
          onCardClick={(slug) => router.push(`/experience/${slug}`)}
        />
      )}

      <div ref={accommodationRef}>
        <AccommodationSlider
          regions={regionAccommodations}
          destination={destination}
          visibleCount={visibleCount}
          navigate={router}
        />
      </div>

      {/* ===== Accommodations Section ===== */}

      {travelGuides.length > 0 && (
        <TravelguideSection
          heading="Journey Collection"
          subheading={`Travel Insights for ${destination?.name}`}
          journeys={travelGuides.map((blog) => ({
            image: blog.thumbnail,
            title: blog.title,
            description:
              blog.sections
                ?.find((s) => s.type === "paragraph")
                ?.text?.slice(0, 100) + "...",
            link: `/travel-guide/${blog.slug}`,
          }))}
        />
      )}
    </div>
  );
};

export default BotswanaLandingPage;
