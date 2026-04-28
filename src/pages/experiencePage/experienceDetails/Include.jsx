

import React from "react";

const InclusionCard = ({ name, icon }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-4 bg-white rounded-sm border border-[#e3e2e2]/80 transition duration-300 hover:shadow-md h-28">
      {icon && (
        <img
          src={icon}
          alt={name}
          className="w-8 h-8 mb-2 object-contain"
        />
      )}
      <p className="font-semibold font-quicksand">{name}</p>
    </div>
  );
};

const Include = ({ includes = [] }) => {
  if (!includes.length) return null;

  return (
    <section className=" max-w-[1300px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-0 pb-8 sm:pb-10 md:pb-16">
      <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-6 sm:mb-10 md:mb-16 text-[#636363] capitalize font-cormorant text-center">
        What's Included
      </h2>

      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-4 gap-x-3 sm:gap-x-5 md:gap-x-8 gap-y-4 md:gap-y-6">
        {includes.map((item) => (
          <InclusionCard
            key={item._id}
            name={item.name}
            icon={item.icon}
          />
        ))}
      </div>
    </section>
  );
};

export default Include;

