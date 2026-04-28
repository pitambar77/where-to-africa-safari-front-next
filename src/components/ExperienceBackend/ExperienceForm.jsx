


import React, { useState } from "react";
import { toast } from "react-toastify";
// import { deleteGameDriveImage, deleteHighlightImage, deleteGalleryImage } from "../../api/experienceAPI";
import {
  deleteGameDriveImage,
  deleteHighlightImage,
  deleteGalleryImage,
} from "../../api/experienceAPI.js";

const ExperienceForm = ({ onSubmit, initialData = {} }) => {
  const [form, setForm] = useState(initialData);
  const [bannerImage, setBannerImage] = useState(null);

  // ✅ Sections
  const [includes, setIncludes] = useState(initialData.includes || []);
  const [gameDrives, setGameDrives] = useState(initialData.gameDrives || []);
  const [highlights, setHighlights] = useState(initialData.highlights || []);
  const [galleryImages, setGalleryImages] = useState(initialData.gallery?.images || []);
  const [galleryDescription, setGalleryDescription] = useState(initialData.gallery?.description || "");

  // ---------- Handle Inputs ----------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (section, key, value) => {
    setForm((prev) => ({
      ...prev,
      [section]: { ...prev[section], [key]: value },
    }));
  };

// delete section

// ✅ Delete single game drive image
const handleDeleteGameDrive = async (driveId) => {
  try {
    await deleteGameDriveImage(initialData._id, driveId);
    toast.success("Game drive image deleted!");
    setGameDrives((prev) => prev.filter((g) => g._id !== driveId));
  } catch (err) {
    toast.error("Failed to delete game drive image.");
  }
};

// ✅ Delete single highlight image
const handleDeleteHighlight = async (highlightId) => {
  try {
    await deleteHighlightImage(initialData._id, highlightId);
    toast.success("Highlight deleted!");
    setHighlights((prev) => prev.filter((h) => h._id !== highlightId));
  } catch (err) {
    toast.error("Failed to delete highlight.");
  }
};

