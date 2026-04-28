import React from "react";

const AboutSection = () => {
  return (
    <section className="bg-[#f6f1e9] text-[#1a1a1a] max-w-[1300px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-0 py-8 sm:py-10 md:py-16">
      {/* Top Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Left: Testimonial Card */}
        <div className="bg-white/5 rounded-sm overflow-hidden shadow-sm">
          <div className="relative">
            <img
              src="/about-us-1.webp"
              alt="Kenya Safari"
              className="w-full h-56 sm:h-64 md:h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-end">
              <div className="p-4 sm:p-6 text-white">
                <p className="text-sm sm:text-xl font-cormorant font-medium mb-2 md:mb-4">
                  “Africa is mystic; it is wild; it is a sweltering inferno; it
                  is a photographer’s paradise, a hunter’s Valhalla, an
                  escapist’s Utopia. ”
                </p>
                <p className="font-semibold font-quicksand text-sm md:text-base mb-2">
                  Beryl Markham
                </p>
                {/* <p className="text-sm text-gray-200 font-quicksand">
                  Uganda & Kenya Trip, May 2025 – Meg
                </p> */}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Who We Are */}
        <div className="space-y-3 md:space-y-6">
          <h2 className=" font-quicksand uppercase font-bold tracking-widest text-base md:text-lg text-[#636363] ">
            Who We Are
          </h2>
          <h3 className="text-lg sm:text-xl md:text-3xl font-cormorant  leading-[1.3] relative text-[#636363] ">
            We are a leading travel company dedicated to crafting journeys
            across Africa, leveraging local insight, practical knowledge, and
            careful coordination to deliver experiences that run smoothly on the
            ground for travelers seeking reliable, well-planned trips across
            diverse regions.
          </h3>
          <p className="text-gray-700 font-quicksand leading-relaxed">
            Work is done closely with regional specialists, guides, and partners
            to design itineraries that flow naturally, respect conditions, and
            reflect everyday realities, without unnecessarily rushing travelers
            during travel planning across different African regions.
          </p>
        </div>
      </div>

      {/* Divider spacing */}
      <div className=" my-4 md:my-16"></div>

      {/* Bottom Row */}
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Left: Description */}
        <div className=" space-y-3 md:space-y-6">
          <p className="text-gray-700 font-quicksand leading-relaxed">
            Planning considers timing, local rhythms, environmental limits, and
            realistic travel pacing, helping protect destinations, support
            livelihoods, and encourage responsible decisions. Our Tours remain
            flexible, grounded, and considerate of long-term impact for both
            visitors and host communities, allowing travel experiences to feel
            balanced, respectful, and sustainable across Africa through careful
            coordination, informed choices, shared responsibility, thoughtful
            partnerships, and ongoing collaboration.
          </p>
          <p className="text-xl md:text-3xl font-cormorant  leading-relaxed relative text-[#636363]">
            Good travel values people, places, patience, responsibility,
            balance, and care.
          </p>
        </div>

        {/* Right: Testimonial Card */}
        <div className="bg-white/5 rounded-sm overflow-hidden shadow-sm">
          <div className="relative">
            <img
              src="/about-us-2.webp"
              alt="Chile Trip"
              className="w-full h-56 sm:h-64 md:h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-end">
              <div className="p-6 text-white">
                <p className="text-sm sm:text-xl font-medium font-cormorant mb-2 md:mb-4">
                  “ There is no place like Africa. There is something about the
                  spirit of the people, the beauty of the land, and the
                  diversity of the wildlife that touches the soul.”
                </p>
                <p className="font-semibold font-quicksand text-sm md:text-base mb-2">Tony Fitzjohn</p>
                {/* <p className="text-sm text-gray-200 font-quicksand">
                  Chile – Nov 2024 – Carola
                </p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
