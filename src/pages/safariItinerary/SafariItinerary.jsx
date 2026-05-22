"use client";

import React from "react";
import Overview from "../../components/Overview";
import Image from "next/image";

// import Itinerary from "./Itinerary";

import TripHighlights from "./TripHighlights";
import JourneysCarousel from "../Accomodation/AccomodationDetails/JourneysCarousel";
import Itinerary from "./itinerary/Itinerary";
import ItinenaryForm from "../../components/ItinenaryForm";
import IncludeExl from "./IncludeExl";
// import ItineraryDetailsSkeleton from "../../components/skeletons/ItineraryDetailsSkeleton";
import PageNotFound from "../PageNotFound";

const SafariItinerary = ({ trip }) => {
  if (!trip) return <PageNotFound />;

  const getIframeSrc = (html) => {
  const match = html?.match(/src="([^"]+)"/);
  return match ? match[1] : null;
};

const iframeSrc = getIframeSrc(trip.link);

  return (
    <>
      <div className=" max-w-[1300px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-0 mt-10 font-cormorant">
        <div className="">
          <div className=" font-cormorant text-center ">
            <p className=" text-[#aaa086]  font-quicksand text-xs md:text-base  uppercase">
              {trip.subtitle}
            </p>
            <div className=" max-w-3xl mx-auto my-4">
              <h5 className=" text-3xl sm:text-4xl md:text-6xl font-medium leading-[1.2] text-[#686868]">
                {trip.title}
              </h5>
            </div>
            <p className=" max-w-xl mx-auto mt-4 mb-4 md:mb-10 tracking-wide font-quicksand text-[#686868] text-lg capitalize">
              {trip.description}
            </p>
          </div>

          <div className=" overflow-x-auto md:overflow-visible py-8 md:py-10 mt-0 md:mt-6">
            <div className="flex md:flex-row md:justify-center md:gap-8 gap-4 min-w-max md:min-w-0">
              {/* Days */}
              <div className="text-center min-w-[140px] ">
                <p className="uppercase text-lg md:text-xl tracking-wide font-medium text-[#9a8f70] mb-4">
                  Travelers
                </p>
                <p className=" text-lg md:text-2xl font-quicksand text-[#686868]">
                  {trip.rating}
                </p>
              </div>

              {/* From Price */}
              <div className="text-center border-l border-gray-300 pl-8 min-w-[140px]">
                <p className="uppercase text-lg md:text-xl tracking-wide font-medium text-[#9a8f70] mb-4">
                  From (Per Person)
                </p>
                <p className="text-lg md:text-2xl font-quicksand text-[#686868]">
                  {trip.price}
                </p>
              </div>

              {/* Journey Type */}
              <div className="text-center border-l border-gray-300 pl-8 min-w-[140px]">
                <p className="uppercase text-lg md:text-xl tracking-wide font-medium text-[#9a8f70] mb-4">
                  Days
                </p>
                <p className="text-lg md:text-2xl font-quicksand text-[#686868]">
                  {trip.duration}
                </p>
              </div>

              {/* Time of Year */}
              <div className="text-center border-l border-gray-300 pl-8 min-w-[140px]">
                <p className="uppercase text-lg md:text-xl tracking-wide font-medium text-[#9a8f70] mb-4">
                  Places to Visit
                </p>
                <p className="text-lg md:text-2xl font-quicksand text-[#686868]">
                  {trip.location}
                </p>
              </div>
            </div>
          </div>

          <div className="relative w-full h-[300px] md:h-[650px]">
            <Image
              src={trip.image}
              alt={trip.title}
              fill
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div className="bg-[#f6f1e9]">
        <Overview
          title={trip.overviewTitle}
          subtitle={trip.overviewSubTitle}
          description={trip.overviewDescription}
        />
        {/* <div className=" max-w-5xl mx-auto pb-16 ">
          <img src={map} alt="" className="w-full" />
        </div> */}

        <div className="w-full md:max-w-5xl mx-auto pb-8 md:pb-16">
          {iframeSrc ? (
            <div className="relative w-full h-[400px] md:h-[600px]">
              <iframe
                src={iframeSrc}
                className="w-full h-full rounded-md"
                loading="lazy"
                allowFullScreen
              />
            </div>
          ) : (
            <p className="text-center text-gray-500">Map not available</p>
          )}
        </div>
      </div>
      <TripHighlights highlights={trip.tripHighlights} />
      {/* <Itinerary /> */}

      <Itinerary data={trip.itinerary} title="" />

      {/* <div className=" py-10">
        <AccordionSection
          aboutBooking={trip.aboutBooking}
          requirements={trip.requirements}
        />
      </div> */}

      <div className=" py-8 md:py-10">
        <IncludeExl
          aboutBooking={trip.aboutBooking}
          requirements={trip.requirements}
        />
      </div>

      {/* <div className="mt-16 text-center">
        <button
          onClick={() => setOpenForm(true)}
          className="bg-[#ac9e86] text-white font-light tracking-widest py-3 px-8 text-xs sm:text-sm uppercase hover:bg-[#978973] rounded-sm transition duration-200 font-quicksand"
        >
          Book Package
        </button>
      </div> */}

      {/* Modal */}
      {/* {openForm && (
        <ItinenaryForm onClose={() => setOpenForm(false)} trip={trip} />
      )} */}
      <ItinenaryForm trip={trip} />

      <JourneysCarousel />
    </>
  );
};

export default SafariItinerary;
