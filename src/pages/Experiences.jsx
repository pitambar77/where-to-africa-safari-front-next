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

  const handleEdit = (exp) => {
    console.log(exp);
    console.log("Destination:", exp.destination);
    console.log("Region:", exp.region);

    setEditId(exp._id);

    setBannerPreview(exp.bannerImage);

    // Destination & region
    setSelectedDestinationId(exp.destination?._id || "");
    setSelectedRegionId(exp.region?._id || "");

    // Banner
    setBannerTitle(exp.bannerTitle || "");
    setBannerDescription(exp.bannerDescription || "");

    setBannerSubtitle(exp.bannersubtitle || "");
    setHighlightHeading(exp.highlightheading || "");
    setImageHeading(exp.imageheading || "");
    setBannerImage(null); // keep existing unless replaced
    setBookNowUrl(exp.bookNowUrl || "");

    // Gallery
    setGalleryDescription(exp.galleryDescription || "");
    setGalleryImages([]); // new uploads only
    // setGalleryImages([]);
    // setGalleryPreview(exp.galleryImages || []);

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
    // Scroll to the top
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    //     for (const h of highlights) {
    //   if (!h.existingImage && !h.image) {
    //     alert("Please upload image for all new highlights");
    //     return;
    //   }
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
    galleryImages.forEach((img) => formData.append("galleryImages", img));

    // Nested JSON
    formData.append("experienceInfo", JSON.stringify(experienceInfo));
    formData.append("overview", JSON.stringify(overview));

    // Includes, Game Drives, Highlights (JSON)
    // const includesData = includes.map((inc, i) => ({
    //   name: inc.name,
    //   icon: inc.icon ? `includeIcons[${i}]` : "",
    // }));

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
    // const highlightData = highlights.map((h, i) => ({
    //   name: h.name,
    //   description: h.description,

    //   // image: h.image ? `highlightImages[${i}]` : "",
    //   image: h.existingImage || "", // keep existing URL
    // }));

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

    setEditId(null);
    fetchExperiences();
  };

  // Helpers for dynamic fields
  const handleAdd = (setter, prevState, emptyObj) =>
    setter([...prevState, emptyObj]);

  const handleChange = (index, key, value, setter, prevState) => {
    const updated = [...prevState];
    updated[index][key] = value;
    setter(updated);
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-6">Add New Experience</h2>

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

        {/* Banner Section */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Banner</h3>
          <input
            type="text"
            placeholder="Banner Title"
            className="border p-2 w-full"
            value={bannerTitle}
            onChange={(e) => setBannerTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Banner Subtitle"
            className="border p-2 w-full mt-2"
            value={bannersubtitle}
            onChange={(e) => setBannerSubtitle(e.target.value)}
          />
          <textarea
            placeholder="Banner Description"
            className="border p-2 w-full mt-2"
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
            className="border p-2 w-full mt-2"
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
              className="border p-2"
              value={experienceInfo.days}
              onChange={(e) =>
                setExperienceInfo({ ...experienceInfo, days: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Price Per Person"
              className="border p-2"
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
              className="border p-2"
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
              className="border p-2"
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
              className="border p-2 w-full mt-2"
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
            className="border p-2 w-full"
            value={overview.title}
            onChange={(e) =>
              setOverview({ ...overview, title: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Subtitle"
            className="border p-2 w-full mt-2"
            value={overview.subTitle}
            onChange={(e) =>
              setOverview({ ...overview, subTitle: e.target.value })
            }
          />
          <textarea
            placeholder="Description"
            className="border p-2 w-full mt-2"
            value={overview.description}
            onChange={(e) =>
              setOverview({ ...overview, description: e.target.value })
            }
          />
        </div>

        {/* Includes Section */}
        {/* <div>
          <h3 className="font-semibold text-lg mb-2">Includes</h3>
          {includes.map((inc, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Include Name"
                className="border p-2 flex-1"
                value={inc.name}
                onChange={(e) =>
                  handleChange(i, "name", e.target.value, setIncludes, includes)
                }
              />
              <input
                type="file"
                className="border p-2"
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
                  alt="existing include icon"
                  className="w-8 h-8 object-contain border"
                />
              )}
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
        </div> */}

        {/* Includes Section */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Includes</h3>

          {includes.map((inc, i) => (
            <div key={i} className="flex gap-2 items-center mb-2">
              <input
                type="text"
                placeholder="Include Name"
                className="border p-2 flex-1"
                value={inc.name}
                onChange={(e) =>
                  handleChange(i, "name", e.target.value, setIncludes, includes)
                }
              />

              <input
                type="file"
                className="border p-2"
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

              {/* Existing icon preview */}
              {inc.existingIcon && !inc.icon && (
                <img
                  src={inc.existingIcon}
                  className="w-8 h-8 object-contain"
                  alt="icon"
                />
              )}
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
          {gameDrives.map((g, i) => (
            <div key={i} className="border p-3 mb-3 rounded">
              <input
                type="text"
                placeholder="Name"
                className="border p-2 w-full"
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
                className="border p-2 w-full mt-2"
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
                className="border p-2 w-full mt-2"
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
                className="border p-2 w-full mt-2"
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
            className="border p-2 w-full mb-3"
            value={highlightheading}
            onChange={(e) => setHighlightHeading(e.target.value)}
          />
          {highlights.map((h, i) => (
            <div key={i} className="border p-3 mb-3 rounded">
              <input
                type="text"
                placeholder="Name"
                className="border p-2 w-full"
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
                className="border p-2 w-full mt-2"
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
                className="border p-2 w-full mt-2"
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

        {/* Gallery */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Gallery</h3>
          <input
            type="text"
            placeholder="Gallery Heading"
            className="border p-2 w-full mb-2"
            value={imageheading}
            onChange={(e) => setImageHeading(e.target.value)}
          />
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
            // onChange={(e) => {
            //   const files = [...e.target.files];

            //   setGalleryImages(files);
            //   setGalleryPreview(files.map((file) => URL.createObjectURL(file)));
            // }}
          />
          {/* <div className="flex flex-wrap gap-3 mt-3">
            {galleryPreview.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Preview ${index}`}
                className="w-32 h-32 object-cover rounded border"
              />
            ))}
          </div> */}
        </div>

        {/* <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded"
        >
          Create Experience
        </button> */}
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded"
        >
          {editId ? "Update Experience" : "Create Experience"}
        </button>
      </form>

      {/* All Experiences */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">All Experiences</h3>
        {/* {experiences.map((exp) => (
          <div
            key={exp._id}
            className="border p-4 mb-3 flex justify-between items-center"
          >
            <div>
              <h4 className="font-semibold">{exp.bannerTitle}</h4>
              <p className="text-sm text-gray-600">
                {exp.destination?.name} → {exp.region?.name}
              </p>
            </div>
            <button
              onClick={() => deleteExperience(exp._id).then(fetchExperiences)}
              className="text-red-500"
            >
              Delete
            </button>
          </div>
        ))} */}
        {experiences.map((exp) => (
          <div
            key={exp._id}
            className="border p-4 mb-3 flex justify-between items-center"
          >
            <div>
              <h4 className="font-semibold">{exp.bannerTitle}</h4>
              <p className="text-sm text-gray-600">
                {exp.destination?.name} → {exp.region?.name}
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => handleEdit(exp)}
                className="text-blue-500 cursor-pointer"
              >
                Edit
              </button>
              <button
                onClick={() =>
                  router.push(`/dashboard/experiences/seo/${exp._id}`)
                }
                className="bg-purple-600 text-white px-3 py-1 rounded cursor-pointer"
              >
                SEO
              </button>

              <button
                onClick={() => deleteExperience(exp._id).then(fetchExperiences)}
                className="text-red-500 cursor-pointer"
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

export default Experiences;
