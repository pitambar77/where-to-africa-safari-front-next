"use client"
import React from "react";
import { useRouter } from "next/navigation";
import ActivitiesSection from "./ActivitiesSection";
// import PricingAvailabilitySection from "./PricingAvailabilitySection";
import GallerySection from "./GallerySection";
import AccordionSection from "./AccordionSection";
import JourneysCarousel from "./JourneysCarousel";
import RelatedCard from "../../../components/RelatedCard";
import JourneyOverview from "../../../components/JourneyOverview";

const AccomodationDetails = ({ accommodation, related }) => {

 const router = useRouter();

  if (!accommodation) return null;

  return (
    <>
      <JourneyOverview
        title={accommodation.bannerTitle}
        subtitle={accommodation.bannerSubtitle}
        description={accommodation.bannerDescription}
        image={accommodation.bannerImages}
        days={accommodation.nightsStay}
        price={accommodation.pricePerPerson}
        journeyType={accommodation.location}
        timeOfYear={accommodation.accommodationType}
        // cities={accommodation.location}
        level={"Ratings"}
        levelsec={"Price Per Person"}
        levelthird={" Type"}
        levelfourth={" Category "}
      />

      <ActivitiesSection
        title={accommodation.overviewTitle}
        subtitle={accommodation.overviewSubtitle}
        description={accommodation.overviewDescription}
        activities={accommodation.amenities}
      />
      {/* <PricingAvailabilitySection /> */}
      <GallerySection
        title="Gallery"
        subtitle={accommodation.galleyheading}
        description={accommodation.galleryDescription}
        images={accommodation.gallery}
      />
      {/* <AccordionSection /> */}
      <AccordionSection
        aboutBooking={accommodation.aboutBooking}
        requirements={accommodation.requirements}
      />
      <JourneysCarousel />
      {/* <RelatedCard /> */}
      <RelatedCard
        data={related}
        onCardClick={(slug) => router.push(`/accommodation/${slug}`)}
      />
    </>
  );
};

export default AccomodationDetails;
