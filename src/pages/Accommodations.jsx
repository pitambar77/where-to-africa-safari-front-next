// import React, { useState, useEffect } from "react";
// import {
//   createAccommodation,
//   getAllAccommodations,
//   deleteAccommodation,
// } from "../api/accommodationAPI";
// import { getAllDestinations } from "../api/destinationAPI.js";

// const Accommodations = () => {
//   // 🔹 Dropdown States
//   const [destinations, setDestinations] = useState([]);
//   const [selectedDestinationId, setSelectedDestinationId] = useState("");
//   const [selectedRegionId, setSelectedRegionId] = useState("");

//   // 🔹 Banner & Overview
//   const [bannerTitle, setBannerTitle] = useState("");
//   const [bannerDescription, setBannerDescription] = useState("");
//   const [bannerImage, setBannerImage] = useState(null);
//   const [overviewTitle, setOverviewTitle] = useState("");
//   const [overviewSubtitle, setOverviewSubtitle] = useState("");
//   const [overviewDescription, setOverviewDescription] = useState("");

//   // 🔹 Accommodation Info
//   const [name, setName] = useState("");
//   const [location, setLocation] = useState("");
//   const [pricePerPerson, setPricePerPerson] = useState("");
//   const [nightsStay, setNightsStay] = useState("");
//   const [accommodationType, setAccommodationType] = useState("");
//   const [checkIn, setCheckIn] = useState("");
//   const [checkOut, setCheckOut] = useState("");

//   // 🔹 Gallery
//   const [galleryDescription, setGalleryDescription] = useState("");
//   const [galleryImages, setGalleryImages] = useState([]);

//   // 🔹 Amenities & Q&A sections
//   const [amenities, setAmenities] = useState([]);
//   const [newAmenity, setNewAmenity] = useState("");
//   const [aboutBooking, setAboutBooking] = useState([
//     { question: "", answer: "" },
//   ]);
//   const [requirements, setRequirements] = useState([
//     { question: "", answer: "" },
//   ]);

//   // 🔹 All Accommodations
//   const [accommodations, setAccommodations] = useState([]);

//   // Fetch data
//   useEffect(() => {
//     fetchDestinations();
//     fetchAccommodations();
//   }, []);

//   const fetchDestinations = async () => {
//     const { data } = await getAllDestinations();
//     setDestinations(data);
//   };

//   const selectedDestination = destinations.find(
//     (d) => d._id === selectedDestinationId,
//   );

//   const fetchAccommodations = async () => {
//     const { data } = await getAllAccommodations();
//     setAccommodations(data);
//   };

//   // const selectedDestination = destinations.find(
//   //   (d) => d._id === selectedDestinationId
//   // );

//   // ✅ Add / Remove Amenities
//   const addAmenity = () => {
//     if (!newAmenity.trim()) return;
//     setAmenities((prev) => [...prev, newAmenity.trim()]);
//     setNewAmenity("");
//   };

//   const removeAmenity = (index) => {
//     setAmenities((prev) => prev.filter((_, i) => i !== index));
//   };

//   // ✅ Q&A Section Helpers
//   const handleAddQA = (section, setter, state) =>
//     setter([...state, { question: "", answer: "" }]);

//   const handleChangeQA = (section, index, field, value, setter, state) => {
//     const updated = [...state];
//     updated[index][field] = value;
//     setter(updated);
//   };

//   const handleRemoveQA = (section, index, setter, state) =>
//     setter(state.filter((_, i) => i !== index));

//   // ✅ Submit Form
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // if (!selectedDestinationId || !selectedRegionId) {
//     //   alert("Please select both Destination and Region");
//     //   return;
//     // }

//     if (!selectedDestinationId) {
//       alert("Please select a destination!");
//       return;
//     }

//     if (!selectedRegionId) {
//       alert("Please select a region!");
//       return;
//     }

//     const formData = new FormData();

//     formData.append("destinationId", selectedDestinationId);
//     formData.append("regionId", selectedRegionId);

//     // Banner and overview
//     formData.append("bannerTitle", bannerTitle);
//     formData.append("bannerDescription", bannerDescription);
//     if (bannerImage) formData.append("bannerImage", bannerImage);
//     formData.append("overviewTitle", overviewTitle);
//     formData.append("overviewSubtitle", overviewSubtitle);
//     formData.append("overviewDescription", overviewDescription);

