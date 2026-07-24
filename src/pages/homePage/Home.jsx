"use client";
import React from "react";
import Homepack from "../homePage/Homepack";
import Founder from "../homePage/Founder";
import WhyTravel from "../homePage/WhyTravel";
import PositiveImpact from "../homePage/PositiveImpact";
import DestinationSelector from "../../components/DestinationSelector";
import MapSection from "../../components/MapSection/MapSection";
const Home = ({ trips, loading }) => {
  return (
    <div className="">
      <DestinationSelector />
      <div className=" bg-[#fbf6ea]"></div>

      <Homepack trips={trips} loading={loading} />
      <Founder />
      <WhyTravel />
      <MapSection />
      <PositiveImpact />
    </div>
  );
};

export default Home;
