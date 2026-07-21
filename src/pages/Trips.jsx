"use client";

import React, { useState, useEffect } from "react";
import {
  createTrip,
  getAllTrips,
  deleteTrip,
  updateTrip,
} from "../api/tripAPI.js";
import { getAllDestinations } from "../api/destinationAPI.js";
import QnASection from "../components/QnASection";
import { useRouter } from "next/navigation";

const Trips = () => {
  const [trips, setTrips] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [selectedDestinationId, setSelectedDestinationId] = useState("");
  const [selectedRegionId, setSelectedRegionId] = useState("");
  const [existingBannerImage, setExistingBannerImage] = useState("");

  // Trip fields
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [location, setLocation] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [link, setLink] = useState("");

  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [gallery, setGallery] = useState([]);

  const [overviewTitle, setOverviewTitle] = useState("");

  const [overviewSubTitle, setOverviewSubTitle] = useState("");
  const [overviewDescription, setOverviewDescription] = useState("");

  const [aboutBooking, setAboutBooking] = useState([]);
  const [requirements, setRequirements] = useState([]);

  // ✅ Trip Highlights
  const [tripHighlights, setTripHighlights] = useState([
    { title: "", description: "", status: "Include", image: null },
  ]);

  // Itinerary
  const [itinerary, setItinerary] = useState([
    {
      day: "",
      title: "",
      location: "",
      description: "",
      accommodationName: "",
      image: null,
    },
  ]);

  const [editId, setEditId] = useState(null);

  const router = useRouter();

  useEffect(() => {
    fetchTrips();
    fetchDestinations();
  }, []);

  const fetchTrips = async () => {
    const { data } = await getAllTrips();
    setTrips(data);
  };

  const fetchDestinations = async () => {
    const { data } = await getAllDestinations();
    setDestinations(data);
  };

  const selectedDestination = destinations.find(
    (d) => d._id === selectedDestinationId,
  );

  const handleAddItinerary = () => {
    setItinerary([
      ...itinerary,
      {
        day: "",
        title: "",
        location: "",
        description: "",
        accommodationName: "",
        image: null,
      },
    ]);
  };

  const handleItineraryChange = (index, field, value) => {
    const updated = [...itinerary];
    updated[index][field] = value;
    setItinerary(updated);
  };

  // ✅ Handle Trip Highlights
  const handleAddHighlight = () => {
    setTripHighlights([
      ...tripHighlights,
      { title: "", description: "", status: "Include", image: null },
    ]);
  };

  const handleHighlightChange = (index, field, value) => {
    const updated = [...tripHighlights];
    updated[index][field] = value;
    setTripHighlights(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDestinationId || !selectedRegionId)
      return alert("Please select both destination and region.");

    const formData = new FormData();
    formData.append("destinationId", selectedDestinationId);
    formData.append("regionId", selectedRegionId);
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("location", location);
    formData.append("duration", duration);
    formData.append("price", price);
    formData.append("rating", rating);
    formData.append("link", link);
    formData.append("description", description);
    formData.append("overviewTitle", overviewTitle);
    formData.append("overviewSubTitle", overviewSubTitle);
    formData.append("overviewDescription", overviewDescription);
    // Append Q&A
    formData.append("aboutBooking", JSON.stringify(aboutBooking));
    formData.append("requirements", JSON.stringify(requirements));

    if (image) formData.append("image", image);
    gallery.forEach((img) => formData.append("gallery", img));

    // ✅ Itinerary data

    //     const cleanedItinerary = itinerary.map(
    //   ({ image, existingImage, ...rest }, index) => ({
    //     ...rest,
    //     image: typeof image === "string" ? image : existingImage || undefined,
    //     imageIndex: image instanceof File ? index : null,
    //   })
    // );

    let imageCounter = 0;

    const cleanedItinerary = itinerary.map(
      ({ image, existingImage, ...rest }) => {
        const currentIndex = image instanceof File ? imageCounter++ : null;

        return {
          ...rest,
          image: typeof image === "string" ? image : existingImage || undefined,
          imageIndex: currentIndex,
        };
      },
    );

    formData.append("itinerary", JSON.stringify(cleanedItinerary));

    // itinerary.forEach((item) => {
    //   if (item.image) formData.append("itineraryImages", item.image);
    // });

    itinerary.forEach((item) => {
      if (item.image instanceof File) {
        formData.append("itineraryImages", item.image);
      }
    });

    // ✅ Trip Highlights
    // formData.append("tripHighlights", JSON.stringify(tripHighlights));
    //    const cleanedHighlights = tripHighlights.map(
    //   ({ image, existingImage, ...rest }, index) => ({
    //     ...rest,
    //     tripHighlightImage:
    //       typeof image === "string" ? image : existingImage || undefined,
    //     imageIndex: image instanceof File ? index : null,
    //   })
    // );

    //     formData.append("tripHighlights", JSON.stringify(cleanedHighlights));

    let highlightImageCounter = 0;

    const cleanedHighlights = tripHighlights.map(
      ({ image, existingImage, ...rest }) => {
        const currentIndex =
          image instanceof File ? highlightImageCounter++ : null;

        return {
          ...rest,
          tripHighlightImage:
            typeof image === "string" ? image : existingImage || undefined,
          imageIndex: currentIndex,
        };
      },
    );

    formData.append("tripHighlights", JSON.stringify(cleanedHighlights));

    // tripHighlights.forEach((item) => {
    //   if (item.image) formData.append("tripHighlightImage", item.image); // ✅ single image field
    // });

    tripHighlights.forEach((item) => {
      if (item.image instanceof File) {
        formData.append("tripHighlightImage", item.image);
      }
    });

    if (editId) {
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }
      await updateTrip(editId, formData);
      alert("Trip updated successfully!");
    } else {
      await createTrip(formData);
      alert("Trip created successfully!");
    }

    setEditId(null);
    resetForm();
    fetchTrips();
  };

  const resetForm = () => {
    setSelectedDestinationId("");
    setSelectedRegionId("");
    setTitle("");
    setSubtitle("");
    setLocation("");
    setDuration("");
    setPrice("");
    setRating("");
    setLink("");
    setDescription("");
    setOverviewTitle("");
    setOverviewSubTitle("");
    setOverviewDescription("");

    setImage(null);
    setGallery([]);
    setItinerary([
      {
        day: "",
        title: "",
        location: "",
        description: "",
        accommodationName: "",
        image: null,
      },
    ]);
    setTripHighlights([
      { title: "", description: "", status: "Include", image: null },
    ]);
  };

  // const handleEdit = (trip) => {
  //   setEditId(trip._id);
  //   setSelectedDestinationId(trip.destination?._id || "");
  //   setTitle(trip.title);
  //   setSubtitle(trip.subtitle);
  //   setLocation(trip.location);
  //   setDuration(trip.duration);
  //   setPrice(trip.price);
  //   setRating(trip.rating);
  //   setDescription(trip.description);
  //   setOverviewTitle(trip.overviewTitle);
  //   setOverviewSubTitle(trip.overviewSubTitle);
  //   setOverviewDescription(trip.overviewDescription);
  //   setAboutBooking(trip.aboutBooking);
  //   setRequirements(trip.requirements)
  //   setTripHighlights(trip.tripHighlights || []);
  // };

  const handleEdit = (trip) => {
    setEditId(trip._id);
    setSelectedDestinationId(trip.destination?._id || "");
    // setSelectedRegionId(trip.region?._id || ""); // ✅ FIX
    setSelectedRegionId(trip.region || ""); // ✅ FIX
    setTitle(trip.title);
    setSubtitle(trip.subtitle);
    setLocation(trip.location);
    setDuration(trip.duration);
    setPrice(trip.price);
    setRating(trip.rating);
    setLink(trip.link);
    setDescription(trip.description);
    setImage(null);
    setExistingBannerImage(trip.image || "");

    setOverviewTitle(trip.overviewTitle);
    setOverviewSubTitle(trip.overviewSubTitle);
    setOverviewDescription(trip.overviewDescription);

    setAboutBooking(trip.aboutBooking || []);
    setRequirements(trip.requirements || []);

    // ✅ FIXED
    setItinerary(
      (trip.itinerary || []).map((i) => ({
        ...i,
        image: i.image || null, // ✅ KEEP IMAGE
        existingImage: i.image || "", // preview only
      })),
    );

    // ✅ FIXED
    setTripHighlights(
      (trip.tripHighlights || []).map((h) => ({
        title: h.title,
        description: h.description,
        status: h.status,
        image: h.tripHighlightImage || null, // ✅ KEEP IMAGE
        existingImage: h.tripHighlightImage || "",
      })),
    );

    // Scroll to the top
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this trip?")) {
      await deleteTrip(id);
      fetchTrips();
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">
        {editId ? "Update Trip" : "Create Trip"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Destination Dropdown */}
        <div>
          <h3 className="font-semibold mb-2">Select Destination</h3>
          {/* <select
            className="border p-2 w-full"
            value={selectedDestinationId}
            onChange={(e) => {
              setSelectedDestinationId(e.target.value);
              setSelectedRegionId("");
            }}
          > */}
          <select
            className="border p-2 w-full"
            value={selectedDestinationId}
            onChange={(e) => {
              const newDestId = e.target.value;

              setSelectedDestinationId(newDestId);

              // ✅ reset region ONLY when user changes destination manually
              if (!editId) {
                setSelectedRegionId("");
              }
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
            <h3 className="font-semibold mb-2">Select Region</h3>
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

        {/* Trip Fields */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2"
          />
          <input
            type="text"
            placeholder="Subtitle"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="border p-2"
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border p-2"
          />
          <input
            type="text"
            placeholder="Duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="border p-2"
          />
          <input
            type="text"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border p-2"
          />
          <input
            type="text"
            placeholder="Travelers"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="border p-2"
          />
        </div>

        <input
          type="text"
          placeholder="Link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="border p-2 w-full"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full"
        />

        <input
          type="text"
          placeholder="Overview title"
          value={overviewTitle}
          onChange={(e) => setOverviewTitle(e.target.value)}
          className="border p-2 w-full"
        />
        <input
          type="text"
          placeholder="Overview sub title"
          value={overviewSubTitle}
          onChange={(e) => setOverviewSubTitle(e.target.value)}
          className="border p-2 w-full"
        />
        <textarea
          placeholder="Overview description"
          value={overviewDescription}
          onChange={(e) => setOverviewDescription(e.target.value)}
          className="border p-2 w-full"
        />

        <div>
          {/* trip image - banner image  */}
          <label className="block font-medium">Banner Image:</label>
          {(image || existingBannerImage) && (
            <img
              src={
                image instanceof File
                  ? URL.createObjectURL(image)
                  : existingBannerImage
              }
              alt="Banner"
              className="w-48 h-32 object-cover rounded mb-2"
            />
          )}
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="border p-2 w-full"
          />
        </div>

        <div>
          {/* Gallery image - Overview image  */}
          <label className="block font-medium">Overview Images:</label>
          <input
            type="file"
            multiple
            onChange={(e) => setGallery([...e.target.files])}
            className="border p-2 w-full"
          />
        </div>

        {/* Itinerary Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Itinerary</h3>
          {/* {itinerary.map((item, i) => (
            <div key={i} className="border p-3 mb-3 rounded">
              <input type="text" placeholder="Day" value={item.day} onChange={(e) => handleItineraryChange(i, "day", e.target.value)} className="border p-2 w-full mb-2" />
              <input type="text" placeholder="Title" value={item.title} onChange={(e) => handleItineraryChange(i, "title", e.target.value)} className="border p-2 w-full mb-2" />
              <input type="text" placeholder="Location" value={item.location} onChange={(e) => handleItineraryChange(i, "location", e.target.value)} className="border p-2 w-full mb-2" />
              <textarea placeholder="Description" value={item.description} onChange={(e) => handleItineraryChange(i, "description", e.target.value)} className="border p-2 w-full mb-2" />
              <input type="text" placeholder="Accommodation Name" value={item.accommodationName} onChange={(e) => handleItineraryChange(i, "accommodationName", e.target.value)} className="border p-2 w-full mb-2" />
              <input type="file" onChange={(e) => handleItineraryChange(i, "image", e.target.files[0])} className="border p-2 w-full" />
            </div>
          ))} */}
          {itinerary.map((item, i) => (
            <div key={i} className="border p-3 mb-3 rounded">
              <input
                type="text"
                placeholder="Day"
                value={item.day}
                onChange={(e) =>
                  handleItineraryChange(i, "day", e.target.value)
                }
                className="border p-2 w-full mb-2"
              />

              <input
                type="text"
                placeholder="Title"
                value={item.title}
                onChange={(e) =>
                  handleItineraryChange(i, "title", e.target.value)
                }
                className="border p-2 w-full mb-2"
              />

              <input
                type="text"
                placeholder="Location"
                value={item.location}
                onChange={(e) =>
                  handleItineraryChange(i, "location", e.target.value)
                }
                className="border p-2 w-full mb-2"
              />

              <textarea
                placeholder="Description"
                value={item.description}
                onChange={(e) =>
                  handleItineraryChange(i, "description", e.target.value)
                }
                className="border p-2 w-full mb-2"
              />

              <input
                type="text"
                placeholder="Accommodation Name"
                value={item.accommodationName}
                onChange={(e) =>
                  handleItineraryChange(i, "accommodationName", e.target.value)
                }
                className="border p-2 w-full mb-2"
              />

              {/* ✅ SHOW EXISTING IMAGE */}
              {/* {item.existingImage && !item.image && (
                <img
                  src={item.existingImage}
                  alt="Itinerary"
                  className="w-40 h-28 object-cover rounded mb-2"
                />
              )} */}

              {(item.image || item.existingImage) && (
                <img
                  src={
                    item.image instanceof File
                      ? URL.createObjectURL(item.image)
                      : item.existingImage
                  }
                  alt="Itinerary"
                  className="w-40 h-28 object-cover rounded mb-2"
                />
              )}

              {/* ✅ FILE INPUT */}
              <input
                type="file"
                onChange={(e) =>
                  handleItineraryChange(i, "image", e.target.files[0])
                }
                className="border p-2 w-full"
              />
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddItinerary}
            className="text-blue-500 text-sm"
          >
            + Add Itinerary Day
          </button>
        </div>

        {/* Q&A Sections */}
        <QnASection
          label="Include / What we provided"
          qna={aboutBooking}
          setQna={setAboutBooking}
        />
        <QnASection
          label="Exclude/Requirements"
          qna={requirements}
          setQna={setRequirements}
        />

        {/* ✅ Trip Highlights Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Trip Highlights</h3>
          {tripHighlights.map((item, i) => (
            <div key={i} className="border p-3 mb-3 rounded">
              <input
                type="text"
                placeholder="Highlight Title"
                value={item.title}
                onChange={(e) =>
                  handleHighlightChange(i, "title", e.target.value)
                }
                className="border p-2 w-full mb-2"
              />
              <textarea
                placeholder="Highlight Description"
                value={item.description}
                onChange={(e) =>
                  handleHighlightChange(i, "description", e.target.value)
                }
                className="border p-2 w-full mb-2"
              />
              <select
                value={item.status}
                onChange={(e) =>
                  handleHighlightChange(i, "status", e.target.value)
                }
                className="border p-2 w-full mb-2"
              >
                <option value="Include">Include</option>
                <option value="Optional">Optional</option>
              </select>
              {/* Highlight Image Preview */}
              {(item.image || item.existingImage) && (
                <img
                  src={
                    item.image instanceof File
                      ? URL.createObjectURL(item.image)
                      : item.existingImage
                  }
                  alt="Highlight"
                  className="w-40 h-28 object-cover rounded mb-2"
                />
              )}
              <input
                type="file"
                onChange={(e) =>
                  handleHighlightChange(i, "image", e.target.files[0])
                }
                className="border p-2 w-full"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddHighlight}
            className="text-blue-500 text-sm"
          >
            + Add Highlight
          </button>
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded"
        >
          {editId ? "Update Trip" : "Create Trip"}
        </button>
      </form>

      {/* All Trips */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">All Trips</h3>
        {trips.map((trip) => (
          <div
            key={trip._id}
            className="border p-4 mb-3 flex justify-between items-center"
          >
            <div>
              <h4 className="font-semibold">{trip.title}</h4>
              <p className="text-sm text-gray-600">{trip.destination?.name}</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => handleEdit(trip)}
                className="text-blue-500"
              >
                Edit
              </button>
              <button
                onClick={() => router.push(`/dashboard/trips/seo/${trip._id}`)}
                className="bg-purple-600 text-white px-3 py-1 rounded"
              >
                SEO
              </button>
              <button
                onClick={() => handleDelete(trip._id)}
                className="text-red-500"
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

export default Trips;
