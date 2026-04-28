import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import "swiper/css";
import "swiper/css/navigation";

const guestFavorites = [
  {
    image:
      "https://www.andbeyond.com/wp-content/uploads/sites/5/leopard-safari-south-africa.jpg",
    title: "South Africa: An Elegant Adventure",
  },
  {
    image:
      "https://safarifrank.com/wp-content/uploads/2019/11/lower-zambezi-zambia-gesa-frank-safari-tusk-and-mane-1920x1080.jpg",
    title: "Botswana, South Africa & Zambia",
  },
  {
    image:
      "https://rajgirsafari.bihar.gov.in/uploads/2025/02/08/zoo%20safari%20lion%20(2).jpg",
    title: "Serengeti & Zanzibar Explorer",
  },
  {
    image:
      "https://www.sierraclub.org/sites/default/files/styles/sierra_full_page_width/public/sierra/articles/big/SIERRA-iStock-687031310-WB.jpg.webp?itok=yfxjyXCZ",
    title: "Morocco: Imperial Cities & Sahara",
  },
  {
    image:
      "https://www.andbeyond.com/wp-content/uploads/sites/5/leopard-safari-south-africa.jpg",
    title: "South Africa: An Elegant Adventure",
  },
  {
    image:
      "https://safarifrank.com/wp-content/uploads/2019/11/lower-zambezi-zambia-gesa-frank-safari-tusk-and-mane-1920x1080.jpg",
    title: "Botswana, South Africa & Zambia",
  },
  {
    image:
      "https://rajgirsafari.bihar.gov.in/uploads/2025/02/08/zoo%20safari%20lion%20(2).jpg",
    title: "Serengeti & Zanzibar Explorer",
  },
  {
    image:
      "https://www.sierraclub.org/sites/default/files/styles/sierra_full_page_width/public/sierra/articles/big/SIERRA-iStock-687031310-WB.jpg.webp?itok=yfxjyXCZ",
    title: "Morocco: Imperial Cities & Sahara",
  },
];

const ThingsToDO = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(guestFavorites.length / 2)
  );
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <section className=" py-16  relative ">
      {/* --- Quote Section --- */}
      <div className="text-center max-w-6xl mx-auto  mb-14 font-cormorant">
        <p className="text-center text-2xl md:text-3xl font-normal  text-[#a89f82] uppercase mb-6">
          Things to do
        </p>
        <h2 className="text-6xl  mb-10  text-[#636363] capitalize font-normal">
          What to do in Cape Town
        </h2>
        <p className=" font-quicksand mb-5  ">
          Ever heard the phrase, “a world in one country”? Well, Cape Town is a
          world in one city! Surrounded by craggy mountains, ocean, plenty of
          lush greenery and rolling countryside, but also a bustling city scene,
          vivacious cultures and history, you won’t be short of things to do. We
          recommend starting in the city with a guided tour. Choose your focus
          from history, food or art (or all three), and discover the spots away
          from the guidebooks. If a guide isn’t your thing, wander the streets
          and seek out your own gems. Follow it all up with a connoisseur gin
          tasting and dinner in an award-winning restaurant and you have Cape
          Town in a nutshell.
        </p>
        <p className=" font-quicksand  ">
          Then there’s the great outdoors. Table Mountain dominates the
          landscape and with several hiking routes to choose from (guided or
          un-guided), and the cable car, there’s no excuse for not reaching the
          top. Other highlights around the city include the Southern Peninsula,
          home to African penguins, cliff-carved roads, lighthouses and
          incredible views, and the sun-kissed beaches of the Atlantic Seaboard.
          And we haven’t even started on the markets, paragliding activities,
          surfing or shopping yet…
        </p>
      </div>

      <div className="relative pl-4 md:pl-10 lg:pl-16 xl:pl-20 2xl:pl-28 ">
        <Swiper
          modules={[Navigation]}
          slidesPerView={2.5}
          slidesPerGroup={2}
          spaceBetween={24}
          navigation={{
            nextEl: ".swiper-next",
            prevEl: ".swiper-prev",
          }}
          breakpoints={{
            0: { slidesPerView: 1, slidesPerGroup: 1 },
            768: { slidesPerView: 2.5, slidesPerGroup: 2 },
          }}
          onInit={(swiper) => {
            const total = Math.ceil(
              guestFavorites.length / swiper.params.slidesPerGroup
            );
            setTotalPages(total);
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          onSlideChange={(swiper) => {
            const group = swiper.params.slidesPerGroup || 2;
            const page = Math.ceil((swiper.activeIndex + 1) / group);
            const total = Math.ceil(guestFavorites.length / group);
            setCurrentPage(page);
            setTotalPages(total);
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          className="pb-10"
        >
          {guestFavorites.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="relative group overflow-hidden rounded-sm ">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-96  object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="text-white text-lg md:text-xl font-normal font-cormorant leading-tight">
                    {item.title}
                  </h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* --- Side Navigation Buttons --- */}
        <button
          className={`swiper-prev absolute left-9 top-1/2 -translate-y-1/2 bg-white shadow-md p-3 rounded-full transition z-10 ${
            isBeginning
              ? "opacity-40 cursor-not-allowed"
              : "hover:bg-gray-100 cursor-pointer"
          }`}
          disabled={isBeginning}
        >
          <FaArrowLeftLong className="text-[#a89f82]" size={18} />
        </button>

        <button
          className={`swiper-next absolute right-1/6   top-1/2 -translate-y-1/2 bg-white shadow-md p-3 rounded-full transition z-10 ${
            isEnd
              ? "opacity-40 cursor-not-allowed"
              : "hover:bg-gray-100 cursor-pointer"
          }`}
          disabled={isEnd}
        >
          <FaArrowRightLong className="text-[#a89f82]" size={18} />
        </button>
      </div>

      {/* --- Bottom Pagination + Buttons --- */}
      <div className="flex items-center space-x-4 mt-12 text-[#a89f82] justify-center font-cormorant">
        <button
          className={`swiper-prev rounded-full   transition ${
            isBeginning
              ? "opacity-40 cursor-not-allowed"
              : "hover:bg-gray-100 cursor-pointer"
          }`}
          disabled={isBeginning}
        >
          <FaArrowLeftLong className=" w-8 h-5 " />
        </button>

        <div className="text-lg font-quicksand font-light flex items-center">
          {String(currentPage).padStart(2, "0")}{" "}
          <span className="text-gray-400 ">
            {" "}
            <div className=" w-16 flex-1 h-[1px] bg-[#a89f82] mx-3"></div>
          </span>{" "}
          {String(totalPages).padStart(2, "0")}
        </div>

        <button
          className={`swiper-next rounded-full  transition ${
            isEnd
              ? "opacity-40 cursor-not-allowed"
              : "hover:bg-gray-100 cursor-pointer"
          }`}
          disabled={isEnd}
        >
          <FaArrowRightLong className="text-[#a89f82] w-8 h-5 " />
        </button>
      </div>
    </section>
  );
};

export default ThingsToDO;
