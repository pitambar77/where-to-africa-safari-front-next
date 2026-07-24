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
  // region,
  // destination,
  // destinationSlug,
  // regionSlug,
  region,
  destination,
  destinationSlug,
  regionSlug,
  regionTrips = [],
}) => {
  const router = useRouter();

  // ✅ HARD GUARD (CRITICAL FOR NEXT.JS BUILD)
  if (!region) {
    return null; // or <div>Loading...</div>
  }

  // ✅ Safe destructuring
  const {
    name = "",
    subtitle = "",
    days = "",
    highlight = "",
    facility = "",
    culture = "",
    level = "",
    levelsec = "",
    levelthird = "",
    levelfourth = "",
    overviewTitle = "",
    overviewSubTitle = "",
    overviewDescription = "",
    description = "",
    image = "",
    trips = [],
    experiences = [],
    accommodations = [],
    thingstodo = [],
    whenvisit = [],
  } = region || {};

  // ✅ Related regions safe
  const relatedRegions =
    destination?.regions?.filter((r) => r.slug !== regionSlug) || [];

  const thingsToDo = thingstodo?.[0];
  const thingsToDoSections = thingsToDo?.section || [];
  const thingsToDoDescription = thingsToDo?.thingstododescription || [];

  const whenToVisit = whenvisit?.[0];

  const whenToVisitMonths =
    whenToVisit?.months?.map((month) => ({
      name: month.monthname,
      season: month.title,
      description: month.description?.map((d) => d.content) || [],
    })) || [];

  // const allTrips = [
  //   ...new Map(
  //     (destination?.regions?.flatMap((r) => r.trips || []) || []).map(
  //       (trip) => [trip._id, trip],
  //     ),
  //   ).values(),
  // ];

 

  return (
    <>
      <JourneyOverview
        subtitle={subtitle}
        title={name}
        description={description || "Discover this incredible safari region."}
        image={image}
        days={facility}
        price={culture}
        journeyType={days}
        timeOfYear={highlight}
        level={level}
        levelsec={levelsec}
        levelthird={levelthird}
        levelfourth={levelfourth}
      />

      <div className="bg-[#f6f1e9]">
        <Overview
          title={overviewTitle}
          subtitle={overviewSubTitle}
          description={overviewDescription}
        />

        {regionTrips.length > 0 && (
          <ParticularDestinationPackage
            data={regionTrips.map((trip) => ({
              id: trip.slug,
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
          descriptions={thingsToDoDescription}
          staticData={thingsToDoSections.map((item) => ({
            title: item.title,
            image: item.image,
          }))}
        />
      )}

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
          title={whenToVisit?.heading || `When to visit ${name}`}
          subtitle="Best time to go"
          staticMonths={whenToVisitMonths}
        />
      )}

      {relatedRegions.length > 0 && (
        <JourneysCarousel
          journeys={relatedRegions.filter((region) => {
            const n = region.name?.toLowerCase().trim() || "";
            return (
              !/package/i.test(n) &&
              !n.endsWith("accommodation") &&
              !n.endsWith("accomodation")
            );
          })}
          destinationSlug={destinationSlug}
        />
      )}
    </>
  );
};

export default DestinationDetails;