//     // Accommodation info
//     formData.append("name", name);
//     formData.append("location", location);
//     formData.append("pricePerPerson", pricePerPerson);
//     formData.append("nightsStay", nightsStay);
//     formData.append("accommodationType", accommodationType);
//     formData.append("checkIn", checkIn);
//     formData.append("checkOut", checkOut);

//     // Gallery
//     formData.append("galleryDescription", galleryDescription);
//     galleryImages.forEach((img) => formData.append("galleryImages", img));

//     // Other sections
//     formData.append("amenities", JSON.stringify(amenities));
//     formData.append("aboutBooking", JSON.stringify(aboutBooking));
//     formData.append("requirements", JSON.stringify(requirements));

//     try {
//       await createAccommodation(formData);
//       alert("Accommodation created successfully!");
//       fetchAccommodations();
//     } catch (err) {
//       console.error(err);
//       alert("Failed to create accommodation");
//     }
//   };

//   return (
//     <div className="p-8">
//       <h2 className="text-2xl font-semibold mb-6">Add New Accommodation</h2>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Destination Dropdown */}
//         <div>
//           <h3 className="font-semibold text-lg mb-2">Select Destination</h3>
//           <select
//             className="border p-2 w-full"
//             value={selectedDestinationId}
//             onChange={(e) => {
//               setSelectedDestinationId(e.target.value);
//               setSelectedRegionId(""); // reset when destination changes
//             }}
//           >
//             <option value="">-- Select Destination --</option>
//             {destinations.map((dest) => (
//               <option key={dest._id} value={dest._id}>
//                 {dest.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Region Dropdown */}
//         {selectedDestination && selectedDestination.regions?.length > 0 && (
//           <div>
//             <h3 className="font-semibold text-lg mb-2">Select Region</h3>
//             <select
//               className="border p-2 w-full"
//               value={selectedRegionId}
//               onChange={(e) => setSelectedRegionId(e.target.value)}
//             >
//               <option value="">-- Select Region --</option>
//               {selectedDestination.regions.map((region) => (
//                 <option key={region._id} value={region._id}>
//                   {region.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//         )}

//         {/* Banner */}
//         <div>
//           <h3 className="font-semibold mb-2">Banner</h3>
//           <input
//             type="text"
//             placeholder="Banner Title"
//             className="border p-2 w-full"
//             value={bannerTitle}
//             onChange={(e) => setBannerTitle(e.target.value)}
//           />
//           <textarea
//             placeholder="Banner Description"
//             className="border p-2 w-full mt-2"
//             value={bannerDescription}
//             onChange={(e) => setBannerDescription(e.target.value)}
//           />
//           <input
//             type="file"
//             className="border p-2 w-full mt-2"
//             onChange={(e) => setBannerImage(e.target.files[0])}
//           />
//         </div>

//         {/* Overview */}
//         <div>
//           <h3 className="font-semibold mb-2">Overview</h3>
//           <input
//             type="text"
//             placeholder="Title"
//             className="border p-2 w-full"
//             value={overviewTitle}
//             onChange={(e) => setOverviewTitle(e.target.value)}
//           />
//           <input
//             type="text"
//             placeholder="Subtitle"
//             className="border p-2 w-full mt-2"
//             value={overviewSubtitle}
//             onChange={(e) => setOverviewSubtitle(e.target.value)}
//           />
//           <textarea
//             placeholder="Description"
//             className="border p-2 w-full mt-2"
//             value={overviewDescription}
//             onChange={(e) => setOverviewDescription(e.target.value)}
//           />
//         </div>

//         {/* Accommodation Info */}
//         <div>
//           <h3 className="font-semibold mb-2">Accommodation Info</h3>
//           <div className="grid md:grid-cols-3 gap-3">
//             <input
//               type="text"
//               placeholder="Name"
//               className="border p-2"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//             <input
//               type="text"
//               placeholder="Location"
//               className="border p-2"
//               value={location}
//               onChange={(e) => setLocation(e.target.value)}
//             />
//             <input
//               type="text"
//               placeholder="Type"
//               className="border p-2"
//               value={accommodationType}
//               onChange={(e) => setAccommodationType(e.target.value)}
//             />
//           </div>
//           <div className="grid md:grid-cols-4 gap-3 mt-3">
//             <input
//               type="number"
//               placeholder="Price Per Person"
//               className="border p-2"
//               value={pricePerPerson}
//               onChange={(e) => setPricePerPerson(e.target.value)}
//             />
//             <input
//               type="number"
//               placeholder="Nights Stay"
//               className="border p-2"
//               value={nightsStay}
//               onChange={(e) => setNightsStay(e.target.value)}
//             />
//             <input
//               type="text"
//               placeholder="Check-In"
//               className="border p-2"
//               value={checkIn}
//               onChange={(e) => setCheckIn(e.target.value)}
//             />
//             <input
//               type="text"
//               placeholder="Check-Out"
//               className="border p-2"
//               value={checkOut}
//               onChange={(e) => setCheckOut(e.target.value)}
//             />
//           </div>
//         </div>

