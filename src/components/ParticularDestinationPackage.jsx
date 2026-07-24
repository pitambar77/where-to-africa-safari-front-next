import React from "react";
import Link from "next/link";

const ParticularDestinationPackage = ({
  data = [],
  CardComponent,
  onCardClick,
  emptyMessage = "No items found.",
}) => {
  return (
    <section className=" mt-4 pb-10 md:pb-16">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-0">
        {/* Cards Grid */}
         <div className="flex flex-wrap justify-center gap-7">
          {data.length > 0 ? (
            data.map((item, index) => (
              <div
                key={item.id || index}
                className="basis-full sm:basis-[48%] md:basis-[31%] lg:basis-[23%]"
              >
                <CardComponent
                  item={item}
                  safari={item}
                  onClick={() => onCardClick?.(item.id)}
                />
              </div>
            ))
          ) : (
            <p className="w-full text-center text-gray-600 mt-10">
              {emptyMessage}
            </p>
          )}
        </div>
      </div>
      <div className=" mt-16 text-center">
        <Link
          href={"/packages"}
          className="bg-[#ac9e86] text-white font-light tracking-widest py-3 px-8 text-xs sm:text-sm uppercase hover:bg-[#978973] rounded-sm transition duration-200 font-quicksand"
        >
          Expore More
        </Link>
      </div>
    </section>
  );
};

export default ParticularDestinationPackage;
