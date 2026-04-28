import React from "react";

const PackageCardGridSection = ({
  title,
  subtitle,
  data = [],
  CardComponent,
  emptyMessage = "No items found.",
  onCardClick, // 👈 Added missing prop
}) => {
  return (
    <section className="max-w-[1300px] mx-auto py-8 sm:py-10 md:py-16">
      <div className="px-4 sm:px-6 md:px-10 lg:px-16 xl:px-0">
        {/* Section Heading */}
        <div className=" text-center">
          {title && (
            <p className=" text-[#a89f82] font-quicksand  text-xs sm:text-base uppercase">
              {title}
            </p>
          )}
          {subtitle && (
            <h5 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-cormorant mb-2 md:mb-8 mt-4 text-[#636363] capitalize font-normal">
              {subtitle}
            </h5>
          )}
        </div>

        {/* Cards Grid */}
        {data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 2xl:gap-8 mt-8 md:mt-16">
            {data.map((item, index) => (
              <div
                key={item.id}
                className="cursor-pointer"
                onClick={() => onCardClick && onCardClick(item.id)}
              >
                <CardComponent key={item.id || index} item={item} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 mt-10">{emptyMessage}</p>
        )}
        {/* <div className=" mt-14 text-center">
          <Link to={"/packages"} className="bg-[#ac9e86] text-white font-light tracking-widest py-3 px-8 text-xs sm:text-sm uppercase hover:bg-[#978973] rounded-sm transition duration-200 font-quicksand">
            MORE ITINERARIES
          </Link>
        </div> */}
      </div>
    </section>
  );
};

export default PackageCardGridSection;
