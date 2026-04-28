// import React, { useState, useEffect } from "react";
// import {
//   createAccommodation,
//   updateAccommodation,
// } from "../api/accommodationAPI"; // ✅ import API helper

// const DESTINATIONS = {
//   Africa: ["Kenya", "Tanzania", "South Africa", "Namibia"],
//   Asia: ["Japan", "Thailand", "Vietnam", "India"],
//   Europe: ["France", "Italy", "Spain", "Greece"],
//   "South America": ["Peru", "Brazil", "Chile"],
//   "North America": ["USA", "Canada", "Mexico"],
// };

// const Accommodations = ({ editData, onSuccess }) => {
//   const [form, setForm] = useState({
//     bannerTitle: "",
//     bannerDescription: "",
//     overviewTitle: "",
//     overviewSubtitle: "",
//     overviewDescription: "",
//     destination: "",
//     subdestination: "",
//     name: "",
//     location: "",
//     pricePerPerson: "",
//     nightsStay: "",
//     accommodationType: "",
//     checkIn: "",
//     checkOut: "",
//     galleryDescription: "",
//     amenities: [],
//     aboutBooking: [],
//     requirements: [],
//   });

//   const [bannerImage, setBannerImage] = useState(null);
//   const [galleryImages, setGalleryImages] = useState([]);
//   const [newAmenity, setNewAmenity] = useState("");

//   // ✅ Populate form if editing
//   useEffect(() => {
//     if (editData) setForm(editData);
//   }, [editData]);

//   // ✅ Basic input change handler
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   // ✅ Amenities management
//   const addAmenity = () => {
//     if (!newAmenity.trim()) return;
//     setForm((prev) => ({
//       ...prev,
//       amenities: [...prev.amenities, newAmenity.trim()],
//     }));
//     setNewAmenity("");
//   };

//   const removeAmenity = (index) => {
//     setForm((prev) => ({
//       ...prev,
//       amenities: prev.amenities.filter((_, i) => i !== index),
//     }));
//   };

//   // ✅ Q&A management
//   const addQA = (field) => {
//     setForm((prev) => ({
//       ...prev,
//       [field]: [...prev[field], { question: "", answer: "" }],
//     }));
//   };

//   const updateQA = (field, index, key, value) => {
//     setForm((prev) => {
//       const updated = [...prev[field]];
//       updated[index][key] = value;
//       return { ...prev, [field]: updated };
//     });
//   };

//   const removeQA = (field, index) => {
//     setForm((prev) => {
//       const updated = [...prev[field]];
//       updated.splice(index, 1);
//       return { ...prev, [field]: updated };
//     });
//   };

//   // ✅ Submit handler
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const fd = new FormData();

//       // Text fields
//       Object.entries(form).forEach(([key, value]) => {
//         fd.append(key, Array.isArray(value) ? JSON.stringify(value) : value);
//       });

//       // Images
//       if (bannerImage) fd.append("bannerImage", bannerImage);
//       galleryImages.forEach((file) => fd.append("galleryImages", file));

//       const res = editData
//         ? await updateAccommodation(editData._id, fd)
//         : await createAccommodation(fd);

//       alert("Accommodation saved successfully!");
//       onSuccess && onSuccess(res.data);
//     } catch (error) {
//       console.error("❌ Error saving accommodation:", error);
//       alert("Error saving accommodation. Check console for details.");
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="max-w-5xl mx-auto p-6 bg-white shadow rounded-lg space-y-6"
//     >
//       <h2 className="text-2xl font-semibold mb-4">
//         {editData ? "Edit Accommodation" : "Create Accommodation"}
//       </h2>

//       {/* Banner Section */}
//       <div className="grid md:grid-cols-2 gap-4">
//         <div>
//           <label className="block font-medium">Banner Title</label>
//           <input
//             name="bannerTitle"
//             value={form.bannerTitle}
//             onChange={handleChange}
//             className="border p-2 w-full rounded"
//           />
//         </div>
//         <div>
//           <label className="block font-medium">Banner Description</label>
//           <input
//             name="bannerDescription"
//             value={form.bannerDescription}
//             onChange={handleChange}
//             className="border p-2 w-full rounded"
//           />
//         </div>
//       </div>

