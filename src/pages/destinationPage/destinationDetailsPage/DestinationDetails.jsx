"use client";

import { useRouter } from "next/navigation";
import JourneyOverview from "@/components/JourneyOverview";
import Overview from "@/components/Overview";
import ParticularDestinationPackage from "@/components/ParticularDestinationPackage";
import SafariCard from "@/components/SafariCard";
import ThingsToDoSection from "@/components/ThingsToDo/ThingsToDoSection";
import AccommodationGrid from "@/components/AccommodationGrid";
import BestTimeToVisitSection from "@/components/BestTimeToVisit/BestTimeToVisitSection";
import JourneysCarousel from "../../Accomodation/AccomodationDetails/JourneysCarousel";

const DestinationDetails = ({
  region,
  destination,
  destinationSlug,
  regionSlug,
}) => {
  const router = useRouter();

  // ✅ Related regions (exclude current region)
  const relatedRegions =
    destination?.regions?.filter((r) => r.slug !== regionSlug) || [];

  // ✅ Destructure region data
  const {
    name,
    subtitle,
    days,
    highlight,
    facility,
    culture,
    level,
    levelsec,
    levelthird,
    levelfourth,
    overviewTitle,
    overviewSubTitle,
    overviewDescription,
    description,
    image,
    trips,
    experiences,
    accommodations,
    thingstodo, // ✅ ADD THIS
  } = region;

  const thingsToDo = thingstodo?.[0];
  const thingsToDoSections = thingsToDo?.section || [];
  const thingsToDoDescription = thingsToDo?.thingstododescription || [];

  const whenToVisit = region?.whenvisit?.[0];

  const whenToVisitMonths =
    whenToVisit?.months?.map((month) => ({
      name: month.monthname,
      season: month.title,
      description: month.description?.map((d) => d.content) || [],
    })) || [];

  const allTrips = [
    ...new Map(
      (destination?.regions?.flatMap((r) => r.trips || []) || []).map(
        (trip) => [trip._id, trip],
      ),
    ).values(),
  ];

  return (
    <>
      <JourneyOverview
        subtitle={subtitle}
        title={name}
        description={description || "Discover this incredible safari region."}
        image={
          image ||
          "https://www.discoverafrica.com/wp-content/uploads/2021/12/kzn_game_2.jpg"
        }
        days={facility}
        price={culture}
        journeyType={days}
        timeOfYear={highlight}
        // cities={region?.destinationId?.name || ""}
        level={level}
        levelsec={levelsec}
        levelthird={levelthird}
        levelfourth={levelfourth}
      />

      <div className="bg-[#f6f1e9]">
        {/* ✅ Overview Section */}
        <Overview
          title={overviewTitle}
          subtitle={overviewSubTitle}
          description={overviewDescription}
        />

        {allTrips?.length > 0 && (
          <ParticularDestinationPackage
            data={allTrips.map((trip) => ({
              id: trip.slug, // ✅ use slug for navigation
              title: trip.title,
              image: trip.image,
              nights: trip.duration,
              price: trip.price,
              country: destination?.name || "",
            }))}
            CardComponent={SafariCard}
            onCardClick={(slug) => router.push(`/package/${slug}`)}
            emptyMessage="No safaris found."
          />
        )}
      </div>

      {thingsToDoSections.length > 0 && (
        <ThingsToDoSection
          title={thingsToDo?.thinstodoTitle}
          // subtitle={subtitle}
          descriptions={thingsToDoDescription} // ✅ NEW (dynamic)
          staticData={thingsToDoSections.map((item) => ({
            // slug: item.slug || item.title?.toLowerCase().replace(/\s+/g, "-"),
            title: item.title,
            image:
              item.image ||
              "https://www.discoverafrica.com/wp-content/uploads/2021/12/kzn_game_2.jpg",
          }))}
          // onCardClick={(slug) => navigate(`/experience/${slug}`)}
        />
      )}

      {/* ✅ Accommodations Section */}
      {accommodations?.length > 0 && (
        <AccommodationGrid
          title="Overnight Accommodations"
          subtitle={`Places to Stay in ${name}`}
          data={accommodations.map((acc) => ({
            id: acc.slug,
            image: acc.bannerImages?.[0],
            nights: `Nights ${acc.nightsStay || ""}`,
            title: acc.name,
            location: acc.location,
            tag: acc.accommodationType,
          }))}
          onCardClick={(slug) => router.push(`/accommodation/${slug}`)}
        />
      )}

      {whenToVisitMonths.length > 0 && (
        <BestTimeToVisitSection
          title={whenToVisit.heading || `When to visit ${name}`}
          subtitle="Best time to go"
          staticMonths={whenToVisitMonths}
        />
      )}

      {relatedRegions.length > 0 && (
        <JourneysCarousel
          journeys={relatedRegions.filter((region) => {
            const name = region.name?.toLowerCase().trim() || "";

            return (
              !/package/i.test(name) &&
              !name.endsWith("accommodation") &&
              !name.endsWith("accomodation") // 👈 in case spelling variation
            );
          })}
          destinationSlug={destinationSlug}
        />
      )}
    </>
  );
};

export default DestinationDetails;
