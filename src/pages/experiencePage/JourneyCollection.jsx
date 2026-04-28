import React from "react";
import { HiArrowLongRight } from "react-icons/hi2";
import { Link } from "react-router-dom";

const journeys = [
  {
    image: "https://i.cdn.newsbytesapp.com/images/l89420230927165827.jpeg",
    title: "On Safari with Where to Africa",
    description:
      "Experience the wonder of all-inclusive access, expert Tauck Directors, and thoughtfully selected accommodations, for the most authentic safaris.",
  },
  {
    image: "https://khwaiexpeditionscamp.com/wp-content/uploads/2024/06/The-African-Elephant.jpg",
    title: "When's the Best Time to Safari",
    description:
      "Every season brings something special, so there's truly no 'best' time – just the time that's right for you.",
  },
  {
    image: "https://res.cloudinary.com/enchanting/q_70,f_auto,c_fill,g_face/hj-web/2020/12/Predator%C2%B4s-love.-Lioness-and-cub-in-the-Kruger-NP-South-Africa-min.jpg",
    title: "How to choose your Safari",
    description:
      "Each safari has its own distinct highlights – explore all of your options to find the journey that excites you the most!",
  },
  {
    image: "https://www.andbeyond.com/wp-content/uploads/sites/5/WILDwatch-Africa-Tanzania-Bateleur-Ben-Haas-lion-playtime-08-Website-1920x1080-fill-gravityauto-Q_AutoBest.jpg",
    title: "Your Essential Safari Packing Guide",
    description:
      "Tips, tricks and must-haves for packing on your upcoming safari adventure.",
  },
];

const JourneyCollection = () => {
  return (
    <section className="px-4 md:px-10 lg:px-16 xl:px-20 2xl:px-28 py-16 bg-white">
      {/* Section Heading */}
      <div className="text-center mb-14 font-cormorant">
        <p className="text-center text-2xl md:text-3xl font-normal  text-[#a89f82] uppercase mb-6">
          Journey Collection
        </p>
        <h2 className="text-6xl  mb-10  text-[#636363] capitalize font-normal">
          On Safari with Where to Africa
        </h2>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 gap-x-12 gap-y-16 mt-20">
        {journeys.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row ${
              index % 2 === 1 ? "md:flex-row" : ""
            } items-center md:items-start gap-6`}
          >
            {/* Image */}
            <div className="w-full md:w-1/2 ">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-64 md:h-48 object-cover rounded-sm  "
              />
            </div>

            {/* Content */}
            <div className="w-full md:w-1/2">
              <h3 className="text-2xl font-medium font-cormorant text-[#636363] mb-2">
                {item.title}
              </h3>
              <p className="text-gray-500 mb-4 font-quicksand leading-relaxed">
                {item.description}
              </p>
              <Link
                href="#"
                className="text-[#a89f82] font-medium font-quicksand inline-flex items-center group"
              >
                Read More
                <HiArrowLongRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default JourneyCollection;