//       {/* Destination Selector */}
//       <div className="grid md:grid-cols-2 gap-4">
//         <div>
//           <label className="block font-medium">Destination</label>
//           <select
//             name="destination"
//             value={form.destination}
//             onChange={handleChange}
//             className="border p-2 w-full rounded"
//           >
//             <option value="">Select</option>
//             {Object.keys(DESTINATIONS).map((d) => (
//               <option key={d}>{d}</option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label className="block font-medium">Subdestination</label>
//           <select
//             name="subdestination"
//             value={form.subdestination}
//             onChange={handleChange}
//             className="border p-2 w-full rounded"
//             disabled={!form.destination}
//           >
//             <option value="">Select</option>
//             {DESTINATIONS[form.destination]?.map((s) => (
//               <option key={s}>{s}</option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* Basic Info */}
//       <div className="grid md:grid-cols-3 gap-4">
//         <input
//           placeholder="Name"
//           name="name"
//           value={form.name}
//           onChange={handleChange}
//           className="border p-2 rounded"
//         />
//         <input
//           placeholder="Location"
//           name="location"
//           value={form.location}
//           onChange={handleChange}
//           className="border p-2 rounded"
//         />
//         <input
//           placeholder="Accommodation Type"
//           name="accommodationType"
//           value={form.accommodationType}
//           onChange={handleChange}
//           className="border p-2 rounded"
//         />
//       </div>

//       <div className="grid md:grid-cols-4 gap-4">
//         <input
//           placeholder="Price per person"
//           type="number"
//           name="pricePerPerson"
//           value={form.pricePerPerson}
//           onChange={handleChange}
//           className="border p-2 rounded"
//         />
//         <input
//           placeholder="Nights stay"
//           type="number"
//           name="nightsStay"
//           value={form.nightsStay}
//           onChange={handleChange}
//           className="border p-2 rounded"
//         />
//         <input
//           placeholder="Check-in"
//           name="checkIn"
//           value={form.checkIn}
//           onChange={handleChange}
//           className="border p-2 rounded"
//         />
//         <input
//           placeholder="Check-out"
//           name="checkOut"
//           value={form.checkOut}
//           onChange={handleChange}
//           className="border p-2 rounded"
//         />
//       </div>

//       {/* Image Uploads */}
//       <div>
//         <label className="block font-medium mb-2">Banner Image</label>
//         <input
//           type="file"
//           onChange={(e) => setBannerImage(e.target.files[0])}
//           className="border p-2 w-full rounded"
//         />
//       </div>

//       <div>
//         <label className="block font-medium mb-2">Gallery Images</label>
//         <input
//           type="file"
//           multiple
//           onChange={(e) => setGalleryImages(Array.from(e.target.files))}
//           className="border p-2 w-full rounded"
//         />
//       </div>

//       {/* Amenities */}
//       <div>
//         <label className="block font-medium mb-2">Amenities</label>
//         <div className="flex gap-2 mb-2">
//           <input
//             value={newAmenity}
//             onChange={(e) => setNewAmenity(e.target.value)}
//             placeholder="Add amenity"
//             className="border p-2 flex-1 rounded"
//           />
//           <button
//             type="button"
//             onClick={addAmenity}
//             className="bg-blue-600 text-white px-3 rounded"
//           >
//             Add
//           </button>
//         </div>
//         <ul className="flex flex-wrap gap-2">
//           {form.amenities.map((a, i) => (
//             <li
//               key={i}
//               className="bg-gray-200 px-2 py-1 rounded flex items-center gap-1"
//             >
//               {a}
//               <button
//                 type="button"
//                 className="text-red-600"
//                 onClick={() => removeAmenity(i)}
//               >
//                 ×
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Q&A Sections */}
//       {["aboutBooking", "requirements"].map((section) => (
//         <div key={section}>
//           <h3 className="text-lg font-semibold mb-2 capitalize">
//             {section === "aboutBooking" ? "About Booking" : "Requirements"}
//           </h3>
//           {form[section].map((qa, i) => (
//             <div key={i} className="border p-3 rounded mb-2">
//               <input
//                 placeholder="Question"
//                 value={qa.question}
//                 onChange={(e) => updateQA(section, i, "question", e.target.value)}
//                 className="border p-2 w-full mb-2 rounded"
//               />
//               <textarea
//                 placeholder="Answer"
//                 value={qa.answer}
//                 onChange={(e) => updateQA(section, i, "answer", e.target.value)}
//                 className="border p-2 w-full rounded"
//               />
//               <button
//                 type="button"
//                 onClick={() => removeQA(section, i)}
//                 className="text-red-500 text-sm mt-1"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//           <button
//             type="button"
//             onClick={() => addQA(section)}
//             className="text-blue-600 text-sm"
//           >
//             + Add {section === "aboutBooking" ? "Question" : "Requirement"}
//           </button>
//         </div>
//       ))}