//         {/* Gallery */}
//         <div>
//           <h3 className="font-semibold mb-2">Gallery</h3>
//           <textarea
//             placeholder="Gallery Description"
//             className="border p-2 w-full"
//             value={galleryDescription}
//             onChange={(e) => setGalleryDescription(e.target.value)}
//           />
//           <input
//             type="file"
//             multiple
//             className="border p-2 w-full mt-2"
//             onChange={(e) => setGalleryImages([...e.target.files])}
//           />
//         </div>

//         {/* Amenities */}
//         <div>
//           <h3 className="font-semibold mb-2">Amenities</h3>
//           <div className="flex gap-2">
//             <input
//               type="text"
//               className="border p-2 flex-1"
//               placeholder="Add Amenity"
//               value={newAmenity}
//               onChange={(e) => setNewAmenity(e.target.value)}
//             />
//             <button
//               type="button"
//               onClick={addAmenity}
//               className="bg-blue-600 text-white px-3 rounded"
//             >
//               Add
//             </button>
//           </div>
//           <div className="flex flex-wrap gap-2 mt-2">
//             {amenities.map((a, i) => (
//               <div
//                 key={i}
//                 className="bg-gray-200 px-3 py-1 rounded flex items-center gap-2"
//               >
//                 {a}
//                 <button
//                   type="button"
//                   onClick={() => removeAmenity(i)}
//                   className="text-red-600"
//                 >
//                   ×
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* About Booking & Requirements */}
//         {[
//           {
//             label: "About Booking",
//             state: aboutBooking,
//             setter: setAboutBooking,
//           },
//           {
//             label: "Requirements",
//             state: requirements,
//             setter: setRequirements,
//           },
//         ].map(({ label, state, setter }) => (
//           <div key={label}>
//             <h3 className="font-semibold mb-2">{label}</h3>
//             {state.map((qa, i) => (
//               <div key={i} className="border p-3 mb-2 rounded">
//                 <input
//                   type="text"
//                   placeholder="Question"
//                   className="border p-2 w-full mb-2"
//                   value={qa.question}
//                   onChange={(e) =>
//                     handleChangeQA(
//                       label,
//                       i,
//                       "question",
//                       e.target.value,
//                       setter,
//                       state,
//                     )
//                   }
//                 />
//                 <textarea
//                   placeholder="Answer"
//                   className="border p-2 w-full"
//                   value={qa.answer}
//                   onChange={(e) =>
//                     handleChangeQA(
//                       label,
//                       i,
//                       "answer",
//                       e.target.value,
//                       setter,
//                       state,
//                     )
//                   }
//                 />
//                 <button
//                   type="button"
//                   onClick={() => handleRemoveQA(label, i, setter, state)}
//                   className="text-red-600 mt-2"
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={() => handleAddQA(label, setter, state)}
//               className="text-blue-600 text-sm"
//             >
//               + Add
//             </button>
//           </div>
//         ))}

//         <button
//           type="submit"
//           className="bg-green-600 text-white px-6 py-2 rounded"
//         >
//           Create Accommodation
//         </button>
//       </form>

//       {/* All Accommodations */}
//       <div className="mt-10">
//         <h3 className="text-xl font-semibold mb-4">All Accommodations</h3>
//         {accommodations.map((acc) => (
//           <div
//             key={acc._id}
//             className="border p-4 mb-3 flex justify-between items-center"
//           >
//             <div>
//               <h4 className="font-semibold">{acc.name}</h4>
//               <p className="text-sm text-gray-600">
//                 {acc.destination?.name} → {acc.region?.name}
//               </p>
//             </div>
//             <button
//               onClick={() =>
//                 deleteAccommodation(acc._id).then(fetchAccommodations)
//               }
//               className="text-red-500"
//             >
//               Delete
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Accommodations;

import React, { useState, useEffect } from "react";
import {
  createAccommodation,
  getAccommodations, // ✅ FIXED (was getAllAccommodations)
  deleteAccommodation,
} from "../api/accommodationAPI";
import { getAllDestinations } from "../api/destinationAPI.js";

