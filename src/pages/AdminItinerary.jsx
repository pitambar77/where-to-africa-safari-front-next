import React, { useEffect, useState } from "react";
import {
  getItineraries,
  createItinerary,
  updateItinerary,
  deleteItinerary,
} from "../api/itineraryAPI.js";
import ItineraryForm from "../components/ItineraryForm";

const AdminItinerary = () => {
  const [itineraries, setItineraries] = useState([]);
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await getItineraries();
    setItineraries(res.data);
  };

  const handleAdd = async (data) => {
    await createItinerary(data);
    fetchData();
  };

  const handleUpdate = async (data) => {
    await updateItinerary(editItem._id, data);
    setEditItem(null);
    fetchData();
  };

  const handleDelete = async (id) => {
    await deleteItinerary(id);
    fetchData();
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Admin Panel - Itinerary Management</h2>

      <ItineraryForm
        onSubmit={editItem ? handleUpdate : handleAdd}
        initialData={editItem}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {itineraries.map((item) => (
          <div
            key={item._id}
            className="p-4 bg-gray-100 rounded shadow hover:shadow-lg transition"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-40 object-cover rounded"
            />
            <h3 className="text-lg font-semibold mt-2">{item.day} - {item.title}</h3>
            <p className="text-sm text-gray-700">{item.location}</p>
            <p className="text-xs text-gray-600 mt-1">{item.description}</p>
            <div className="flex justify-between mt-2">
              <button
                onClick={() => setEditItem(item)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminItinerary;