//       <button
//         type="submit"
//         className="bg-green-600 text-white px-6 py-2 rounded"
//       >
//         {editData ? "Update" : "Create"}
//       </button>
//     </form>
//   );
// };

// export default Accommodations;


// 

// src/pages/Accommodations.jsx
// import React, { useState, useEffect } from "react";
// import {
//   createAccommodation,
//   updateAccommodation,
// } from "../api/accommodationAPI";

// const DESTINATIONS = {
//   Africa: ["Kenya", "Tanzania", "South Africa", "Namibia"],
//   Asia: ["Japan", "Thailand", "Vietnam", "India"],
//   Europe: ["France", "Italy", "Spain", "Greece"],
//   "South America": ["Peru", "Brazil", "Chile"],
//   "North America": ["USA", "Canada", "Mexico"],
// };

// const Accommodations = ({ editData, onSuccess }) => {
//   const [form, setForm] = useState({
//     bannerTitle: "",
//     bannerDescription: "",
//     overviewTitle: "",
//     overviewSubtitle: "",
//     overviewDescription: "",
//     destination: "",
//     subdestination: "",
//     name: "",
//     location: "",
//     pricePerPerson: "",
//     nightsStay: "",
//     accommodationType: "",
//     checkIn: "",
//     checkOut: "",
//     galleryDescription: "",
//     amenities: [],
//     aboutBooking: [],
//     requirements: [],
//   });

//   const [bannerImage, setBannerImage] = useState(null);
//   const [galleryImages, setGalleryImages] = useState([]);
//   const [newAmenity, setNewAmenity] = useState("");

//   useEffect(() => {
//     if (editData) {
//       // If editData contains arrays/objects already, use them directly
//       setForm({
//         ...form,
//         ...editData,
//       });
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [editData]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((p) => ({ ...p, [name]: value }));
//   };

//   const addAmenity = () => {
//     if (!newAmenity.trim()) return;
//     setForm((p) => ({ ...p, amenities: [...p.amenities, newAmenity.trim()] }));
//     setNewAmenity("");
//   };

//   const removeAmenity = (i) => {
//     setForm((p) => ({ ...p, amenities: p.amenities.filter((_, idx) => idx !== i) }));
//   };

//   const addQA = (field) => setForm((p) => ({ ...p, [field]: [...p[field], { question: "", answer: "" }] }));
//   const updateQA = (field, idx, key, val) => {
//     setForm((p) => {
//       const copy = [...p[field]];
//       copy[idx] = { ...copy[idx], [key]: val };
//       return { ...p, [field]: copy };
//     });
//   };
//   const removeQA = (field, idx) => setForm((p) => ({ ...p, [field]: p[field].filter((_, i) => i !== idx) }));

//   const validateRequired = () => {
//     const required = ["destination", "subdestination", "name", "location", "pricePerPerson", "nightsStay", "accommodationType"];
//     const missing = required.filter((f) => !form[f] && form[f] !== 0 && form[f] !== "0");
//     if (missing.length) {
//       alert("Please fill required fields: " + missing.join(", "));
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateRequired()) return;

//     try {
//       const fd = new FormData();

//       // Append text fields (primitives)
//       const textFields = [
//         "bannerTitle",
//         "bannerDescription",
//         "overviewTitle",
//         "overviewSubtitle",
//         "overviewDescription",
//         "destination",
//         "subdestination",
//         "name",
//         "location",
//         "pricePerPerson",
//         "nightsStay",
//         "accommodationType",
//         "checkIn",
//         "checkOut",
//         "galleryDescription",
//       ];
//       textFields.forEach((k) => {
//         if (form[k] !== undefined) fd.append(k, form[k]);
//       });

//       // Append arrays/objects as JSON
//       fd.append("amenities", JSON.stringify(form.amenities || []));
//       fd.append("aboutBooking", JSON.stringify(form.aboutBooking || []));
//       fd.append("requirements", JSON.stringify(form.requirements || []));

//       // Images - keys must match backend multer fields
//       if (bannerImage) fd.append("bannerImage", bannerImage);
//       galleryImages.forEach((file) => fd.append("galleryImages", file));

//       let res;
//       if (editData && editData._id) {
//         res = await updateAccommodation(editData._id, fd);
//       } else {
//         res = await createAccommodation(fd);
//       }

//       alert("Accommodation saved successfully");
//       onSuccess && onSuccess(res.data);
//     } catch (err) {
//       console.error("❌ Error saving accommodation:", err);
//       // show backend message if available
//       const msg = err?.response?.data?.message || err.message || "Unknown error";
//       alert("Save failed: " + msg);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-5xl mx-auto p-6 bg-white shadow rounded-lg space-y-6">
//       <h2 className="text-2xl font-semibold mb-4">{editData ? "Edit Accommodation" : "Create Accommodation"}</h2>

