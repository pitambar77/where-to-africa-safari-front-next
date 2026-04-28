import React from "react";
import Banner from "../../components/Banner";
import ImpactSection from "./ImpactSection";
import ImpactOfYourStay from "../AboutUs/ImpactOfYourStay";

const ImpactPage = () => {
  return (
    <>
      <Banner
        title={"Conservation"}
        subtitle={
          "Protecting Africa’s wildlife, empowering communities, and supporting sustainable tourism initiatives that safeguard ecosystems while creating responsible travel experiences."
        }
        imageUrl={"/conservation-banner-image.jpg"}
      />
      <ImpactSection />
      <div className="bg-[#f6f1e9]">
        <ImpactOfYourStay />
      </div>
    </>
  );
};

export default ImpactPage;
