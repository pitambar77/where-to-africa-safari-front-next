"use client";

import React, { useState, useEffect } from "react";
import {
  createExperience,
  getAllExperiences,
  deleteExperience,
} from "../api/experienceAPI.js";
import { getAllDestinations } from "../api/destinationAPI.js";
import { updateExperience } from "../api/experienceAPI.js";
import { useRouter } from "next/navigation";
import { scrollDashboardToTop } from "@/lib/scrollToTop";

const Experiences = () => {
  // Basic state
  const [bannerTitle, setBannerTitle] = useState("");
  const [bannerDescription, setBannerDescription] = useState("");

  const [bannersubtitle, setBannerSubtitle] = useState("");
  const [highlightheading, setHighlightHeading] = useState("");
  const [imageheading, setImageHeading] = useState("");
  const [bookNowUrl, setBookNowUrl] = useState("");

  const [bannerImage, setBannerImage] = useState(null);
  const [galleryDescription, setGalleryDescription] = useState("");
  const [galleryImages, setGalleryImages] = useState([]);
  const [existingGalleryImages, setExistingGalleryImages] = useState([]);
  const [experiences, setExperiences] = useState([]);

  // Destination + Region dropdowns
  const [destinations, setDestinations] = useState([]);
  const [selectedDestinationId, setSelectedDestinationId] = useState("");
  const [selectedRegionId, setSelectedRegionId] = useState("");

  const [bannerPreview, setBannerPreview] = useState(null);
  // const [galleryPreview, setGalleryPreview] = useState([]);

  // Nested objects
  const [experienceInfo, setExperienceInfo] = useState({
    days: "",
    pricePerPerson: "",
    location: "",
    journeyType: "",
  });

  const [overview, setOverview] = useState({
    title: "",
    subTitle: "",
    description: "",
  });

  const [includes, setIncludes] = useState([{ name: "", icon: null }]);
  const [gameDrives, setGameDrives] = useState([
    { name: "", description: "", pricePerPerson: "", image: null },
  ]);
  const [highlights, setHighlights] = useState([
    { name: "", description: "", image: null },
  ]);

  const [editId, setEditId] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  // Fetch data
  useEffect(() => {
    fetchExperiences();
    fetchDestinations();
  }, []);

  const fetchExperiences = async () => {
    const { data } = await getAllExperiences();
    setExperiences(data);
  };

  const fetchDestinations = async () => {
    const { data } = await getAllDestinations();
    setDestinations(data);
  };

  const selectedDestination = destinations.find(
    (d) => d._id === selectedDestinationId,
  );

  //added for destination

  const getExperienceLocation = (experienceId) => {
    for (const destination of destinations) {
      for (const region of destination.regions || []) {
        const exists = (region.experiences || []).some(
          (exp) => (exp?._id || exp)?.toString() === experienceId?.toString(),
        );

        if (exists) {
          return {
            destinationId: destination._id,
            regionId: region._id,
            destinationName: destination.name,
            regionName: region.name,
          };
        }
      }
    }

    return {
      destinationId: "",
      regionId: "",
      destinationName: "",
      regionName: "",
    };
  };

  const handleDeleteGalleryImage = (imageId, imageUrl) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this gallery image?",
    );

    if (!confirmed) return;

    setExistingGalleryImages((prev) =>
      prev.filter((img) => {
        if (imageId) {
          return img._id !== imageId;
        }

        return img.image !== imageUrl;
      }),
    );
  };

  const handleEdit = (exp) => {
    console.log("Editing Experience:", exp);

    // Find destination + region from destination relationship
    const location = getExperienceLocation(exp._id);

    console.log("Destination:", location.destinationName);
    console.log("Region:", location.regionName);

    console.log("Destination ID:", location.destinationId);
    console.log("Region ID:", location.regionId);

    setEditId(exp._id);

    setBannerPreview(exp.bannerImage);

    // Automatically select Destination
    setSelectedDestinationId(location.destinationId);

    // Automatically select Region
    setSelectedRegionId(location.regionId);

    // Banner
    setBannerTitle(exp.bannerTitle || "");
    setBannerDescription(exp.bannerDescription || "");

    setBannerSubtitle(exp.bannersubtitle || "");
    setHighlightHeading(exp.highlightheading || "");
    setImageHeading(exp.imageheading || "");
    setBannerImage(null);
    setBookNowUrl(exp.bookNowUrl || "");

    setGalleryDescription(exp.gallery?.description || "");

    setExistingGalleryImages(exp.gallery?.images || []);

    setGalleryImages([]);

    // Experience Info
    setExperienceInfo(
      exp.experienceInfo || {
        days: "",
        pricePerPerson: "",
        location: "",
        journeyType: "",
      },
    );

    // Overview
    setOverview(
      exp.overview || {
        title: "",
        subTitle: "",
        description: "",
      },
    );

    // Includes
    setIncludes(
      (exp.includes || []).map((i) => ({
        name: i.name,
        icon: null, // file input reset
        existingIcon: i.icon, // for preview if needed
      })),
    );

    // Game Drives
    setGameDrives(
      (exp.gameDrives || []).map((g) => ({
        ...g,
        image: null,
        existingImage: g.image,
      })),
    );

    // Highlights
    setHighlights(
      (exp.highlights || []).map((h) => ({
        ...h,
        image: null,
        existingImage: h.image,
      })),
    );

    scrollDashboardToTop();
  };

  const resetForm = () => {
    setEditId(null);

    // Destination / Region
    setSelectedDestinationId("");
    setSelectedRegionId("");

    // Banner
    setBannerTitle("");
    setBannerDescription("");
    setBannerSubtitle("");
    setHighlightHeading("");
    setImageHeading("");
    setBookNowUrl("");
    setBannerImage(null);
    setBannerPreview(null);

    // Gallery
    setGalleryDescription("");
    setGalleryImages([]);
    setExistingGalleryImages([]);

    // Experience Info
    setExperienceInfo({
      days: "",
      pricePerPerson: "",
      location: "",
      journeyType: "",
    });

    // Overview
    setOverview({
      title: "",
      subTitle: "",
      description: "",
    });

    // Includes
    setIncludes([
      {
        name: "",
        icon: null,
      },
    ]);

    // Game Drives
    setGameDrives([
      {
        name: "",
        description: "",
        pricePerPerson: "",
        image: null,
      },
    ]);

    // Highlights
    setHighlights([
      {
        name: "",
        description: "",
        image: null,
      },
    ]);
  };

  // Submit handler

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDestinationId) {
      alert("Please select a destination!");
      return;
    }

    if (!selectedRegionId) {
      alert("Please select a region!");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();

      // Link destination + region
      formData.append("destinationId", selectedDestinationId);
      formData.append("regionId", selectedRegionId);

      // Basic info
      formData.append("bannerTitle", bannerTitle);
      formData.append("bannerDescription", bannerDescription);
      formData.append("galleryDescription", galleryDescription);

      formData.append("bannersubtitle", bannersubtitle);
      formData.append("highlightheading", highlightheading);
      formData.append("imageheading", imageheading);
      formData.append("bookNowUrl", bookNowUrl);

      // Uploads
      if (bannerImage) formData.append("bannerImage", bannerImage);

      // Gallery
      formData.append(
        "existingGalleryImages",
        JSON.stringify(existingGalleryImages),
      );

      galleryImages.forEach((img) => formData.append("galleryImages", img));

      // Nested JSON
      formData.append("experienceInfo", JSON.stringify(experienceInfo));
      formData.append("overview", JSON.stringify(overview));

      const includesData = includes.map((inc) => ({
        name: inc.name,
      }));

      const gameDriveData = gameDrives.map((g, i) => ({
        name: g.name,
        description: g.description,
        pricePerPerson: g.pricePerPerson,
        // image: g.image ? `gameDriveImages[${i}]` : "",
        image: g.existingImage || "",
      }));

      const highlightData = highlights.map((h) => ({
        name: h.name,
        description: h.description,
        image: h.existingImage || "",
        hasNewImage: Boolean(h.image),
      }));

      formData.append("includes", JSON.stringify(includesData));
      formData.append("gameDrives", JSON.stringify(gameDriveData));
      formData.append("highlights", JSON.stringify(highlightData));

      // Attach files
      includes.forEach(
        (inc) => inc.icon && formData.append("includeIcons", inc.icon),
      );
      gameDrives.forEach(
        (g) => g.image && formData.append("gameDriveImages", g.image),
      );
      highlights.forEach(
        (h) => h.image && formData.append("highlightImages", h.image),
      );

      // await createExperience(formData);

      if (editId) {
        await updateExperience(editId, formData);
        alert("Experience updated successfully!");
      } else {
        await createExperience(formData);
        alert("Experience created successfully!");
      }

      // setEditId(null);
      // fetchExperiences();

      resetForm();

      await fetchExperiences();
    } catch (error) {
      console.error("Experience submit error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helpers for dynamic fields
  const handleAdd = (setter, prevState, emptyObj) =>
    setter([...prevState, emptyObj]);

  const handleRemove = (index, setter, prevState) => {
    setter(prevState.filter((_, i) => i !== index));
  };

  const handleChange = (index, key, value, setter, prevState) => {
    const updated = [...prevState];
    updated[index][key] = value;
    setter(updated);
  };

  const filteredExperiences = experiences.filter((exp) => {
    const location = getExperienceLocation(exp._id);

    const search = searchTerm.toLowerCase().trim();

    if (!search) return true;

    return (
      (exp.bannerTitle || "").toLowerCase().includes(search) ||
      (location.destinationName || "").toLowerCase().includes(search) ||
      (location.regionName || "").toLowerCase().includes(search)
    );
  });

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-6">Add New Experience</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Destination Dropdown */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Select Destination</h3>
          <select
            className="border border-[#cbc7c0] rounded-lg p-2 w-full"
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
              className="border border-[#cbc7c0] rounded-lg  p-2 w-full"
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

        {/* Banner Section */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Banner</h3>
          <input
            type="text"
            placeholder="Banner Title"
            className="border border-[#cbc7c0] rounded-lg p-2 w-full"
            value={bannerTitle}
            onChange={(e) => setBannerTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Banner Subtitle"
            className="border border-[#cbc7c0] rounded-lg p-2 w-full mt-2"
            value={bannersubtitle}
            onChange={(e) => setBannerSubtitle(e.target.value)}
          />
          <textarea
            placeholder="Banner Description"
            className="border border-[#cbc7c0] rounded-lg p-2 w-full mt-2"
            value={bannerDescription}
            onChange={(e) => setBannerDescription(e.target.value)}
          />

          {bannerPreview && (
            <img
              src={bannerPreview}
              className="w-40 h-32 object-cover rounded mt-2"
              alt=""
            />
          )}

          <input
            type="file"
            className="border border-[#cbc7c0] rounded-lg p-2 w-full mt-2"
            onChange={(e) => setBannerImage(e.target.files[0])}
          />
        </div>

        {/* Experience Info */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Experience Info</h3>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Duration"
              className="border border-[#cbc7c0] rounded-lg p-2"
              value={experienceInfo.days}
              onChange={(e) =>
                setExperienceInfo({ ...experienceInfo, days: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Price Per Person"
              className="border border-[#cbc7c0] rounded-lg p-2"
              value={experienceInfo.pricePerPerson}
              onChange={(e) =>
                setExperienceInfo({
                  ...experienceInfo,
                  pricePerPerson: e.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder="Timing"
              className="border border-[#cbc7c0] rounded-lg p-2"
              value={experienceInfo.location}
              onChange={(e) =>
                setExperienceInfo({
                  ...experienceInfo,
                  location: e.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder="Min/Max person"
              className="border border-[#cbc7c0] rounded-lg p-2"
              value={experienceInfo.journeyType}
              onChange={(e) =>
                setExperienceInfo({
                  ...experienceInfo,
                  journeyType: e.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder="Book Now URL"
              className="border border-[#cbc7c0] rounded-lg p-2 w-full mt-2"
              value={bookNowUrl}
              onChange={(e) => setBookNowUrl(e.target.value)}
            />
          </div>
        </div>

        {/* Overview */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Overview</h3>
          <input
            type="text"
            placeholder="Title"
            className="border border-[#cbc7c0] rounded-lg p-2 w-full"
            value={overview.title}
            onChange={(e) =>
              setOverview({ ...overview, title: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Subtitle"
            className="border border-[#cbc7c0] rounded-lg p-2 w-full mt-2"
            value={overview.subTitle}
            onChange={(e) =>
              setOverview({ ...overview, subTitle: e.target.value })
            }
          />
          <textarea
            placeholder="Description"
            className="border border-[#cbc7c0] rounded-lg p-2 w-full mt-2"
            value={overview.description}
            onChange={(e) =>
              setOverview({ ...overview, description: e.target.value })
            }
          />
        </div>

        {/* Includes Section */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Includes</h3>

          {/* {includes.map((inc, i) => (
            <div key={i} className="flex gap-2 items-center mb-2">
              <input
                type="text"
                placeholder="Include Name"
                className="border border-[#cbc7c0] rounded-lg p-2 flex-1"
                value={inc.name}
                onChange={(e) =>
                  handleChange(i, "name", e.target.value, setIncludes, includes)
                }
              />

              <input
                type="file"
                className="border border-[#cbc7c0] rounded-lg p-2"
                onChange={(e) =>
                  handleChange(
                    i,
                    "icon",
                    e.target.files[0],
                    setIncludes,
                    includes,
                  )
                }
              />

              
              {inc.existingIcon && !inc.icon && (
                <img
                  src={inc.existingIcon}
                  className="w-8 h-8 object-contain"
                  alt="icon"
                />
              )}
            </div>
          ))} */}

          {includes.map((inc, i) => (
            <div key={i} className="flex gap-2 items-center mb-2">
              <input
                type="text"
                placeholder="Include Name"
                className="border border-[#cbc7c0] rounded-lg p-2 flex-1"
                value={inc.name}
                onChange={(e) =>
                  handleChange(i, "name", e.target.value, setIncludes, includes)
                }
              />

              <input
                type="file"
                className="border border-[#cbc7c0] rounded-lg p-2"
                onChange={(e) =>
                  handleChange(
                    i,
                    "icon",
                    e.target.files[0],
                    setIncludes,
                    includes,
                  )
                }
              />

              {/* Existing icon */}
              {inc.existingIcon && !inc.icon && (
                <img
                  src={inc.existingIcon}
                  className="w-8 h-8 object-contain"
                  alt="icon"
                />
              )}

              {/* Delete */}
              <button
                type="button"
                onClick={() => handleRemove(i, setIncludes, includes)}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg cursor-pointer"
              >
                ×
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() =>
              handleAdd(setIncludes, includes, { name: "", icon: null })
            }
            className="text-blue-500 text-sm"
          >
            + Add Include
          </button>
        </div>

        {/* Game Drives */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Game Drives</h3>
          {/* {gameDrives.map((g, i) => (
            <div
              key={i}
              className="border border-[#cbc7c0] rounded-lg p-3 mb-3 rounded"
            >
              <input
                type="text"
                placeholder="Name"
                className="border border-[#cbc7c0] rounded-lg p-2 w-full"
                value={g.name}
                onChange={(e) =>
                  handleChange(
                    i,
                    "name",
                    e.target.value,
                    setGameDrives,
                    gameDrives,
                  )
                }
              />

              <textarea
                placeholder="Description"
                className="border border-[#cbc7c0] rounded-lg p-2 w-full mt-2"
                value={g.description}
                onChange={(e) =>
                  handleChange(
                    i,
                    "description",
                    e.target.value,
                    setGameDrives,
                    gameDrives,
                  )
                }
              />
              <input
                type="number"
                placeholder="Price Per Person"
                className="border border-[#cbc7c0] rounded-lg p-2 w-full mt-2"
                value={g.pricePerPerson}
                onChange={(e) =>
                  handleChange(
                    i,
                    "pricePerPerson",
                    e.target.value,
                    setGameDrives,
                    gameDrives,
                  )
                }
              />
              <input
                type="file"
                className="border border-[#cbc7c0] rounded-lg p-2 w-full mt-2"
                onChange={(e) =>
                  handleChange(
                    i,
                    "image",
                    e.target.files[0],
                    setGameDrives,
                    gameDrives,
                  )
                }
              />
            </div>
          ))} */}

          {gameDrives.map((g, i) => (
            <div
              key={i}
              className="border border-[#cbc7c0] rounded-lg p-3 mb-3"
            >
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium">Game Drive {i + 1}</h4>

                <button
                  type="button"
                  onClick={() => handleRemove(i, setGameDrives, gameDrives)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg"
                >
                  Delete
                </button>
              </div>

              <input
                type="text"
                placeholder="Name"
                className="border border-[#cbc7c0] rounded-lg p-2 w-full"
                value={g.name}
                onChange={(e) =>
                  handleChange(
                    i,
                    "name",
                    e.target.value,
                    setGameDrives,
                    gameDrives,
                  )
                }
              />

              <textarea
                placeholder="Description"
                className="border border-[#cbc7c0] rounded-lg p-2 w-full mt-2"
                value={g.description}
                onChange={(e) =>
                  handleChange(
                    i,
                    "description",
                    e.target.value,
                    setGameDrives,
                    gameDrives,
                  )
                }
              />

              <input
                type="number"
                placeholder="Price Per Person"
                className="border border-[#cbc7c0] rounded-lg p-2 w-full mt-2"
                value={g.pricePerPerson}
                onChange={(e) =>
                  handleChange(
                    i,
                    "pricePerPerson",
                    e.target.value,
                    setGameDrives,
                    gameDrives,
                  )
                }
              />

              <input
                type="file"
                className="border border-[#cbc7c0] rounded-lg p-2 w-full mt-2"
                onChange={(e) =>
                  handleChange(
                    i,
                    "image",
                    e.target.files[0],
                    setGameDrives,
                    gameDrives,
                  )
                }
              />
            </div>
          ))}

          <button
            type="button"
            onClick={() =>
              handleAdd(setGameDrives, gameDrives, {
                name: "",
                description: "",
                pricePerPerson: "",
                image: null,
              })
            }
            className="text-blue-500 text-sm"
          >
            + Add Game Drive
          </button>
        </div>

        {/* Highlights */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Highlights</h3>
          <input
            type="text"
            placeholder="Highlight Section Heading"
            className="border border-[#cbc7c0] rounded-lg p-2 w-full mb-3"
            value={highlightheading}
            onChange={(e) => setHighlightHeading(e.target.value)}
          />
          {/* {highlights.map((h, i) => (
            <div
              key={i}
              className="border border-[#cbc7c0] rounded-lg p-3 mb-3 rounded"
            >
              <input
                type="text"
                placeholder="Name"
                className="border border-[#cbc7c0] rounded-lg p-2 w-full"
                value={h.name}
                onChange={(e) =>
                  handleChange(
                    i,
                    "name",
                    e.target.value,
                    setHighlights,
                    highlights,
                  )
                }
              />
              <textarea
                placeholder="Description"
                className="border border-[#cbc7c0] rounded-lg p-2 w-full mt-2"
                value={h.description}
                onChange={(e) =>
                  handleChange(
                    i,
                    "description",
                    e.target.value,
                    setHighlights,
                    highlights,
                  )
                }
              />

              {(h.imagePreview || h.existingImage) && (
                <img
                  src={h.imagePreview || h.existingImage}
                  className=" w-48 mt-2 rounded"
                />
              )}
              <input
                type="file"
                className="border border-[#cbc7c0] rounded-lg p-2 w-full mt-2"
                onChange={(e) =>
                  handleChange(
                    i,
                    "image",
                    e.target.files[0],
                    setHighlights,
                    highlights,
                  )
                }
              />
            </div>
          ))} */}

          {highlights.map((h, i) => (
            <div
              key={i}
              className="border border-[#cbc7c0] rounded-lg p-3 mb-3"
            >
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium">Highlight {i + 1}</h4>

                <button
                  type="button"
                  onClick={() => handleRemove(i, setHighlights, highlights)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg"
                >
                  Delete
                </button>
              </div>

              <input
                type="text"
                placeholder="Name"
                className="border border-[#cbc7c0] rounded-lg p-2 w-full"
                value={h.name}
                onChange={(e) =>
                  handleChange(
                    i,
                    "name",
                    e.target.value,
                    setHighlights,
                    highlights,
                  )
                }
              />

              <textarea
                placeholder="Description"
                className="border border-[#cbc7c0] rounded-lg p-2 w-full mt-2"
                value={h.description}
                onChange={(e) =>
                  handleChange(
                    i,
                    "description",
                    e.target.value,
                    setHighlights,
                    highlights,
                  )
                }
              />

              {(h.imagePreview || h.existingImage) && (
                <img
                  src={h.imagePreview || h.existingImage}
                  className="w-48 mt-2 rounded"
                  alt="Highlight"
                />
              )}

              <input
                type="file"
                className="border border-[#cbc7c0] rounded-lg p-2 w-full mt-2"
                onChange={(e) =>
                  handleChange(
                    i,
                    "image",
                    e.target.files[0],
                    setHighlights,
                    highlights,
                  )
                }
              />
            </div>
          ))}

          <button
            type="button"
            onClick={() =>
              handleAdd(setHighlights, highlights, {
                name: "",
                description: "",
                image: null,
              })
            }
            className="text-blue-500 text-sm"
          >
            + Add Highlight
          </button>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-2">Gallery</h3>

          <input
            type="text"
            placeholder="Gallery Heading"
            className="border border-[#cbc7c0] rounded-lg p-2 w-full mb-2"
            value={imageheading}
            onChange={(e) => setImageHeading(e.target.value)}
          />

          <textarea
            placeholder="Gallery Description"
            className="border border-[#cbc7c0] rounded-lg p-2 w-full"
            value={galleryDescription}
            onChange={(e) => setGalleryDescription(e.target.value)}
          />

          {/* Existing Gallery Images */}
          {existingGalleryImages.length > 0 && (
            <div className="mt-4">
              <h4 className="font-medium mb-3">Existing Gallery Images</h4>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {existingGalleryImages.map((item, index) => (
                  <div
                    key={item._id || index}
                    className="relative border border-[#cbc7c0] rounded-lg rounded-lg overflow-hidden"
                  >
                    <img
                      src={item.image}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-32 object-cover"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        handleDeleteGalleryImage(item._id, item.image)
                      }
                      className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center hover:bg-red-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add New Images */}
          <div className="mt-4">
            <h4 className="font-medium mb-2">
              {editId
                ? "Add More/New Gallery Images"
                : `Add Gallery Images (*Select multiple images)`}
            </h4>

            <input
              type="file"
              multiple
              accept="image/*"
              className="border border-[#cbc7c0] rounded-lg p-2 w-full"
              onChange={(e) => {
                setGalleryImages(Array.from(e.target.files));
              }}
            />
          </div>

          {/* New Images Preview */}
          {galleryImages.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {galleryImages.map((file, index) => (
                <div
                  key={index}
                  className="border border-[#cbc7c0] rounded-lg rounded-lg overflow-hidden"
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`New gallery ${index + 1}`}
                    className="w-full h-32 object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`text-white px-6 py-2 rounded ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {isSubmitting
            ? editId
              ? "Updating..."
              : "Creating..."
            : editId
              ? "Update Experience"
              : "Create Experience"}
        </button>
      </form>

      {/* All Experiences */}
      <div className="mt-10">
        <div className="flex items-center justify-between mb-4 gap-4">
          <h3 className="text-xl font-semibold">All Experiences</h3>

          <input
            type="text"
            placeholder="Search experience, destination or region..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-[#cbc7c0] rounded-lg rounded-lg px-4 py-2 w-full max-w-md outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-4">
          {filteredExperiences.map((exp) => {
            // <div className="space-y-4">
            //   {experiences.map((exp) => {
            const location = getExperienceLocation(exp._id);

            return (
              <div
                key={exp._id}
                className="border border-[#cbc7c0] rounded-lg rounded-lg p-4 flex items-center justify-between gap-4 bg-white"
              >
                <div className="flex items-center gap-4 min-w-0">
                  {/* Banner Image */}
                  <div className="w-28 h-20 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                    {exp.bannerImage ? (
                      <img
                        src={exp.bannerImage}
                        alt={exp.bannerTitle || "Experience"}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>

                  {/* Experience Information */}
                  <div className="min-w-0">
                    <h4 className="font-semibold text-lg truncate">
                      {exp.bannerTitle}
                    </h4>

                    <p className="text-sm text-gray-600 mt-1">
                      <span className="font-medium">Destination:</span>{" "}
                      {location.destinationName || "N/A"}
                    </p>

                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Region:</span>{" "}
                      {location.regionName || "N/A"}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 items-center flex-shrink-0">
                  <button
                    onClick={() => handleEdit(exp)}
                    className="text-blue-500 hover:text-blue-700 cursor-pointer"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      router.push(`/dashboard/experiences/seo/${exp._id}`)
                    }
                    className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded cursor-pointer"
                  >
                    SEO
                  </button>

                  <button
                    onClick={() =>
                      deleteExperience(exp._id).then(fetchExperiences)
                    }
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Experiences;
