import React from "react";
import { useNavigate } from "react-router-dom";

const AccommodationCard = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div
      className="relative rounded-xl overflow-hidden shadow-md cursor-pointer group"
      onClick={() => navigate(`/accommodation/${item._id}`)}
    >
      {/* <img
        src={item.bannerImages?.[0]?.url}
        alt={item.name}
        className="w-full h-56 object-cover group-hover:scale-105 transition"
      /> */}
      <img
  src={item.bannerImages?.[0]?.url || item.bannerImages?.[0]}
  alt={item.name}
  className="w-full h-56 object-cover group-hover:scale-105 transition"
/>

      <div className="absolute bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-3 text-white w-full">
        <h3 className="text-lg font-semibold">{item.name}</h3>
        <p className="text-sm">{item.location}</p>
        <p className="text-sm">{item.nightsStay} Nights | ${item.pricePerPerson}/person</p>
      </div>
    </div>
  );
};

export default AccommodationCard;
