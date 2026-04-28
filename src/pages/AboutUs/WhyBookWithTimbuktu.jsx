import React from "react";
import { FaLeaf, FaSun, FaStar, FaCloud, FaMoon } from "react-icons/fa"; // icons placeholders

const features = [
  {
    icon: <FaSun className="text-3xl text-[#aaa086]" />,
    title: "Local Expertise",
    description:
      "Journeys planned with experienced local guides, ensuring accurate insights, smooth logistics, cultural respect, and realistic pacing across diverse African destinations, delivered safely, responsibly, and consistently.",
  },
  {
    icon: <FaStar className="text-3xl text-[#aaa086]" />,
    title: "Responsible Travel",
    description:
      "Travel decisions prioritize conservation, community benefit, and low-impact practices, protecting wildlife habitats, supporting livelihoods, and respecting cultural heritage across Africa, responsibly always.",
  },
  {
    icon: <FaCloud className="text-3xl text-[#aaa086]" />,
    title: "Careful Planning",
    description:
      "Every itinerary balances comfort, adventure, timing, and distances, creating smooth journeys that feel unrushed, practical, and enjoyable for travellers across African regions today",
  },
  {
    icon: <FaMoon className="text-3xl text-[#aaa086]" />,
    title: "Trusted Partnerships",
    description:
      "Long-term relationships with guides, lodges, and communities ensure reliable operations, fair practices, and consistent quality throughout each journey across African destinations, all done responsibly.",
  },
  {
    icon: <FaLeaf className="text-3xl text-[#aaa086]" />,
    title: "Clear Communication",
    description:
      "From planning to travel updates, information is shared openly, helping travelers feel prepared, confident, and supported throughout their trip across Africa.",
  },
];

const WhyBookWithTimbuktu = () => {
  return (
    <section className="py-10 sm:py-12 md:py-16 lg:py-20 bg-[#f6f1e9]">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-0 grid lg:grid-cols-3 gap-10 lg:gap-12">
        {/* LEFT TEXT */}
        <div className="lg:pr-6">
          <p className="uppercase font-quicksand mb-3 text-sm tracking-widest text-[#636363]">
            Travel With Confidence
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mb-4 text-[#636363] font-cormorant">
            Why Book with Us
          </h2>

          <p className="text-gray-700 leading-relaxed font-quicksand text-sm md:text-base">
            Thoughtfully planned African journeys built on trust, local
            knowledge, and responsible choices.
          </p>
        </div>

        {/* FEATURES */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 md:gap-x-10 gap-y-8 md:gap-y-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col space-y-3 md:space-y-4 font-quicksand"
            >
              <div>{feature.icon}</div>

              <h3 className="font-semibold text-base md:text-lg">
                {feature.title}
              </h3>

              <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyBookWithTimbuktu;