//       {/* banner title/desc */}
//       <div className="grid md:grid-cols-2 gap-4">
//         <input name="bannerTitle" value={form.bannerTitle || ""} onChange={handleChange} placeholder="Banner Title" className="border p-2" />
//         <input name="bannerDescription" value={form.bannerDescription || ""} onChange={handleChange} placeholder="Banner Description" className="border p-2" />
//       </div>

//       {/* destination selectors */}
//       <div className="grid md:grid-cols-2 gap-4">
//         <select name="destination" value={form.destination || ""} onChange={handleChange} className="border p-2">
//           <option value="">Select Destination</option>
//           {Object.keys(DESTINATIONS).map((d) => <option key={d} value={d}>{d}</option>)}
//         </select>
//         <select name="subdestination" value={form.subdestination || ""} onChange={handleChange} className="border p-2" disabled={!form.destination}>
//           <option value="">Select Subdestination</option>
//           {(DESTINATIONS[form.destination] || []).map((s) => <option key={s} value={s}>{s}</option>)}
//         </select>
//       </div>

//       {/* basic */}
//       <div className="grid md:grid-cols-3 gap-4">
//         <input name="name" value={form.name || ""} onChange={handleChange} placeholder="Name" className="border p-2" />
//         <input name="location" value={form.location || ""} onChange={handleChange} placeholder="Location" className="border p-2" />
//         <input name="accommodationType" value={form.accommodationType || ""} onChange={handleChange} placeholder="Type" className="border p-2" />
//       </div>

//       <div className="grid md:grid-cols-4 gap-4">
//         <input name="pricePerPerson" type="number" value={form.pricePerPerson || ""} onChange={handleChange} placeholder="Price per person" className="border p-2" />
//         <input name="nightsStay" type="number" value={form.nightsStay || ""} onChange={handleChange} placeholder="Nights stay" className="border p-2" />
//         <input name="checkIn" value={form.checkIn || ""} onChange={handleChange} placeholder="Check-in" className="border p-2" />
//         <input name="checkOut" value={form.checkOut || ""} onChange={handleChange} placeholder="Check-out" className="border p-2" />
//       </div>

//       {/* images */}
//       <div>
//         <label>Banner Image</label>
//         <input type="file" onChange={(e) => setBannerImage(e.target.files[0])} className="border p-2" />
//       </div>
//       <div>
//         <label>Gallery Images</label>
//         <input type="file" multiple onChange={(e) => setGalleryImages(Array.from(e.target.files))} className="border p-2" />
//       </div>

//       {/* amenities */}
//       <div>
//         <div className="flex gap-2">
//           <input value={newAmenity} onChange={(e) => setNewAmenity(e.target.value)} placeholder="Add amenity" className="border p-2 flex-1" />
//           <button type="button" onClick={addAmenity} className="bg-blue-600 text-white px-3">Add</button>
//         </div>
//         <div className="flex gap-2 mt-2">
//           {(form.amenities || []).map((a, i) => (
//             <div key={i} className="bg-gray-200 px-3 py-1 rounded flex items-center gap-2">
//               {a}
//               <button type="button" onClick={() => removeAmenity(i)} className="text-red-600">×</button>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Q&A */}
//       {["aboutBooking", "requirements"].map((section) => (
//         <div key={section}>
//           <h3>{section === "aboutBooking" ? "About Booking" : "Requirements"}</h3>
//           {(form[section] || []).map((qa, i) => (
//             <div key={i} className="border p-3 mb-2">
//               <input placeholder="Question" value={qa.question} onChange={(e) => updateQA(section, i, "question", e.target.value)} className="border p-2 w-full mb-2" />
//               <textarea placeholder="Answer" value={qa.answer} onChange={(e) => updateQA(section, i, "answer", e.target.value)} className="border p-2 w-full" />
//               <button type="button" onClick={() => removeQA(section, i)} className="text-red-500 mt-2">Remove</button>
//             </div>
//           ))}
//           <button type="button" onClick={() => addQA(section)} className="text-blue-600">+ Add</button>
//         </div>
//       ))}

//       <div>
//         <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded">
//           {editData ? "Update" : "Create"}
//         </button>
//       </div>
//     </form>
//   );
// };

// export default Accommodations;


// add regionId

// import React, { useState, useEffect } from "react";
// import {
//   createAccommodation,
//   updateAccommodation,
// } from "../api/accommodationAPI";
// import { getAllDestinations } from "../api/destinationAPI";

