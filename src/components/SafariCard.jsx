"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import Link from "next/link"; // 👈 ADD
import Image from "next/image";

const SafariCard = ({ item }) => {
  const [liked, setLiked] = useState(false);

  return (
    <Link
      href={`/package/${item.id}`} // 👈 IMPORTANT
      className="block relative rounded-sm overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 "
    >
      <div className="relative h-[450px] w-full">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
      </div>

      <div
        onClick={(e) => {
          e.preventDefault(); // 👈 prevent navigation when heart clicked
          setLiked(!liked);
        }}
        className={`absolute top-4 left-4 flex items-center cursor-pointer justify-center w-10 h-10 rounded-full border border-gray-300 shadow-sm transition ${
          liked ? "bg-white text-red-500" : "bg-white text-gray-500"
        }`}
      >
        <Heart fill={liked ? "currentColor" : "none"} size={20} />
      </div>

      {item.nights && (
        <div className="absolute top-4 text-xs md:text-sm right-4 bg-[#aaa086] text-white text-sm font-semibold px-3 py-1 rounded-md font-quicksand">
          {item.nights} Nights
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0  bg-gradient-to-t from-black via-black/70 to-transparent p-4 text-white flex flex-col justify-end">
        {item.country && (
          <div className="text-xs uppercase tracking-wide opacity-80 mb-3 font-quicksand font-semibold">
            {item.country}
          </div>
        )}
        <div className="mb-4 font-cormorant text-xl sm:text-2xl md:text-3xl line-clamp-3">
          {item.title}
        </div>
        {item.price && (
          <div className="mt-1 mb-4 text-sm md:text-base font-quicksand">
            Guide Price{" "}
            <span className=" font-semibold">
              {item.price.toLocaleString()}
            </span>{" "}
            Per Person
          </div>
        )}
      </div>
    </Link>
  );
};

export default SafariCard;
