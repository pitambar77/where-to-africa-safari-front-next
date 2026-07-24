import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
/**
 * Reusable destination grid component
 *
 * @param {Array} data - List of areas/places with name, image, alt, and path
 * @param {String} title - Section title (optional)
 * @param {String} buttonText - Button label (optional)
 * @param {Function} onButtonClick - Button click handler (optional)
 */
const DestinationGrid = ({
  data = [],
  title = "",
  buttonText = "",
  onButtonClick,
}) => {
  const router = useRouter();

  return (
    <div className="bg-[#faf5e9] max-w-[1300px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-0 pb-8 sm:pb-10 md:pb-16 lg:pb-20">
      {title && (
        <h2 className="text-center text-2xl md:text-3xl font-quicksand font-semibold text-[#252525] mb-10 tracking-[2px]">
          {title}
        </h2>
      )}

      {/* Destination Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {data.map((item, index) => (
          <Link
            key={item.name}
            href={item.path || "#"}
            className="flex items-center rounded-[3px] overflow-hidden bg-white transition duration-300 cursor-pointer  hover:shadow-md hover:scale-[1.02]"
            // style={
            //   index % 3 === 0 || index % 3 === 1 ? { marginRight: "2rem" } : {}
            // }
          >
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-24 md:h-24 flex-shrink-0">
              <Image
                src={item.image}
                alt={item.alt || item.name || "destination image"}
                fill
                sizes="(max-width: 640px) 96px, (max-width: 768px) 112px, 96px"
                className="object-cover rounded"
              />
            </div>
            <div className="flex-grow p-4 font-cormorant">
              <p className=" text-xl  font-semibold text-[#252525]">
                {item.name}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Button (optional) */}
      {buttonText && (
        <div className="flex justify-center mt-10 lg:mt-16">
          <button
            onClick={onButtonClick}
            className="bg-[#ac9e86] text-white font-light tracking-widest py-3 px-8 text-xs sm:text-sm uppercase hover:bg-[#978973] rounded-sm transition duration-200 font-quicksand"
          >
            {buttonText}
          </button>
        </div>
      )}
    </div>
  );
};

export default DestinationGrid;