// const Accommodations = ({ editData, onSuccess }) => {
//   const [form, setForm] = useState({
//     destinationId: "",
//     regionId: "",
//     bannerTitle: "",
//     bannerDescription: "",
//     overviewTitle: "",
//     overviewSubtitle: "",
//     overviewDescription: "",
//     name: "",
//     location: "",
//     pricePerPerson: "",
//     nightsStay: "",
//     accommodationType: "",
//     checkIn: "",
//     checkOut: "",
//     galleryDescription: "",
//     amenities: [],
//     aboutBooking: [],
//     requirements: [],
//   });

//   const [destinations, setDestinations] = useState([]);
//   const [regions, setRegions] = useState([]);
//   const [bannerImage, setBannerImage] = useState(null);
//   const [galleryImages, setGalleryImages] = useState([]);
//   const [newAmenity, setNewAmenity] = useState("");

//   // ✅ Load destinations from backend
//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await getAllDestinations();
//         setDestinations(res.data || []);
//       } catch (err) {
//         console.error("❌ Failed to load destinations:", err);
//       }
//     })();
//   }, []);

//   // ✅ Handle edit data
//   useEffect(() => {
//     if (editData) setForm((p) => ({ ...p, ...editData }));
//   }, [editData]);

//   // ✅ When destination changes, populate its regions
//   useEffect(() => {
//     if (form.destinationId) {
//       const selected = destinations.find((d) => d._id === form.destinationId);
//       setRegions(selected?.regions || []);
//     } else {
//       setRegions([]);
//     }
//   }, [form.destinationId, destinations]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((p) => ({ ...p, [name]: value }));
//   };

//   const addAmenity = () => {
//     if (!newAmenity.trim()) return;
//     setForm((p) => ({ ...p, amenities: [...p.amenities, newAmenity.trim()] }));
//     setNewAmenity("");
//   };

//   const removeAmenity = (i) => {
//     setForm((p) => ({
//       ...p,
//       amenities: p.amenities.filter((_, idx) => idx !== i),
//     }));
//   };

//   const addQA = (field) =>
//     setForm((p) => ({
//       ...p,
//       [field]: [...p[field], { question: "", answer: "" }],
//     }));

//   const updateQA = (field, idx, key, val) => {
//     setForm((p) => {
//       const copy = [...p[field]];
//       copy[idx] = { ...copy[idx], [key]: val };
//       return { ...p, [field]: copy };
//     });
//   };

//   const removeQA = (field, idx) =>
//     setForm((p) => ({
//       ...p,
//       [field]: p[field].filter((_, i) => i !== idx),
//     }));

//   const validateRequired = () => {
//     const required = [
//       "destinationId",
//       "regionId",
//       "name",
//       "location",
//       "pricePerPerson",
//       "nightsStay",
//       "accommodationType",
//     ];
//     const missing = required.filter(
//       (f) => !form[f] && form[f] !== 0 && form[f] !== "0"
//     );
//     if (missing.length) {
//       alert("Please fill required fields: " + missing.join(", "));
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateRequired()) return;

//     try {
//       const fd = new FormData();

//       const textFields = [
//         "destinationId",
//         "regionId",
//         "bannerTitle",
//         "bannerDescription",
//         "overviewTitle",
//         "overviewSubtitle",
//         "overviewDescription",
//         "name",
//         "location",
//         "pricePerPerson",
//         "nightsStay",
//         "accommodationType",
//         "checkIn",
//         "checkOut",
//         "galleryDescription",
//       ];
//       textFields.forEach((k) => {
//         if (form[k] !== undefined) fd.append(k, form[k]);
//       });

//       fd.append("amenities", JSON.stringify(form.amenities || []));
//       fd.append("aboutBooking", JSON.stringify(form.aboutBooking || []));
//       fd.append("requirements", JSON.stringify(form.requirements || []));

//       if (bannerImage) fd.append("bannerImage", bannerImage);
//       galleryImages.forEach((file) => fd.append("galleryImages", file));

//       let res;
//       if (editData && editData._id)
//         res = await updateAccommodation(editData._id, fd);
//       else res = await createAccommodation(fd);

//       alert("Accommodation saved successfully");
//       onSuccess && onSuccess(res.data);
//     } catch (err) {
//       console.error("❌ Error saving accommodation:", err);
//       const msg = err?.response?.data?.message || err.message || "Unknown error";
//       alert("Save failed: " + msg);
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="max-w-5xl mx-auto p-6 bg-white shadow rounded-lg space-y-6"
//     >
//       <h2 className="text-2xl font-semibold mb-4">
//         {editData ? "Edit Accommodation" : "Create Accommodation"}
//       </h2>

