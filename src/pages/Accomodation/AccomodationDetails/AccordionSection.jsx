
import React from "react";
import FAQSectionContainer from "../../../components/FAQSectionContainer";

const AccordionSection = ({ aboutBooking = [], requirements = [] }) => {
  return (
    <>
      <div className="px-4 md:px-10 lg:px-16 xl:px-20  flex justify-center py-6 md:py-10">
        <FAQSectionContainer
          title="Rooms & What’s Included"
          items={aboutBooking}
        />
      </div>

      <div className="px-4 md:px-10 lg:px-16 xl:px-20  flex justify-center py-6 md:py-10">
        <FAQSectionContainer
          title="Luxury & Safari Moments"
          items={requirements}
        />
      </div>
    </>
  );
};

export default AccordionSection;
