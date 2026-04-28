// // import React, { useState } from "react";
// // import DayForm from "./DayForm";
// // import { createItinerary } from "../api/itineraryAPI";
// // import { toast } from "react-toastify";

// // const ItineraryForm = ({ refreshList }) => {
// //   const [name, setName] = useState("");
// //   const [days, setDays] = useState([{ day: "", title: "", location: "", description: "", accommodationName: "", image: null }]);

// //   const handleChange = (e, index, isFile = false) => {
// //     const updatedDays = [...days];
// //     if (isFile) updatedDays[index].image = e.target.files[0];
// //     else updatedDays[index][e.target.name] = e.target.value;
// //     setDays(updatedDays);
// //   };

// //   const handleAddDay = () => setDays([...days, { day: "", title: "", location: "", description: "", accommodationName: "", image: null }]);
// //   const handleRemoveDay = (index) => setDays(days.filter((_, i) => i !== index));

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const formData = new FormData();
// //       formData.append("name", name);
// //       formData.append("days", JSON.stringify(days.map(({ image, ...rest }) => rest)));
// //       days.forEach((day) => day.image && formData.append("images", day.image));

// //       await createItinerary(formData);
// //       toast.success("Itinerary created successfully!");
// //       setName("");
// //       setDays([{ day: "", title: "", location: "", description: "", accommodationName: "", image: null }]);
// //       refreshList();
// //     } catch (err) {
// //       toast.error("Failed to create itinerary");
// //     }
// //   };

// //   return (
// //     <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-6 space-y-4">
// //       <h2 className="text-xl font-semibold mb-2">Add New Itinerary</h2>
// //       <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Itinerary Name" className="border p-2 rounded w-full" />
// //       <div className="space-y-4">
// //         {days.map((day, index) => (
// //           <DayForm key={index} day={day} index={index} handleChange={handleChange} handleRemove={handleRemoveDay} />
// //         ))}
// //       </div>
// //       <button type="button" onClick={handleAddDay} className="bg-blue-100 text-blue-600 px-3 py-1 rounded">+ Add Day</button>
// //       <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">Save Itinerary</button>
// //     </form>
// //   );
// // };

// // export default ItineraryForm;

// import React, { useState, useEffect } from "react";
// import DayForm from "./DayForm";
// import { createItinerary, updateItinerary } from "../api/itineraryAPI";
// import { toast } from "react-toastify";

// const ItineraryForm = ({ refreshList, editItem, clearEdit }) => {
//   const [name, setName] = useState("");
//   const [days, setDays] = useState([
//     { day: "", title: "", location: "", description: "", accommodationName: "", image: null },
//   ]);

//   useEffect(() => {
//     if (editItem) {
//       setName(editItem.name);
//       setDays(editItem.days || []);
//     }
//   }, [editItem]);

//   const handleChange = (e, index, isFile = false) => {
//     const updatedDays = [...days];
//     if (isFile) updatedDays[index].image = e.target.files[0];
//     else updatedDays[index][e.target.name] = e.target.value;
//     setDays(updatedDays);
//   };

//   const handleAddDay = () =>
//     setDays([
//       ...days,
//       { day: "", title: "", location: "", description: "", accommodationName: "", image: null },
//     ]);

//   const handleRemoveDay = (index) => setDays(days.filter((_, i) => i !== index));

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();
//       formData.append("name", name);
//       formData.append("days", JSON.stringify(days.map(({ image, ...rest }) => rest)));
//       days.forEach((day) => day.image && formData.append("images", day.image));

//       if (editItem) {
//         await updateItinerary(editItem._id, formData);
//         toast.success("Itinerary updated successfully!");
//         clearEdit();
//       } else {
//         await createItinerary(formData);
//         toast.success("Itinerary created successfully!");
//       }

//       setName("");
//       setDays([{ day: "", title: "", location: "", description: "", accommodationName: "", image: null }]);
//       refreshList();
//     } catch (err) {
//       toast.error("Failed to save itinerary");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-6 space-y-4">
//       <h2 className="text-xl font-semibold mb-2">
//         {editItem ? "Edit Itinerary" : "Add New Itinerary"}
//       </h2>
//       <input
//         type="text"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         placeholder="Itinerary Name"
//         className="border p-2 rounded w-full"
//         required
//       />
//       <div className="space-y-4">
//         {days.map((day, index) => (
//           <DayForm
//             key={index}
//             day={day}
//             index={index}
//             handleChange={handleChange}
//             handleRemove={handleRemoveDay}
//           />
//         ))}
//       </div>
//       <div className="flex gap-4">
//         <button
//           type="button"
//           onClick={handleAddDay}
//           className="bg-blue-100 text-blue-600 px-3 py-1 rounded"
//         >
//           + Add Day
//         </button>
//         <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">
//           {editItem ? "Update" : "Save"}
//         </button>
//         {editItem && (
//           <button
//             type="button"
//             onClick={clearEdit}
//             className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
//           >
//             Cancel
//           </button>
//         )}
//       </div>
//     </form>
//   );
// };

