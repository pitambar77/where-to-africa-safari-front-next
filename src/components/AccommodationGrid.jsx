import React from "react";

import AccommodationRelated from "./AccommodationRelated";
import Link from "next/link";

const AccommodationGrid = ({
  title = "Overnight Accommodations",
  subtitle = "Places to Stay",
  data = [],
  onCardClick,
  children,
  footer,
}) => {
  return (
    <section className=" bg-gray-50 py-8 sm:py-10 md:py-16 ">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-0 ">
        <div className="">
          {/* Heading */}
          <div className=" text-center">
            {/* <h2 className="text-center text-2xl md:text-3xl font-normal uppercase text-[#a89f82] mb-4"> */}
            <p className=" text-[#a89f82] font-quicksand text-sm sm:text-base  uppercase">
              {title}
            </p>

            {/* </h2> */}
            <h5 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-8 md:mb-16 mt-4 text-[#636363] capitalize font-normal max-w-5xl mx-auto font-cormorant">
              {subtitle}
            </h5>
          </div>
          {/* tab */}
          {children}
          {/* Grid */}
          <div className="grid gap-4 md:gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 font-cormorant">
            {data.map((item) => (
              <Link
                key={item.id}
                href={`/accommodation/${item.id}`}
                className="block"
              >
                <AccommodationRelated
                  key={item.id}
                  image={item.image}
                  nights={item.nights}
                  title={item.title}
                  location={item.tag}
                  tag={item.location}
                />
              </Link>
            ))}
          </div>

          {/* {footer} */}

          {/* <div className=" mt-16 text-center">
          <Link
            to={"/accommodations"}
            className="bg-[#ac9e86] text-white font-light tracking-widest py-3 px-8 text-xs sm:text-sm uppercase hover:bg-[#978973] rounded-sm transition duration-200 font-quicksand"
          >
            View All Accommodations
          </Link>
        </div> */}
        </div>
      </div>
    </section>
  );
};

export default AccommodationGrid;
