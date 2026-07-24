// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper/modules";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import "swiper/css";
// import "swiper/css/navigation";
// import elephantg1 from '../../../assets/elephantg1.webp'

// const gameDriveOptions = [
//   {
//     image:
//       "https://serengetisteppe.com/storage/images/484ca97c-cc29-4ade-9ed4-e4068bc35ebb.jpg",
//     title: "Chobe National Park",
//     description:
//       "Chobe National park is renowned for its vast elephant population, diverse wildlife and breathtaking landscape.",
//   },
//   {
//     image:
//      elephantg1,
//       title: "Chobe National Park",
//     description:
//       "Chobe National park is renowned for its vast elephant population, diverse wildlife.",
//   },
//   {
//     image:
//       "https://media.gadventures.com/media-server/cache/92/9b/929b8f99eb4dcfb115ca9d735480814c.jpg",
//     title: "Sound Owner in Nature",
//     description:
//       "Chobe National park is renowned for its vast elephant population, diverse wildlife and breathtaking landscape.",
//   },
//   {
//     image: "https://moafrikatours.com/wp-content/uploads/2023/11/d4.jpg",
//     title: "Elephants",
//     description:
//       "Chobe National park is renowned for its vast elephant population, diverse wildlife.",
//   },
// ];

// const GameDriveCard = ({ image, title, description }) => (
//   <div className="flex flex-col">
//     <div className="mb-4">
//       <img
//         src={image}
//         alt={title}
//         className="w-full h-auto object-cover rounded-sm aspect-[3.5/5] shadow-sm"
//       />
//     </div>
//     <h3 className="text-2xl font-cormorant font-semibold text-gray-800 mb-2 leading-tight">
//       {title}
//     </h3>
//     <p className="text-gray-800 font-quicksand">{description}</p>
//   </div>
// );

// const GameDriveHighlights = () => {
//   return (
//     <section className="px-4 md:px-10 lg:px-16 xl:px-20 2xl:px-28 py-16 relative">
//       {/* Heading */}
//       <h2 className="text-6xl mb-16 text-[#636363] capitalize font-cormorant text-center">
//         Chobe Game Drive Highlights
//       </h2>

//       {/* Swiper Carousel */}
//       <div className="relative group">
//         <Swiper
//           modules={[Navigation]}
//           spaceBetween={32}
//           slidesPerView={1}
//           navigation={{
//             nextEl: ".custom-next",
//             prevEl: ".custom-prev",
//           }}
//           breakpoints={{
//             640: { slidesPerView: 1 },
//             768: { slidesPerView: 2 },
//             1024: { slidesPerView: 3 },
//           }}
//           className="pb-10"
//         >
//           {gameDriveOptions.map((option, index) => (
//             <SwiperSlide key={index}>
//               <GameDriveCard
//                 image={option.image}
//                 title={option.title}
//                 description={option.description}
//               />
//             </SwiperSlide>
//           ))}
//         </Swiper>

//         {/* Custom Navigation Buttons */}
//         <button className="custom-prev absolute z-10 top-1/2 -translate-y-1/2 left-1 sm:left-2 md:-left-8 lg:-left-14 w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full border border-gray-300 bg-white/80 shadow hover:bg-gray-100 transition opacity-0 group-hover:opacity-100">
//           <ChevronLeft size={22} strokeWidth={1.5} className="text-gray-700" />
//         </button>

//         <button className="custom-next absolute z-10 top-1/2 -translate-y-1/2 right-1 sm:right-2 md:-right-8 lg:-right-14 w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full border border-gray-300 bg-white/80 shadow hover:bg-gray-100 transition opacity-0 group-hover:opacity-100">
//           <ChevronRight size={22} strokeWidth={1.5} className="text-gray-700" />
//         </button>
//       </div>
//     </section>
//   );
// };

// export default GameDriveHighlights;

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";

/**
 * Reusable Game Drive Card
 */
const GameDriveCard = ({ image, title, description }) => (
  <div className="flex flex-col">
    <div className="mb-4">
      <img
        src={image}
        alt={title}
        className="w-full h-[450px] md:h-auto object-cover rounded-sm aspect-[3.5/5] shadow-sm"
      />
    </div>
    <h3 className="text-2xl font-cormorant font-medium text-gray-600 mb-2 leading-tight">
      {title}
    </h3>
    <p className="text-gray-800 font-quicksand">{description}</p>
  </div>
);

/**
 * Reusable GameDriveHighlights Component
 * @param {Object} props
 * @param {Array} props.gamehighLight - Array of game drive highlight objects
 * @param {string} [props.sectionTitle] - Optional custom section heading
 */
const GameDriveHighlights = ({
  gamehighLight = [],
  sectionTitle = "Game Drive Highlights",
}) => {
  if (!Array.isArray(gamehighLight) || gamehighLight.length === 0) {
    return (
      <p className="text-center text-gray-500 py-10">
        No highlights available.
      </p>
    );
  }

  return (
    <section className="max-w-[1300px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-0 py-8 sm:py-10 md:py-16 relative">
      {/* Section Heading */}
      <div className=" text-center">
        <p className=" text-[#a89f82] uppercase text-sm md:text-base font-quicksand ">
          Our Highlights
        </p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-6 sm:mb-10 md:mb-16 mt-4 text-[#636363] capitalize font-cormorant text-center">
          {sectionTitle}
        </h2>
      </div>

      {/* Swiper Carousel */}
      <div className="relative group">
        <Swiper
          modules={[Navigation]}
          spaceBetween={32}
          slidesPerView={1}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          className="pb-10"
        >
          {gamehighLight.map((item, index) => (
            <SwiperSlide key={item._id || index}>
              <GameDriveCard
                image={item.image}
                title={item.name}
                description={item.description}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <button className="custom-prev absolute z-10 top-1/2 -translate-y-1/2 left-1 sm:left-2 md:-left-8 lg:-left-14 w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full border border-gray-300 bg-white/80 shadow hover:bg-gray-100 transition opacity-0 group-hover:opacity-100">
          <ChevronLeft size={22} strokeWidth={1.5} className="text-gray-700" />
        </button>

        <button className="custom-next absolute z-10 top-1/2 -translate-y-1/2 right-1 sm:right-2 md:-right-8 lg:-right-14 w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full border border-gray-300 bg-white/80 shadow hover:bg-gray-100 transition opacity-0 group-hover:opacity-100">
          <ChevronRight size={22} strokeWidth={1.5} className="text-gray-700" />
        </button>
      </div>
    </section>
  );
};

export default GameDriveHighlights;