// export default ItineraryForm;


import React, { useState, useEffect } from "react";
import DayForm from "./DayForm";
import { createItinerary, updateItinerary } from "../api/itineraryAPI.js";
import { deleteItineraryImage } from "../api/itineraryAPI.js";
import { getAllDestinations } from "../api/destinationAPI.js"; // ✅ import destinations

import { toast } from "react-toastify";

const ItineraryForm = ({ refreshList, editItem, clearEdit }) => {
  const [name, setName] = useState("");
  const [days, setDays] = useState([
    { day: "", title: "", location: "", description: "", accommodationName: "", image: null },
  ]);

  const [destinations, setDestinations] = useState([]); // ✅ for dropdown
  const [selectedDestinationId, setSelectedDestinationId] = useState(""); // ✅ selected ID


  useEffect(() => {
    if (editItem) {
      setName(editItem.name);
      setDays(editItem.days || []);
    }
     fetchDestinations();
  }, [editItem]);

  const fetchDestinations = async () => {
    const { data } = await getAllDestinations();
    setDestinations(data);
  };



  const handleChange = (e, index, isFile = false) => {
    const updatedDays = [...days];
    if (isFile) {
      updatedDays[index].image = e.target.files[0];
    } else {
      updatedDays[index][e.target.name] = e.target.value;
    }
    setDays(updatedDays);
  };

  const handleAddDay = () =>
    setDays([
      ...days,
      { day: "", title: "", location: "", description: "", accommodationName: "", image: null },
    ]);

  const handleRemoveDay = (index) => setDays(days.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDestinationId) {
      alert("Please select a destination!");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("destinationId", selectedDestinationId);

      formData.append("name", name);

      // Create stripped-down version of days (excluding image files)
      formData.append(
        "days",
        JSON.stringify(
          days.map(({ image, ...rest }) => ({
            ...rest,
            image: typeof image === "string" ? image : "", // Keep existing URL if editing
          }))
        )
      );

      // Append image files only (Cloudinary upload)
      days.forEach((day) => {
        if (day.image && typeof day.image !== "string") {
          formData.append("images", day.image);
        }
      });

      if (editItem) {
        await updateItinerary(editItem._id, formData);
        toast.success("Itinerary updated successfully!");
        clearEdit();
      } else {
        await createItinerary(formData);
        toast.success("Itinerary created successfully!");
      }

      setName("");
      setDays([{ day: "", title: "", location: "", description: "", accommodationName: "", image: null }]);
      refreshList();
    } catch (err) {
      toast.error("Failed to save itinerary");
    }
  };

  const handleDeleteImage = async (dayIndex) => {
  if (!editItem) {
    // Just remove locally if creating new itinerary
    const updatedDays = [...days];
    updatedDays[dayIndex].image = null;
    setDays(updatedDays);
    return;
  }

  if (window.confirm("Are you sure you want to delete this image?")) {
    try {
      await deleteItineraryImage(editItem._id, dayIndex);
      const updatedDays = [...days];
      updatedDays[dayIndex].image = "";
      setDays(updatedDays);
      toast.success("Image deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete image");
    }
  }
};

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-6 space-y-4">

<div>
          <h3 className="font-semibold text-lg mb-2">Select Destination</h3>
          <select
            className="border p-2 w-full"
            value={selectedDestinationId}
            onChange={(e) => setSelectedDestinationId(e.target.value)}
          >
            <option value="">-- Select Destination --</option>
            {destinations.map((dest) => (
              <option key={dest._id} value={dest._id}>
                {dest.name}
              </option>
            ))}
          </select>
        </div>

      <h2 className="text-xl font-semibold mb-2">
        {editItem ? "Edit Itinerary" : "Add New Itinerary"}
      </h2>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Itinerary Name"
        className="border p-2 rounded w-full"
        required
      />

      <div className="space-y-4">
        {days.map((day, index) => (
      
          <DayForm
  key={index}
  day={day}
  index={index}
  handleChange={handleChange}
  handleRemove={handleRemoveDay}
  handleDeleteImage={handleDeleteImage}
/>

        ))}
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={handleAddDay}
          className="bg-blue-100 text-blue-600 px-3 py-1 rounded"
        >
          + Add Day
        </button>

        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">
          {editItem ? "Update" : "Save"}
        </button>

        {editItem && (
          <button
            type="button"
            onClick={clearEdit}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ItineraryForm;
