import React from "react";

import Banner from "../../../components/Banner";
import SafariList from "../../../components/SafariList";



const AccomodationLanding = ({ destinationData }) => {
  
  return (
    <>
      <Banner
        title="Our Accommodations  "
        subtitle="Stay in thoughtfully selected retreats across Africa, where landscape, design, privacy, and local character come together to elevate every safari journey."
        imageUrl="/images/accommodation-banner.webp"
      />

      <SafariList destinationData={destinationData} />
    </>
  );
};

export default AccomodationLanding;
