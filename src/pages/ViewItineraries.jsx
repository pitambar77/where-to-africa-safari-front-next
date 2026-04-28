import React, { useEffect, useState } from "react";
import { getItineraries } from "../api/itineraryAPI.js";

const ViewItineraries = () => {
  const [itineraries, setItineraries] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data } = await getItineraries();
    setItineraries(data);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">All Itineraries</h1>
      {itineraries.map((itinerary) => (
        <div key={itinerary._id} className="bg-white shadow-md rounded-lg mb-8 p-6">
          <h2 className="text-2xl font-semibold mb-4">{itinerary.name}</h2>
          {itinerary.days.map((day, i) => (
            <div key={i} className="border-t pt-4 mt-4">
              <h3 className="font-semibold text-lg">{day.day} - {day.title}</h3>
              <p className="text-gray-600">{day.location}</p>
              <p className="mt-2">{day.description}</p>
              {day.image && (
                <img
                  src={day.image}
                  alt={day.title}
                  className="w-full md:w-1/2 rounded-lg mt-3 object-cover"
                />
              )}
              <p className="text-blue-700 font-medium mt-2">
                Accommodation: {day.accommodationName}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ViewItineraries;
