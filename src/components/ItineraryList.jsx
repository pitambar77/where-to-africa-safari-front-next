// // import React, { useEffect, useState } from "react";
// // import { getItineraries, deleteItinerary } from "../api/itineraryAPI";
// // import { toast } from "react-toastify";

// // const ItineraryList = ({ refresh, onRefresh }) => {
// //   const [itineraries, setItineraries] = useState([]);

// //   useEffect(() => {
// //     fetchData();
// //   }, [refresh]);

// //   const fetchData = async () => {
// //     const { data } = await getItineraries();
// //     setItineraries(data);
// //   };

// //   const handleDelete = async (id) => {
// //     if (window.confirm("Are you sure?")) {
// //       await deleteItinerary(id);
// //       toast.info("Itinerary deleted");
// //       onRefresh();
// //     }
// //   };

// //   return (
// //     <div className="bg-white shadow-lg rounded-xl p-6">
// //       <h2 className="text-xl font-semibold mb-3">All Itineraries</h2>
// //       {itineraries.map((item) => (
// //         <div key={item._id} className="border-b py-3 flex justify-between items-center">
// //           <div>
// //             <h3 className="font-semibold">{item.name}</h3>
// //             <p className="text-sm text-gray-500">{item.days.length} days</p>
// //           </div>
// //           <button onClick={() => handleDelete(item._id)} className="text-red-600">Delete</button>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // };

// // export default ItineraryList;


// import React, { useEffect, useState } from "react";
// import { getItineraries, deleteItinerary } from "../api/itineraryAPI";
// import { toast } from "react-toastify";

// const ItineraryList = ({ refresh, onRefresh, onEdit }) => {
//   const [itineraries, setItineraries] = useState([]);

//   useEffect(() => {
//     fetchData();
//   }, [refresh]);

//   const fetchData = async () => {
//     const { data } = await getItineraries();
//     setItineraries(data);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this itinerary?")) {
//       await deleteItinerary(id);
//       toast.info("Itinerary deleted");
//       onRefresh();
//     }
//   };

//   return (
//     <div className="bg-white shadow-lg rounded-xl p-6">
//       <h2 className="text-xl font-semibold mb-3">All Itineraries</h2>
//       {itineraries.length === 0 && <p>No itineraries found.</p>}
//       {itineraries.map((item) => (
//         <div
//           key={item._id}
//           className="border-b py-3 flex justify-between items-center"
//         >
//           <div>
//             <h3 className="font-semibold">{item.name}</h3>
//             <p className="text-sm text-gray-500">{item.days.length} days</p>
//           </div>
//           <div className="flex gap-3">
//             <button
//               onClick={() => onEdit(item)}
//               className="text-blue-600 hover:underline"
//             >
//               Edit
//             </button>
//             <button
//               onClick={() => handleDelete(item._id)}
//               className="text-red-600 hover:underline"
//             >
//               Delete
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ItineraryList;


import React, { useEffect, useState } from "react";
import { getItineraries, deleteItinerary } from "../api/itineraryAPI.js";
import { toast } from "react-toastify";

const ItineraryList = ({ refresh, onRefresh, onEdit }) => {
  const [itineraries, setItineraries] = useState([]);

  useEffect(() => {
    fetchData();
  }, [refresh]);

  const fetchData = async () => {
    const { data } = await getItineraries();
    setItineraries(data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this itinerary?")) {
      await deleteItinerary(id);
      toast.info("Itinerary deleted");
      onRefresh();
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-3">All Itineraries</h2>
      {itineraries.length === 0 && <p>No itineraries found.</p>}

      {itineraries.map((item) => (
        <div key={item._id} className="border-b py-3">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.days.length} days</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => onEdit(item)} className="text-blue-600 hover:underline">
                Edit
              </button>
              <button onClick={() => handleDelete(item._id)} className="text-red-600 hover:underline">
                Delete
              </button>
            </div>
          </div>

          {/* ✅ small preview */}
          <div className="flex gap-2 mt-2 flex-wrap">
            {item.days.map((day, i) =>
              day.image ? (
                <img
                  key={i}
                  src={day.image}
                  alt={day.title}
                  className="w-20 h-20 object-cover rounded-lg border"
                />
              ) : null
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItineraryList;
