import Image from "next/image";
import React from "react";
import Banner from "../../components/Banner";
import Overview from "../../components/Overview";
import AboutSection from "./AboutSection";
import FounderQuoteSection from "./FounderQuoteSection";
import TeamSection from "./TeamSection";
import WhyBookWithTimbuktu from "./WhyBookWithTimbuktu";
import ImpactOfYourStay from "./ImpactOfYourStay";

const AboutUs = () => {
  return (
    <>
      <Banner
        title={"About Us"}
        subtitle={
          "Driven by passion and expertise, we craft authentic African journeys, combining deep local knowledge with personalized service to create unforgettable travel experiences."
        }
        imageUrl={"/about-us-banner.webp"}
      />
      <div className="bg-[#f6f1e9]">
        <Overview
          title="Our Story Begins"
          subtitle="We plan African Travel and Tours with care, connecting travellers to people, wildlife, landscapes, and cultures through responsible travel."
          description="Every journey supports conservation, respects local communities, and offers meaningful experiences across Africa’s diverse regions and destinations. "
        />
        <AboutSection />
      </div>
      <FounderQuoteSection />
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-0 py-8 sm:py-10 md:py-16">
        <div className="bg-white/5 rounded-sm overflow-hidden shadow-sm">
          <div className="relative">
            <div className="relative w-full h-64 sm:h-80 md:h-[600px]">
              <Image
                src="/about-us-4.webp"
                alt="Kenya Safari"
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>

            <div className="absolute inset-0 bg-black/30 flex items-end">
              <div className="p-4 md:p-6 text-white w-full md:w-[55%]">
                <blockquote className="text-base sm:text-xl md:text-3xl font-cormorant font-medium mb-3 md:mb-4 relative leading-snug">
                  <span className="absolute -top-3 md:-top-6 left-0 text-3xl sm:text-4xl md:text-5xl font-cormorant">
                    “
                  </span>
                  Safari is about the beauty of the land, the thrill of the
                  chase, and the spirit of adventure woven into the fabric of
                  the African landscape.
                  <span className="text-3xl sm:text-4xl md:text-5xl font-cormorant align-top">
                    ”
                  </span>
                </blockquote>

                <p className="font-semibold text-sm md:text-base font-quicksand">
                  Romi Boom
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TeamSection />
      <WhyBookWithTimbuktu />
      <ImpactOfYourStay />
    </>
  );
};

export default AboutUs;