//       {/* Destination & Region Selection */}
//       <div className="grid md:grid-cols-2 gap-4">
//         <select
//           name="destinationId"
//           value={form.destinationId}
//           onChange={handleChange}
//           className="border p-2"
//         >
//           <option value="">Select Destination</option>
//           {destinations.map((d) => (
//             <option key={d._id} value={d._id}>
//               {d.name}
//             </option>
//           ))}
//         </select>

//         <select
//           name="regionId"
//           value={form.regionId}
//           onChange={handleChange}
//           className="border p-2"
//           disabled={!form.destinationId}
//         >
//           <option value="">Select Region</option>
//           {regions.map((r) => (
//             <option key={r._id} value={r._id}>
//               {r.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Banner title/desc */}
//       <div className="grid md:grid-cols-2 gap-4">
//         <input
//           name="bannerTitle"
//           value={form.bannerTitle || ""}
//           onChange={handleChange}
//           placeholder="Banner Title"
//           className="border p-2"
//         />
//         <input
//           name="bannerDescription"
//           value={form.bannerDescription || ""}
//           onChange={handleChange}
//           placeholder="Banner Description"
//           className="border p-2"
//         />
//       </div>

//       {/* Basic Info */}
//       <div className="grid md:grid-cols-3 gap-4">
//         <input
//           name="name"
//           value={form.name || ""}
//           onChange={handleChange}
//           placeholder="Name"
//           className="border p-2"
//         />
//         <input
//           name="location"
//           value={form.location || ""}
//           onChange={handleChange}
//           placeholder="Location"
//           className="border p-2"
//         />
//         <input
//           name="accommodationType"
//           value={form.accommodationType || ""}
//           onChange={handleChange}
//           placeholder="Type"
//           className="border p-2"
//         />
//       </div>

//       {/* Pricing & Dates */}
//       <div className="grid md:grid-cols-4 gap-4">
//         <input
//           name="pricePerPerson"
//           type="number"
//           value={form.pricePerPerson || ""}
//           onChange={handleChange}
//           placeholder="Price per person"
//           className="border p-2"
//         />
//         <input
//           name="nightsStay"
//           type="number"
//           value={form.nightsStay || ""}
//           onChange={handleChange}
//           placeholder="Nights stay"
//           className="border p-2"
//         />
//         <input
//           name="checkIn"
//           value={form.checkIn || ""}
//           onChange={handleChange}
//           placeholder="Check-in"
//           className="border p-2"
//         />
//         <input
//           name="checkOut"
//           value={form.checkOut || ""}
//           onChange={handleChange}
//           placeholder="Check-out"
//           className="border p-2"
//         />
//       </div>

//       {/* Images */}
//       <div>
//         <label>Banner Image</label>
//         <input
//           type="file"
//           onChange={(e) => setBannerImage(e.target.files[0])}
//           className="border p-2"
//         />
//       </div>
//       <div>
//         <label>Gallery Images</label>
//         <input
//           type="file"
//           multiple
//           onChange={(e) => setGalleryImages(Array.from(e.target.files))}
//           className="border p-2"
//         />
//       </div>

//       {/* Amenities */}
//       <div>
//         <div className="flex gap-2">
//           <input
//             value={newAmenity}
//             onChange={(e) => setNewAmenity(e.target.value)}
//             placeholder="Add amenity"
//             className="border p-2 flex-1"
//           />
//           <button
//             type="button"
//             onClick={addAmenity}
//             className="bg-blue-600 text-white px-3"
//           >
//             Add
//           </button>
//         </div>
//         <div className="flex gap-2 mt-2 flex-wrap">
//           {(form.amenities || []).map((a, i) => (
//             <div
//               key={i}
//               className="bg-gray-200 px-3 py-1 rounded flex items-center gap-2"
//             >
//               {a}
//               <button
//                 type="button"
//                 onClick={() => removeAmenity(i)}
//                 className="text-red-600"
//               >
//                 ×
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Q&A Sections */}
//       {["aboutBooking", "requirements"].map((section) => (
//         <div key={section}>
//           <h3 className="text-lg font-semibold mt-4">
//             {section === "aboutBooking" ? "About Booking" : "Requirements"}
//           </h3>
//           {(form[section] || []).map((qa, i) => (
//             <div key={i} className="border p-3 mb-2 rounded">
//               <input
//                 placeholder="Question"
//                 value={qa.question}
//                 onChange={(e) =>
//                   updateQA(section, i, "question", e.target.value)
//                 }
//                 className="border p-2 w-full mb-2"
//               />
//               <textarea
//                 placeholder="Answer"
//                 value={qa.answer}
//                 onChange={(e) =>
//                   updateQA(section, i, "answer", e.target.value)
//                 }
//                 className="border p-2 w-full"
//               />
//               <button
//                 type="button"
//                 onClick={() => removeQA(section, i)}
//                 className="text-red-500 mt-2"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//           <button
//             type="button"
//             onClick={() => addQA(section)}
//             className="text-blue-600"
//           >
//             + Add
//           </button>
//         </div>
//       ))}

