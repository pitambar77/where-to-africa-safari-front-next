// "use client";
// import Image from "next/image";
// import React, { useState } from "react";
// import { FaPlay, FaTimes } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";

// const FounderQuoteSection = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <section className=" text-[#1a1a1a] max-w-[1300px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-0 py-8 sm:py-10 md:py-16">
//       <div className=" flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
//         {/* Left: Image with Play Button */}
//         <div className="relative rounded-sm overflow-hidden shadow-sm w-full md:w-[56%] ">
//           <Image
//             src="/about-us-3.webp"
//             alt="Timbuktu Travel Video"
//             fill
//             sizes="(max-width: 768px) 100vw, 50vw"
//             className="object-cover"
//           />
//           {/* Play Button */}
//           <button
//             onClick={() => setIsOpen(true)}
//             className="absolute inset-0 flex items-center justify-center group"
//           >
//             <div className="bg-black/70 hover:bg-black transition-colors duration-300 p-4 rounded-full">
//               <FaPlay className="text-white text-xl md:text-2xl group-hover:scale-110 transition-transform duration-300" />
//             </div>
//           </button>
//         </div>

//         {/* Right: Quote + Description */}
//         <div className="space-y-4 w-full md:w-[40%]">
//           <blockquote className="text-base sm:text-xl md:text-2xl font-cormorant font-medium leading-relaxed  relative text-[#636363]">
//             <span className="absolute -left-2 -top-2 md:-left-3 md:-top-3 font-cormorant text-2xl md:text-5xl ">
//               “
//             </span>
//             Where to Africa began with a belief that travel planning should feel
//             clear, engaging, and supportive, combining local knowledge, smart
//             tools, and honest guidance so travellers feel confident from first
//             conversation through final moments experienced in remarkable
//             destinations across Africa without confusion, pressure, unnecessary
//             complexity along the way.
//             <span className="text-2xl md:text-5xl  font-cormorant  align-top">
//               ”
//             </span>
//           </blockquote>

//           <p className="text-gray-700 leading-relaxed">
//             Discover how our planning approach makes African travel simpler,
//             clearer, and more rewarding.
//           </p>

//           <div>
//             <p className="font-semibold font-quicksand text-sm md:text-lg mb-2">
//               John McMillan
//             </p>
//             <p className="text-gray-600 font-quicksand text-sm">
//               CEO, Where to Africa
//             </p>
//           </div>
//         </div>
//       </div>

//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={() => setIsOpen(false)} // ✅ click outside closes
//           >
//             <div
//               className="relative w-full md:w-[80%] aspect-video rounded-lg overflow-hidden"
//               onClick={(e) => e.stopPropagation()} // ✅ prevent close on video click
//             >
//               {/* ✅ FIX: dynamic src + key */}
//               <iframe
//                 key={isOpen} // 🔥 forces reload → autoplay works
//                 className="w-full h-full"
//                 src={
//                   isOpen
//                     ? "https://www.youtube.com/embed/Scxs7L0vhZ4?autoplay=1&mute=1"
//                     : ""
//                 }
//                 title="Timbuktu Travel Video"
//                 allow="autoplay; encrypted-media"
//                 allowFullScreen
//               />

//               {/* Close Button */}
//               <button
//                 onClick={() => setIsOpen(false)}
//                 className="absolute top-4 right-4 bg-black/60 hover:bg-black p-2 rounded-full text-white"
//               >
//                 <FaTimes />
//               </button>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </section>
//   );
// };

// export default FounderQuoteSection;

"use client";

import Image from "next/image";
import React, { useState } from "react";
import { FaPlay, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const FounderQuoteSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="text-[#1a1a1a] max-w-[1300px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-0 py-8 sm:py-10 md:py-16">
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
        {/* ✅ FIX: Give height to parent */}
        <div className="relative rounded-sm overflow-hidden shadow-sm w-full md:w-[56%] h-[260px] sm:h-[320px] md:h-[420px]">
          <Image
            src="/about-us-3.webp"
            alt="Timbuktu Travel Video"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />

          {/* Play Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="absolute inset-0 flex items-center justify-center group"
          >
            <div className="bg-black/70 hover:bg-black p-4 rounded-full">
              <FaPlay className="text-white text-xl md:text-2xl group-hover:scale-110 transition" />
            </div>
          </button>
        </div>

        {/* Right Content */}
        <div className="space-y-4 w-full md:w-[40%]">
          <blockquote className="text-base sm:text-xl md:text-2xl font-cormorant leading-relaxed relative text-[#636363]">
            <span className="absolute -left-2 -top-2 md:-left-3 md:-top-3 text-2xl md:text-5xl">
              “
            </span>
            Where to Africa began with a belief that travel planning should feel
            clear, engaging, and supportive, combining local knowledge, smart
            tools, and honest guidance so travellers feel confident from first
            conversation through final moments experienced in remarkable
            destinations across Africa without confusion, pressure, unnecessary
            complexity along the way.
            <span className="text-2xl md:text-5xl align-top">”</span>
          </blockquote>

          <p className="text-gray-700">
            Discover how our planning approach makes African travel simpler.
          </p>

          <div>
            <p className="font-semibold font-quicksand text-sm md:text-lg">
              John McMillan
            </p>
            <p className="text-gray-600 text-sm">CEO, Where to Africa</p>
          </div>
        </div>
      </div>

      {/* ===== MODAL ===== */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)} // ✅ click outside closes
          >
            <div
              className="relative w-full md:w-[80%] aspect-video rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()} // ✅ prevent close on video click
            >
              {/* ✅ FIX: dynamic src + key */}
              <iframe
                key={isOpen} // 🔥 forces reload → autoplay works
                className="w-full h-full"
                src={
                  isOpen
                    ? "https://www.youtube.com/embed/Scxs7L0vhZ4?autoplay=1&mute=1"
                    : ""
                }
                title="Timbuktu Travel Video"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />

              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 bg-black/60 hover:bg-black p-2 rounded-full text-white"
              >
                <FaTimes />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default FounderQuoteSection;
