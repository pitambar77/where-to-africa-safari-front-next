"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { createAccommodation } from "../api/accommodationAPI.js";
import ImageUpload from "./ImageUpload";
import QnASection from "./QnASection";
import { getAllDestinations } from "../api/destinationAPI.js";
import { useRouter } from "next/navigation";

import {
  getAccommodationById,
  updateAccommodation,
} from "../api/accommodationAPI";

import {
  getAccommodations,
  deleteAccommodation,
} from "../api/accommodationAPI";

const DESTINATIONS = [
  "Africa",
  "Asia",
  "Europe",
  "South America",
  "North America",
];
const SUBDESTINATIONS = {
  Africa: ["Kenya", "Tanzania", "South Africa", "Namibia"],
  Asia: ["Japan", "Thailand", "Vietnam", "India"],
  Europe: ["France", "Italy", "Spain", "Greece"],
  "South America": ["Peru", "Brazil", "Chile"],
  "North America": ["USA", "Canada", "Mexico"],
};

const AccommodationForm = () => {
  const { register, handleSubmit, reset, watch, setValue } = useForm();
  const [aboutBooking, setAboutBooking] = useState([]);
  const [requirements, setRequirements] = useState([]);
  const [subDestList, setSubDestList] = useState([]);

  const [destinations, setDestinations] = useState([]); // ✅ all destinations
  const [selectedDestinationId, setSelectedDestinationId] = useState(""); // ✅ selected destination
  const [regions, setRegions] = useState([]); // ✅ store regions for selected destination
  const [selectedRegionId, setSelectedRegionId] = useState(""); // ✅ selected region

  const [bannerImages, setBannerImages] = useState([]);
  const [landingImage, setLandingImage] = useState(null);

  const [amenities, setAmenities] = useState([
    { amenityName: "", amenityImage: null },
  ]);

  const [gallery, setGallery] = useState([
    { galleryName: "", galleryImage: null },
  ]);

  const [accommodationList, setAccommodationList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const router = useRouter();

  const isEditMode = Boolean(editingId);

  const selectedDestination = watch("destination");

  // Fetch destinations initially
  useEffect(() => {
    fetchDestinations();
  }, []);

  useEffect(() => {
    fetchAccommodationList();
  }, []);

  const fetchAccommodationList = async () => {
    setLoading(true);
    try {
      const { data } = await getAccommodations();
      setAccommodationList(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchDestinations = async () => {
    try {
      const { data } = await getAllDestinations();
      setDestinations(data);
    } catch (err) {
      console.error("Error fetching destinations:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this accommodation?"))
      return;

    try {
      await deleteAccommodation(id);
      alert("✅ Accommodation deleted");
      fetchAccommodationList();
    } catch (err) {
      console.error(err);
      alert("❌ Failed to delete");
    }
  };

  const removeAmenity = (index) => {
    setAmenities((prev) => prev.filter((_, i) => i !== index));
  };

  // edit added

  const handleEdit = async (id) => {
    try {
      const { data } = await getAccommodationById(id);

      // Fill form
      reset(data);

      setBannerImages(data.bannerImages || []);
      setLandingImage(data.landingImage || null);

      setEditingId(id);

      setSelectedDestinationId(data.destinationId);
      setSelectedRegionId(data.regionId);

      setAmenities(
        data.amenities.map((a) => ({
          amenityName: a.amenityName,
          amenityImage: a.amenityImage,
        })),
      );

      setGallery(
        data.gallery.map((g) => ({
          galleryName: g.galleryName,
          galleryImage: g.galleryImage,
        })),
      );

      setAboutBooking(data.aboutBooking || []);
      setRequirements(data.requirements || []);

      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error(err);
      alert("Failed to load accommodation");
    }
  };

  useEffect(() => {
    const selected = destinations.find((d) => d._id === selectedDestinationId);
    setRegions(selected?.regions || []);
  }, [selectedDestinationId, destinations]);

  useEffect(() => {
    if (selectedDestination && !editingId) {
      setSubDestList(SUBDESTINATIONS[selectedDestination] || []);
      setValue("subdestination", "");
    }

    if (editingId && selectedDestination) {
      setSubDestList(SUBDESTINATIONS[selectedDestination] || []);
    }
  }, [selectedDestination, editingId, setValue]);

  const onSubmit = async (data) => {
    const formData = new FormData();

    // Only for CREATE
    if (!editingId) {
      formData.append("destinationId", selectedDestinationId);
      formData.append("regionId", selectedRegionId);
      formData.append("destination", data.destination);
      formData.append("subdestination", data.subdestination);
    }

    // Text fields
    [
      "bannerTitle",
      "bannerSubtitle",
      "bannerDescription",
      "overviewTitle",
      "overviewSubtitle",
      "overviewDescription",
      "name",
      "location",
      "pricePerPerson",
      "nightsStay",
      "accommodationType",
      "checkIn",
      "checkOut",
      "galleyheading",
      "galleryDescription",
    ].forEach((field) => {
      if (data[field] !== undefined) {
        formData.append(field, data[field]);
      }
    });

    // Images
    Array.from(data.bannerImages || []).forEach((file) =>
      formData.append("bannerImages", file),
    );

    if (data.landingImage?.[0]) {
      formData.append("landingImage", data.landingImage[0]);
    }

    formData.append(
      "amenities",
      JSON.stringify(
        amenities.map((a) => ({
          amenityName: a.amenityName,
          amenityImage:
            typeof a.amenityImage === "string" ? a.amenityImage : null,
          hasNewImage: a.amenityImage instanceof File, // 🔥 KEY
        })),
      ),
    );

    amenities.forEach((a) => {
      if (a.amenityImage instanceof File) {
        formData.append("amenityImages", a.amenityImage);
      }
    });

    // Gallery
    formData.append(
      "gallery",
      JSON.stringify(
        gallery.map((g) => ({
          galleryName: g.galleryName,
          galleryImage:
            typeof g.galleryImage === "string" ? g.galleryImage : null,
        })),
      ),
    );

    gallery.forEach((g) => {
      if (g.galleryImage instanceof File) {
        formData.append("galleryImages", g.galleryImage);
      }
    });

    formData.append("aboutBooking", JSON.stringify(aboutBooking));
    formData.append("requirements", JSON.stringify(requirements));

    try {
      if (editingId) {
        await updateAccommodation(editingId, formData);
        alert("✅ Accommodation updated successfully");
      } else {
        await createAccommodation(formData);
        alert("✅ Accommodation added successfully");
      }

      reset();
      setEditingId(null);
      fetchAccommodationList();
    } catch (err) {
      console.error(err);
      alert("❌ Failed to save accommodation");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-5xl mx-auto bg-white p-6 shadow-lg rounded-lg"
      >
        <h2 className="text-2xl font-semibold mb-6">
          {editingId ? "Edit Accommodation" : "Add Accommodation"}
        </h2>

        {/* Destination Dropdown */}
        <div className="mb-4">
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

        {/* ✅ Region Dropdown */}
        {regions.length > 0 && (
          <div className="mb-4">
            <h3 className="font-semibold text-lg mb-2">Select Region</h3>
            <select
              className="border p-2 w-full"
              value={selectedRegionId}
              onChange={(e) => setSelectedRegionId(e.target.value)}
            >
              <option value="">-- Select Region --</option>
              {regions.map((region) => (
                <option key={region._id} value={region._id}>
                  {region.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Banner Section */}
        <ImageUpload
          label="Banner Images"
          name="bannerImages"
          multiple
          register={register}
          existingImages={bannerImages}
        />

        <ImageUpload
          label="Landing Image"
          name="landingImage"
          register={register}
          existingImages={landingImage ? [landingImage] : []}
        />

        <input
          type="text"
          placeholder="Banner Title"
          {...register("bannerTitle")}
          className="w-full border p-2 mb-3 rounded"
        />
        <input
          type="text"
          placeholder="Banner Sub Title"
          {...register("bannerSubtitle")}
          className="w-full border p-2 mb-3 rounded"
        />
        <textarea
          placeholder="Banner Description"
          {...register("bannerDescription")}
          className="w-full border p-2 mb-3 rounded"
        />

        {/* Overview */}
        <input
          type="text"
          placeholder="Overview Title"
          {...register("overviewTitle")}
          className="w-full border p-2 mb-3 rounded"
        />
        <input
          type="text"
          placeholder="Overview Subtitle"
          {...register("overviewSubtitle")}
          className="w-full border p-2 mb-3 rounded"
        />
        <textarea
          placeholder="Overview Description"
          {...register("overviewDescription")}
          className="w-full border p-2 mb-3 rounded"
        />

        {/* Filters */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <select
            {...register("destination", { required: true })}
            className="border p-2 rounded"
          >
            <option value="">Select Destination</option>
            {DESTINATIONS.map((dest) => (
              <option key={dest} value={dest}>
                {dest}
              </option>
            ))}
          </select>

          <select
            {...register("subdestination", { required: true })}
            className="border p-2 rounded"
            // disabled={editingId || !selectedDestination}
          >
            <option value="">Select Subdestination</option>
            {subDestList.map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </div>

        {/* Accommodation Info */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Accommodation Name"
            {...register("name", { required: true })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Category"
            {...register("location", { required: true })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Price Per Person"
            {...register("pricePerPerson", { required: true })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Rating"
            {...register("nightsStay", { required: true })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Accommodation Type"
            {...register("accommodationType", { required: true })}
            className="border p-2 rounded"
          />
        </div>

        <h3 className="font-semibold mt-6 mb-2">Amenities</h3>

        {amenities.map((item, index) => (
          <div key={index} className="flex gap-3 mb-3 items-center">
            <input
              type="text"
              value={item.amenityName}
              onChange={(e) => {
                const updated = [...amenities];
                updated[index].amenityName = e.target.value;
                setAmenities(updated);
              }}
              className="border p-2 rounded w-1/3"
            />

            {/* Existing image preview */}
            {/* {typeof item.amenityImage === "string" && (
              <img
                src={item.amenityImage}
                alt=""
                className="w-16 h-16 object-cover rounded"
              />
            )} */}

            {item.amenityImage && (
              <img
                src={
                  item.amenityImage instanceof File
                    ? URL.createObjectURL(item.amenityImage)
                    : item.amenityImage
                }
                className="w-16 h-16 object-cover rounded"
                alt=""
              />
            )}

            {/* Replace image */}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const updated = [...amenities];
                updated[index].amenityImage = e.target.files[0]; // 👈 replace
                setAmenities(updated);
              }}
            />

            {/* ❌ Remove Button */}
            <button
              type="button"
              onClick={() => removeAmenity(index)}
              className="ml-auto text-red-600 text-sm hover:underline"
            >
              Remove
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() =>
            setAmenities([
              ...amenities,
              { amenityName: "", amenityImage: null },
            ])
          }
          className="text-blue-600 text-sm"
        >
          + Add Amenity
        </button>

        <h3 className="font-semibold mt-6 mb-2">Gallery</h3>

        <input
          type="text"
          placeholder="Gallery Heading"
          {...register("galleyheading")}
          className="w-full border p-2 mb-3 rounded"
        />

        <textarea
          placeholder="Gallery Description"
          {...register("galleryDescription")}
          className="w-full border p-2 mb-4 rounded"
        />

        {gallery.map((item, index) => (
          <div key={index} className="flex gap-3 mb-3">
            <input
              type="text"
              placeholder="Gallery Name"
              value={item.galleryName}
              onChange={(e) => {
                const updated = [...gallery];
                updated[index].galleryName = e.target.value;
                setGallery(updated);
              }}
              className="border p-2 rounded w-1/2"
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const updated = [...gallery];
                updated[index].galleryImage = e.target.files[0];
                setGallery(updated);
              }}
              className="border p-2 rounded w-1/2"
            />
          </div>
        ))}

        <button
          type="button"
          onClick={() =>
            setGallery([...gallery, { galleryName: "", galleryImage: null }])
          }
          className="text-blue-600 text-sm"
        >
          + Add Gallery Image
        </button>

        {/* <textarea
          placeholder="Gallery Description"
          {...register("galleryDescription")}
          className="w-full border p-2 mb-4 rounded"
        /> */}

        {/* Q&A Sections */}
        <QnASection
          label="About Booking"
          qna={aboutBooking}
          setQna={setAboutBooking}
        />
        <QnASection
          label="Requirements"
          qna={requirements}
          setQna={setRequirements}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {editingId ? "Update Accommodation" : "Save Accommodation"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={() => {
              reset();
              setEditingId(null);
              setAmenities([{ amenityName: "", amenityImage: null }]);
              setGallery([{ galleryName: "", galleryImage: null }]);
              setAboutBooking([]);
              setRequirements([]);
              setSelectedDestinationId("");
              setSelectedRegionId("");
              setRegions([]);
              setSubDestList([]);
            }}
            className="w-full mt-2 bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
          >
            Cancel Edit
          </button>
        )}

        {/* <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Save Accommodation
        </button> */}
      </form>

      <hr className="my-10" />

      <h2 className="text-2xl font-semibold mb-4">Accommodation List</h2>

      {loading ? (
        <p>Loading...</p>
      ) : accommodationList.length === 0 ? (
        <p>No accommodations found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Name</th>
                <th className="border p-2">Location</th>
                <th className="border p-2">Destination</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {accommodationList.map((item) => (
                <tr key={item._id}>
                  <td className="border p-2">{item.name}</td>
                  <td className="border p-2">{item.location}</td>
                  <td className="border p-2">
                    {item.destination} / {item.subdestination}
                  </td>
                  <td className="border p-2 space-x-2">
                    <button
                      onClick={() => handleEdit(item._id)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() =>
                        router.push(`/dashboard/accommodations/seo/${item._id}`)
                      }
                      className="bg-purple-600 text-white px-3 py-1 rounded"
                    >
                      SEO
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="px-3 py-1 bg-red-600 text-white rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default AccommodationForm;