//       <div>
//         <button
//           type="submit"
//           className="bg-green-600 text-white px-6 py-2 rounded"
//         >
//           {editData ? "Update" : "Create"}
//         </button>
//       </div>
//     </form>
//   );
// };

// export default Accommodations;

import React, { useState, useEffect } from "react";
import {
  createAccommodation,
  getAllAccommodations,
  deleteAccommodation,
} from "../api/accommodationAPI";
import { getAllDestinations }  from '../api/destinationAPI.js'

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

  // 🔹 Amenities & Q&A sections
  const [amenities, setAmenities] = useState([]);
  const [newAmenity, setNewAmenity] = useState("");
  const [aboutBooking, setAboutBooking] = useState([{ question: "", answer: "" }]);
  const [requirements, setRequirements] = useState([{ question: "", answer: "" }]);

  // 🔹 All Accommodations
  const [accommodations, setAccommodations] = useState([]);

  // Fetch data
  useEffect(() => {
    fetchDestinations();
    fetchAccommodations();
  }, []);

  const fetchDestinations = async () => {
    const { data } = await getAllDestinations();
    setDestinations(data);
  };

 

  const selectedDestination = destinations.find(
    (d) => d._id === selectedDestinationId
  );

  const fetchAccommodations = async () => {
    const { data } = await getAllAccommodations();
    setAccommodations(data);
  };

  // const selectedDestination = destinations.find(
  //   (d) => d._id === selectedDestinationId
  // );

  // ✅ Add / Remove Amenities
  const addAmenity = () => {
    if (!newAmenity.trim()) return;
    setAmenities((prev) => [...prev, newAmenity.trim()]);
    setNewAmenity("");
  };

  const removeAmenity = (index) => {
    setAmenities((prev) => prev.filter((_, i) => i !== index));
  };

  // ✅ Q&A Section Helpers
  const handleAddQA = (section, setter, state) =>
    setter([...state, { question: "", answer: "" }]);

  const handleChangeQA = (section, index, field, value, setter, state) => {
    const updated = [...state];
    updated[index][field] = value;
    setter(updated);
  };

  const handleRemoveQA = (section, index, setter, state) =>
    setter(state.filter((_, i) => i !== index));

  // ✅ Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!selectedDestinationId || !selectedRegionId) {
    //   alert("Please select both Destination and Region");
    //   return;
    // }

    if (!selectedDestinationId) {
      alert("Please select a destination!");
      return;
    }

    if (!selectedRegionId) {
      alert("Please select a region!");
      return;
    }

    const formData = new FormData();

    formData.append("destinationId", selectedDestinationId);
    formData.append("regionId", selectedRegionId);


    // Banner and overview
    formData.append("bannerTitle", bannerTitle);
    formData.append("bannerDescription", bannerDescription);
    if (bannerImage) formData.append("bannerImage", bannerImage);
    formData.append("overviewTitle", overviewTitle);
    formData.append("overviewSubtitle", overviewSubtitle);
    formData.append("overviewDescription", overviewDescription);

    // Accommodation info
    formData.append("name", name);
    formData.append("location", location);
    formData.append("pricePerPerson", pricePerPerson);
    formData.append("nightsStay", nightsStay);
    formData.append("accommodationType", accommodationType);
    formData.append("checkIn", checkIn);
    formData.append("checkOut", checkOut);

    // Gallery
    formData.append("galleryDescription", galleryDescription);
    galleryImages.forEach((img) => formData.append("galleryImages", img));

    // Other sections
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
      {/* Destination Dropdown */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Select Destination</h3>
          <select
            className="border p-2 w-full"
            value={selectedDestinationId}
            onChange={(e) => {
              setSelectedDestinationId(e.target.value);
              setSelectedRegionId(""); // reset when destination changes
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

        {/* Region Dropdown */}
        {selectedDestination && selectedDestination.regions?.length > 0 && (
          <div>
            <h3 className="font-semibold text-lg mb-2">Select Region</h3>
            <select
              className="border p-2 w-full"
              value={selectedRegionId}
              onChange={(e) => setSelectedRegionId(e.target.value)}
            >
              <option value="">-- Select Region --</option>
              {selectedDestination.regions.map((region) => (
                <option key={region._id} value={region._id}>
                  {region.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Banner */}
        <div>
          <h3 className="font-semibold mb-2">Banner</h3>
          <input
            type="text"
            placeholder="Banner Title"
            className="border p-2 w-full"
            value={bannerTitle}
            onChange={(e) => setBannerTitle(e.target.value)}
          />
          <textarea
            placeholder="Banner Description"
            className="border p-2 w-full mt-2"
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
            type="text"
            placeholder="Title"
            className="border p-2 w-full"
            value={overviewTitle}
            onChange={(e) => setOverviewTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Subtitle"
            className="border p-2 w-full mt-2"
            value={overviewSubtitle}
            onChange={(e) => setOverviewSubtitle(e.target.value)}
          />
          <textarea
            placeholder="Description"
            className="border p-2 w-full mt-2"
            value={overviewDescription}
            onChange={(e) => setOverviewDescription(e.target.value)}
          />
        </div>

        {/* Accommodation Info */}
        <div>
          <h3 className="font-semibold mb-2">Accommodation Info</h3>
          <div className="grid md:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="Name"
              className="border p-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Location"
              className="border p-2"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <input
              type="text"
              placeholder="Type"
              className="border p-2"
              value={accommodationType}
              onChange={(e) => setAccommodationType(e.target.value)}
            />
          </div>
          <div className="grid md:grid-cols-4 gap-3 mt-3">
            <input
              type="number"
              placeholder="Price Per Person"
              className="border p-2"
              value={pricePerPerson}
              onChange={(e) => setPricePerPerson(e.target.value)}
            />
            <input
              type="number"
              placeholder="Nights Stay"
              className="border p-2"
              value={nightsStay}
              onChange={(e) => setNightsStay(e.target.value)}
            />
            <input
              type="text"
              placeholder="Check-In"
              className="border p-2"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
            <input
              type="text"
              placeholder="Check-Out"
              className="border p-2"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
        </div>

        {/* Gallery */}
        <div>
          <h3 className="font-semibold mb-2">Gallery</h3>
          <textarea
            placeholder="Gallery Description"
            className="border p-2 w-full"
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
              type="text"
              className="border p-2 flex-1"
              placeholder="Add Amenity"
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
          <div className="flex flex-wrap gap-2 mt-2">
            {amenities.map((a, i) => (
              <div
                key={i}
                className="bg-gray-200 px-3 py-1 rounded flex items-center gap-2"
              >
                {a}
                <button
                  type="button"
                  onClick={() => removeAmenity(i)}
                  className="text-red-600"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* About Booking & Requirements */}
        {[
          { label: "About Booking", state: aboutBooking, setter: setAboutBooking },
          { label: "Requirements", state: requirements, setter: setRequirements },
        ].map(({ label, state, setter }) => (
          <div key={label}>
            <h3 className="font-semibold mb-2">{label}</h3>
            {state.map((qa, i) => (
              <div key={i} className="border p-3 mb-2 rounded">
                <input
                  type="text"
                  placeholder="Question"
                  className="border p-2 w-full mb-2"
                  value={qa.question}
                  onChange={(e) =>
                    handleChangeQA(label, i, "question", e.target.value, setter, state)
                  }
                />
                <textarea
                  placeholder="Answer"
                  className="border p-2 w-full"
                  value={qa.answer}
                  onChange={(e) =>
                    handleChangeQA(label, i, "answer", e.target.value, setter, state)
                  }
                />
                <button
                  type="button"
                  onClick={() => handleRemoveQA(label, i, setter, state)}
                  className="text-red-600 mt-2"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddQA(label, setter, state)}
              className="text-blue-600 text-sm"
            >
              + Add
            </button>
          </div>
        ))}

        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded"
        >
          Create Accommodation
        </button>
      </form>

      {/* All Accommodations */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">All Accommodations</h3>
        {accommodations.map((acc) => (
          <div
            key={acc._id}
            className="border p-4 mb-3 flex justify-between items-center"
          >
            <div>
              <h4 className="font-semibold">{acc.name}</h4>
              <p className="text-sm text-gray-600">
                {acc.destination?.name} → {acc.region?.name}
              </p>
            </div>
            <button
              onClick={() =>
                deleteAccommodation(acc._id).then(fetchAccommodations)
              }
              className="text-red-500"
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