// ✅ Delete single gallery image
const handleDeleteGalleryImage = async (imageId) => {
  try {
    await deleteGalleryImage(initialData._id, imageId);
    toast.success("Gallery image deleted!");
    setGalleryImages((prev) => prev.filter((img) => img._id !== imageId));
  } catch (err) {
    toast.error("Failed to delete gallery image.");
  }
};



  // ---------- Add/Delete ----------
  const addInclude = () => setIncludes([...includes, { name: "", icon: "" }]);
  const addGameDrive = () => setGameDrives([...gameDrives, { name: "", description: "", pricePerPerson: "", image: "" }]);
  const addHighlight = () => setHighlights([...highlights, { name: "", image: "", description: "" }]);
  const addGalleryImage = () => setGalleryImages([...galleryImages, { name: "", image: "" }]);

  const deleteItem = (list, setList, index) => {
    const updated = [...list];
    updated.splice(index, 1);
    setList(updated);
  };

  // ---------- Image Previews ----------
  const renderImagePreview = (image) => {
    if (!image) return null;
    const src = image instanceof File ? URL.createObjectURL(image) : image;
    return (
      <img src={src} alt="preview" className="w-20 h-20 object-cover rounded-md border" />
    );
  };

  // ---------- Submit ----------
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append(
      "data",
      JSON.stringify({
        ...form,
        includes,
        gameDrives: gameDrives.map((g) => ({
          name: g.name,
          description: g.description,
          pricePerPerson: g.pricePerPerson,
        })),
        highlights: highlights.map((h) => ({
          name: h.name,
          description: h.description,
        })),
        gallery: { description: galleryDescription },
      })
    );

    if (bannerImage) data.append("bannerImage", bannerImage);

    gameDrives.forEach((g) => {
      if (g.image instanceof File) data.append("gameDriveImages", g.image);
    });

    highlights.forEach((h) => {
      if (h.image instanceof File) data.append("highlightImages", h.image);
    });

    galleryImages.forEach((img) => {
      if (img.file) data.append("galleryImages", img.file);
    });

    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 bg-white p-8 rounded-2xl shadow-md"
    >
      {/* ✅ Banner Section */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Banner</h2>
        <input
          type="text"
          name="bannerTitle"
          placeholder="Banner Title"
          value={form.bannerTitle || ""}
          onChange={handleChange}
          className="w-full border rounded p-2 mb-3"
        />
        <textarea
          name="bannerDescription"
          placeholder="Banner Description"
          value={form.bannerDescription || ""}
          onChange={handleChange}
          className="w-full border rounded p-2 mb-3"
        />
        <div className="flex items-center gap-4">
          {renderImagePreview(bannerImage || form.bannerImage)}
          <input
            type="file"
            onChange={(e) => setBannerImage(e.target.files[0])}
            className="border p-2"
          />
        </div>
      </div>

      {/* ✅ Experience Info */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Experience Info
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="Days"
            value={form.experienceInfo?.days || ""}
            onChange={(e) =>
              handleNestedChange("experienceInfo", "days", e.target.value)
            }
            className="border rounded p-2"
          />
          <input
            type="number"
            placeholder="Price Per Person"
            value={form.experienceInfo?.pricePerPerson || ""}
            onChange={(e) =>
              handleNestedChange("experienceInfo", "pricePerPerson", e.target.value)
            }
            className="border rounded p-2"
          />
          <input
            type="text"
            placeholder="Location"
            value={form.experienceInfo?.location || ""}
            onChange={(e) =>
              handleNestedChange("experienceInfo", "location", e.target.value)
            }
            className="border rounded p-2"
          />
          <input
            type="text"
            placeholder="Journey Type"
            value={form.experienceInfo?.journeyType || ""}
            onChange={(e) =>
              handleNestedChange("experienceInfo", "journeyType", e.target.value)
            }
            className="border rounded p-2"
          />
        </div>
      </div>

      {/* ✅ Overview Section */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Overview</h2>
        <input
          type="text"
          placeholder="Overview Title"
          value={form.overview?.title || ""}
          onChange={(e) => handleNestedChange("overview", "title", e.target.value)}
          className="w-full border rounded p-2 mb-3"
        />
        <input
          type="text"
          placeholder="Overview Subtitle"
          value={form.overview?.subTitle || ""}
          onChange={(e) =>
            handleNestedChange("overview", "subTitle", e.target.value)
          }
          className="w-full border rounded p-2 mb-3"
        />
        <textarea
          placeholder="Overview Description"
          value={form.overview?.description || ""}
          onChange={(e) =>
            handleNestedChange("overview", "description", e.target.value)
          }
          className="w-full border rounded p-2"
        />
      </div>

      {/* ✅ Includes */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Includes</h2>
        {includes.map((item, i) => (
          <div key={i} className="flex gap-3 mb-3 items-center">
            <input
              type="text"
              placeholder="Name"
              value={item.name}
              onChange={(e) => {
                const updated = [...includes];
                updated[i].name = e.target.value;
                setIncludes(updated);
              }}
              className="border p-2 rounded w-1/2"
            />
            <input
              type="text"
              placeholder="Icon URL or name"
              value={item.icon}
              onChange={(e) => {
                const updated = [...includes];
                updated[i].icon = e.target.value;
                setIncludes(updated);
              }}
              className="border p-2 rounded w-1/2"
            />
            <button
              type="button"
              onClick={() => deleteItem(includes, setIncludes, i)}
              className="text-red-600 font-bold"
            >
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addInclude}
          className="bg-blue-500 text-white px-4 py-1 rounded"
        >
          + Add Include
        </button>
      </div>

      {/* ✅ Game Drives */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Game Drives</h2>
        {gameDrives.map((g, i) => (
          <div key={i} className="border rounded p-3 mb-3">
            <input
              type="text"
              placeholder="Name"
              value={g.name}
              onChange={(e) => {
                const updated = [...gameDrives];
                updated[i].name = e.target.value;
                setGameDrives(updated);
              }}
              className="border p-2 rounded w-full mb-2"
            />
            <textarea
              placeholder="Description"
              value={g.description}
              onChange={(e) => {
                const updated = [...gameDrives];
                updated[i].description = e.target.value;
                setGameDrives(updated);
              }}
              className="border p-2 rounded w-full mb-2"
            />
            <input
              type="number"
              placeholder="Price Per Person"
              value={g.pricePerPerson}
              onChange={(e) => {
                const updated = [...gameDrives];
                updated[i].pricePerPerson = e.target.value;
                setGameDrives(updated);
              }}
              className="border p-2 rounded w-full mb-2"
            />
            <div className="flex items-center gap-3">
              {renderImagePreview(g.image)}
              <input
                type="file"
                onChange={(e) => {
                  const updated = [...gameDrives];
                  updated[i].image = e.target.files[0];
                  setGameDrives(updated);
                }}
              />
              {/* <button
                type="button"
                onClick={() => deleteItem(gameDrives, setGameDrives, i)}
                className="text-red-600"
              >
                Delete
              </button> */}
              {g.image && !g.image.name && (
  <div className="flex items-center gap-3">
    <img src={g.image} alt="Game Drive" className="w-20 h-20 object-cover rounded" />
    <button
      type="button"
      className="text-red-500"
      onClick={() => handleDeleteGameDrive(g._id)}
    >
      Delete Image
    </button>
  </div>
)}

            </div>
          </div>
        ))}


        <button
          type="button"
          onClick={addGameDrive}
          className="bg-blue-500 text-white px-4 py-1 rounded"
        >
          + Add Game Drive
        </button>
      </div>

      {/* ✅ Highlights */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Highlights</h2>
        {highlights.map((h, i) => (
          <div key={i} className="border rounded p-3 mb-3">
            <input
              type="text"
              placeholder="Name"
              value={h.name}
              onChange={(e) => {
                const updated = [...highlights];
                updated[i].name = e.target.value;
                setHighlights(updated);
              }}
              className="border p-2 rounded w-full mb-2"
            />
            <textarea
              placeholder="Description"
              value={h.description}
              onChange={(e) => {
                const updated = [...highlights];
                updated[i].description = e.target.value;
                setHighlights(updated);
              }}
              className="border p-2 rounded w-full mb-2"
            />
            <div className="flex items-center gap-3">
              {renderImagePreview(h.image)}
              <input
                type="file"
                onChange={(e) => {
                  const updated = [...highlights];
                  updated[i].image = e.target.files[0];
                  setHighlights(updated);
                }}
              />
              {/* <button
                type="button"
                onClick={() => deleteItem(highlights, setHighlights, i)}
                className="text-red-600"
              >
                Delete
              </button> */}

              {h.image && !h.image.name && (
  <div className="flex items-center gap-3">
    <img src={h.image} alt="Highlight" className="w-20 h-20 object-cover rounded" />
    <button
      type="button"
      className="text-red-500"
      onClick={() => handleDeleteHighlight(h._id)}
    >
      Delete Image
    </button>
  </div>
)}

            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addHighlight}
          className="bg-blue-500 text-white px-4 py-1 rounded"
        >
          + Add Highlight
        </button>
      </div>

      {/* ✅ Gallery */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Gallery</h2>
        <textarea
          placeholder="Gallery Description"
          value={galleryDescription}
          onChange={(e) => setGalleryDescription(e.target.value)}
          className="w-full border rounded p-2 mb-3"
        />
        {galleryImages.map((img, i) => (
          <div key={i} className="flex items-center gap-3 mb-2">
            <input
              type="text"
              placeholder="Image Name"
              value={img.name || ""}
              onChange={(e) => {
                const updated = [...galleryImages];
                updated[i].name = e.target.value;
                setGalleryImages(updated);
              }}
              className="border p-2 rounded w-1/2"
            />
            {renderImagePreview(img.file || img.image)}
            <input
              type="file"
              onChange={(e) => {
                const updated = [...galleryImages];
                updated[i].file = e.target.files[0];
                setGalleryImages(updated);
              }}
            />
            {/* <button
              type="button"
              onClick={() => deleteItem(galleryImages, setGalleryImages, i)}
              className="text-red-600"
            >
              ✕
            </button> */}

            {img.image && !img.file && (
  <div className="flex items-center gap-3">
    <img src={img.image} alt={img.name} className="w-20 h-20 object-cover rounded" />
    <button
      type="button"
      className="text-red-500"
      onClick={() => handleDeleteGalleryImage(img._id)}
    >
      Delete Image
    </button>
  </div>
)}

          </div>
        ))}
        <button
          type="button"
          onClick={addGalleryImage}
          className="bg-blue-500 text-white px-4 py-1 rounded"
        >
          + Add Gallery Image
        </button>
      </div>

      <button
        type="submit"
        className="bg-green-600 text-white px-6 py-2 rounded mt-6"
      >
        Save Experience
      </button>
    </form>
  );
};

export default ExperienceForm;
