import { useState } from "react";
import { Heart } from "lucide-react";

/**
 * Generic reusable image overlay card
 * 
 * @param {Object} item - Card data (image, title, country, price, nights, etc.)
 * @param {Function} onClick - Optional click handler for the whole card
 * @param {Boolean} showHeart - Whether to show the heart/favorite button
 * @param {Boolean} showNights - Whether to show the nights badge
 * @param {Boolean} showPrice - Whether to show the guide price
 */
const ImageOverlayCard = ({
  item,
  onClick,
  showHeart = true,
  showNights = true,
  showPrice = true,
}) => {
  const [liked, setLiked] = useState(false);

  return (
    <div
      onClick={onClick}
      className="relative rounded-sm overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
    >
      {/* 🖼️ Image */}
      <img
        src={item.image}
        alt={item.title || "Image"}
        className="h-[450px] w-full object-cover"
      />

      {/* ❤️ Heart Button */}
      {showHeart && (
        <div
          onClick={(e) => {
            e.stopPropagation(); // Prevent parent click
            setLiked(!liked);
          }}
          className={`absolute top-4 left-4 flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 shadow-sm cursor-pointer transition ${
            liked ? "bg-white text-red-500" : "bg-white text-gray-500"
          }`}
        >
          <Heart fill={liked ? "currentColor" : "none"} size={20} />
        </div>
      )}

      {/* 🌙 Nights Badge */}
      {showNights && item.nights && (
        <div className="absolute top-4 right-4 bg-[#aaa086] text-white text-sm font-quicksand font-semibold px-3 py-1 rounded-md">
          {item.nights} Nights
        </div>
      )}

      {/* 🖤 Bottom Overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 text-white">
        {item.country && (
          <div className="text-xs uppercase tracking-wide opacity-80 mb-3 font-quicksand font-semibold">
            {item.country}
          </div>
        )}
        {item.title && (
          <div className="mb-4 font-cormorant text-3xl">{item.title}</div>
        )}
        {showPrice && item.price && (
          <div className="mt-1 font-quicksand">
            Guide Price ${item.price.toLocaleString()} Per Person
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageOverlayCard;
