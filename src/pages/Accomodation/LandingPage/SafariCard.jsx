"use client";
import { useState } from "react";
import { Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const SafariCard = ({ safari, link }) => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="relative rounded-sm overflow-hidden shadow-md hover:shadow-lg transition-all  duration-300">
      {/* ❤️ Heart Button */}
      <div
        onClick={() => setLiked(!liked)}
        className={`absolute top-4 left-4 flex items-center cursor-pointer justify-center w-10 h-10 rounded-full border border-gray-300 shadow-sm transition ${
          liked ? "bg-white text-red-500" : "bg-white text-gray-500"
        }`}
      >
        <Heart fill={liked ? "currentColor" : "none"} size={20} />
      </div>
      <Link href={link}>
        <div className="relative w-full h-[450px]">
          <Image
            src={safari.image } // fallback
            alt={safari.title }
            fill
            priority={false} // set true only for above-the-fold
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>

        {/* 🌙 Nights Badge */}
        <div className="absolute top-4 font-quicksand right-4 bg-[#aaa086] text-white text-sm font-semibold px-3 py-1 rounded-md">
          {safari.nights} {safari.labeldata}
        </div>

        {/* 🖤 Bottom Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 text-white">
          <div className="text-xs uppercase tracking-wide opacity-80 mb-3 font-quicksand font-semibold">
            {safari.country}
          </div>
          <div className="mb-4 font-cormorant text-3xl ">{safari.title}</div>
          <div className=" mt-1 font-quicksand">
            Per Person {safari.price.toLocaleString()}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SafariCard;
