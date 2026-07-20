"use client";
import React, { useEffect, useState } from "react";
import Overview from "../../../components/Overview";
import Include from "./Include";

import GameDriveHighlights from "./GameDriveHighlights";

import JourneysCarousel from "../../Accomodation/AccomodationDetails/JourneysCarousel";
import JourneyOverview from "../../../components/JourneyOverview";

import GallerySection from "../../Accomodation/AccomodationDetails/GallerySection";

import FloatingButton from "../../../components/FloatingButton.jsx";

import PopForm from "../../../components/PopForm.jsx";

const ExperienceDetails = ({ experience, destinationName }) => {
  const [openInquiry, setOpenInquiry] = useState(false);

  useEffect(() => {
    if (openInquiry) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [openInquiry]);

  if (!experience) return null;

  return (
    <>
      <JourneyOverview
        subtitle="Experience"
        title={experience.bannerTitle}
        description={experience.bannerDescription}
        image={experience.bannerImage}
        days={experience.experienceInfo?.days}
        price={`${experience.experienceInfo?.pricePerPerson}`}
        journeyType={experience.experienceInfo?.journeyType}
        timeOfYear={experience.experienceInfo?.location}
        cities={experience.experienceInfo?.location}
        level={"Duration"}
        levelsec={"Price"}
        levelthird={"Min/Max person"}
        levelfourth={`Timing`}
      />

      <div className="bg-[#f6f1e9]">
        <Overview
          title={experience.overview.title}
          subtitle={experience.overview.subTitle}
          description={experience.overview.description}
        />
        <Include
          includes={experience.includes}
          bookNowUrl={experience.bookNowUrl}
        />
      </div>
      {/* <GameDriveOption 
      gameDrives={experience.gameDrives}   /> */}
      {/* <PricingAvailabilitySection /> */}
      <GameDriveHighlights
        gamehighLight={experience.highlights}
        sectionTitle={experience.highlightheading}
      />

      <GallerySection
        title="Gallery"
        subtitle={experience.imageheading}
        description={experience.gallery.description}
        images={experience.gallery.images.map((img) => ({
          galleryImage: img.image,
          galleryName: "",
        }))}
      />

      <JourneysCarousel />
      <FloatingButton onClick={() => setOpenInquiry(true)} />
      {/* Modal Popup */}
      {/* {openInquiry && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-28"
          onClick={() => setOpenInquiry(false)}
        >
          <div
            className="w-full max-w-6xl max-h-[85vh] overflow-y-auto rounded shadow-lg relative bg-[#ebe6dd]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpenInquiry(false)}
              className="absolute cursor-pointer top-4 right-4 z-50 bg-white rounded-full w-9 h-9 flex items-center justify-center shadow hover:bg-gray-100"
            >
              ✕
            </button>

            <PopForm
              experienceName={experience.bannerTitle}
              destination={destinationName}
            />
          </div>
        </div>
      )} */}

      {openInquiry && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center px-4 pt-28 pb-6 overflow-y-auto md:mt-20 md:items-center"
          onClick={() => setOpenInquiry(false)}
        >
          <div
            className="relative w-full max-w-6xl max-h-[90vh] bg-[#ebe6dd] rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpenInquiry(false)}
              className="absolute top-4 right-4 z-50 bg-white rounded-full w-9 h-9 flex items-center justify-center shadow cursor-pointer"
            >
              ✕
            </button>

            <div className="overflow-y-auto max-h-[90vh]">
              <PopForm
                experienceName={experience.bannerTitle}
                destination={destinationName}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ExperienceDetails;
