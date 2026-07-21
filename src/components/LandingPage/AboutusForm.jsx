"use clent";
import React, { useState, useEffect } from "react";
import axiosInstance from "@/api/axiosInstance.js";
import CustomRichEditor from "@/components/CustomRichEditor";
import { useRouter } from "next/navigation";

const AboutusForm = ({ editData, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
  });

  const [mainImage, setMainImage] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState(null);

  // ================= Dynamic Sections ==================
  const [overviewinfo, setOverviewinfo] = useState([
    {
      title: "",
      subtitle: "",
      description: "",
      image: null,
      imagePreview: null,
    },
  ]);

  const [faq, setFaq] = useState([
    {
      title: "",
      subtitle: "",
      faqs: [{ question: "", answer: "" }],
    },
  ]);

  const router = useRouter();

  // ======================================================
  // Prefill on Edit
  // ======================================================
  useEffect(() => {
    if (editData) {
      setFormData(editData);

      // Set existing main image
      setMainImagePreview(editData.mainImage || editData.image || null);

      setOverviewinfo(
        (editData.overviewinfo || []).map((item) => ({
          ...item,
          imagePreview: item.image || null,
        })),
      );

      setFaq(
        editData.faq?.length
          ? editData.faq
          : [
              {
                title: "",
                subtitle: "",
                faqs: [{ question: "", answer: "" }],
              },
            ],
      );
    }
  }, [editData]);

  // Basic handlers
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleMainImage = (e) => {
    const file = e.target.files[0];
    setMainImage(file);
    setMainImagePreview(URL.createObjectURL(file));
  };

  // *------------------------------------------------------*
  // OVERVIEW INFO
  // *------------------------------------------------------*
  const addOverview = () =>
    setOverviewinfo([
      ...overviewinfo,
      { title: "", description: "", image: null },
    ]);

  const removeOverview = (i) => {
    const updated = [...overviewinfo];
    updated.splice(i, 1);
    setOverviewinfo(updated);
  };

  const handleOverviewBase = (i, e) => {
    const updated = [...overviewinfo];
    updated[i][e.target.name] = e.target.value;
    setOverviewinfo(updated);
  };

  const handleOverviewImage = (i, e) => {
    const file = e.target.files[0];
    const updated = [...overviewinfo];
    updated[i].image = file;
    updated[i].imagePreview = URL.createObjectURL(file);
    setOverviewinfo(updated);
  };

  /* ================= FAQ SECTION ================= */

  const addFaqSection = () => {
    setFaq([
      ...faq,
      {
        title: "",
        subtitle: "",
        faqs: [{ question: "", answer: "" }],
      },
    ]);
  };

  const removeFaqSection = (i) => {
    const updated = [...faq];
    updated.splice(i, 1);
    setFaq(updated);
  };

  const handleFaqSection = (i, e) => {
    const updated = [...faq];
    updated[i][e.target.name] = e.target.value;
    setFaq(updated);
  };

  const addFaqQuestion = (i) => {
    const updated = [...faq];

    updated[i].faqs.push({
      question: "",
      answer: "",
    });

    setFaq(updated);
  };

  const removeFaqQuestion = (i, j) => {
    const updated = [...faq];

    updated[i].faqs.splice(j, 1);

    setFaq(updated);
  };

  const handleFaqQuestion = (i, j, e) => {
    const updated = [...faq];

    updated[i].faqs[j].question = e.target.value;

    setFaq(updated);
  };
  // -------------------------------------------------------
  // SUBMIT
  // -------------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("formData", JSON.stringify(formData));

    if (mainImage) data.append("mainImage", mainImage);

    data.append("overviewinfo", JSON.stringify(overviewinfo));

    data.append("faq", JSON.stringify(faq));

    try {
      let res;
      if (editData) {
        res = await axiosInstance.put(`/api/aboutus/${editData._id}`, data);
      } else {
        res = await axiosInstance.post("/api/aboutus", data);
      }

      alert("Saved Successfully!");
      router.push("/dashboard/aboutus");
      onSuccess && onSuccess(res.data);
    } catch (err) {
      console.error(err);
      alert("Error saving data");
    }
  };

  return (
    <form className="grid grid-cols-2 gap-4 pb-20" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold col-span-2">
        {editData ? "Edit " : "Create "}
      </h2>

      <input
        className="border p-2"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
      />

      <input
        className="border p-2"
        name="subtitle"
        placeholder="Subtitle"
        value={formData.subtitle}
        onChange={handleChange}
      />

      <div className="col-span-2">
        <label>Main Image</label>
        <input
          type="file"
          className="border p-2 w-full"
          onChange={handleMainImage}
        />
        {mainImagePreview && (
          <img src={mainImagePreview} className="w-48 rounded mt-2" />
        )}
      </div>

      {/* =============== Overview Info Section =============== */}
      <section className="col-span-2 mt-5">
        <div className="flex justify-between">
          <h3 className="text-xl font-bold">Overview Info</h3>
          <button
            type="button"
            className="bg-green-600 text-white px-3 py-1 rounded"
            onClick={addOverview}
          >
            + Add
          </button>
        </div>

        {overviewinfo.map((item, i) => (
          <div key={i} className="border bg-gray-50 p-4 rounded mt-3">
            <input
              className="border p-2 w-full mb-2"
              name="title"
              placeholder="Title"
              value={item.title}
              onChange={(e) => handleOverviewBase(i, e)}
            />
            <input
              className="border p-2 w-full mb-2"
              name="subtitle"
              placeholder="Subtitle"
              value={item.subtitle}
              onChange={(e) => handleOverviewBase(i, e)}
            />

            <CustomRichEditor
              value={item.description || ""}
              onChange={(html) => {
                const updated = [...overviewinfo];

                updated[i].description = html;

                setOverviewinfo(updated);
              }}
            />

            <input
              type="file"
              className="border p-2 mt-2"
              onChange={(e) => handleOverviewImage(i, e)}
            />
            {item.imagePreview && (
              <img src={item.imagePreview} className="w-32 rounded mt-2" />
            )}

            <button
              type="button"
              className="bg-red-600 text-white px-3 py-1 rounded mt-3"
              onClick={() => removeOverview(i)}
            >
              Remove Section
            </button>
          </div>
        ))}
      </section>

      {/* =============== FAQ Section =============== */}

      <section className="col-span-2 mt-6">
        <div className="flex justify-between">
          <h3 className="text-xl font-semibold">FAQ Section</h3>

          <button
            type="button"
            onClick={addFaqSection}
            className="bg-green-600 px-3 py-1 rounded text-white"
          >
            + Add FAQ Section
          </button>
        </div>

        {faq.map((section, i) => (
          <div key={i} className="border p-4 rounded bg-gray-100 mt-4">
            {/* FAQ TITLE */}
            <input
              className="border p-2 w-full mb-2"
              placeholder="FAQ Title"
              name="title"
              value={section.title}
              onChange={(e) => handleFaqSection(i, e)}
            />

            {/* FAQ SUBTITLE */}
            <input
              className="border p-2 w-full mb-4"
              placeholder="FAQ Subtitle"
              name="subtitle"
              value={section.subtitle}
              onChange={(e) => handleFaqSection(i, e)}
            />

            {/* ADD QUESTION */}
            <button
              type="button"
              onClick={() => addFaqQuestion(i)}
              className="bg-blue-600 px-3 py-1 rounded text-white mb-4"
            >
              + Add Question
            </button>

            {section.faqs.map((item, j) => (
              <div key={j} className="border p-4 rounded bg-white mt-3">
                <input
                  className="border p-2 w-full mb-2"
                  placeholder="Question"
                  value={item.question}
                  onChange={(e) => handleFaqQuestion(i, j, e)}
                />

                <CustomRichEditor
                  value={item.answer || ""}
                  onChange={(html) => {
                    const updated = [...faq];

                    updated[i].faqs[j].answer = html;

                    setFaq(updated);
                  }}
                />

                <button
                  type="button"
                  className="bg-red-600 text-white px-3 py-1 rounded mt-4"
                  onClick={() => removeFaqQuestion(i, j)}
                >
                  Remove Question
                </button>
              </div>
            ))}

            <button
              type="button"
              className="bg-red-700 text-white px-3 py-1 rounded mt-4"
              onClick={() => removeFaqSection(i)}
            >
              Remove FAQ Section
            </button>
          </div>
        ))}
      </section>

      <button
        type="submit"
        className="bg-blue-600 col-span-2 text-white py-2 rounded mt-5"
      >
        {editData ? "Update " : "Save "}
      </button>
    </form>
  );
};

export default AboutusForm;
