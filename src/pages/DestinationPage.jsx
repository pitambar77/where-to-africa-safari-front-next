"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import {
  createDestination,
  getAllDestinations,
  deleteDestination,
  updateDestination,
} from "../api/destinationAPI.js";

// const emptyContentBlock = [{ type: "paragraph", content: "" }];

const createEmptyContentBlock = () => [{ type: "paragraph", content: "" }];

const emptyRegion = {
  name: "",
  slug: "",
  description: "",
  subtitle: "", //add

  level: "",

  facility: "",
  levelsec: "",
  culture: "",
  levelthird: "",
  days: "",
  levelfourth: "",
  highlight: "",

  overviewTitle: "",
  overviewSubTitle: "",
  overviewDescription: "",
  image: null,

  thingstodo: [
    {
      thinstodoTitle: "",
      thingstododescription: createEmptyContentBlock(),
      section: [{ title: "", description: "", image: null }],
    },
  ],

  whenvisit: [
    {
      heading: "",
      months: [
        {
          monthname: "",
          title: "",
          description: [{ type: "paragraph", content: "" }],
        },
      ],
    },
  ],
};

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    title: "",
    subtitle: "",
    description: "",

    overviewTitle: "",
    overviewSubTitle: "",
    overviewDescription: "",

    bannerImage: null,

    regions: [
      {
        name: "",
        slug: "",
        description: "",
        subtitle: "", //add
        level: "",

        facility: "",
        levelsec: "",
        culture: "",
        levelthird: "",
        days: "",
        levelfourth: "",
        highlight: "",

        overviewTitle: "",
        overviewSubTitle: "",
        overviewDescription: "",
        image: null,

        thingstodo: [
          {
            thinstodoTitle: "",
            thingstododescription: createEmptyContentBlock(),
            section: [{ title: "", description: "", image: null }],
          },
        ],

        whenvisit: [
          {
            heading: "",
            months: [
              {
                monthname: "",
                title: "",
                description: [{ type: "paragraph", content: "" }],
              },
            ],
          },
        ],
      },
    ],
  });
  const [editingId, setEditingId] = useState(null);

  const router = useRouter();

  // Fetch all destinations
  const fetchDestinations = async () => {
    try {
      const { data } = await getAllDestinations();
      setDestinations(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load destinations");
    }
  };

  const addThingsTodo = (regionIndex) => {
    const regions = structuredClone(formData.regions);
    regions[regionIndex].thingstodo.push({
      thinstodoTitle: "",
      thingstododescription: createEmptyContentBlock(),
      section: [{ title: "", description: "", image: null }],
    });
    setFormData({ ...formData, regions });
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  // Handle input for destination fields
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  // Handle input for region fields
  // const handleRegionChange = (index, e) => {
  //   const { name, value, files } = e.target;
  //   const updatedRegions = structuredClone(formData.regions);
  //   updatedRegions[index][name] = files ? files[0] : value;
  //   setFormData({ ...formData, regions: updatedRegions });
  // };

  const handleRegionChange = (index, e) => {
    const { name, value, files } = e.target;

    const updated = structuredClone(formData.regions);

    if (files) {
      updated[index][name] = files[0];
    } else {
      updated[index][name] = value;
    }

    setFormData({
      ...formData,
      regions: updated,
    });
  };

  // Add new region block
  const addRegion = () => {
    setFormData({
      ...formData,
      regions: [
        ...formData.regions,
        {
          ...emptyRegion,
          thingstodo: [
            {
              thinstodoTitle: "",
              thingstododescription: createEmptyContentBlock(),
              section: [{ title: "", description: "", image: null }],
            },
          ],
        },
      ],
    });
  };

  const addTodoSection = (regionIndex, todoIndex) => {
    const regions = structuredClone(formData.regions);
    regions[regionIndex].thingstodo[todoIndex].section.push({
      title: "",
      description: "",
      image: null,
    });
    setFormData({ ...formData, regions });
  };

  const addMonth = (regionIndex, visitIndex) => {
    const regions = structuredClone(formData.regions);
    regions[regionIndex].whenvisit[visitIndex].months.push({
      monthname: "",
      title: "",
      description: [{ type: "paragraph", content: "" }],
    });
    setFormData({ ...formData, regions });
  };

  // Remove region block
  const removeRegion = (index) => {
    const updated = formData.regions.filter((_, i) => i !== index);
    setFormData({ ...formData, regions: updated });
  };

  // Submit (create or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();

    form.append("name", formData.name);
    form.append("slug", formData.slug);

    const hero = {
      title: formData.title,
      subtitle: formData.subtitle,
      description: formData.description,
      overviewTitle: formData.overviewTitle,
      overviewSubTitle: formData.overviewSubTitle,
      overviewDescription: formData.overviewDescription,
    };
    form.append("hero", JSON.stringify(hero));

    if (formData.bannerImage) form.append("bannerImage", formData.bannerImage);

    // const regionData = formData.regions.map((r) => {
    //   const { image, existingImage, ...rest } = r;

    //   return {
    //     ...rest,
    //     ...(editingId && existingImage ? { image: existingImage } : {}),
    //     thingstodo: r.thingstodo.map((t) => ({
    //       ...t,
    //       section: t.section.map(({ image, ...sec }) => sec),
    //     })),
    //   };
    // });

    const regionData = formData.regions.map((r) => {
      const { image, existingImage, ...rest } = r;

      return {
        ...rest,
        image: editingId && !image ? existingImage : undefined,

        thingstodo: r.thingstodo.map((t) => ({
          ...t,
          section: t.section.map((s) => ({
            title: s.title,
            description: s.description,
            image: editingId && !s.image ? s.existingImage : undefined,
          })),
        })),
      };
    });

    form.append("regions", JSON.stringify(regionData));

    formData.regions.forEach((r, rIndex) => {
      if (r.image) {
        //  form.append("regionImages", r.image);
        form.append(`regionImages[${r.slug}]`, r.image);
      }
    });

    formData.regions.forEach((r, rIndex) => {
      r.thingstodo.forEach((todo, tIndex) => {
        todo.section.forEach((sec, sIndex) => {
          if (sec.image) {
            form.append(
              `thingsTodoImages[${r.slug}][${tIndex}][${sIndex}]`,
              sec.image,
            );
          }
        });
      });
    });

    try {
      if (editingId) {
        await updateDestination(editingId, form);
        toast.success("Destination updated!");
      } else {
        await createDestination(form);
        toast.success("Destination added!");
      }

      setFormData({
        name: "",
        slug: "",
        title: "",
        subtitle: "",
        description: "",
        overviewTitle: "",
        overviewSubTitle: "",
        overviewDescription: "",
        bannerImage: null,
        regions: [
          {
            ...emptyRegion,
            thingstodo: [
              {
                thinstodoTitle: "",
                thingstododescription: createEmptyContentBlock(),
                section: [{ title: "", description: "", image: null }],
              },
            ],
          },
        ],
      });

      setEditingId(null);
      fetchDestinations();
    } catch (err) {
      console.error(err);
      toast.error("Error saving destination");
    }
  };

  // Delete
  const handleDelete = async (id) => {
    if (!confirm("Delete this destination?")) return;
    try {
      await deleteDestination(id);
      toast.success("Deleted successfully");
      fetchDestinations();
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  const removeThingsTodo = (regionIndex, todoIndex) => {
    const regions = structuredClone(formData.regions);
    regions[regionIndex].thingstodo.splice(todoIndex, 1);
    setFormData({ ...formData, regions });
  };

  const removeTodoSection = (regionIndex, todoIndex, sectionIndex) => {
    const regions = structuredClone(formData.regions);
    regions[regionIndex].thingstodo[todoIndex].section.splice(sectionIndex, 1);
    setFormData({ ...formData, regions });
  };

  const removeMonth = (regionIndex, visitIndex, monthIndex) => {
    const regions = structuredClone(formData.regions);
    regions[regionIndex].whenvisit[visitIndex].months.splice(monthIndex, 1);
    setFormData({ ...formData, regions });
  };

  const handleEdit = (dest) => {
    setEditingId(dest._id);

    setFormData({
      name: dest.name,
      slug: dest.slug,
      title: dest.hero?.title || "",
      subtitle: dest.hero?.subtitle || "",
      description: dest.hero?.description || "",
      overviewTitle: dest.hero?.overviewTitle || "",
      overviewSubTitle: dest.hero?.overviewSubTitle || "",
      overviewDescription: dest.hero?.overviewDescription || "",
      bannerImage: null,
      existingBannerImage: dest.hero?.bannerImage || "", // 👈 Add this

      regions: dest.regions.map((r) => ({
        ...r,
        image: null,
        existingImage: r.image || "",

        thingstodo: r.thingstodo.map((t) => ({
          ...t,
          section: t.section.map((s) => ({
            ...s,
            image: null, // file input
            existingImage: s.image || "", // ✅ keep old image
          })),
        })),

        whenvisit: r.whenvisit?.length
          ? r.whenvisit
          : [
              {
                heading: "",
                months: [
                  {
                    monthname: "",
                    title: "",
                    description: createEmptyContentBlock(),
                  },
                ],
              },
            ],
      })),
    });
    // Scroll to the top
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const ContentBlocksEditor = ({ blocks = [], onChange }) => {
    const updateBlock = (index, key, value) => {
      const updated = structuredClone(blocks);
      updated[index][key] = value;
      onChange(updated);
    };

    const addBlock = (type) => {
      onChange([...blocks, { type, content: type === "list" ? [""] : "" }]);
    };

    const removeBlock = (index) => {
      onChange(blocks.filter((_, i) => i !== index));
    };

    return (
      <div className="space-y-3 mt-2">
        {blocks.map((block, i) => (
          <div key={i} className="border p-3 rounded bg-gray-50">
            <div className="flex gap-2 mb-2">
              <select
                value={block.type}
                onChange={(e) => updateBlock(i, "type", e.target.value)}
                className="border p-1 rounded"
              >
                <option value="header">Header</option>
                <option value="paragraph">Paragraph</option>
                <option value="list">List</option>
              </select>

              <button
                type="button"
                onClick={() => removeBlock(i)}
                className="text-sm bg-red-500 text-white px-2 rounded"
              >
                Remove
              </button>
            </div>

            {block.type === "header" && (
              <input
                value={block.content}
                onChange={(e) => updateBlock(i, "content", e.target.value)}
                className="border p-2 w-full rounded"
              />
            )}

            {block.type === "paragraph" && (
              <textarea
                value={block.content}
                onChange={(e) => updateBlock(i, "content", e.target.value)}
                className="border p-2 w-full rounded"
                rows={4}
              />
            )}

            {block.type === "list" && (
              <div className="space-y-2">
                {block.content.map((item, idx) => (
                  <input
                    key={idx}
                    value={item}
                    onChange={(e) => {
                      const updated = structuredClone(blocks);
                      updated[i].content[idx] = e.target.value;
                      onChange(updated);
                    }}
                    className="border p-2 w-full rounded"
                  />
                ))}
              </div>
            )}
          </div>
        ))}

        <div className="flex gap-2">
          <button type="button" onClick={() => addBlock("header")}>
            + Header
          </button>
          <button type="button" onClick={() => addBlock("paragraph")}>
            + Paragraph
          </button>
          <button type="button" onClick={() => addBlock("list")}>
            + List
          </button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Manage Destinations</h2>

      {/* Destination Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-lg shadow mb-6"
      >
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Destination Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="slug"
            placeholder="Slug (unique)"
            value={formData.slug}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="title"
            placeholder="Hero Title"
            value={formData.title}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="subtitle"
            placeholder="Hero Subtitle"
            value={formData.subtitle}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="file"
            name="bannerImage"
            accept="image/*"
            onChange={handleChange}
            className="border p-2 rounded"
          />
          {formData.existingBannerImage && (
            <img
              src={formData.existingBannerImage}
              alt="Banner"
              className="w-40 h-24 object-cover rounded border mt-2"
            />
          )}
        </div>
        <textarea
          name="description"
          placeholder="Hero Description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 rounded w-full mt-3"
          rows={4}
        />

        {/* Overview Section */}
        <div className="mt-6 border-t pt-4">
          <h4 className="font-semibold text-lg mb-3"> Destination Overview</h4>

          <input
            type="text"
            name="overviewTitle"
            placeholder="Overview Title"
            value={formData.overviewTitle}
            onChange={handleChange}
            className="border p-2 rounded w-full mb-3"
          />

          <input
            type="text"
            name="overviewSubTitle"
            placeholder="Overview Subtitle"
            value={formData.overviewSubTitle}
            onChange={handleChange}
            className="border p-2 rounded w-full mb-3"
          />

          <textarea
            name="overviewDescription"
            placeholder="Overview Description"
            value={formData.overviewDescription}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            rows={4}
          />
        </div>

        {/* Regions Section */}
        <div className="mt-6 border-t pt-4">
          <h3 className="font-semibold mb-3 text-lg">
            Regions/ National Parks
          </h3>
          {formData.regions.map((region, index) => (
            <div key={index} className="border p-4 mb-4 rounded">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Region Name"
                  value={region.name}
                  onChange={(e) => handleRegionChange(index, e)}
                  className="border p-2 rounded"
                />
                <input
                  type="text"
                  name="slug"
                  placeholder="Region Slug"
                  value={region.slug}
                  onChange={(e) => handleRegionChange(index, e)}
                  className="border p-2 rounded"
                />
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={(e) => handleRegionChange(index, e)}
                  className="border p-2 rounded"
                />
                {region.existingImage && (
                  <img
                    src={
                      region.image instanceof File
                        ? URL.createObjectURL(region.image)
                        : region.existingImage
                    }
                    className="w-28 h-20 object-cover rounded border mt-2"
                    alt=""
                  />
                )}
              </div>

              <textarea
                name="description"
                placeholder="Region Description"
                value={region.description}
                onChange={(e) => handleRegionChange(index, e)}
                className="border p-2 rounded w-full mt-3"
                rows={3}
              />

              {/* Region Subtitle */}
              <input
                type="text"
                name="subtitle"
                placeholder="Region Subtitle"
                value={region.subtitle}
                onChange={(e) => handleRegionChange(index, e)}
                className="border p-2 rounded w-full mt-3"
              />

              {/* Facility / Culture / Days */}
              <div className="grid grid-cols-3 gap-4 mt-3">
                <input
                  type="text"
                  name="level"
                  placeholder="level"
                  value={region.level}
                  onChange={(e) => handleRegionChange(index, e)}
                  className="border p-2 rounded"
                />

                <input
                  type="text"
                  name="facility"
                  placeholder="Facilities"
                  value={region.facility}
                  onChange={(e) => handleRegionChange(index, e)}
                  className="border p-2 rounded"
                />

                <input
                  type="text"
                  name="levelsec"
                  placeholder="levelsec"
                  value={region.levelsec}
                  onChange={(e) => handleRegionChange(index, e)}
                  className="border p-2 rounded"
                />

                <input
                  type="text"
                  name="culture"
                  placeholder="Culture"
                  value={region.culture}
                  onChange={(e) => handleRegionChange(index, e)}
                  className="border p-2 rounded"
                />

                <input
                  type="text"
                  name="levelthird"
                  placeholder="levelthird"
                  value={region.levelthird}
                  onChange={(e) => handleRegionChange(index, e)}
                  className="border p-2 rounded"
                />

                <input
                  type="text"
                  name="days"
                  placeholder="Recommended Days"
                  value={region.days}
                  onChange={(e) => handleRegionChange(index, e)}
                  className="border p-2 rounded"
                />

                <input
                  type="text"
                  name="levelfourth"
                  placeholder="levelfourth"
                  value={region.levelfourth}
                  onChange={(e) => handleRegionChange(index, e)}
                  className="border p-2 rounded"
                />

                <input
                  type="text"
                  name="highlight"
                  placeholder="Highlight (e.g. Best for Wildlife, Luxury, Adventure)"
                  value={region.highlight}
                  onChange={(e) => handleRegionChange(index, e)}
                  className="border p-2 rounded w-full mt-3"
                />
              </div>

              {/* Overview Section */}
              <div className="mt-6 border-t pt-4">
                <h4 className="font-semibold text-lg mb-3">Region Overview</h4>

                <input
                  type="text"
                  name="overviewTitle"
                  placeholder="Overview Title"
                  value={region.overviewTitle}
                  onChange={(e) => handleRegionChange(index, e)}
                  className="border p-2 rounded w-full mb-3"
                />

                <input
                  type="text"
                  name="overviewSubTitle"
                  placeholder="Overview Subtitle"
                  value={region.overviewSubTitle}
                  onChange={(e) => handleRegionChange(index, e)}
                  className="border p-2 rounded w-full mb-3"
                />

                <textarea
                  name="overviewDescription"
                  placeholder="Overview Description"
                  value={region.overviewDescription}
                  onChange={(e) => handleRegionChange(index, e)}
                  className="border p-2 rounded w-full"
                  rows={4}
                />
              </div>

              <button
                type="button"
                onClick={() => removeRegion(index)}
                className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
              >
                Remove Region
              </button>
              <h4 className="font-semibold mt-4">Things To Do</h4>

              {region.thingstodo.map((todo, tIdx) => (
                <div key={tIdx} className="border p-3 mt-2 rounded">
                  {/* Things To Do Title */}
                  <input
                    placeholder="Things To Do Title"
                    value={todo.thinstodoTitle}
                    onChange={(e) => {
                      const regions = structuredClone(formData.regions);
                      regions[index].thingstodo[tIdx].thinstodoTitle =
                        e.target.value;
                      setFormData({ ...formData, regions });
                    }}
                    className="border p-2 w-full rounded"
                  />

                  {/* Things To Do Description (dynamic content blocks) */}
                  <h5 className="font-medium mt-3">Description</h5>
                  <ContentBlocksEditor
                    blocks={todo.thingstododescription}
                    onChange={(updated) => {
                      const regions = structuredClone(formData.regions);
                      regions[index].thingstodo[tIdx].thingstododescription =
                        updated;
                      setFormData({ ...formData, regions });
                    }}
                  />

                  {/* Sections */}
                  {todo.section.map((sec, sIdx) => (
                    <div
                      key={sIdx}
                      className="grid grid-cols-2 gap-3 mt-3 items-start border p-2 rounded"
                    >
                      {/* Section Title */}
                      <input
                        placeholder="Section Title"
                        value={sec.title}
                        onChange={(e) => {
                          const regions = structuredClone(formData.regions);

                          regions[index].thingstodo[tIdx].section[sIdx].title =
                            e.target.value;
                          setFormData({ ...formData, regions });
                        }}
                        className="border p-2 rounded col-span-2"
                      />

                      {/* Section Image */}
                      <input
                        type="file"
                        onChange={(e) => {
                          const regions = structuredClone(formData.regions);
                          regions[index].thingstodo[tIdx].section[sIdx].image =
                            e.target.files[0];
                          setFormData({ ...formData, regions });
                        }}
                        className="col-span-2"
                      />

                      {/* Image Preview */}
                      {(sec.image || sec.existingImage) && (
                        <img
                          src={
                            sec.image instanceof File
                              ? URL.createObjectURL(sec.image)
                              : sec.existingImage
                          }
                          alt="Section"
                          className="w-32 h-24 object-cover rounded border col-span-2 mt-2"
                        />
                      )}

                      {/* Remove Section */}
                      <button
                        type="button"
                        onClick={() => removeTodoSection(index, tIdx, sIdx)}
                        className="text-sm bg-red-400 text-white px-3 py-1 rounded col-span-2 w-fit"
                      >
                        Remove Section
                      </button>
                    </div>
                  ))}

                  {/* Add Section */}
                  <button
                    type="button"
                    onClick={() => addTodoSection(index, tIdx)}
                    className="text-sm mt-3 bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    + Add Section
                  </button>

                  {/* Remove Things To Do */}
                  <button
                    type="button"
                    onClick={() => removeThingsTodo(index, tIdx)}
                    className="mt-3 ml-2 bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Remove Things To Do
                  </button>
                </div>
              ))}

              {/* Add Things To Do */}
              <button
                type="button"
                onClick={() => addThingsTodo(index)}
                className="bg-green-600 text-white px-3 py-1 mt-3 rounded"
              >
                + Add Things To Do
              </button>

              <h4 className="font-semibold mt-6">When To Visit</h4>

              {region.whenvisit.map((visit, vIdx) => (
                <div key={vIdx} className="border p-3 mt-2 rounded">
                  <input
                    placeholder="Heading"
                    value={visit.heading}
                    onChange={(e) => {
                      const regions = structuredClone(formData.regions);
                      regions[index].whenvisit[vIdx].heading = e.target.value;
                      setFormData({ ...formData, regions });
                    }}
                    className="border p-2 w-full rounded"
                  />

                  {visit.months.map((month, mIdx) => (
                    <div key={mIdx} className="mt-3 border p-3 rounded">
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          placeholder="Month Name"
                          value={month.monthname}
                          onChange={(e) => {
                            const regions = structuredClone(formData.regions);
                            regions[index].whenvisit[vIdx].months[
                              mIdx
                            ].monthname = e.target.value;
                            setFormData({ ...formData, regions });
                          }}
                          className="border p-2 rounded"
                        />

                        <input
                          placeholder="Title"
                          value={month.title}
                          onChange={(e) => {
                            const regions = structuredClone(formData.regions);
                            regions[index].whenvisit[vIdx].months[mIdx].title =
                              e.target.value;
                            setFormData({ ...formData, regions });
                          }}
                          className="border p-2 rounded"
                        />
                      </div>

                      <h5 className="font-semibold mt-2">Month Description</h5>

                      <ContentBlocksEditor
                        blocks={month.description}
                        onChange={(updated) => {
                          const regions = structuredClone(formData.regions);
                          regions[index].whenvisit[vIdx].months[
                            mIdx
                          ].description = updated;
                          setFormData({ ...formData, regions });
                        }}
                      />

                      <button
                        type="button"
                        onClick={() => removeMonth(index, vIdx, mIdx)}
                        className="mt-2 text-sm bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Remove Month
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => addMonth(index, vIdx)}
                    className="mt-3 bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    + Add Month
                  </button>
                </div>
              ))}
            </div>
          ))}
          <button
            type="button"
            onClick={addRegion}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            + Add Region
          </button>
        </div>

        <button className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {editingId ? "Update Destination" : "Save Destination"}
        </button>
      </form>

      {/* Destination Table */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-semibold mb-3">All Destinations</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2 border">Banner</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Slug</th>
              <th className="p-2 border">Regions</th>
              <th className="p-2 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {destinations.map((dest) => (
              <tr key={dest._id} className="hover:bg-gray-50">
                <td className="border p-2">
                  {dest.hero?.bannerImage ? (
                    <img
                      src={dest.hero.bannerImage}
                      alt={dest.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td className="border p-2">{dest.name}</td>
                <td className="border p-2">{dest.slug}</td>
                {/* <td className="border p-2">
                  {dest.regions?.length
                    ? dest.regions.map((r) => r.name).join(", ")
                    : "No regions"}
                </td> */}

                <td className="border p-2">
                  {dest.regions?.length ? (
                    <div className="space-y-2">
                      {dest.regions.map((region) => (
                        <div
                          key={region._id}
                          className="flex items-center justify-between gap-3"
                        >
                          <span className="font-medium">{region.name}</span>

                          <button
                            type="button"
                            onClick={() =>
                              router.push(
                                `/dashboard/destinations/regions/seo/${region._id}`,
                              )
                            }
                            className="bg-purple-600 text-white px-3 py-1 rounded text-sm"
                          >
                            SEO
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    "No regions"
                  )}
                </td>

                <td className="border p-2 text-center justify-center items-center flex gap-4">
                  <button
                    onClick={() => handleEdit(dest)}
                    className="bg-yellow-400 px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() =>
                      router.push(`/dashboard/destinations/seo/${dest._id}`)
                    }
                    className="bg-purple-600 text-white px-3 py-1 rounded"
                  >
                    SEO
                  </button>
                  <button
                    onClick={() =>
                      router.push(`/dashboard/destinations/regions/${dest._id}`)
                    }
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Regions
                  </button>
                  <button
                    onClick={() => handleDelete(dest._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Destinations;