const Accommodations = () => {
  // 🔹 Dropdown States
  const [destinations, setDestinations] = useState([]);
  const [selectedDestinationId, setSelectedDestinationId] = useState("");
  const [selectedRegionId, setSelectedRegionId] = useState("");

  // 🔹 Banner & Overview
  const [bannerTitle, setBannerTitle] = useState("");
  const [bannerDescription, setBannerDescription] = useState("");
  const [bannerImage, setBannerImage] = useState(null);
  const [overviewTitle, setOverviewTitle] = useState("");
  const [overviewSubtitle, setOverviewSubtitle] = useState("");
  const [overviewDescription, setOverviewDescription] = useState("");

  // 🔹 Accommodation Info
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [pricePerPerson, setPricePerPerson] = useState("");
  const [nightsStay, setNightsStay] = useState("");
  const [accommodationType, setAccommodationType] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  // 🔹 Gallery
  const [galleryDescription, setGalleryDescription] = useState("");
  const [galleryImages, setGalleryImages] = useState([]);

  // 🔹 Amenities & Q&A
  const [amenities, setAmenities] = useState([]);
  const [newAmenity, setNewAmenity] = useState("");
  const [aboutBooking, setAboutBooking] = useState([
    { question: "", answer: "" },
  ]);
  const [requirements, setRequirements] = useState([
    { question: "", answer: "" },
  ]);

  // 🔹 All Accommodations
  const [accommodations, setAccommodations] = useState([]);

  // Fetch data
  useEffect(() => {
    fetchDestinations();
    fetchAccommodations();
  }, []);

  const fetchDestinations = async () => {
    try {
      const { data } = await getAllDestinations();
      setDestinations(data || []);
    } catch (err) {
      console.error("Failed to fetch destinations", err);
    }
  };

  const fetchAccommodations = async () => {
    try {
      const { data } = await getAccommodations(); // ✅ FIXED
      setAccommodations(data || []);
    } catch (err) {
      console.error("Failed to fetch accommodations", err);
    }
  };

  const selectedDestination = destinations.find(
    (d) => d._id === selectedDestinationId,
  );

  // ✅ Amenities
  const addAmenity = () => {
    if (!newAmenity.trim()) return;
    setAmenities((prev) => [...prev, newAmenity.trim()]);
    setNewAmenity("");
  };

  const removeAmenity = (index) => {
    setAmenities((prev) => prev.filter((_, i) => i !== index));
  };

  // ✅ Q&A helpers
  const handleAddQA = (setter, state) => {
    setter([...state, { question: "", answer: "" }]);
  };

  const handleChangeQA = (index, field, value, setter, state) => {
    const updated = [...state];
    updated[index][field] = value;
    setter(updated);
  };

  const handleRemoveQA = (index, setter, state) => {
    setter(state.filter((_, i) => i !== index));
  };

  // ✅ Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDestinationId || !selectedRegionId) {
      alert("Please select destination and region");
      return;
    }

    const formData = new FormData();

    formData.append("destinationId", selectedDestinationId);
    formData.append("regionId", selectedRegionId);

    formData.append("bannerTitle", bannerTitle);
    formData.append("bannerDescription", bannerDescription);
    if (bannerImage) formData.append("bannerImage", bannerImage);

    formData.append("overviewTitle", overviewTitle);
    formData.append("overviewSubtitle", overviewSubtitle);
    formData.append("overviewDescription", overviewDescription);

    formData.append("name", name);
    formData.append("location", location);
    formData.append("pricePerPerson", pricePerPerson);
    formData.append("nightsStay", nightsStay);
    formData.append("accommodationType", accommodationType);
    formData.append("checkIn", checkIn);
    formData.append("checkOut", checkOut);

    formData.append("galleryDescription", galleryDescription);
    galleryImages.forEach((img) => formData.append("galleryImages", img));

    formData.append("amenities", JSON.stringify(amenities));
    formData.append("aboutBooking", JSON.stringify(aboutBooking));
    formData.append("requirements", JSON.stringify(requirements));

    try {
      await createAccommodation(formData);
      alert("Accommodation created successfully!");
      fetchAccommodations();
    } catch (err) {
      console.error(err);
      alert("Failed to create accommodation");
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-6">Add New Accommodation</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Destination */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Select Destination</h3>
          <select
            className="border p-2 w-full"
            value={selectedDestinationId}
            onChange={(e) => {
              setSelectedDestinationId(e.target.value);
              setSelectedRegionId("");
            }}
          >
            <option value="">-- Select Destination --</option>
            {destinations.map((dest) => (
              <option key={dest._id} value={dest._id}>
                {dest.name}
              </option>
            ))}
          </select>
        </div>

        {/* Region */}
        {selectedDestination?.regions?.length > 0 && (
          <div>
            <h3 className="font-semibold text-lg mb-2">Select Region</h3>
            <select
              className="border p-2 w-full"
              value={selectedRegionId}
              onChange={(e) => setSelectedRegionId(e.target.value)}
            >
              <option value="">-- Select Region --</option>
              {selectedDestination.regions.map((r) => (
                <option key={r._id} value={r._id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Banner */}
        <div>
          <h3 className="font-semibold mb-2">Banner</h3>
          <input
            className="border p-2 w-full"
            placeholder="Banner Title"
            value={bannerTitle}
            onChange={(e) => setBannerTitle(e.target.value)}
          />
          <textarea
            className="border p-2 w-full mt-2"
            placeholder="Banner Description"
            value={bannerDescription}
            onChange={(e) => setBannerDescription(e.target.value)}
          />
          <input
            type="file"
            className="border p-2 w-full mt-2"
            onChange={(e) => setBannerImage(e.target.files[0])}
          />
        </div>

        {/* Overview */}
        <div>
          <h3 className="font-semibold mb-2">Overview</h3>
          <input
            className="border p-2 w-full"
            placeholder="Title"
            value={overviewTitle}
            onChange={(e) => setOverviewTitle(e.target.value)}
          />
          <input
            className="border p-2 w-full mt-2"
            placeholder="Subtitle"
            value={overviewSubtitle}
            onChange={(e) => setOverviewSubtitle(e.target.value)}
          />
          <textarea
            className="border p-2 w-full mt-2"
            placeholder="Description"
            value={overviewDescription}
            onChange={(e) => setOverviewDescription(e.target.value)}
          />
        </div>

        {/* Accommodation Info */}
        <div>
          <h3 className="font-semibold mb-2">Accommodation Info</h3>

          <input
            className="border p-2 w-full"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="border p-2 w-full mt-2"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <input
            className="border p-2 w-full mt-2"
            placeholder="Type"
            value={accommodationType}
            onChange={(e) => setAccommodationType(e.target.value)}
          />

          <div className="grid md:grid-cols-4 gap-3 mt-3">
            <input
              className="border p-2"
              placeholder="Price"
              value={pricePerPerson}
              onChange={(e) => setPricePerPerson(e.target.value)}
            />

            <input
              className="border p-2"
              placeholder="Nights"
              value={nightsStay}
              onChange={(e) => setNightsStay(e.target.value)}
            />

            <input
              className="border p-2"
              placeholder="Check-In"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />

            <input
              className="border p-2"
              placeholder="Check-Out"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
        </div>

        {/* Gallery */}
        <div>
          <h3 className="font-semibold mb-2">Gallery</h3>
          <textarea
            className="border p-2 w-full"
            placeholder="Gallery Description"
            value={galleryDescription}
            onChange={(e) => setGalleryDescription(e.target.value)}
          />
          <input
            type="file"
            multiple
            className="border p-2 w-full mt-2"
            onChange={(e) => setGalleryImages([...e.target.files])}
          />
        </div>

        {/* Amenities */}
        <div>
          <h3 className="font-semibold mb-2">Amenities</h3>
          <div className="flex gap-2">
            <input
              className="border p-2 flex-1"
              value={newAmenity}
              onChange={(e) => setNewAmenity(e.target.value)}
            />
            <button
              type="button"
              onClick={addAmenity}
              className="bg-blue-600 text-white px-3 rounded"
            >
              Add
            </button>
          </div>
        </div>

        {/* Submit */}
        <button className="bg-green-600 text-white px-6 py-2 rounded">
          Create Accommodation
        </button>
      </form>

      {/* LIST */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">All Accommodations</h3>

        {accommodations.map((acc) => (
          <div key={acc._id} className="border p-4 flex justify-between">
            <div>
              <h4>{acc.name}</h4>
              <p className="text-sm text-gray-600">
                {acc.destination?.name} → {acc.region?.name}
              </p>
            </div>

            <button
              className="text-red-500"
              onClick={async () => {
                await deleteAccommodation(acc._id);
                fetchAccommodations();
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accommodations;
